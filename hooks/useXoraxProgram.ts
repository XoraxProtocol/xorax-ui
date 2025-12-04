import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Program, AnchorProvider, web3, BN } from "@coral-xyz/anchor";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { useMemo } from "react";
import idl from "@/app/idl/xorax.json";

// Program ID from your deployed contract
const PROGRAM_ID = new PublicKey("JJWGp5cinhhupX8LNm6oThsuzdt3esnJZZLYTosqMEm");

// Suggested deposit amounts (UI only, any amount >= 0.01 SOL is allowed)
export const SUGGESTED_AMOUNTS = [0.1, 0.5, 1, 5, 10];

export const MIXING_FEE = 10_000_000; // 0.01 SOL in lamports
export const ESTIMATED_GAS_FEE = 5_000; // 0.000005 SOL in lamports
export const MIN_DEPOSIT_AMOUNT = 0.01; // 0.01 SOL minimum

export const RELAYER_API_URL =
  process.env.NEXT_PUBLIC_RELAYER_API_URL || "http://localhost:3001";

export interface DepositRecordAccount {
  commitment: number[];
  amount: BN;
  timestamp: BN;
  withdrawalDelay: BN;
  withdrawn: boolean;
}

export function useXoraxProgram() {
  const { connection } = useConnection();
  const wallet = useWallet();

  const program = useMemo(() => {
    if (!wallet.publicKey) return null;

    const provider = new AnchorProvider(
      connection,
      wallet as any,
      AnchorProvider.defaultOptions()
    );

    return new Program(idl as any, provider);
  }, [connection, wallet]);

  /**
   * Get deposit record PDA from commitment
   */
  const getDepositRecordPda = (commitment: Buffer): [PublicKey, number] => {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("deposit"), commitment],
      PROGRAM_ID
    );
  };

  /**
   * Fetch deposit record by commitment
   */
  const fetchDepositRecord = async (
    commitment: Buffer
  ): Promise<DepositRecordAccount | null> => {
    if (!program) return null;

    try {
      const [depositRecordPda] = getDepositRecordPda(commitment);
      const record = await (program.account as any).depositRecord.fetch(
        depositRecordPda
      );
      return record as any;
    } catch (error) {
      console.error("Error fetching deposit record:", error);
      return null;
    }
  };

  /**
   * Make a deposit with any amount
   */
  const deposit = async (
    amount: BN,
    commitment: number[],
    delaySeconds: number
  ): Promise<{ signature: string; commitment: string }> => {
    if (!program || !wallet.publicKey) {
      throw new Error("Wallet not connected");
    }

    const commitmentBuffer = Buffer.from(commitment);
    const [depositRecordPda] = getDepositRecordPda(commitmentBuffer);

    const tx = await program.methods
      .deposit(commitment, amount, new BN(delaySeconds))
      .accounts({
        depositRecord: depositRecordPda,
        depositor: wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    return {
      signature: tx,
      commitment: commitmentBuffer.toString("hex"),
    };
  };

  /**
   * Withdraw funds via relayer (gasless)
   */
  const withdraw = async (
    commitment: string,
    secret: string,
    nullifier: string,
    recipient: PublicKey
  ): Promise<string> => {
    try {
      const response = await fetch(`${RELAYER_API_URL}/withdraw`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commitment,
          secret,
          nullifier,
          recipient: recipient.toString(),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Withdrawal failed");
      }

      const result = await response.json();
      return result.signature;
    } catch (error: any) {
      throw new Error(`Withdrawal failed: ${error.message}`);
    }
  };

  return {
    program,
    programId: PROGRAM_ID,
    getDepositRecordPda,
    fetchDepositRecord,
    deposit,
    withdraw,
  };
}

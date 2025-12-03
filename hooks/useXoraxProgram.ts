import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Program, AnchorProvider, web3, BN } from "@coral-xyz/anchor";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { useMemo } from "react";
import idl from "@/app/idl/xorax.json";

// Program ID from your deployed contract
const PROGRAM_ID = new PublicKey("XoPB2WDHGJrnhR78xG9EfuU8PGYHchcPvygycaHuHGz");

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
      // Check if relayer is available
      const healthCheck = await fetch(`${RELAYER_API_URL}/health`).catch(
        () => null
      );

      if (!healthCheck || !healthCheck.ok) {
        throw new Error(
          "Relayer service is currently unavailable. Please try again later."
        );
      }

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

      const result = await response.json();

      if (!response.ok) {
        // Handle specific error messages from relayer
        let errorMessage =
          result.message || result.error || "Withdrawal failed";

        // Add more context based on status code
        if (response.status === 400) {
          errorMessage = `Invalid request: ${errorMessage}`;
        } else if (response.status === 401) {
          errorMessage = `Authentication failed: ${errorMessage}`;
        } else if (response.status === 403) {
          errorMessage = `Access denied: ${errorMessage}`;
        } else if (response.status === 404) {
          errorMessage = `Not found: ${errorMessage}`;
        } else if (response.status === 503) {
          errorMessage = `Service unavailable: ${errorMessage}`;
        } else if (response.status === 504) {
          errorMessage = `Timeout: ${errorMessage}`;
        }

        throw new Error(errorMessage);
      }

      return result.signature;
    } catch (error: any) {
      // Network errors
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        throw new Error(
          "Cannot connect to relayer service. Please check your internet connection."
        );
      }

      // Timeout errors
      if (error.name === "AbortError") {
        throw new Error(
          "Request timeout. The relayer service is taking too long to respond."
        );
      }

      // Re-throw with original message if already formatted
      throw error;
    }
  };

  return {
    program,
    programId: PROGRAM_ID,
    getDepositRecordPda,
    fetchDepositRecord,
    deposit,
    withdraw,
    RELAYER_API_URL,
  };
}

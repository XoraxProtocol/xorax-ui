# Xorax - Privacy Mixer UI

The official web interface for Xorax, a non-custodial privacy mixer built on Solana.

![Xorax](https://img.shields.io/badge/Solana-Privacy-purple)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)

## 🚀 Features

- **Non-Custodial Mixing**: Break on-chain links between deposits and withdrawals
- **Flexible Amounts**: Mix any amount from 0.1 SOL to 10+ SOL
- **Customizable Delays**: Set withdrawal delays from 5 minutes to 24 hours
- **Wallet Integration**: Support for all major Solana wallets
- **Beautiful UI**: Modern, responsive design with Material-UI components
- **Developer SDK**: Integrate privacy mixing into your own applications

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Material-UI (MUI)](https://mui.com/)
- **Blockchain**: [Solana Web3.js](https://solana-labs.github.io/solana-web3.js/)
- **Wallet Adapter**: [@solana/wallet-adapter](https://github.com/solana-labs/wallet-adapter)
- **Smart Contracts**: [Anchor Framework](https://www.anchor-lang.com/)

## 📦 Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/XoraxProtocol/xorax-ui.git
cd xorax-ui

# Install dependencies
yarn install

# Copy environment file
cp .env.example .env.local
\`\`\`

## ⚙️ Configuration

Create a \`.env.local\` file with the following variables:

\`\`\`env
# Solana Configuration
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_RPC_URL=https://api.devnet.solana.com

# Program Configuration
NEXT_PUBLIC_PROGRAM_ID=XoPB2WDHGJrnhR78xG9EfuU8PGYHchcPvygycaHuHGz

# Relayer API (for gasless withdrawals)
NEXT_PUBLIC_RELAYER_API_URL=http://localhost:3001
\`\`\`

## 🚀 Development

\`\`\`bash
# Run development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📁 Project Structure

\`\`\`
xorax-ui/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Main mixer interface
│   ├── docs/              # Documentation pages
│   ├── idl/               # Solana program IDL
│   ├── page.tsx           # Landing page
│   └── layout.tsx         # Root layout
├── components/            # Reusable React components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── public/                # Static assets
└── .env.local            # Environment variables (not in git)
\`\`\`

## 🔐 Security

- **Never commit \`.env.local\`** - Contains sensitive configuration
- **Never commit wallet files** - Keypairs should never be in version control
- **Use environment variables** - For all sensitive data
- **Verify program ID** - Always check you're interacting with the correct program

## 🔗 Related Projects

- **SDK**: [xorax-sdk](https://github.com/XoraxProtocol/xorax-sdk) - TypeScript SDK for developers
- **Smart Contract**: [xorax](https://github.com/XoraxProtocol/xorax) - Solana program source code
- **Relayer**: [xorax-relayer](https://github.com/XoraxProtocol/xorax-relayer) - Gasless withdrawal service

## 🌐 Links

- **Website**: [https://xorax.cash](https://xorax.cash)
- **Documentation**: [https://xorax.cash/docs](https://xorax.cash/docs)
- **npm Package**: [xorax-sdk](https://www.npmjs.com/package/xorax-sdk)
- **Twitter**: [@XoraxProtocol](https://twitter.com/XoraxProtocol)

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## ⚠️ Disclaimer

Xorax is experimental software. Use at your own risk. Always test with small amounts first on devnet.

## 💬 Support

- **Email**: support@xorax.cash
- **GitHub Issues**: [Report bugs](https://github.com/XoraxProtocol/xorax-ui/issues)

---

Built with 💜 by the Xorax team

import { http, createConfig } from 'wagmi';
import { mainnet, arbitrum, base, polygon, sepolia } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';

const projectId = process.env.WALLETCONNECT_PROJECT_ID || 'nexafi_walletconnect_demo_project_id';

export const wagmiConfig = createConfig({
  chains: [mainnet, arbitrum, base, polygon, sepolia],
  connectors: [
    injected({ shimDisconnect: true }),
    walletConnect({
      projectId,
      showQrModal: true,
      metadata: {
        name: 'NexaFi',
        description: 'Trust. Finance. Web3. Self-custodial banking and decentralized credit protocol.',
        url: typeof window !== 'undefined' ? window.location.origin : 'https://nexafi.protocol',
        icons: ['https://nexafi.protocol/logo.png'],
      },
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
    [polygon.id]: http(),
    [sepolia.id]: http(),
  },
  ssr: true,
});

declare module 'wagmi' {
  interface Register {
    config: typeof wagmiConfig;
  }
}

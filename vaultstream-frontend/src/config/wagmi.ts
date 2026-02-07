import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { arbitrumSepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'VaultStream',
  projectId: '35328ad06930ca45c849babc50f7e5bd',
  chains: [arbitrumSepolia],
  ssr: true,
});

import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { http } from 'wagmi'
import { localhost } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'OPN Achievement Protocol',
  projectId: 'fa3b11a0ecea165c5dc3f4c61deafe4e',
  chains: [localhost],
  transports: {
    [localhost.id]: http(),
  },
})
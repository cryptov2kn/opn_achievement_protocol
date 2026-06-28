'use client'

import { useReadContract } from 'wagmi'
import issuerAbi from '@/abi/IssuerRegistry.json'
import { addresses } from '@/lib/contracts'
import { useAccount } from 'wagmi'

export function useIssuer() {
  const { address } = useAccount()

  return useReadContract({
    address: addresses.issuer as `0x${string}`,
    abi: issuerAbi.abi,
    functionName: 'issuers',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  })
}
// components/Mino/MinoContext.tsx
'use client'

import React, { createContext, useContext } from 'react'
import { useMino as useMinoCore } from './useMino'
import type { UseMinoReturn } from './types'

const MinoContext = createContext<UseMinoReturn | null>(null)

export function MinoProvider({ children }: { children: React.ReactNode }) {
  const mino = useMinoCore()
  return <MinoContext.Provider value={mino}>{children}</MinoContext.Provider>
}

export function useMino() {
  const ctx = useContext(MinoContext)
  if (!ctx) throw new Error('useMino must be inside MinoProvider')
  return ctx
}

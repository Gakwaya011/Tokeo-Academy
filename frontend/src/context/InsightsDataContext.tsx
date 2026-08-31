import { createContext } from 'react'
import type { Insight } from '../types/insight'

export const InsightsDataContext = createContext<Insight[] | null>(null)

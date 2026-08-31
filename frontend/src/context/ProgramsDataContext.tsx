import { createContext } from 'react'
import type { Program } from '../types/program'

export const ProgramsDataContext = createContext<Program[] | null>(null)

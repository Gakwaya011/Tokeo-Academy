import { CheckCircle2 } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-tokeo-offwhite flex items-center justify-center px-6">
      <div className="max-w-lg w-full flex flex-col items-center gap-4 text-center">
        <span className="w-14 h-14 rounded-full bg-tokeo-navy flex items-center justify-center">
          <CheckCircle2 size={26} className="text-tokeo-gold" />
        </span>
        <h1 className="text-3xl font-bold text-tokeo-navy tracking-tight">You're in.</h1>
        <p className="text-tokeo-navy/60 leading-relaxed">
          Your platform access is active. The full 5-step execution framework and daily
          planning dashboard are coming online here shortly.
        </p>
      </div>
    </div>
  )
}

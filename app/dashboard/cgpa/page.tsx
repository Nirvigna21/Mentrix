'use client'

import { useState, useCallback } from 'react'
import { Calculator, Target, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SemesterData } from '@/types'

const DEFAULT_SEMS: SemesterData[] = [
  { sem: 1, sgpa: 7.8 },
  { sem: 2, sgpa: 8.1 },
  { sem: 3, sgpa: 8.0 },
  { sem: 4, sgpa: 8.2 },
  { sem: 5, sgpa: 8.05 },
  { sem: 6, sgpa: 0 },
]

export default function CGPAPage() {
  const [sems, setSems]           = useState<SemesterData[]>(DEFAULT_SEMS)
  const [curCGPA, setCurCGPA]     = useState('8.05')
  const [semsDone, setSemsDone]   = useState('5')
  const [targetCGPA, setTargetCGPA] = useState('8.5')
  const [activeSem, setActiveSem] = useState(5)

  const validSems = sems.filter(s => s.sgpa > 0)
  const calculatedCGPA = validSems.length
    ? (validSems.reduce((a, s) => a + s.sgpa, 0) / validSems.length).toFixed(2)
    : null

  const calcTarget = useCallback(() => {
    const cur  = parseFloat(curCGPA)
    const done = parseInt(semsDone)
    const tgt  = parseFloat(targetCGPA)
    if (!cur || !done || !tgt) return null
    const rem = 8 - done
    if (rem <= 0) return null
    return Math.min(10, ((tgt * 8) - (cur * done)) / rem)
  }, [curCGPA, semsDone, targetCGPA])

  const needed = calcTarget()

  const maxGPA = Math.max(...sems.filter(s => s.sgpa > 0).map(s => s.sgpa), 8)

  function updateSem(idx: number, val: string) {
    const n = parseFloat(val)
    setSems(prev => prev.map((s, i) => i === idx ? { ...s, sgpa: isNaN(n) ? 0 : Math.min(10, n) } : s))
  }

  function addSem() {
    setSems(prev => [...prev, { sem: prev.length + 1, sgpa: 0 }])
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-xl font-extrabold tracking-tight mb-5">CGPA Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">

        {/* SGPA → CGPA converter */}
        <div className="bg-surface-1 border border-border-1 rounded-2xl p-5">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/35 mb-4">
            <Calculator className="w-3 h-3" /> SGPA → CGPA converter
          </div>
          <div className="flex flex-col gap-2 mb-3">
            {sems.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-white/35 w-6">S{s.sem}</span>
                <input
                  type="number"
                  value={s.sgpa || ''}
                  onChange={e => updateSem(i, e.target.value)}
                  placeholder="0.00"
                  min={0} max={10} step={0.01}
                  className="flex-1 bg-surface-2 border border-border-2 rounded-lg px-3 py-1.5 text-sm font-mono outline-none focus:border-accent-blue/50 transition-colors"
                />
              </div>
            ))}
          </div>
          <button
            onClick={addSem}
            className="w-full text-xs py-2 bg-surface-2 border border-border-1 hover:border-border-2 rounded-xl text-white/50 hover:text-white transition-colors"
          >
            + Add semester
          </button>
          <div className="mt-4 bg-surface-2 border border-border-1 rounded-xl p-4 text-center">
            <div className={cn('text-3xl font-extrabold tracking-tighter', calculatedCGPA ? 'text-accent-cyan' : 'text-white/20')}>
              {calculatedCGPA ?? '—'}
            </div>
            <div className="text-[10px] text-white/35 mt-1">Calculated CGPA ({validSems.length} sems)</div>
          </div>
        </div>

        {/* Target predictor */}
        <div className="bg-surface-1 border border-border-1 rounded-2xl p-5">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/35 mb-4">
            <Target className="w-3 h-3" /> Target CGPA predictor
          </div>
          <div className="flex flex-col gap-3 mb-4">
            {[
              { label: 'Current CGPA', val: curCGPA, set: setCurCGPA, ph: '8.05' },
              { label: 'Semesters done', val: semsDone, set: setSemsDone, ph: '5' },
              { label: 'Target CGPA', val: targetCGPA, set: setTargetCGPA, ph: '8.5' },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-[10px] uppercase tracking-wide text-white/35 mb-1.5">{f.label}</label>
                <input
                  type="number"
                  value={f.val}
                  onChange={e => f.set(e.target.value)}
                  placeholder={f.ph}
                  min={0} max={10} step={0.01}
                  className="w-full bg-surface-2 border border-border-2 rounded-xl px-3 py-2 text-sm font-mono outline-none focus:border-accent-blue/50 transition-colors"
                />
              </div>
            ))}
          </div>
          <div className="bg-surface-2 border border-border-1 rounded-xl p-4 text-center">
            <div className={cn(
              'text-3xl font-extrabold tracking-tighter',
              needed === null ? 'text-white/20' :
              needed > 10 ? 'text-red-400' :
              needed >= 9 ? 'text-yellow-400' : 'text-accent-green'
            )}>
              {needed === null ? '—' : needed.toFixed(2)}
            </div>
            <div className="text-[10px] text-white/35 mt-1">
              {needed === null
                ? 'Fill all fields above'
                : needed > 10
                ? 'Target not achievable 😬'
                : `Required SGPA in remaining ${8 - parseInt(semsDone)} sem(s)`}
            </div>
          </div>
        </div>
      </div>

      {/* Semester overview */}
      <div className="bg-surface-1 border border-border-1 rounded-2xl p-5 mb-4">
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/35 mb-4">
          Semester overview
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {sems.map((s, i) => (
            <div
              key={i}
              onClick={() => setActiveSem(i)}
              className={cn(
                'rounded-xl p-3 cursor-pointer transition-all border',
                activeSem === i
                  ? 'bg-accent-blue/10 border-accent-blue/35'
                  : 'bg-surface-2 border-border-1 hover:border-border-2'
              )}
            >
              <div className="text-[10px] font-mono text-white/35">S{s.sem}</div>
              <div className={cn('text-xl font-extrabold tracking-tight', s.sgpa ? 'text-white' : 'text-white/20')}>
                {s.sgpa || '—'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CGPA trend chart */}
      <div className="bg-surface-1 border border-border-1 rounded-2xl p-5">
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/35 mb-4">
          <TrendingUp className="w-3 h-3" /> CGPA trend
        </div>
        <div className="flex items-end gap-3 h-24">
          {sems.filter(s => s.sgpa > 0).map((s, i) => {
            const h = Math.round((s.sgpa / maxGPA) * 80)
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div
                  className="w-full rounded-t bg-accent-blue transition-all"
                  style={{ height: `${h}px`, opacity: 0.5 + i * 0.1 }}
                />
                <span className="text-[9px] font-mono text-white/35">S{s.sem}: {s.sgpa}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

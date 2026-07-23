import React, { useState } from 'react'

type Material = { name: string; heatingValue: string; costPerUnit: string; unit: string }

const defaultMaterials: Material[] = [
  { name: 'Wood (dry)', heatingValue: '7000', costPerUnit: '40', unit: 'ton' },
  { name: 'Wood (green)', heatingValue: '4900', costPerUnit: '30', unit: 'ton' },
  { name: 'Coal', heatingValue: '12200', costPerUnit: '140', unit: 'ton' },
  { name: 'Gas (natural)', heatingValue: '1028000', costPerUnit: '10.62', unit: 'mcf' },
  { name: 'Oil', heatingValue: '144000', costPerUnit: '3.85', unit: 'gallon' },
  { name: 'Electric', heatingValue: '3412', costPerUnit: '0.12', unit: 'kwh' }
]

export default function App() {
  const [materials, setMaterials] = useState<Material[]>(defaultMaterials)
  const [results, setResults] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(false)

  const update = (i: number, key: keyof Material, value: string) => {
    // Use functional update to avoid stale closure and any TDZ issues in compiled code
    setMaterials(prev => {
      const copy = prev.map(m => ({...m}))
      ;(copy[i] as any)[key] = value
      return copy
    })
  }

  // Auto-recalculate client-side when materials change, debounced
  React.useEffect(() => {
    const id = setTimeout(() => {
      setLoading(true)
      try {
        const r: Record<string, number> = {}
        materials.forEach(m => {
          const heating = Number(m.heatingValue || 0)
          const costPerUnit = Number(m.costPerUnit || 0)
          const effectiveCost = (m.unit?.toLowerCase() === 'ton') ? (costPerUnit / 2000.0) : costPerUnit
          const costPerMillion = heating > 0 ? Math.round(effectiveCost * (1_000_000.0 / heating) * 100) / 100 : 0
          r[m.name] = costPerMillion
        })
        setResults(r)
      } catch (e) {
        console.error('calc failed', e)
      } finally {
        setLoading(false)
      }
    }, 250) // shorter debounce for local calc

    return () => clearTimeout(id)
  }, [materials])

  const manualCalculate = () => {
    // run same client-side calculation synchronously
    setLoading(true)
    try {
      const r: Record<string, number> = {}
      materials.forEach(m => {
        const heating = Number(m.heatingValue || 0)
        const costPerUnit = Number(m.costPerUnit || 0)
        const effectiveCost = (m.unit?.toLowerCase() === 'ton') ? (costPerUnit / 2000.0) : costPerUnit
        const costPerMillion = heating > 0 ? Math.round(effectiveCost * (1_000_000.0 / heating) * 100) / 100 : 0
        r[m.name] = costPerMillion
      })
      setResults(r)
    } finally { setLoading(false) }
  }

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="container">
        <div className="brand-header">
          <div className="brand-mark" aria-hidden="true"></div>
          <h1 className="brand-title">WVU BioMassCalc</h1>
        </div>
        <main id="main" aria-labelledby="main-heading">
          <h2 id="main-heading" className="sr-only">Biomass cost calculator</h2>
          <table>
            <thead>
              <tr><th scope="col">Material</th><th scope="col">Heating Value</th><th scope="col">Cost per Unit ($)</th><th scope="col">Unit</th><th scope="col">$/Million BTU</th></tr>
            </thead>
            <tbody>
              {materials.map((m, i) => (
                <tr key={m.name}>
                  <td><div className="material-name">{m.name}</div></td>
                  <td>
                    <label className="sr-only" htmlFor={`heating-${i}`}>Heating value for {m.name}</label>
                    <input id={`heating-${i}`} type="number" inputMode="numeric" aria-label={`Heating value for ${m.name}`} value={m.heatingValue} onChange={e => update(i, 'heatingValue', e.target.value)} />
                  </td>
                  <td>
                    <label className="sr-only" htmlFor={`cost-${i}`}>Cost per unit for {m.name}</label>
                    <input id={`cost-${i}`} type="number" step="any" inputMode="decimal" aria-label={`Cost per unit for ${m.name}`} value={m.costPerUnit} onChange={e => update(i, 'costPerUnit', e.target.value)} />
                  </td>
                  <td>
                    <label className="sr-only" htmlFor={`unit-${i}`}>Unit for {m.name}</label>
                    <select id={`unit-${i}`} aria-label={`Unit for ${m.name}`} value={m.unit} onChange={e => update(i, 'unit', e.target.value)}>
                      <option value="ton">/Ton</option>
                      <option value="mcf">/Mcf</option>
                      <option value="gallon">/Gallon</option>
                      <option value="kwh">/KWH</option>
                    </select>
                  </td>
                  <td>
                    <div role="status" aria-live="polite" aria-atomic="true">{results[m.name] ?? '—'}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{marginTop:12}}>
            <button className="button-primary" onClick={manualCalculate} aria-disabled={loading} aria-live="polite">{loading ? 'Calculating...' : 'Calculate'}</button>
          </div>
        </main>
      </div>
    </>
  )
}

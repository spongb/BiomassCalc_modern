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
    <div className="container">
      <div className="brand-header">
        <div className="brand-mark" aria-hidden="true"></div>
        <h1 className="brand-title">WVU BioMassCalc</h1>
      </div>
      <table>
        <thead>
          <tr><th>Material</th><th>Heating Value</th><th>Cost per Unit ($)</th><th>Unit</th><th>$/Million BTU</th></tr>
        </thead>
        <tbody>
          {materials.map((m, i) => (
            <tr key={m.name}>
              <td><div className="material-name">{m.name}</div></td>
              <td><input type="number" value={m.heatingValue} onChange={e => update(i, 'heatingValue', e.target.value)} /></td>
                            <td><input type="number" step="any" value={m.costPerUnit} onChange={e => update(i, 'costPerUnit', e.target.value)} /></td>
              <td>
                <select value={m.unit} onChange={e => update(i, 'unit', e.target.value)}>
                  <option value="ton">/Ton</option>
                  <option value="mcf">/Mcf</option>
                  <option value="gallon">/Gallon</option>
                  <option value="kwh">/KWH</option>
                </select>
              </td>
              <td>{results[m.name] ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{marginTop:12}}>
        <button className="button-primary" onClick={manualCalculate}>{loading ? 'Calculating...' : 'Calculate'}</button>
      </div>
    </div>
  )
}

export async function calculate(materials: any[]) {
  const resp = await fetch('/api/calculate', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(materials)
  })
  return resp.json()
}

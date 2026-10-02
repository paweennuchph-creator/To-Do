const pad = (n) => String(n).padStart(2, '0')

// Use local date parts (not toISOString) so "today" is correct in every timezone.
export const toDateStr = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
export const todayStr = () => toDateStr(new Date())
export const addDays = (n) => {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return toDateStr(d)
}

export function formatDue(due) {
  const [y, m, d] = due.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })
}

// Returns null (no due date), 'done', 'overdue', 'today' or 'upcoming'
export function dueStatus(due, done, today) {
  if (!due) return null
  if (done) return 'done'
  if (due < today) return 'overdue'
  if (due === today) return 'today'
  return 'upcoming'
}

import { CATEGORIES, CATEGORY_KEYS } from '../constants'

export default function CategoryNav({ value, onChange, counts, total }) {
  const items = [
    { key: 'all', label: 'ทุกหมวด', count: total, color: 'var(--accent)' },
    ...CATEGORY_KEYS.map((k) => ({ key: k, label: CATEGORIES[k].label, count: counts[k] || 0, color: CATEGORIES[k].fg })),
  ]
  return (
    <nav className="card flex gap-1 overflow-x-auto p-1.5 md:flex-col md:overflow-visible" aria-label="หมวดหมู่">
      {items.map((it) => {
        const on = value === it.key
        return (
          <button
            key={it.key}
            onClick={() => onChange(it.key)}
            aria-pressed={on}
            className="flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold transition-colors"
            style={{ background: on ? 'var(--accent-soft)' : 'transparent', color: on ? 'var(--accent)' : 'var(--text)' }}
          >
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: it.color }} />
            <span className="flex-1 text-left">{it.label}</span>
            <span className="rounded-full px-2 text-xs" style={{ background: 'var(--bg)', color: 'var(--muted)' }}>
              {it.count}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

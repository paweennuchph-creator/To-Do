const R = 40
const C = 2 * Math.PI * R

export default function StatsCard({ total, done, active, overdue }) {
  const pct = total ? Math.round((done / total) * 100) : 0
  const segments = [
    { label: 'เสร็จแล้ว', value: done, color: 'var(--low)' },
    { label: 'กำลังทำ', value: active, color: 'var(--accent)' },
    { label: 'เลยกำหนด', value: overdue, color: 'var(--high)' },
  ]
  let acc = 0

  return (
    <section className="card p-4" aria-label="สถิติ">
      <h2 className="mb-3 text-sm font-semibold" style={{ color: 'var(--muted)' }}>สถิติ</h2>
      <div className="flex items-center gap-4 md:flex-col md:items-start">
        <div className="relative h-24 w-24 shrink-0">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" role="img" aria-label={`เสร็จแล้ว ${pct} เปอร์เซ็นต์`}>
            <circle cx="50" cy="50" r={R} fill="none" strokeWidth="12" style={{ stroke: 'var(--line)' }} />
            {segments.map((s) => {
              const len = total ? (s.value / total) * C : 0
              const el = len > 0 && (
                <circle
                  key={s.label}
                  className="donut-seg"
                  cx="50" cy="50" r={R} fill="none" strokeWidth="12"
                  style={{ stroke: s.color }}
                  strokeDasharray={`${len} ${C - len}`}
                  strokeDashoffset={-acc}
                />
              )
              acc += len
              return el
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-bold leading-none">{pct}%</span>
            <span className="mt-0.5 text-[10px]" style={{ color: 'var(--muted)' }}>เสร็จแล้ว</span>
          </div>
        </div>

        <div className="min-w-0 flex-1 text-sm">
          <p className="mb-2 font-semibold">ทั้งหมด {total} งาน</p>
          <ul className="m-0 list-none space-y-1 p-0">
            {segments.map((s) => (
              <li key={s.label} className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                <span className="flex-1" style={{ color: 'var(--muted)' }}>{s.label}</span>
                <span className="font-semibold">{s.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

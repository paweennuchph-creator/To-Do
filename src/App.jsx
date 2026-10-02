import { useRef, useState } from 'react'
import { CalendarDays, ClipboardList, Plus, Search, X } from 'lucide-react'
import TodoItem from './components/TodoItem'
import CategoryNav from './components/CategoryNav'
import StatsCard from './components/StatsCard'
import { CATEGORIES, CATEGORY_KEYS, FILTERS, ORDER, PRIORITIES } from './constants'
import { addDays, todayStr } from './utils'

const initialTodos = () => [
  { id: 1, text: 'ส่งรายงานประจำสัปดาห์', done: false, priority: 'high', category: 'work', due: addDays(-1) },
  { id: 2, text: 'ซื้อของเข้าบ้าน', done: false, priority: 'med', category: 'shopping', due: addDays(0) },
  { id: 3, text: 'นัดตรวจสุขภาพประจำปี', done: false, priority: 'med', category: 'health', due: addDays(3) },
  { id: 4, text: 'โทรหาคุณยาย', done: false, priority: 'low', category: 'personal', due: '' },
  { id: 5, text: 'อ่านหนังสือ 20 หน้า', done: true, priority: 'low', category: 'personal', due: addDays(-2) },
]

export default function App() {
  const [todos, setTodos] = useState(initialTodos)
  const [text, setText] = useState('')
  const [priority, setPriority] = useState('med')
  const [category, setCategory] = useState('personal')
  const [due, setDue] = useState('')
  const [filter, setFilter] = useState('all')
  const [catFilter, setCatFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [leaving, setLeaving] = useState([])
  const nextId = useRef(6)

  const today = todayStr()

  const add = () => {
    const t = text.trim()
    if (!t) return
    setTodos((ts) => [{ id: nextId.current++, text: t, done: false, priority, category, due }, ...ts])
    setText('')
    setDue('')
  }

  const remove = (ids) => {
    setLeaving((l) => [...l, ...ids])
    setTimeout(() => {
      setTodos((ts) => ts.filter((t) => !ids.includes(t.id)))
      setLeaving((l) => l.filter((i) => !ids.includes(i)))
    }, 260)
  }

  const toggle = (id) => setTodos((ts) => ts.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  const edit = (id, newText) => setTodos((ts) => ts.map((t) => (t.id === id ? { ...t, text: newText } : t)))
  const cycle = (id) =>
    setTodos((ts) =>
      ts.map((t) => (t.id === id ? { ...t, priority: ORDER[(ORDER.indexOf(t.priority) + 1) % ORDER.length] } : t)),
    )

  // Derived data
  const total = todos.length
  const doneCount = todos.filter((t) => t.done).length
  const overdueCount = todos.filter((t) => !t.done && t.due && t.due < today).length
  const activeCount = total - doneCount - overdueCount
  const remaining = total - doneCount
  const doneIds = todos.filter((t) => t.done).map((t) => t.id)
  const catCounts = CATEGORY_KEYS.reduce((acc, k) => ({ ...acc, [k]: todos.filter((t) => t.category === k).length }), {})

  const q = query.trim().toLowerCase()
  const shown = todos.filter(
    (t) =>
      (catFilter === 'all' || t.category === catFilter) &&
      (filter === 'all' ? true : filter === 'active' ? !t.done : t.done) &&
      (!q || t.text.toLowerCase().includes(q)),
  )

  const emptyMsg = q
    ? `ไม่พบงานที่ตรงกับ “${query.trim()}”`
    : filter === 'done'
      ? 'ยังไม่มีงานที่เสร็จ'
      : filter === 'active'
        ? 'ไม่มีงานค้างแล้ว เยี่ยมมาก!'
        : 'ยังไม่มีงาน เพิ่มงานแรกได้เลย'

  const chip = (on, fg, bg) => ({
    color: on ? fg : 'var(--muted)',
    background: on ? bg : 'transparent',
    border: '1px solid ' + (on ? fg : 'var(--line)'),
  })

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:py-12">
      <h1 className="mb-5 text-2xl font-bold sm:text-3xl">รายการงานของฉัน</h1>

      <div className="layout">
        <div className="a-cats">
          <CategoryNav value={catFilter} onChange={setCatFilter} counts={catCounts} total={total} />
        </div>

        <main className="a-main">
          <section className="card mb-4 p-3.5">
            <div className="flex gap-2">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && add()}
                placeholder="เพิ่มงานใหม่..."
                aria-label="ชื่องานใหม่"
                className="min-w-0 flex-1 rounded-lg px-3 py-2.5 text-base"
                style={{ background: 'var(--bg)', color: 'var(--text)', border: '1px solid var(--line)' }}
              />
              <button
                onClick={add}
                className="flex shrink-0 items-center gap-1.5 rounded-lg px-4 py-2.5 text-base font-semibold text-white"
                style={{ background: 'var(--accent)' }}
              >
                <Plus size={18} /> เพิ่ม
              </button>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2">
              <span className="text-sm" style={{ color: 'var(--muted)' }}>ความสำคัญ</span>
              {ORDER.map((k) => (
                <button key={k} onClick={() => setPriority(k)} className="rounded-full px-3 py-1 text-sm font-semibold transition-colors"
                  style={chip(priority === k, PRIORITIES[k].fg, PRIORITIES[k].bg)}>
                  {PRIORITIES[k].label}
                </button>
              ))}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-2">
              <span className="text-sm" style={{ color: 'var(--muted)' }}>หมวดหมู่</span>
              {CATEGORY_KEYS.map((k) => (
                <button key={k} onClick={() => setCategory(k)} className="rounded-full px-3 py-1 text-sm font-semibold transition-colors"
                  style={chip(category === k, CATEGORIES[k].fg, CATEGORIES[k].bg)}>
                  {CATEGORIES[k].label}
                </button>
              ))}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <label htmlFor="due" className="flex items-center gap-1 text-sm" style={{ color: 'var(--muted)' }}>
                <CalendarDays size={15} /> กำหนดส่ง
              </label>
              <input
                id="due"
                type="date"
                value={due}
                onChange={(e) => setDue(e.target.value)}
                className="rounded-lg px-2.5 py-1.5 text-sm"
                style={{ background: 'var(--bg)', color: 'var(--text)', border: '1px solid var(--line)' }}
              />
              {due && (
                <button onClick={() => setDue('')} className="text-sm" style={{ color: 'var(--muted)' }}>
                  ล้างวันที่
                </button>
              )}
            </div>
          </section>

          <div className="card relative mb-4">
            <Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted)' }} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ค้นหางาน..."
              aria-label="ค้นหางาน"
              className="w-full rounded-[14px] bg-transparent py-2.5 pl-10 pr-10 text-base"
              style={{ color: 'var(--text)' }}
            />
            {query && (
              <button onClick={() => setQuery('')} aria-label="ล้างคำค้นหา"
                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg"
                style={{ color: 'var(--muted)' }}>
                <X size={16} />
              </button>
            )}
          </div>

          <nav className="card mb-4 flex gap-1 p-1.5" role="tablist">
            {FILTERS.map(([k, label]) => (
              <button
                key={k}
                role="tab"
                aria-selected={filter === k}
                onClick={() => setFilter(k)}
                className="flex-1 rounded-lg px-2 py-2 text-sm font-semibold transition-colors"
                style={{
                  background: filter === k ? 'var(--accent-soft)' : 'transparent',
                  color: filter === k ? 'var(--accent)' : 'var(--muted)',
                }}
              >
                {label}
              </button>
            ))}
          </nav>

          {shown.length === 0 ? (
            <div className="card flex flex-col items-center gap-2 px-4 py-10 text-center" style={{ color: 'var(--muted)' }}>
              <ClipboardList size={32} />
              <p>{emptyMsg}</p>
            </div>
          ) : (
            <ul className="m-0 list-none p-0">
              {shown.map((t) => (
                <TodoItem
                  key={t.id}
                  todo={t}
                  today={today}
                  leaving={leaving.includes(t.id)}
                  onToggle={toggle}
                  onDelete={(id) => remove([id])}
                  onEdit={edit}
                  onCycle={cycle}
                />
              ))}
            </ul>
          )}

          <footer className="mt-4 flex items-center justify-between text-sm" style={{ color: 'var(--muted)' }}>
            <span>เหลืออีก {remaining} งาน</span>
            <button
              onClick={() => remove(doneIds)}
              disabled={doneIds.length === 0}
              className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 font-semibold transition-opacity"
              style={{ color: 'var(--high)', opacity: doneIds.length ? 1 : 0.35, cursor: doneIds.length ? 'pointer' : 'default' }}
            >
              <X size={15} /> ล้างงานที่เสร็จแล้ว{doneIds.length ? ' (' + doneIds.length + ')' : ''}
            </button>
          </footer>
          <p className="mt-6 text-center text-xs" style={{ color: 'var(--muted)' }}>
            ดับเบิลคลิกที่ข้อความเพื่อแก้ไข · แตะป้ายความสำคัญเพื่อเปลี่ยน
          </p>
        </main>

        <div className="a-stats">
          <StatsCard total={total} done={doneCount} active={activeCount} overdue={overdueCount} />
        </div>
      </div>
    </div>
  )
}

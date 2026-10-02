import { useRef, useState } from 'react'
import { ClipboardList, Plus, X } from 'lucide-react'
import TodoItem from './components/TodoItem'
import { FILTERS, ORDER, PRIORITIES } from './constants'

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'ส่งรายงานประจำสัปดาห์', done: false, priority: 'high' },
    { id: 2, text: 'ซื้อของเข้าบ้าน', done: false, priority: 'med' },
    { id: 3, text: 'อ่านหนังสือ 20 หน้า', done: true, priority: 'low' },
  ])
  const [text, setText] = useState('')
  const [priority, setPriority] = useState('med')
  const [filter, setFilter] = useState('all')
  const [leaving, setLeaving] = useState([])
  const nextId = useRef(4)

  const add = () => {
    const t = text.trim()
    if (!t) return
    setTodos((ts) => [{ id: nextId.current++, text: t, done: false, priority }, ...ts])
    setText('')
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

  const remaining = todos.filter((t) => !t.done).length
  const doneIds = todos.filter((t) => t.done).map((t) => t.id)
  const shown = todos.filter((t) => (filter === 'all' ? true : filter === 'active' ? !t.done : t.done))
  const emptyMsg =
    filter === 'done'
      ? 'ยังไม่มีงานที่เสร็จ'
      : filter === 'active'
        ? 'ไม่มีงานค้างแล้ว เยี่ยมมาก!'
        : 'ยังไม่มีงาน เพิ่มงานแรกได้เลย'

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-8 sm:py-12">
      <h1 className="mb-5 text-2xl font-bold sm:text-3xl">รายการงานของฉัน</h1>

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
        <div className="mt-3 flex items-center gap-2">
          <span className="text-sm" style={{ color: 'var(--muted)' }}>ความสำคัญ</span>
          {ORDER.map((k) => {
            const c = PRIORITIES[k]
            const on = priority === k
            return (
              <button
                key={k}
                onClick={() => setPriority(k)}
                className="rounded-full px-3 py-1 text-sm font-semibold transition-colors"
                style={{
                  color: on ? c.fg : 'var(--muted)',
                  background: on ? c.bg : 'transparent',
                  border: '1px solid ' + (on ? c.fg : 'var(--line)'),
                }}
              >
                {c.label}
              </button>
            )
          })}
        </div>
      </section>

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
  )
}

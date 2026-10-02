import { useEffect, useRef, useState } from 'react'
import { Check, Trash2 } from 'lucide-react'
import Badge from './Badge'

export default function TodoItem({ todo, leaving, onToggle, onDelete, onEdit, onCycle }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(todo.text)
  const inputRef = useRef(null)

  useEffect(() => {
    if (editing && inputRef.current) inputRef.current.select()
  }, [editing])

  const save = () => {
    const t = draft.trim()
    if (t && t !== todo.text) onEdit(todo.id, t)
    else setDraft(todo.text)
    setEditing(false)
  }

  return (
    <li className={'row entering mb-2.5 ' + (leaving ? 'leaving' : '')}>
      <div>
        <div className="card flex items-center gap-3 px-3.5 py-3" style={{ minHeight: 56 }}>
          <button
            onClick={() => onToggle(todo.id)}
            aria-label="ทำเครื่องหมายว่าเสร็จแล้ว"
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors"
            style={{
              borderColor: todo.done ? 'var(--accent)' : 'var(--line)',
              background: todo.done ? 'var(--accent)' : 'transparent',
            }}
          >
            {todo.done && <Check size={15} color="#fff" strokeWidth={3} />}
          </button>

          {editing ? (
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={save}
              onKeyDown={(e) => {
                if (e.key === 'Enter') save()
                if (e.key === 'Escape') {
                  setDraft(todo.text)
                  setEditing(false)
                }
              }}
              className="min-w-0 flex-1 rounded-md px-2 py-1 text-base"
              style={{ background: 'var(--bg)', color: 'var(--text)', border: '1px solid var(--accent)' }}
            />
          ) : (
            <span
              onDoubleClick={() => {
                setDraft(todo.text)
                setEditing(true)
              }}
              title="ดับเบิลคลิกเพื่อแก้ไข"
              className="min-w-0 flex-1 cursor-text break-words text-base leading-snug"
              style={{
                color: todo.done ? 'var(--muted)' : 'var(--text)',
                textDecoration: todo.done ? 'line-through' : 'none',
              }}
            >
              {todo.text}
            </span>
          )}

          <Badge priority={todo.priority} onClick={() => onCycle(todo.id)} />
          <button
            onClick={() => onDelete(todo.id)}
            aria-label="ลบงาน"
            className="icon-btn flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </li>
  )
}

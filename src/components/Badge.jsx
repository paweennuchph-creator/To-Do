import { PRIORITIES } from '../constants'

export default function Badge({ priority, onClick }) {
  const c = PRIORITIES[priority]
  const Tag = onClick ? 'button' : 'span'
  return (
    <Tag
      onClick={onClick}
      title={onClick ? 'แตะเพื่อเปลี่ยนความสำคัญ' : undefined}
      className="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold"
      style={{ color: c.fg, background: c.bg }}
    >
      {c.label}
    </Tag>
  )
}

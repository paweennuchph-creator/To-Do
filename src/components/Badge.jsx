export default function Badge({ label, fg, bg, onClick, title, children }) {
  const Tag = onClick ? 'button' : 'span'
  return (
    <Tag
      onClick={onClick}
      title={title}
      className="inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold"
      style={{ color: fg, background: bg }}
    >
      {children}
      {label}
    </Tag>
  )
}

export const PRIORITIES = {
  low:  { label: 'ต่ำ',     fg: 'var(--low)',  bg: 'var(--low-bg)' },
  med:  { label: 'ปานกลาง', fg: 'var(--med)',  bg: 'var(--med-bg)' },
  high: { label: 'สูง',     fg: 'var(--high)', bg: 'var(--high-bg)' },
}

export const ORDER = ['low', 'med', 'high']

export const FILTERS = [
  ['all', 'ทั้งหมด'],
  ['active', 'ยังไม่เสร็จ'],
  ['done', 'เสร็จแล้ว'],
]

export const PRIORITIES = {
  low:  { label: 'ต่ำ',     fg: 'var(--low)',  bg: 'var(--low-bg)' },
  med:  { label: 'ปานกลาง', fg: 'var(--med)',  bg: 'var(--med-bg)' },
  high: { label: 'สูง',     fg: 'var(--high)', bg: 'var(--high-bg)' },
}

export const ORDER = ['low', 'med', 'high']

export const CATEGORIES = {
  work:     { label: 'งาน',       fg: 'var(--c-work)',     bg: 'var(--c-work-bg)' },
  personal: { label: 'ส่วนตัว',   fg: 'var(--c-personal)', bg: 'var(--c-personal-bg)' },
  shopping: { label: 'ช้อปปิ้ง',  fg: 'var(--c-shopping)', bg: 'var(--c-shopping-bg)' },
  health:   { label: 'สุขภาพ',    fg: 'var(--c-health)',   bg: 'var(--c-health-bg)' },
}

export const CATEGORY_KEYS = Object.keys(CATEGORIES)

export const FILTERS = [
  ['all', 'ทั้งหมด'],
  ['active', 'ยังไม่เสร็จ'],
  ['done', 'เสร็จแล้ว'],
]

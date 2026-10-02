# รายการงานของฉัน (Thai Todo)

React + Vite + Tailwind CSS v4 + lucide-react. ข้อมูลเก็บใน React state เท่านั้น (ไม่มี localStorage)

## เริ่มใช้งาน

```bash
npm install
npm run dev      # เปิดโหมดพัฒนา
npm run build    # สร้างไฟล์สำหรับ production ในโฟลเดอร์ dist
npm run preview  # ดูผลลัพธ์ของ build
```

## โครงสร้าง

- `src/App.jsx` – state และตรรกะหลัก
- `src/components/TodoItem.jsx` – รายการงาน (แก้ไขแบบ inline, ลบพร้อมแอนิเมชัน)
- `src/components/Badge.jsx` – ป้ายความสำคัญ
- `src/constants.js` – ระดับความสำคัญและตัวกรอง
- `src/index.css` – ตัวแปรสี (รองรับโหมดมืด) และสไตล์แอนิเมชัน

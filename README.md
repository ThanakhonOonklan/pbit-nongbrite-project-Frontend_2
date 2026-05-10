## 🚀 Technologies Used (เทคโนโลยีที่ใช้)


- **Framework:** Next.js 16 (App Router)
- **Core Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Radix UI
- **Animations & Physics:** GSAP, Framer Motion, Canvas Confetti, Matter.js (2D Physics Engine)
- **Drag & Drop:** `@dnd-kit/core`
- **State Management:** Zustand
- **Internationalization:** `next-intl`
- **HTTP Client:** Axios

## 🎮 Key Features (ฟีเจอร์หลัก)

- **ระบบบัญชีผู้ใช้ (Authentication):** เข้าสู่ระบบ, ลงทะเบียน, และลืมรหัสผ่าน
- **ระบบบทเรียน (Courses & Levels):** เส้นทางการเรียนรู้ที่ถูกจัดเตรียมไว้ตามระดับความยาก
- **มินิเกมเสริมทักษะ (Educational Minigames):**
  - **Sequencing:** เกมเรียงลำดับ
  - **Conditional Matching:** เกมจับคู่ตามเงื่อนไข
  - **Fruit Matching Grid:** เกมจับคู่ผลไม้ในตาราง
  - **Grid-based Coloring:** เกมระบายสีตามช่อง
  - **Path Navigation:** เกมหาเส้นทาง
  - **Counting & Classification:** เกมจัดหมวดหมู่และนับจำนวน
  - **Step Counting (Juice Blender):** เกมคั้นน้ำผลไม้ตามขั้นตอน
- **กระดานจัดอันดับ (Leaderboard/Rank):** ระบบแข่งขันทำคะแนน
- **ระบบโปรไฟล์และหัวใจ (Profile & Lives System):** จัดการข้อมูลส่วนตัวและระบบหัวใจสำหรับการเล่นเกม

## 📂 Project Structure (โครงสร้างโปรเจกต์)

- `src/app/` - จัดการ Routing ทั้งหมดของแอปพลิเคชัน (Auth, Games, Courses, Profile ฯลฯ)
- `src/components/` - UI Components ที่ใช้ซ้ำได้ และ Components เฉพาะของแต่ละเกม
- `src/constants/` - ค่าคงที่ต่างๆ เช่น ข้อมูลและโจทย์ของแต่ละด่าน (Level Config)
- `src/services/` - จัดการการเชื่อมต่อ API (Auth, Game, User, Chapter, Rank)
- `src/store/` - ระบบ State Management ด้วย Zustand (เช่น การจัดการ User และจำนวนหัวใจ)
- `src/utils/` - ฟังก์ชันช่วยเหลือต่างๆ เช่น การคำนวณคะแนนเกม (Game Scoring)
- `src/i18n/` - ระบบรองรับหลายภาษา

## 🛠️ Getting Started (การติดตั้งและเริ่มต้นใช้งาน)

### Prerequisites
- Node.js (แนะนำเวอร์ชัน 18 ขึ้นไป)
- npm หรือ yarn หรือ pnpm

### Installation

1. Clone โปรเจกต์ลงมาที่เครื่อง
```bash
git clone <repository-url>
cd pbit-nongbrite-project-Frontend_2
```

2. ติดตั้ง Dependencies
```bash
npm install
```

3. ตั้งค่า Environment Variables
สร้างไฟล์ `.env` ที่ root directory และกำหนดค่าต่างๆ ตามที่ระบบต้องการ

4. รันเซิร์ฟเวอร์โหมด Development
```bash
npm run dev
```
เปิดเบราว์เซอร์และเข้าไปที่ [http://localhost:3000](http://localhost:3000)

## 📦 Build for Production (การบิลด์สำหรับใช้งานจริง)

สร้าง Production Build ด้วยคำสั่ง:
```bash
npm run build
```

จากนั้นรันแอปพลิเคชัน:
```bash
npm start
```

## 🔍 Scripts
- `npm run dev` - รันเซิร์ฟเวอร์โหมดพัฒนา
- `npm run build` - สร้างแอปพลิเคชันสำหรับ Production
- `npm run start` - รันเซิร์ฟเวอร์จาก Production Build
- `npm run lint` - ตรวจสอบคุณภาพโค้ดด้วย ESLint

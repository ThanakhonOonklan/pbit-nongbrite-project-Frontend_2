# P'Bit & Nong-Brite — Gamified Learning Platform (Frontend)

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-5.0-brown?style=for-the-badge)](https://zustand-demo.pmnd.rs/)

> แพลตฟอร์มการเรียนรู้เชิงโต้ตอบผ่านเกม (Interactive Gamified Learning Platform) สำหรับเด็กและผู้เริ่มต้น เพื่อเสริมสร้างทักษะการคิดเชิงคำนวณ (Computational Thinking), ตรรกะ (Logic), และการแก้ปัญหาอย่างเป็นระบบ ร่วมผจญภัยไปกับเหล่ามาสคอตคู่หู **P'Bit**, **Nong Brite** และผองเพื่อน

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Learning Games](#learning-games)
- [Platform Systems](#platform-systems)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Integration](#api-integration)
- [Mascot Characters](#mascot-characters)

---

## Overview

**P'Bit & Nong-Brite** คือเว็บแอปพลิเคชัน Frontend ที่พัฒนาด้วย Next.js 16 (App Router), React 19 และ TypeScript เพื่อให้การเรียนรู้พื้นฐานวิทยาการคำนวณเป็นเรื่องง่ายและสนุกสนานสำหรับเด็กๆ โดยนำแนวคิด **Gamification** มาผสมผสานอย่างลงตัว เช่น ระบบหัวใจ (Lives), วันเล่นต่อเนื่อง (Streak), ระบบคะแนนและสะสมดาว (Stars), ตลอดจนระบบจัดอันดับผู้เล่น (Leaderboard & Ranks)

นอกจากนี้ ยังมาพร้อมงานภาพกราฟิกสดใสและเหล่าตัวละครมาสคอตน่ารัก เช่น P'Bit, Nong Brite, P'Minnie, P'Coco, P'Momo, P'Bobo และ P'PingPing ที่จะคอยให้คำแนะนำ ให้กำลังใจ และนำทางผู้เรียนในแต่ละบทเรียน

---

## Key Features

| ฟีเจอร์ | รายละเอียด |
|---|---|
| **7 Logic & Algorithm Games** | มินิเกมการเรียนรู้ 7 เกม ครอบคลุมพื้นฐานการคิดเชิงขั้นตอน, การจัดหมวดหมู่, เงื่อนไข, การวนซ้ำ, และพิกัด |
| **Interactive Tutorial** | ระบบสอนวิธีเล่นแบบ Step-by-Step พร้อมระบบหน่วงเวลาให้อ่านคำแนะนำก่อนเริ่มเล่น |
| **Life / Hearts System** | ระบบหัวใจ 5 ดวง เมื่อตอบผิดหัวใจจะลด และฟื้นฟูอัตโนมัติตามช่วงเวลา (Timer auto-refill) |
| **Streak Tracking** | บันทึกสถิติวันที่เข้าเรียนรู้ติดต่อกัน ช่วยสร้างวินัยในการเรียนรู้ |
| **Score, Stars & Confetti** | ประเมินผลคะแนนตามระดับความยาก เวลาที่ใช้ และจำนวนครั้งที่ลองผิดลองถูก พร้อมเอฟเฟกต์ฉลองเมื่อชนะ |
| **7-Tier Rank System** | ระบบแรงค์ 7 ขั้น ตั้งแต่มือใหม่ (Newbie) จนถึงระดับตำนาน (Legend) พร้อมตารางจัดอันดับ (Leaderboard) |
| **Bilingual Support (i18n)** | รองรับ 2 ภาษาเต็มรูปแบบ ทั้งภาษาไทย 🇹🇭 และภาษาอังกฤษ 🇬🇧 ด้วย `next-intl` |
| **Sound & BGM System** | ระบบเสียงเพลงประกอบฉากหลังและ Sound Effects ขณะเล่นเกม เปิด/ปิดได้ตามต้องการ |
| **Physics Playground** | สนามเด็กเล่นมาสคอตแบบโต้ตอบบนหน้า Landing Page ใช้ 2D Physics Engine (`Matter.js`) |
| **Authentication & Profile** | ระบบสมัครสมาชิก 2 ขั้นตอน, เข้าสู่ระบบ, ลืมรหัสผ่าน, แก้ไขข้อมูลโปรไฟล์, และบันทึก Progress ด่าน |

---

## Learning Games

ทุกเกมถูกออกแบบมาเพื่อพัฒนาทักษะเฉพาะด้าน พร้อมมีระดับความยากและตัวละครมาสคอตประจำเกม:

```
                  ┌───────────────────────────────────────────────────┐
                  │           7 Learning Games Breakdown              │
                  ├──────────────────────┬────────────────────────────┤
                  │ 1. Path Navigation   │ การคิดเชิงลำดับ / วางแผนคำสั่ง │
                  │ 2. Counting & Class  │ การนับ / การจัดหมวดหมู่รูปทรง │
                  │ 3. Conditional Match │ ตรรกะเงื่อนไข (IF-THEN)     │
                  │ 4. Sequencing        │ อัลกอริทึม / ลำดับขั้นตอน      │
                  │ 5. Step Counting     │ การทำงานแบบวนซ้ำ (Loop)     │
                  │ 6. Fruit Grid        │ ระบบพิกัดตาราง / การสังเกต  │
                  │ 7. Grid Coloring     │ พิกัดสี / ความจำระยะสั้น    │
                  └──────────────────────┴────────────────────────────┘
```

### 1. Path Navigation
- **Route**: `/games/path-navigation/[level]`
- **มาสคอต**: **P'Bit** & **Nong Brite**
- **ทักษะที่ฝึก**: การวางแผนอัลกอริทึม, ลำดับคำสั่ง (Sequence), การคิดเชิงระบบ
- **วิธีเล่น**: ผู้เล่นต้องวางแผนและเรียงการ์ดคำสั่งทิศทาง (เดินหน้า, ถอยหลัง, เลี้ยวซ้าย, เลี้ยวขวา) ล่วงหน้า เพื่อพาน้องบิตฝ่าอุปสรรคไปรับน้องไบรท์และพากลับบ้านได้อย่างปลอดภัย

### 2. Counting & Classification
- **Route**: `/games/counting-classification/[level]`
- **มาสคอต**: **P'Minnie**
- **ทักษะที่ฝึก**: การสังเกต, การจำแนกหมวดหมู่, คณิตศาสตร์และการนับ
- **วิธีเล่น**: สำรวจและค้นหารูปทรงเรขาคณิตต่างๆ (วงกลม, สามเหลี่ยม, สี่เหลี่ยม, ห้าเหลี่ยม, หกเหลี่ยม) ที่ซ่อนอยู่ตามเงื่อนไขในภาพ แล้วระบุจำนวนที่นับได้ลงในช่องคำตอบ

### 3. Conditional Matching
- **Route**: `/games/conditional-matching/[level]`
- **มาสคอต**: **P'Coco**
- **ทักษะที่ฝึก**: ตรรกศาสตร์แบบมีเงื่อนไข (Conditional Logic / IF-THEN)
- **วิธีเล่น**: วิเคราะห์การ์ดเงื่อนไข "ถ้า... (IF)" แล้วลากเส้นเชื่อมโยงไปยังผลลัพธ์ที่ถูกต้อง "แล้ว... (THEN)" เพื่อฝึกกระบวนการตัดสินใจเชิงตรรกะ

### 4. Sequencing
- **Route**: `/games/sequencing/[level]`
- **มาสคอต**: **P'Momo**
- **ทักษะที่ฝึก**: ลำดับขั้นตอนการทำงาน (Algorithmic Thinking), เหตุและผล
- **วิธีเล่น**: ใช้การ Drag & Drop การ์ดเหตุการณ์หรือขั้นตอนต่างๆ (เช่น วงจรชีวิตผีเสื้อ, การทำกิจกรรมประจำวัน) จัดเรียงลงในช่องตามลำดับก่อน-หลังที่ถูกต้อง

### 5. Step Counting
- **Route**: `/games/step-counting/[level]`
- **มาสคอต**: **P'Bobo**
- **ทักษะที่ฝึก**: การทำงานแบบวนซ้ำ (Looping), การคำนวณอัตราส่วน, การจัดการทรัพยากร
- **วิธีเล่น**: คำนวณจำนวนผลไม้ตามสูตรของร้านน้ำปั่น เพื่อผลิตน้ำผลไม้ให้ได้ตามจำนวนแก้วที่เพื่อนๆ ต้องการ แล้วสั่งเครื่องปั่นทำงานแบบวนรอบ

### 6. Fruit Matching Grid
- **Route**: `/games/fruit-matching-grid/[level]`
- **มาสคอต**: **P'PingPing**
- **ทักษะที่ฝึก**: การอ่านพิกัดสองมิติ (Grid Coordinates), ความจำ, รูปแบบ (Pattern)
- **วิธีเล่น**: สังเกตตำแหน่งของผลไม้ในตารางตามพิกัดแถวและคอลัมน์ (เช่น A1, B2) แล้วตอบให้ถูกต้องว่าพิกัดที่ระบุคือผลไม้ชนิดใด

### 7. Grid-based Coloring
- **Route**: `/games/grid-based-coloring/[level]`
- **มาสคอต**: **Nong Brite**
- **ทักษะที่ฝึก**: การจับคู่พิกัดพิกเซล, ความจำระยะสั้น (Visual Memory), สมาธิและความแม่นยำ
- **วิธีเล่น**: จดจำรูปแบบและสีในภาพต้นฉบับ จากนั้นเลือกสีและเครื่องมือ (พู่กัน, เทสี, ยางลบ) มาระบายลงบนตารางเปล่าให้ตรงกับภาพต้นฉบับ โดยมีโควตาสำหรับกดแอบดู (Peek) ได้จำกัดครั้ง

---

## Platform Systems

### Life & Heart System
- มีหัวใจเริ่มต้น 5 ดวง (`lifeMax = 5`)
- เมื่อตอบผิด ระบบจะเรียก `reduceLife()` เพื่อหักหัวใจ 1 ดวง พร้อมแสดงแอนิเมชันสั่นเตือน
- หัวใจจะฟื้นฟูอัตโนมัติตามเวลา `lastResetAt`
- ควบคุมการเข้าถึงด่านผ่าน `GameAccessGuard` (หากหัวใจหมดจะไม่สามารถเริ่มเล่นด่านใหม่ได้)

### Streak System
- บันทึกการเข้าเรียนและทำกิจกรรมอย่างต่อเนื่องรายวัน
- แสดงผลในแถบ Resource Bars บนหน้าหลักบทเรียน และบนหน้าโปรไฟล์ส่วนตัว

### Rank & Leaderboard System
แบ่งระดับผู้เล่นออกเป็น 7 ระดับ ตามคะแนนสะสม:
1. **มือใหม่ (Newbie)**: 0 - 499 คะแนน
2. **จูเนียร์ (Junior)**: 500 - 1,499 คะแนน
3. **สมาร์ท (Smart)**: 1,500 - 2,499 คะแนน
4. **ฮีโร่ (Hero)**: 2,500 - 3,499 คะแนน
5. **ซูเปอร์ (Super)**: 3,500 - 4,499 คะแนน
6. **มาสเตอร์ (Master)**: 4,500 - 6,299 คะแนน
7. **เลเจนด์ (Legend)**: 6,300 คะแนนขึ้นไป

พร้อมหน้ารวม **Leaderboard** แสดง Top 3 ผู้เล่นที่มีคะแนนสูงสุด และอันดับทั้งหมดในระบบ

### Internationalization (i18n)
- ขับเคลื่อนด้วย `next-intl`
- ไฟล์ข้อความแปลอยู่ที่ `messages/th.json` (ภาษาไทย) และ `messages/en.json` (ภาษาอังกฤษ)
- สลับภาษาได้ทันทีผ่านหน้าต่างการตั้งค่า (Settings)

---

## Tech Stack

### Core Technologies
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack ready)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/) + PostCSS + `tailwindcss-animate`

### State Management & Networking
- **State Store**: [Zustand 5](https://zustand-demo.pmnd.rs/) พร้อม `persist` middleware สำหรับจัดเก็บ session
- **HTTP Client**: [Axios](https://axios-http.com/) พร้อม Response Interceptors สำหรับดักจับ token หมดอายุและ Auto-logout
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

### Interactive, Physics & Animation
- **Physics Engine**: `matter-js` + `poly-decomp` สำหรับ Interactive Mascot Playground
- **Animation**: `motion` (Framer Motion 12), `gsap`
- **Smooth Scroll**: `lenis`
- **Drag and Drop**: `@dnd-kit/core`, `@dnd-kit/utilities`
- **Special Effects**: `canvas-confetti`
- **UI Components**: `@radix-ui/react-dialog`, `@radix-ui/react-tooltip`, `@radix-ui/react-separator`, `lucide-react`, `react-icons`

### Localization & Typography
- **i18n**: `next-intl`
- **Font**: LINE Seed Sans TH (Local Font)

---

## Project Structure

```
pbit-nongbrite-project-Frontend_2/
├── messages/                       # ไฟล์ข้อความรองรับหลายภาษา (i18n)
│   ├── en.json                     # ภาษาอังกฤษ
│   └── th.json                     # ภาษาไทย
├── public/                         # Static Assets
│   ├── audio/                      # ไฟล์เสียง BGM และ Sound Effects
│   ├── icons/                      # ไอคอนระบบและไอคอน Rank
│   └── images/                     # ภาพกราฟิกตัวละครมาสคอตและภาพด่าน
├── src/
│   ├── actions/                    # Server Actions
│   ├── app/                        # Next.js App Router (หน้าจอระบบ)
│   │   ├── page.tsx                # Landing Page
│   │   ├── layout.tsx              # Root Layout (Font, Provider, i18n, Audio)
│   │   ├── login/                  # หน้าเข้าสู่ระบบ
│   │   ├── register/               # หน้าสมัครสมาชิก (Step 1 & Step 2)
│   │   ├── forget-password/        # หน้ารีเซ็ตรหัสผ่าน (4 ขั้นตอน)
│   │   ├── courses/                # หน้ารายการคอร์สและเลือกเกม
│   │   ├── games/                  # ไดเรกทอรีเกมทั้ง 7
│   │   │   ├── path-navigation/[level]/
│   │   │   ├── counting-classification/[level]/
│   │   │   ├── conditional-matching/[level]/
│   │   │   ├── sequencing/[level]/
│   │   │   ├── step-counting/[level]/
│   │   │   ├── fruit-matching-grid/[level]/
│   │   │   └── grid-based-coloring/[level]/
│   │   ├── profile/                # หน้าโปรไฟล์ผู้ใช้และสถิติ
│   │   ├── rank/                   # หน้าตารางจัดอันดับ (Leaderboard)
│   │   └── settings/               # หน้าตั้งค่าภาษาและเสียง
│   ├── components/                 # React UI Components
│   │   ├── auth/                   # ฟอร์ม Login, Register, Auth Guards
│   │   ├── common/                 # StarRating, Loading, Music Player
│   │   ├── courses/                # GameCard, Stepper, ResourceBars
│   │   ├── games/                  # คอมโพเนนต์เฉพาะสำหรับเกมทั้ง 7 และ Tutorials
│   │   ├── landing/                # Hero, Features, Mascot Playground, Stats
│   │   ├── layout/                 # Navbar และ Sidebar
│   │   ├── profile/                # ProfileHeader, ProgressList, EditForm
│   │   ├── rank/                   # TopThreeCards, LeaderboardList
│   │   └── ui/                     # Primitives (Button, Modal, Tooltip)
│   ├── constants/                  # ข้อมูล Config เกม, ด่าน, Ranks
│   ├── contexts/                   # React Contexts
│   ├── fonts/                      # ไฟล์ฟอนต์ LINE Seed Sans TH
│   ├── hooks/                      # Custom React Hooks
│   ├── i18n/                       # การตั้งค่า next-intl
│   ├── lib/                        # apiClient, Utilities และ Config
│   ├── services/                   # API Service Modules
│   │   ├── auth.service.ts         # Login, Register, Password Reset
│   │   ├── user.service.ts         # Profile, Lives, Streak
│   │   ├── chapter.service.ts      # ข้อมูล Chapters และ Levels
│   │   ├── game.service.ts         # บันทึกคะแนนหลังจบเกม (submitScore)
│   │   └── rank.service.ts         # ข้อมูล Leaderboard
│   ├── store/                      # Zustand Store (auth, user, chapter, rank, settings)
│   ├── types/                      # TypeScript Interface และ Type Definitions
│   └── utils/                      # ฟังก์ชันคำนวณคะแนนและ Helper
├── next.config.ts                  # การตั้งค่า Next.js
├── tailwind.config.ts              # การตั้งค่า Tailwind CSS
├── tsconfig.json                   # การตั้งค่า TypeScript
└── package.json                    # รายการ Dependencies และ Scripts
```

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) เวอร์ชั่น **18.18+** หรือ **20+**
- แพ็กเกจเมเนเจอร์: **npm**, **yarn**, หรือ **pnpm**

### Installation Steps

1. **โคลนคลังโค้ด (Clone Repository):**
   ```bash
   git clone https://github.com/ThanakhonOonklan/pbit-nongbrite-project-Frontend_2.git
   cd pbit-nongbrite-project-Frontend_2
   ```

2. **ติดตั้ง Dependencies:**
   ```bash
   npm install
   ```

3. **สร้างไฟล์ตั้งค่าตัวแปรสภาพแวดล้อม (Environment Variables):**
   สร้างไฟล์ `.env.local` ในโฟลเดอร์ root ของโปรเจ็ค:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
   ```

4. **รัน Development Server:**
   ```bash
   npm run dev
   ```
   เปิดเบราว์เซอร์ไปที่ [http://localhost:3000](http://localhost:3000)

5. **คำสั่งอื่นๆ:**
   ```bash
   # ตรวจสอบโค้ดด้วย ESLint
   npm run lint

   # บิลด์สำหรับ Production
   npm run build

   # รันเซิร์ฟเวอร์ Production
   npm run start
   ```

---

## Environment Variables

| ตัวแปร | คำอธิบาย | ตัวอย่างค่า |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | URL ของ Backend API Endpoint | `http://localhost:5000/api` หรือ `https://api.yourdomain.com` |

---

## API Integration

แอปพลิเคชันเชื่อมต่อไปยัง Backend RESTful API ผ่าน Axios Client (`src/lib/api-client.ts`) โดยมี Endpoints หลักดังนี้:

### 1. Authentication (/auth)
- `POST /auth/login` — เข้าสู่ระบบ
- `POST /auth/logout` — ออกจากระบบและล้างเซสชัน
- `POST /auth/register/step1` — สมัครสมาชิกขั้นที่ 1 (Username, Email, Password)
- `POST /auth/register/step2` — สมัครสมาชิกขั้นที่ 2 (ชื่อที่แสดง, อายุ, เพศ)
- `POST /auth/forgot-password` — ขอรหัส PIN สำหรับรีเซ็ตรหัสผ่านทางอีเมล
- `POST /auth/reset-password` — ตั้งรหัสผ่านใหม่ด้วยอีเมลและรหัส PIN

### 2. User Profile & Status (/user, /users)
- `GET /user/profile` — ดึงข้อมูลโปรไฟล์ผู้เล่น
- `PUT /user/profile` — อัปเดตข้อมูลโปรไฟล์ (ชื่อ, อายุ, เพศ, ไอคอนมาสคอต)
- `GET /users/lives` — ดึงสถานะหัวใจปัจจุบันและเวลา Reset
- `PUT /users/lives` — หักจำนวนหัวใจเมื่อตอบผิด
- `PUT /users/streak/update` — อัปเดตจำนวนวันเล่นติดต่อกัน (Streak)

### 3. Chapters & Levels (/chapters)
- `GET /chapters` — ดึงข้อมูลบทเรียน, ด่านทั้งหมด, จำนวนดาวที่ได้, และสถานะการปลดล็อก

### 4. Game & Leaderboard (/game)
- `POST /game/submit` — ส่งผลการเล่นด่าน (คะแนน, จำนวนดาว, เวลาที่ใช้)
- `GET /game/ranking` — ดึงข้อมูลอันดับ Leaderboard ของผู้เล่นทั้งหมด

---

## Mascot Characters

- **P'Bit (พี่บิต)**: มาสคอตหุ่นยนต์ใจดี ผู้นำทางในการผจญภัย
- **Nong Brite (น้องไบรท์)**: เพื่อนคู่หูตัวจิ๋วที่เปี่ยมไปด้วยความฉลาดสดใส
- **P'Minnie (พี่มินนี่)**: ผู้เชี่ยวชาญการสังเกตและจัดหมวดหมู่รูปทรง
- **P'Coco (พี่โคโค่)**: ตัวตึงด้านการคิดวิเคราะห์เชิงเงื่อนไข
- **P'Momo (พี่โมโม่)**: ผู้รักความถูกต้องและการจัดลำดับขั้นตอน
- **P'Bobo (พี่โบโบ้)**: เจ้าของร้านน้ำผลไม้ปั่น ผู้เชี่ยวชาญการทำงานแบบวนซ้ำ
- **P'PingPing (พี่ผิงผิง)**: ผู้เชี่ยวชาญการสำรวจพิกัดและตารางสองมิติ

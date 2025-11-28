🚀 AnyComp Assessment – Full Stack MERN Project

(Next.js 14 + Tailwind v4 + Prisma + PostgreSQL + Express + Locofy UI)

This project is a complete full-stack implementation of the Specialists Management System.
It includes:

✨ Pixel-perfect UI (Figma → Locofy → Next.js)

🧩 Component-based frontend architecture

🔐 Express backend with Prisma ORM

🗄 PostgreSQL database with full schema

📤 Image upload using Multer (saved in /uploads)

📄 Specialist CRUD + Draft/Publish

🖼 Media upload per specialist

📄 Service offerings + platform fee + final price

📤 Export to Excel

🔍 Filters + search + pagination

📁 Project Structure
anycomp-assessment/
│
├── client/          # Next.js 14 (App Router)
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── store/
│   └── public/
│
└── server/          # Express backend
    ├── src/
    │   ├── controllers/
    │   ├── routes/
    │   ├── config/
    │   ├── middleware/
    │   ├── uploads/
    │   └── server.ts
    └── prisma/

🛠 Requirements

Before running the project, install:

Node.js v18+

PNPM (required)

PostgreSQL v14+

Prisma CLI

pnpm add -g prisma

🗄 1. DATABASE SETUP (PostgreSQL)
Create database
CREATE DATABASE anycomp;

Create a .env inside /server:
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/anycomp?schema=public"
PORT=5000
UPLOAD_DIR=uploads

🧱 2. INSTALL BACKEND (Express + Prisma)

Go to server folder:

cd server
pnpm install

Run Prisma migration
pnpm prisma migrate dev --name init

Generate Prisma client
pnpm prisma generate

📤 3. IMAGE UPLOAD FOLDER

Create folder inside server:

server/uploads/


Make sure Node can write to it.

▶️ 4. RUN BACKEND
pnpm dev


If successful:

Server running on port 5000


API Base URL:

http://localhost:5000/api

💻 5. INSTALL FRONTEND (Next.js 14 + Tailwind v4)

Go to client folder:

cd client
pnpm install

You must create .env.local:
NEXT_PUBLIC_API_URL=http://localhost:5000/api

Tailwind v4 is already configured

These files exist:

client/tailwind.config.ts
client/app/globals.css

▶️ 6. RUN FRONTEND
pnpm dev


Runs on:

http://localhost:3000

🔌 7. API ENDPOINTS SUMMARY
Specialists
Method	Endpoint	Description
GET	/api/specialists	List specialists (filters/pagination)
GET	/api/specialists/:id	Get one specialist
POST	/api/specialists	Create specialist
PUT	/api/specialists/:id	Update specialist
PATCH	/api/specialists/:id/publish	Publish
DELETE	/api/specialists/:id	Soft delete
Media (Images)
Method	Endpoint	Description
GET	/api/specialists/:id/media	Get specialist images
POST	/api/specialists/:id/media	Upload images (Multer)
DELETE	/api/media/:id	Soft delete image

Upload uses:

multipart/form-data
files[]  
display_orders[]

🧮 8. PRISMA MODELS USED
specialists

Includes:

additional_offerings

company_secretary

media[]

service_offerings[]

media

Stores file info + display order.

service_offerings

Used for Figma section “Additional Offerings”.

📤 9. EXPORT TO EXCEL

This feature uses:
/api/specialists/export

Returns an Excel file containing all specialist data.

🧩 10. FRONTEND FEATURES
Included:

Dashboard layout (sidebar + topbar)

Create specialist

Edit specialist

Image upload preview

Media fetch on edit mode

Search, filter, pagination

Excel export button

Delete modal

Draft vs Published tabs

Platform fee auto-calculation

🧰 11. FRONTEND FOLDERS
client/components/
│
├── layout/
│   └── DashboardLayout.tsx
│
├── specialists/
│   ├── SpecialistForm.tsx
│   ├── SpecialistImages.tsx
│   ├── SpecialistsFilters.tsx
│   ├── SpecialistsTable.tsx
│   └── SpecialistsExport.tsx

🔧 12. COMMON ISSUES & FIXES
❗ Tailwind 4 error

Install:

pnpm add -D @tailwindcss/postcss


Ensure postcss.config.mjs:

export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

🎯 13. HOW TO CREATE A NEW SPECIALIST

Go to:

http://localhost:3000/specialists/create


Fill:

Title

Description

Additional Offerings

Company Secretary

Fee

Upload 3 images

Click "Save Draft" or "Publish"

Data saved to:

specialists table

images saved to /uploads

metadata stored in media table

🎉 14. PROJECT COMPLETED FEATURES

✔ Full Backend CRUD
✔ PostgreSQL + Prisma schema complete
✔ Media upload & preview
✔ Service offerings fields added
✔ Pixel-perfect UI from Figma
✔ Dashboard + Sidebar + Layout
✔ Fully working Edit + Delete
✔ Integration ready for deployment
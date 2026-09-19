# 📊 Digital Marketing & Business Dashboard

[![Live Demo](https://img.shields.io/badge/Live_Demo-Render_Deployment-00C7B7?style=for-the-badge&logo=render&logoColor=white)](https://digi-marketing-dashboard.onrender.com)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

An executive real-time business and affiliate marketing analytics dashboard built with **React**, **TypeScript**, **Tailwind CSS**, and **Node.js Express**. Features dynamic revenue tracking, auto-categorized product sales breakdown, investor portfolio management, and role-based security access control.

---

## 🌐 Live Website Link

👉 **[https://digi-marketing-dashboard.onrender.com](https://digi-marketing-dashboard.onrender.com)**  
*(Replace this link with your active Render.com deployment URL after completing the 2-minute setup below)*.

---

## ✨ Key Features

- ⚡ **Real-Time Data Calculation**: Sales, products, and investor additions update monthly revenue graphs, category shares, total revenue, and key insights instantly without page refreshes.
- 🏷️ **Smart Product Auto-Categorization**: Intelligent keyword detection automatically categorizes added products (e.g. *Kurti* $\rightarrow$ **Fashion**, *Watch* $\rightarrow$ **Electronics & Accessories**). Zero-revenue categories are automatically suppressed.
- 📊 **Dynamic Revenue Analytics**: Daily $\rightarrow$ Monthly $\rightarrow$ Yearly breakdown flow with dynamic chart scaling and future year filter selection (2026–2031).
- 💼 **Investor Portfolio Management**: Add, update, and track Indian and NRI investor contributions with total funding summary.
- 🔐 **Role-Based Access Control (RBAC)**:
  - **Admin Manager**: Full edit/delete capabilities with password protection (`admin123`).
  - **Investor Partner**: Read-only access for presentation views.

---

## 🛠️ Run Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- `npm` or `bun`

### Setup Instructions
1. **Clone Repository**:
   ```bash
   git clone https://github.com/MaithiliSawant11/Digi-Marketing-Website.git
   cd Digi-Marketing-Website
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open **http://localhost:3000** in your browser.

4. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🚀 Deploying to Render.com (Free Web Service)

1. Sign in to **[Render.com](https://render.com)** using your GitHub account.
2. Click **New +** $\rightarrow$ **Web Service**.
3. Connect repository **`MaithiliSawant11/Digi-Marketing-Website`**.
4. Configure settings:
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `node dist/server.cjs`
   - **Instance Type**: `Free`
5. Click **Create Web Service**. Render will build and host your website with free SSL (HTTPS).

---

## 📄 License
Licensed under the [Apache 2.0 License](LICENSE).

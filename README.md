# TurboDL — Landing Page

موقع تعريفي لبوت TurboDL على تيليجرام، مبني بـ **React 18** و **Tailwind CSS 4** و **Vite**.

## التشغيل محلياً

```bash
npm install
npm run dev
```

## البناء والنشر

```bash
npm run build
```

الملفات الجاهزة تطلع بمجلد `dist/`. للنشر على GitHub Pages ارفع المشروع لمستودع، وفعّل Pages من
**Settings ← Pages ← GitHub Actions** (الملف `.github/workflows/deploy.yml` جاهز).

## الهيكل

```
src/
  App.jsx     الصفحة كاملة: الهيدر، العرض الحي للمحادثة، المميزات، الأدوات، الباقات، الأسئلة
  main.jsx    نقطة الدخول
  index.css   متغيرات الألوان والخطوط + Tailwind
public/
  logo.png
```

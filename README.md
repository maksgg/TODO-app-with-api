# 📝 Task Manager


[![Vue](https://img.shields.io/badge/vue-3.x-4fc08d.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007acc.svg?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

**Muza** — це сучасний та інтуїтивно зрозумілий таск-менеджер, розроблений для ефективного управління щоденними справами та робочими процесами.

🔗 **Відвідати додаток:** [https://maksgg.github.io/TODO-app-with-api/](https://maksgg.github.io/TODO-app-with-api/)

---

## 🚀 Огляд проекту

Цей застосунок демонструє можливості сучасної фронтенд-розробки з використанням **Vue 3 Composition API**. Основна увага приділена чистоті коду, типизації та UX/UI дизайну.

### ✨ Ключовий функціонал
- **🔐 Авторизація:** Повноцінна система входу з обробкою токенів.
- **📊 Дашборд:** Аналітика та огляд поточного стану завдань.
- **📂 Списки та завдання:** Створення багаторівневих списків справ (CRUD операції).
- **🛡️ Система прав:** Навігаційні гварди (Guards) та контроль доступу на основі пермішенів.
- **🌐 Локалізація:** Повна підтримка української та англійської мов (i18n).
- **🎨 Кастомний UI:** Набір власних багаторазових компонентів (VButton, VInput, VContainer тощо).

---

## 🛠 Технологічний стек

- **Core:** Vue 3 (Composition API)
- **Language:** TypeScript
- **State Management:** Pinia
- **Routing:** Vue Router
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **API Client:** Axios
- **Internationalization:** Vue I18n

---

## 📁 Структура проекту

```text
src/
├── app/          # Роутер, стилі, провайдери
├── pages/        # Сторінки (Auth, Dashboard, List etс.)
├── widgets/      # Великі блоки (Sidebar, Header)
├── features/     # Логіка дій (Task, Auth, Analytics etс.)
└── shared/       # Базові компоненти (VButton, VInput etc.)

# 🏗️ Архітектура проєкту

## 📋 Зміст

- [Огляд архітектури](#огляд-архітектури)
- [Структура проєкту](#структура-проєкту)
- [Шари архітектури](#шари-архітектури)
- [Правила імпортів](#правила-імпортів)
- [Порівняння з FSD](#порівняння-з-fsd)
- [Масштабування](#масштабування)
- [Best Practices](#best-practices)
- [Приклади використання](#приклади-використання)

---

## 🎯 Огляд архітектури

Цей проєкт використовує **Component-based / Feature-based архітектуру**, яка є стандартом у 70-80% українських та західних компаній (Grammarly, GitLab, Atlassian, Shopify).

### Чому саме ця архітектура?

✅ **Простота входу** — нові розробники розуміють структуру за 1-2 дні  
✅ **Гнучкість** — легко адаптується під будь-який розмір проєкту  
✅ **Повторне використання** — чіткий поділ shared/features/pages  
✅ **Швидкість розробки** — менше бюрократії, ніж у FSD  
✅ **Індустріальний стандарт** — легко знайти розробників, знайомих з підходом

---

## 📁 Структура проєкту

```
src/
├── app/                          # 🚀 Application Layer (Initialization)
│   ├── App.vue                   # Root component
│   ├── main.ts                   # Entry point
│   ├── main.scss                 # Global styles
│   └── router/                   # Vue Router configuration
│       └── index.ts
│
├── pages/                        # 📄 Pages Layer (Routes)
│   ├── Home/
│   │   ├── index.vue             # Main page component
│   │   └── components/           # Page-specific components (optional)
│   │       └── HeroSection.vue
│   ├── About/
│   │   └── index.vue
│   ├── Components/
│   │   └── index.vue
│   ├── Modals/
│   │   └── index.vue
│   ├── Icons/
│   │   └── index.vue
│   └── NotFound/
│       └── index.vue
│
├── features/                     # 🎨 Features Layer (Business Logic)
│   ├── theme/
│   │   ├── index.ts              # Public API
│   │   ├── components/
│   │   │   └── ThemeToggle.vue
│   │   ├── composables/
│   │   │   └── useTheme.ts       # Pinia store
│   │   └── utils/
│   │       └── createThemes.ts
│   │
│   └── modal/
│       ├── index.ts              # Public API
│       └── composables/
│           └── useModalStore.ts  # Pinia store
│
├── widgets/                      # 🧩 Widgets Layer (Complex UI Blocks)
│   └── (reserved for Header, Sidebar, Footer, etc.)
│
└── shared/                       # 🔧 Shared Layer (Reusable Code)
    ├── ui/                       # UI Kit components
    │   ├── ThemeToggle.vue
    │   └── common/
    │       ├── VButton.vue
    │       ├── VCard.vue
    │       ├── VCheckbox.vue
    │       ├── VIcon.vue
    │       ├── VInput.vue
    │       ├── VLoader.vue
    │       ├── VModal.vue
    │       ├── VSearch.vue
    │       └── VSwitch.vue
    │
    ├── composables/              # Reusable Vue composables
    │   ├── index.ts
    │   └── useModal.ts
    │
    ├── utils/                    # Pure utility functions
    │   ├── index.ts
    │   └── componentsList.ts
    │
    ├── api/                      # API client & services
    │   ├── index.ts
    │   └── client.ts             # Axios instance
    │
    ├── config/                   # App configuration
    │   └── icons.ts
    │
    ├── types/                    # TypeScript types
    │   ├── index.ts
    │   ├── icons.d.ts
    │   ├── vite-env.d.ts
    │   └── components/
    │       └── card.ts
    │
    └── assets/                   # Static assets & styles
        └── styles/
            ├── customComponents.scss
            └── components/
                ├── vcard.scss
                └── vcheckbox.scss
```

---

## 🏛️ Шари архітектури

### 1️⃣ **app/** — Application Layer

**Призначення:** Ініціалізація застосунку, глобальні провайдери, роутинг.

**Містить:**
- Точку входу (`main.ts`)
- Кореневий компонент (`App.vue`)
- Конфігурацію роутера
- Глобальні стилі

**Правило:** НЕ містить бізнес-логіку, тільки ініціалізацію.

---

### 2️⃣ **pages/** — Pages Layer

**Призначення:** Сторінки-роути застосунку.

**Структура:**
```
pages/
└── PageName/
    ├── index.vue              # Головний файл сторінки
    ├── components/            # Компоненти тільки для цієї сторінки
    │   └── LocalComponent.vue
    └── hooks/                 # (опціонально) Хуки тільки для сторінки
        └── usePageLogic.ts
```

**Правила:**
- Кожна сторінка — окрема папка з `index.vue`
- Компоненти в `components/` використовуються ТІЛЬКИ на цій сторінці
- Якщо компонент потрібен у 2+ сторінках → переносимо в `shared/ui/`
- Можна імпортувати з: `features/`, `widgets/`, `shared/`

---

### 3️⃣ **features/** — Features Layer

**Призначення:** Бізнес-фічі застосунку (аутентифікація, теми, сповіщення).

**Структура:**
```
features/
└── featureName/
    ├── index.ts               # Public API (обов'язково!)
    ├── components/            # UI компоненти фічі
    ├── composables/           # Pinia stores, composables
    ├── utils/                 # Утиліти фічі
    └── api/                   # (опціонально) API запити фічі
```

**Приклади фіч:**
- `auth/` — авторизація, логін, реєстрація
- `theme/` — управління темою (dark/light)
- `modal/` — управління модальними вікнами
- `notifications/` — сповіщення користувачу
- `cart/` — кошик товарів (для e-commerce)

**Правила:**
- **Обов'язково** експортуємо через `index.ts` (Public API)
- Можна імпортувати тільки з `shared/`
- НЕ може імпортувати інші `features/` (уникаємо циклічних залежностей)

**Приклад Public API:**
```typescript
// features/theme/index.ts
export { default as ThemeToggle } from './components/ThemeToggle.vue';
export { useThemeStore } from './composables/useTheme';
export { createThemes } from './utils/createThemes';
```

---

### 4️⃣ **widgets/** — Widgets Layer

**Призначення:** Складні самодостатні UI-блоки, які використовують кілька фіч.

**Приклади:**
- `Header/` — шапка сайту (використовує `theme`, `auth`, `notifications`)
- `Sidebar/` — бокове меню
- `Footer/` — підвал сайту
- `UserProfile/` — профіль користувача

**Відмінність від features:**
- Widget — це UI-блок, який **комбінує** кілька features
- Feature — це ізольована бізнес-логіка

**Правила:**
- Може імпортувати з `features/`, `shared/`
- Не може імпортувати інші `widgets/`

---

### 5️⃣ **shared/** — Shared Layer

**Призначення:** Код для повторного використання без бізнес-логіки.

#### `shared/ui/` — UI Kit
Бібліотека візуальних компонентів (кнопки, інпути, картки).

**Правила:**
- Компоненти мають бути **generic** (універсальні)
- Отримують дані через props
- НЕ містять бізнес-логіку
- НЕ роблять API запити

#### `shared/composables/` — Composables
Vue composables, які можна використовувати повторно.

**Приклади:**
- `useModal.ts` — робота з модалками
- `useDebounce.ts` — debounce для інпутів
- `useLocalStorage.ts` — робота з localStorage

#### `shared/utils/` — Utilities
Чисті функції без залежностей від Vue.

**Приклади:**
- `formatDate.ts`
- `validateEmail.ts`
- `calculateDiscount.ts`

#### `shared/api/` — API Client
Налаштування axios, базові API методи.

#### `shared/types/` — TypeScript Types
Загальні типи та інтерфейси.

---

## 🔗 Правила імпортів

### Матриця залежностей

| Шар         | Може імпортувати                     |
|-------------|--------------------------------------|
| `app/`      | `pages/`, `features/`, `widgets/`, `shared/` |
| `pages/`    | `features/`, `widgets/`, `shared/`   |
| `widgets/`  | `features/`, `shared/`               |
| `features/` | `shared/`                            |
| `shared/`   | нічого (ізольований)                 |

### ✅ Правильні імпорти

```typescript
// ✅ pages імпортує features
import { ThemeToggle } from '@/features/theme';

// ✅ features імпортує shared
import { VButton } from '@/shared/ui/common/VButton.vue';

// ✅ features використовує Public API
import { useThemeStore } from '@/features/theme';
```

### ❌ Неправильні імпорти

```typescript
// ❌ shared не може імпортувати features
import { useAuth } from '@/features/auth'; // У shared/

// ❌ features не імпортує інші features напряму
import { useTheme } from '@/features/theme'; // У features/auth

// ❌ Обхід Public API
import ThemeToggle from '@/features/theme/components/ThemeToggle.vue';
// Правильно: import { ThemeToggle } from '@/features/theme';
```

---

## 🆚 Порівняння з FSD (Feature-Sliced Design)

| Критерій                  | Component-based | FSD                          |
|---------------------------|-----------------|------------------------------|
| **Складність**            | Низька          | Висока                       |
| **Onboarding**            | 1-2 дні         | 1-2 тижні                    |
| **Кількість шарів**       | 5               | 7+ (app/pages/widgets/features/entities/shared/processes) |
| **Гнучкість**             | Висока          | Середня (суворі правила)     |
| **Best for**              | Більшість проєктів | Enterprise (100+ розробників) |
| **Документація**          | Проста          | Потребує детальної           |
| **Підходить для стартапів**| ✅             | ❌ (overkill)                |

### Коли використовувати FSD?

- Команда 50+ розробників
- Проєкт живе 5+ років
- Критична архітектурна суворість
- Є виділений архітектор

### Коли використовувати Component-based?

- Команда до 30 розробників
- Потрібна швидкість розробки
- MVP або стартап
- 90% сучасних проєктів ✅

---

## 📈 Масштабування

### Додавання нової фічі

**Приклад:** Додаємо фічу "Авторизація"

1. Створюємо структуру:
```bash
mkdir -p src/features/auth/{components,composables,api,utils}
```

2. Створюємо файли:
```
features/auth/
├── index.ts                    # Public API
├── components/
│   ├── LoginForm.vue
│   └── RegisterForm.vue
├── composables/
│   └── useAuth.ts              # Pinia store
├── api/
│   └── authApi.ts              # API методи
└── utils/
    └── validatePassword.ts
```

3. Експортуємо через Public API:
```typescript
// features/auth/index.ts
export { default as LoginForm } from './components/LoginForm.vue';
export { default as RegisterForm } from './components/RegisterForm.vue';
export { useAuthStore } from './composables/useAuth';
export * from './api/authApi';
```

4. Використовуємо на сторінках:
```vue
<script setup>
import { LoginForm, useAuthStore } from '@/features/auth';

const authStore = useAuthStore();
</script>
```

---

### Додавання нового віджета

**Приклад:** Шапка сайту з темою та авторизацією

```
widgets/Header/
├── index.vue                   # Головний компонент
└── components/                 # Внутрішні компоненти
    ├── Logo.vue
    └── Navigation.vue
```

```vue
<!-- widgets/Header/index.vue -->
<script setup>
import { ThemeToggle } from '@/features/theme';
import { useAuthStore } from '@/features/auth';
import Logo from './components/Logo.vue';
import Navigation from './components/Navigation.vue';

const authStore = useAuthStore();
</script>

<template>
  <header>
    <Logo />
    <Navigation />
    <ThemeToggle />
    <div v-if="authStore.isAuthenticated">
      {{ authStore.user.name }}
    </div>
  </header>
</template>
```

---

### Додавання нової сторінки

```bash
mkdir src/pages/Dashboard
touch src/pages/Dashboard/index.vue
```

```vue
<!-- pages/Dashboard/index.vue -->
<script setup>
import { useAuthStore } from '@/features/auth';
import { VCard, VButton } from '@/shared/ui/common';

const authStore = useAuthStore();
</script>

<template>
  <div class="dashboard">
    <h1>Welcome, {{ authStore.user.name }}!</h1>
    <VCard title="Statistics">
      <p>Your dashboard content here</p>
    </VCard>
  </div>
</template>
```

Оновлюємо роутер:
```typescript
// app/router/index.ts
{
  path: '/dashboard',
  name: 'Dashboard',
  component: () => import('@/pages/Dashboard/index.vue'),
  meta: { requiresAuth: true }
}
```

---

## 🎯 Best Practices

### 1. Public API для features

**Завжди** експортуємо через `index.ts`:

```typescript
// features/auth/index.ts
export { LoginForm, RegisterForm } from './components';
export { useAuthStore } from './composables/useAuth';
export { login, logout, register } from './api/authApi';
```

### 2. Іменування компонентів

```
✅ VButton.vue      — Shared UI компонент (префікс V)
✅ ThemeToggle.vue  — Feature компонент (без префікса)
✅ LoginForm.vue    — Feature компонент
✅ Header.vue       — Widget (без префікса)
```

### 3. Composables vs Utils

```typescript
// ✅ Composable (використовує Vue API)
export function useDebounce(value: Ref<string>, delay: number) {
  const debouncedValue = ref(value.value);
  // uses watchEffect, onUnmounted, etc.
  return debouncedValue;
}

// ✅ Util (чиста функція)
export function formatDate(date: Date): string {
  return date.toLocaleDateString('uk-UA');
}
```

### 4. Pinia Stores у features

```typescript
// features/auth/composables/useAuth.ts
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const isAuthenticated = computed(() => !!user.value);
  
  async function login(credentials) {
    // API call
  }
  
  return { user, isAuthenticated, login };
});
```

### 5. TypeScript типи

```typescript
// shared/types/user.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

// features/auth/composables/useAuth.ts
import type { User } from '@/shared/types/user';

const user = ref<User | null>(null);
```

---

## 📚 Приклади використання

### Приклад 1: Створення форми з валідацією

```vue
<!-- pages/Contact/index.vue -->
<script setup>
import { ref } from 'vue';
import { VInput, VButton, VCard } from '@/shared/ui/common';
import { validateEmail } from '@/shared/utils/validators';

const email = ref('');
const message = ref('');
const errors = ref({});

const handleSubmit = () => {
  errors.value = {};
  
  if (!validateEmail(email.value)) {
    errors.value.email = 'Invalid email';
  }
  
  if (message.value.length < 10) {
    errors.value.message = 'Message too short';
  }
  
  if (Object.keys(errors.value).length === 0) {
    // Submit form
  }
};
</script>

<template>
  <VCard title="Contact Us">
    <form @submit.prevent="handleSubmit">
      <VInput 
        v-model="email" 
        label="Email" 
        :error="errors.email"
      />
      <VInput 
        v-model="message" 
        type="textarea" 
        label="Message"
        :error="errors.message"
      />
      <VButton type="submit">Send</VButton>
    </form>
  </VCard>
</template>
```

### Приклад 2: Feature з API інтеграцією

```typescript
// features/products/api/productsApi.ts
import apiClient from '@/shared/api/client';

export async function getProducts() {
  const { data } = await apiClient.get('/products');
  return data;
}

export async function getProductById(id: string) {
  const { data } = await apiClient.get(`/products/${id}`);
  return data;
}
```

```typescript
// features/products/composables/useProducts.ts
import { defineStore } from 'pinia';
import { getProducts } from '../api/productsApi';

export const useProductsStore = defineStore('products', () => {
  const products = ref([]);
  const loading = ref(false);
  
  async function fetchProducts() {
    loading.value = true;
    try {
      products.value = await getProducts();
    } finally {
      loading.value = false;
    }
  }
  
  return { products, loading, fetchProducts };
});
```

```typescript
// features/products/index.ts
export { useProductsStore } from './composables/useProducts';
export * from './api/productsApi';
```

---

## 🚀 Migration Checklist

- [x] Створена структура `features/`
- [x] Створена структура `widgets/`
- [x] Перейменована `shared/libs/` → `shared/composables/` та `shared/utils/`
- [x] Переміщений `app/providers/axios.ts` → `shared/api/client.ts`
- [x] Перенесена тема в `features/theme/`
- [x] Перенесені модалки в `features/modal/`
- [x] Реорганізовані сторінки в папкову структуру
- [x] Оновлені всі імпорти
- [x] Створені Public API (`index.ts`) для features
- [x] Перевірена збірка проєкту
- [x] Створена документація

---

## 📖 Додаткові ресурси

- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Pinia Store Best Practices](https://pinia.vuejs.org/core-concepts/)
- [Component Design Patterns](https://www.patterns.dev/posts/vue-patterns)

---

## 🤝 Для команди

### Code Review Guidelines

1. ✅ Перевіряємо правильність шару (shared/features/pages)
2. ✅ Перевіряємо правила імпортів
3. ✅ Перевіряємо наявність Public API для features
4. ✅ Перевіряємо TypeScript типи
5. ✅ Перевіряємо повторне використання компонентів

### Коли створювати новий feature?

Створюйте feature якщо:
- Це бізнес-логіка (auth, payments, cart)
- Код буде використовуватися в кількох місцях
- Є state management (Pinia store)

НЕ створюйте feature якщо:
- Це просто UI компонент → `shared/ui/`
- Використовується тільки на одній сторінці → `pages/PageName/components/`

---

**Версія архітектури:** 1.0  
**Дата оновлення:** Жовтень 2025  
**Контакт:** Ваша команда розробки

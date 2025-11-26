<script setup lang="ts">
// All imports and variables removed as they were unused
</script>

<template>
  <main class="min-h-screen bg-white text-slate-900">
    <!-- Hero -->
    <section class="border-b">
      <div
        class="mx-auto max-w-7xl px-6 py-10"
      >
        <p
          class="mb-4 inline-block rounded-full border px-3
        py-1 text-xs font-medium tracking-wide text-slate-600"
        >
          Vue 3 · TypeScript · Pinia · Tailwind · ESLint · pnpm
        </p>
        <h1 class="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Vue Mentorship
        </h1>
        <p
          class="mt-4 max-w-2xl text-base leading-relaxed
        text-slate-600 md:text-lg"
        >
          Starter для менторства: єдині стандарти стилю та
          роботи з репозиторієм перед переходом до індивідуального To-Do.
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <a
            href="#conventions"
            class="inline-flex items-center justify-center rounded-xl border
            border-slate-300 px-4 py-2 text-sm font-medium
            transition hover:bg-slate-50
            focus:outline-none focus:ring-2 focus:ring-slate-400"
            aria-label="Перейти до конвенцій проєкту"
          >
            Почати
          </a>
          <a
            href="https://github.com/MortyQ/Mentorshipt"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center rounded-xl
            px-4 py-2 text-sm font-medium text-slate-600 underline-offset-4
             hover:underline focus:outline-none focus:ring-2
             focus:ring-slate-400"
            aria-label="Відкрити репозиторій у GitHub"
          >
            Репозиторій
          </a>
        </div>
      </div>
    </section>

    <!-- Quick Start Cards -->
    <section class="mx-auto max-w-7xl px-6 py-14 md:py-16">
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article class="rounded-2xl border p-5 transition hover:shadow-md">
          <div class="mb-3 text-2xl">
            🧩
          </div>
          <h3 class="mb-2 text-lg font-semibold">
            Стек
          </h3>
          <p class="text-sm leading-relaxed text-slate-600">
            Vue 3, TypeScript, Vite, Pinia, Tailwind, ESLint, pnpm.
          </p>
        </article>

        <article class="rounded-2xl border p-5 transition hover:shadow-md">
          <div class="mb-3 text-2xl">
            ⚙️
          </div>
          <h3 class="mb-2 text-lg font-semibold">
            Скрипти
          </h3>
          <ul class="text-sm leading-relaxed text-slate-600">
            <li>
              <code class="rounded bg-slate-100 px-1">
                pnpm dev</code> — локальний запуск
            </li>
            <li>
              <code class="rounded bg-slate-100 px-1">
                pnpm build</code> — білд
            </li>
            <li>
              <code class="rounded bg-slate-100 px-1">
                pnpm lint</code> — ESLint
            </li>
          </ul>
        </article>

        <article class="rounded-2xl border p-5 transition hover:shadow-md">
          <div class="mb-3 text-2xl">
            🌿
          </div>
          <h3 class="mb-2 text-lg font-semibold">
            Гілки
          </h3>
          <ul class="text-sm leading-relaxed text-slate-600">
            <li>
              <code class="rounded bg-slate-100 px-1">
                main</code> — стабільна
            </li>
            <li>
              <code class="rounded bg-slate-100 px-1">
                dev</code> — робоча
            </li>
            <li>
              <code class="rounded bg-slate-100 px-1">
                feature/&lt;nickname&gt;/&lt;topic&gt;</code>
            </li>
          </ul>
        </article>

        <article class="rounded-2xl border p-5 transition hover:shadow-md">
          <div class="mb-3 text-2xl">
            🔀
          </div>
          <h3 class="mb-2 text-lg font-semibold">
            PR-процес
          </h3>
          <p class="text-sm leading-relaxed text-slate-600">
            fork → feature → PR у <code class="rounded bg-slate-100 px-1">
              dev</code> → peer-review → mentor review.
          </p>
        </article>
      </div>
    </section>

    <!-- Conventions -->
    <section
      id="conventions"
      class="border-t bg-slate-50"
    >
      <div class="mx-auto max-w-7xl px-6 py-14 md:py-16">
        <h2 class="text-2xl font-semibold">
          Конвенції / Стандарти
        </h2>
        <ul
          class="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed
        text-slate-700"
        >
          <li>Маленькі та сфокусовані PR (до ~300–400 рядків змін).</li>
          <li>
            Іменування гілок:
            <code class="rounded bg-slate-100 px-1">
              feature/&lt;nickname&gt;/&lt;topic&gt;</code>.
          </li>
          <li>
            ESLint обов’язковий:
            <code class="rounded bg-slate-100 px-1">pnpm lint</code> перед PR.
          </li>
          <li>Peer-review перед mentor review (використовуємо чекліст).</li>
          <li>
            Жодних «випадкових»
            <code class="rounded bg-slate-100 px-1">console.log</code> у PR.
          </li>
        </ul>

        <div class="mt-6">
          <a
            href="https://github.com/MortyQ/Mentorshipt"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-xl border
            border-slate-300 px-4 py-2 text-sm font-medium
            text-slate-700 transition hover:bg-white focus:outline-none
            focus:ring-2 focus:ring-slate-400"
            aria-label="Перейти до репозиторію з правилами та шаблонами"
          >
            Відкрити репозиторій
            <svg
              class="h-4 w-4"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z"
              />
              <path
                fill="currentColor"
                d="M5 5h5V3H3v7h2V5z"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t">
      <div class="mx-auto max-w-7xl px-6 py-8 text-xs text-slate-500">
        © {{ new Date().getFullYear() }} Vue Mentorship. Усі права захищені.
      </div>
    </footer>
  </main>
</template>

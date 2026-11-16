This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Реестр сертифицированных судебных экспертов

Внизу `/certification` выводится лист «Реестр» из Google Sheets. Источник по умолчанию уже настроен в `src/app/(site)/certification/registry.ts`:

https://docs.google.com/spreadsheets/d/1YGG4FsmHO4W7L9PTDeGvJYiML1Jp7gOArdzgDQV3lG4/edit?gid=0

Редактируйте строки под заголовками. Обязательные заголовки: **Дата оформления**, **Номер сертификата**, **ФИО**, **Дата выдачи**, **Срок действия**, **Направление**, **Статус**. Порядок колонок в источнике можно менять: сайт сопоставляет их по названию и показывает в установленном порядке. Дополнительные колонки на сайте не выводятся, но вся общедоступная таблица остаётся доступной для скачивания — не храните в ней закрытые данные.

- Даты отображаются как в таблице; используйте формат `ДД.ММ.ГГГГ`. «Срок действия» — дата окончания.
- Для номера сертификата используйте текстовый формат, чтобы сохранить ведущие нули.
- Статус отображается как записан: сайт не рассчитывает его по сроку действия.
- Полностью пустые строки пропускаются, отсутствующие значения показываются как «—».
- Доступ к чтению должен оставаться анонимным; права на редактирование нужны только владельцу и ответственным сотрудникам. Аккаунт, токены и API-ключи для сайта не нужны.

CSV читается на сервере Next.js. Разобранные данные кешируются на 300 секунд, затем обновляются при обращениях к странице; первый запрос после истечения кеша может ещё получить предыдущую версию, пока идёт обновление. Google также может задерживать обновление выгрузки. Уже открытая страница сама не опрашивает источник: обновите её в браузере. Пересборка сайта после редактирования строк не требуется.

Для замены источника можно задать серверную переменную окружения `EXPERT_REGISTRY_CSV_URL` (прямая ссылка на CSV) и перезапустить приложение. Без неё используется указанная таблица. Не используйте временный URL перенаправления с `googleusercontent.com`.

Если источник пуст, отображаются заголовки и сообщение об отсутствии записей. При недоступности источника и отсутствии кеша ошибка показывается только внутри реестра; остальная страница остаётся доступной. Последний успешный кеш может продолжать отображаться при ошибке фонового обновления.

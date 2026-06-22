# My Portfolio

Статическое портфолио без backend-части. Главная страница и страницы проектов открываются как обычные HTML-файлы и не требуют FastAPI, Uvicorn или Python-зависимостей.

## Что изменено

- Главная страница перенесена в корень: `index.html`
- Общие стили вынесены в `css/style.css`
- Логика переключения языка вынесена в `js/main.js`
- Изображения перенесены в `images/`
- Ссылки на проекты переведены на относительные пути

## Структура проекта

```text
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
│   ├── 1.JPG
│   ├── project1_preview.png
│   ├── project2_preview.png
│   ├── project3_preview.png
│   ├── project4_preview.png
│   ├── project5_preview.png
│   ├── project6_preview.png
│   └── contacts/
│       ├── gm.png
│       ├── in.png
│       ├── lin.png
│       ├── tg.png
│       └── wat.png
└── my_projects/
	├── project_1/
	│   └── pr_1.html
	├── project_2/
	│   └── pr_2.html
	├── project_3/
	│   └── pr_3.html
	├── project_4/
	│   └── pr_4.html
	├── project_5/
	│   └── pr_5.html
	└── project_6/
		└── pr_6.html
```

## Запуск

Ничего устанавливать не нужно.

Открыть сайт можно так:

```bash
open index.html
```

Если нужен локальный сервер, можно использовать любой статический сервер, но для структуры проекта это не обязательно.

## Технологии

- HTML5
- CSS3
- Vanilla JavaScript
- localStorage для сохранения выбранного языка

## Язык интерфейса

- На главной странице переключение RU/EN работает через `js/main.js`
- Выбранный язык сохраняется в `localStorage`
- Ссылки на проекты автоматически получают параметр `?lang=...`

## Примечание

`requirements.txt` оставлен в репозитории только как маркер того, что Python-зависимости больше не нужны.

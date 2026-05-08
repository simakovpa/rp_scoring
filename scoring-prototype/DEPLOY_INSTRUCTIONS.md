# Инструкция по публикации на GitHub Pages

## Настройка проекта выполнена ✅

Проект настроен для автоматической публикации на GitHub Pages после каждого коммита в основную ветку.

## Что было сделано:

1. **Создан файл `vite.config.js`** - с настройкой `base: './'` для корректной работы на GitHub Pages
2. **Обновлен `package.json`** - добавлено поле `homepage`
3. **Создан workflow `.github/workflows/deploy.yml`** - конфигурация GitHub Actions для автодеплоя
4. **Добавлены исходные файлы** - `src/main.jsx` и `src/App.jsx` с прототипом модуля приоритизации

## Дальнейшие шаги:

### 1. Обновите поле homepage в package.json
Замените `YOUR_USERNAME` на ваш логин GitHub:
```json
"homepage": "https://ВАШ_ЛОГИН.github.io/scoring-prototype/"
```

### 2. Закоммитьте и отправьте изменения в репозиторий:
```bash
cd /workspace/scoring-prototype
git add .
git commit -m "Add GitHub Pages deployment workflow"
git push origin main
```
(или `master`, если используете эту ветку)

### 3. Настройте GitHub Pages в настройках репозитория:
1. Перейдите в репозиторий на GitHub
2. Откройте **Settings** → **Pages**
3. В разделе **Build and deployment**:
   - **Source**: выберите `GitHub Actions`
4. Сохраните настройки

### 4. После пуша:
- GitHub Actions автоматически запустит сборку и деплой
- Статус можно проверить во вкладке **Actions** вашего репозитория
- После успешного деплоя проект будет доступен по адресу:
  `https://ВАШ_ЛОГИН.github.io/scoring-prototype/`

## Ручной запуск деплоя:
Вкладка **Actions** → выберите workflow "Deploy to GitHub Pages" → **Run workflow**

## Структура проекта:
```
scoring-prototype/
├── .github/workflows/deploy.yml  # Workflow для автодеплоя
├── src/
│   ├── main.jsx                  # Точка входа React
│   └── App.jsx                   # Основной компонент с прототипом
├── index.html                    # HTML шаблон
├── package.json                  # Зависимости и скрипты
├── vite.config.js                # Конфигурация Vite
└── dist/                         # Результат сборки (генерируется автоматически)
```

## Примечание:
Если у вас уже есть несколько GitHub Pages, этот проект будет доступен как отдельный сайт в подпапке репозитория.

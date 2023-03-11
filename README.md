# Организация e2e тестирования магазина demoblaze.com с помощью Playwright
Проект создан в рамках обучения на курсе Javascript QA от Otus.

# Описание проекта
Автоматизированы основные проверки тестового сайта demoblaze.com. 
При проектировании тестов был использован паттерн Page Object Model (POM).

# Запуск тестов

Для запуска тестов необходимо добавить .env файл по примеру:
```
BASE_URL = 'https://demourl.com'
TEST_LOGIN = 'userName'
TEST_PASSWORD = 'userPassword'
```

Установить зависимости и запустить тесты:
```
npm install

npx playwright install --with-deps

npx playwright test

```

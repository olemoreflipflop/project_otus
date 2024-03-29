# Организация e2e тестирования магазина demoblaze.com с помощью Playwright
Проект создан в рамках обучения на курсе Javascript QA от Otus.

# Описание проекта
Автоматизированы основные проверки тестового сайта demoblaze.com. 
При проектировании тестов был использован паттерн Page Object Model (POM).

# Используемые технологии
- Для написания проекта был использован JavaScript и фреймворк для тестирования Playwright.
- Запуск тестов выполняется в Github Actions на каждый push/pull_request в ветку master.
- Для визуализации результатов тестирования отчеты Allure Report и Playwright публикуются на Github Pages.
- Нотификации с ссылкой на результаты тестирования отправляются через Telegram бота в чат.

# Реализованые проверки

Логин
> - [x] _Успешный вход в аккаунт_
> - [x] _Попытка входа в аккаунт с невалидным паролем_
> - [x] _Попытка входа в аккаунт с невалидным логином_
> - [x] _Попытка входа в аккаунт без логина и пароля_
> - [x] _Проверка входа без подверждения формы_

Регистрация
> - [x] _Успешная регистрация аккаунта_
> - [x] _Попытка регистрации с уже существующим логином_
> - [x] _Попытка регистрации без логина и пароля_
> - [x] _Попытка регистрации с незаполненным полем пароля_
> - [x] _Попытка регистрации с незаполненным полем логина_

Корзина
> - [x] _Успешное добавление товара в корзину_
> - [x] _Успешное удаление товара из корзины_
> - [x] _Корректное отображение общей стоимости товаров в корзине_
> - [x] _Успешный заказ товара авторизованным пользователем_
> - [x] _Успешный заказ товара неавторизованным пользователем_
> - [x] _Попытка заказа товара без полей: Имя и Банковская карта_

Список товаров
> - [x] _Корректная фильтрация товаров по типу_

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

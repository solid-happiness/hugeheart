
# [Огромное сердце](https://огромноесердце.рф)

Сайт задания для финала [BEST Hack'19](https://vk.com/besthack2019).
Тестовые данные для входа отправлены в письме.

## Технологии
* [React](https://reactjs.org/) &mdash; современная JS-библиотека для разработки пользовательских интерфейсов.
* [Material-UI](https://material-ui.com/) &mdash; React UI фреймворк для воплощения [Material Design](https://material.io/).
* [Django](https://www.djangoproject.com/) &mdash; фреймворк для веб-приложений на Python, предалагющий хорошую админку из коробки, ORM и реализующий MVC.
* [PostgreSQL](https://www.postgresql.org/) &mdash; объектно-реляционная СУБД.

## Запуск локальной версии проекта*

#### 1. Склонировать репозиторий
```bash
$ git clone https://github.com/solid-happiness/hugeheart.git
```

#### 2. Создать и запустить виртуальное окружение
```bash
$ python3 -m venv server/venv
$ source server/venv/bin/activate
```

#### 3. Установить зависимости
```bash
$ pip install -r requirements.txt
$ npm install
```

#### 4. Создать базу данных
Зайти в консоли postgres:
```bash
$ sudo -u postgres psql
```

Создать базу данных:
```postgresql
create user hugeheart with password 'qwerty';
create database hugeheart_db owner hugeheart;
```

Выполнить миграции:
```bash
$ python src/manage.py migrate
```

#### 5. Запустить проект
В первой консоли запустить сборку клиентской части:
```bash
$ npm run start
```
Во второй консоли запустить django-сервер:
```bash
$ python server/manage.py runserver
```

*на Ubuntu 16.04/18.04

## Авторы
Название команды: **hugeheart**

Состав команды:
* **Алесин Александр** &mdash; капитан команды
* **Туманов Иван**
* **Чебаков Дмитрий**

Направление: **WEB**

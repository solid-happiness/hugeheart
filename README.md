# TODO: Здесь нужна ссылка на сайт

TODO: здесь нужно добавить описание.

## Использование

## Технологии
* [React](https://reactjs.org/) &mdash; современная JS-библиотека для разработки пользовательских интерфейсов.
* [Material-UI](https://material-ui.com/) &mdash; React UI фреймворк для воплощения [Material Design](https://material.io/).
* [Django](https://www.djangoproject.com/) &mdash; фреймворк для веб-приложений на Python, предалагющий хорошую админку из коробки, ORM и реализующий MVC.
* [PostgreSQL](https://www.postgresql.org/) &mdash; объектно-реляционная СУБД.

## Запуск локальной версии проекта*

#### 1. Склонировать репозиторий

#### 2. Создать и запустить виртуальное окружение
```
$ python3 -m venv server/venv
$ source server/venv/bin/activate
```

#### 3. Установить зависимости
```
$ pip install -r requirements.txt
$ npm install
```

#### 4. Создать базу данных
Зайти в консоль postgres:
```
$ sudo -u postgres psql
```

И выполнить следующие команды:
```postgresql
create user hugeheart with password 'qwerty';
create database hugeheart_db owner hugeheart;
```

#### 5. Заполнить базу данных
```
$ cd fixtures
$ unzip db-dump.zip
$ cd ..
$ sudo -u postgres psql solid_happines_db < fixtures/dump.pgsql
$ mkdir media
$ cp -r fixtures/pictures/* media
```

#### 6. Запустить проект
В первой консоли запустить сборку клиентской части:
```
$ npm run start
```
Во второй консоли запустить django-сервер:
```
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

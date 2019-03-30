from django.db import models

from main.models import USER_ROLES


TASK_STATUS = [
    ('1', 'открыто'),
    ('2', 'в работе'),
    ('3', 'проверка'),
    ('4', 'закрыто'),
]

TASK_PRIORITY = [
    ('1', 'высокий'),
    ('2', 'средний'),
    ('3', 'низкий'),
]


class Task(models.Model):
    level = models.CharField(
        'Уровень задачи',
        choices = USER_ROLES,
        max_length = 1,
    )
    title = models.TextField(
        'Заголовок задачи',
        max_length = 256,
    )
    description = models.TextField(
        'Бодробное описание задачи',
        max_length = 1024,
    )
    event = models.ForeignKey(
        'events.Event',
        verbose_name = 'Для мероприятия',
        on_delete = models.CASCADE,
    )
    author = models.ForeignKey(
        'main.UserProfile',
        related_name = 'author',
        verbose_name = 'Автор задачи',
        on_delete = models.SET_NULL,
        null = True,
    )
    status = models.CharField(
        'Статус задачи',
        choices = TASK_STATUS,
        max_length = 1,
        default = '1',
    )
    task_performers = models.ManyToManyField(
        'main.UserProfile',
        related_name = 'task_performers',
        verbose_name = 'Исполнители задачи',   
    )
    need_performers = models.BooleanField(
        'Задача открыта для исполнителей',
        default = False,
    )
    create_date = models.DateField(
        'Дата создания задачи',
        auto_now_add = True,
    )
    deadline = models.DateTimeField(
        'Дэдлайн задачи',
    )
    priority = models.CharField(
        'Приоритет задачи',
        choices = TASK_PRIORITY,
        max_length = 1,
    )
    tags = models.CharField(
        'Тэги задачи',
        max_length = 128,
    )

    def to_dict(self):
        return {
            "title": self.title,
            "description": self.description,
            "author": self.author.get_full_name() or self.author.username or '',
            "status": self.status,
            "event": self.event.name,
            "performers": [performer.get_full_name() or performer.username for performer in self.task_performers.all()],
            "need_performers": self.need_performers,
            "create_date": self.create_date,
            "deadline": self.deadline,
            "priority": self.priority,
            "tags": [tag for tag in str(self.tags).split(';')],
        }


class TaskComment(models.Model):
    author = models.ForeignKey(
        'main.UserProfile',
        verbose_name = 'Автор комментария',
        on_delete = models.SET_NULL,
        null = True,
    )
    text = models.TextField(
        'Текст комментария',
        max_length = 1024,
    )
    datetime = models.DateTimeField(
        'Дата и время создания комментария',
        auto_now_add = True,
    )
    task = models.ForeignKey(
        Task,
        verbose_name = 'Для задачи',
        on_delete = models.CASCADE,
    )

    def to_dict(self):
        return {
            "author": self.author.get_full_name() or self.author.username,
            "commentText": self.text,
            "dateTimeCreate": self.datetime, 
        }


from django.db import models

from main.models import USER_ROLES

TASK_STATUS = [
    ('open', 'открыто'),
    ('inProgress', 'в работе'),
    ('check', 'проверка'),
    ('close', 'закрыто'),
]

TASK_PRIORITY = [
    ('high', 'высокий'),
    ('medium', 'средний'),
    ('low', 'низкий'),
]


class Task(models.Model):
    level = models.CharField(
        'Уровень задачи',
        choices=USER_ROLES,
        max_length=9,
    )
    title = models.CharField(
        'Заголовок задачи',
        max_length=128,
    )
    description = models.TextField(
        'Подробное описание задачи',
        max_length=1024,
        blank=True,
        null=True,
    )
    event = models.ForeignKey(
        'events.Event',
        verbose_name='Для мероприятия',
        related_name='tasks',
        on_delete=models.CASCADE,
    )
    author = models.ForeignKey(
        'main.UserProfile',
        related_name='author',
        verbose_name='Автор задачи',
        on_delete=models.SET_NULL,
        null=True,
    )
    status = models.CharField(
        'Статус задачи',
        choices=TASK_STATUS,
        max_length=10,
        default='open',
    )
    task_performers = models.ManyToManyField(
        'main.UserProfile',
        related_name='task_performers',
        verbose_name='Исполнители задачи',
        blank=True,
    )
    need_performers = models.BooleanField(
        'Задача открыта для исполнителей',
        default=False,
    )
    create_date = models.DateField(
        'Дата создания задачи',
        auto_now_add=True,
    )
    deadline = models.DateTimeField(
        'Дэдлайн задачи',
    )
    priority = models.CharField(
        'Приоритет задачи',
        choices=TASK_PRIORITY,
        max_length=6,
    )
    tags = models.ManyToManyField(
        'tasks.Tag',
        related_name='task',
        verbose_name='Тэги',
        blank=True,
    )

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "author": self.author.get_full_name() or self.author.username or '',
            "status": self.status,
            "statusVerbose": self.get_status_display(),
            "event": self.event.slug,
            "eventTitle": self.event.name,
            "performers": [performer.get_full_name() or performer.username for performer in self.task_performers.all()],
            "needPerformers": self.need_performers,
            "createDate": self.create_date,
            "deadline": self.deadline,
            "priority": self.priority,
            "tags": [str(tag) for tag in self.tags.all()] + [self.event.slug],
        }

    def __str__(self):
        return str(self.title)

    class Meta:
        verbose_name = 'Задача'
        verbose_name_plural = 'Задачи'


class TaskComment(models.Model):
    author = models.ForeignKey(
        'main.UserProfile',
        verbose_name='Автор комментария',
        on_delete=models.SET_NULL,
        null=True,
    )
    text = models.TextField(
        'Текст комментария',
        max_length=1024,
    )
    datetime = models.DateTimeField(
        'Дата и время создания комментария',
        auto_now_add=True,
    )
    task = models.ForeignKey(
        Task,
        verbose_name='Для задачи',
        on_delete=models.CASCADE,
    )

    def to_dict(self):
        return {
            "author": self.author.get_full_name() or self.author.username or '',
            "commentText": self.text,
            "dateTimeCreate": self.datetime,
        }


class Tag(models.Model):
    tag = models.CharField(
        'Тэг',
        max_length=64,
        blank=True,
        null=True
    )

    def __str__(self):
        return str(self.tag)

    class Meta:
        verbose_name = 'Тэг'
        verbose_name_plural = 'Тэги'

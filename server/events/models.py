from django.db import models


class Event(models.Model):
    name = models.CharField(
        'Название мероприятия',
        max_length = 128,
    )
    slug = models.CharField(
        'Короткое название, метка',
        max_length = 128,
    )
    short_description = models.TextField(
        'Краткое описание мероприятия',
        max_length = 256,
    )
    description = models.TextField(
        'Развернутое описание мероприятия',
        max_length = 1024,
        default = '',
        blank = True,
    )
    partners = models.ManyToManyField(
        'main.Partner',
        verbose_name = 'Партнеры мероприятия',
    )
    date = models.DateField(
        'Дата проведения мероприятия',
    )
    time_start = models.TimeField(
        'Время начала мероприятия',
    )
    time_end = models.TimeField(
        'Время окончания мероприятия',
    )
    responsible = models.ForeignKey(
        'main.UserProfile',
        verbose_name = 'Ответственный за мероприятие',
        on_delete = models.SET_NULL,
        null = True,
    )
    photo = models.ImageField(
        'Фото или лого мероприятия',
        upload_to = 'events',
        null = True,
        blank = True,
    )


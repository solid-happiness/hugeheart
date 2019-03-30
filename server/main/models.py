from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator


USER_ROLES = [
    ('1', 'Волонтер'),
    ('2', 'Организатор'),
    ('3', 'Администратор'),
]

PARTNER_ROLE = [
    ('1', 'Юридическое лицо'),
    ('2', 'Физическое лицо'),
]

COMMUNICATION_METHODS = [
    ('1', 'Email'),
    ('2', 'Телефон'),
    ('3', 'Личная встреча'),
]

class UserProfile(User):
    short_description = models.TextField(
        'Краткое описание',
        max_length = 256,
    )
    phone_regex = RegexValidator(
        regex=r'^\+?1?\d{9,15}$',
            )
    phone_number = models.CharField(
        'Номер телефона',
        validators=[phone_regex], 
        max_length=17, 
        blank=True
    ) 
    
    role = models.CharField(
        'Статус пользователя',
        choices = USER_ROLES,
        max_length = 1,
    )
    photo = models.ImageField(
        'Фотография',
        upload_to = 'users',
        null = True,
        blank = True,
    )


class Partner(models.Model):
    role = models.CharField(
        'Статус партнера',
        choices = PARTNER_ROLE,
        max_length = 1,
    )
    name = models.CharField(
        'Название организации или ФИО физ.лица',
        max_length = 128,
    )
    tin = models.UUIDField(
        'Идентификационный номер налогоплательщика',
        null = True,
        blank = True,
    )
    url = models.URLField(
        'Веб-сайт',
        null = True,
        blank = True,
    )
    email = models.EmailField(
        'Email',
        null = True,
        blank = True,
    )
    phone_regex = RegexValidator(
        regex=r'^\+?1?\d{9,15}$',
            )
    phone_number = models.CharField(
        'Номер телефона',
        validators=[phone_regex], 
        max_length=17, 
        blank=True
    )
    short_description = models.TextField(
        'Краткое описание',
        max_length = 256,
    )
    description = models.TextField(
        'Полное описание',
        max_length = 1024,
        null = True,
        blank = True,
    )
    contact_name = models.CharField(
        'ФИО контактного лица',
        max_length = 128,
    )
    contact_phone_number = models.CharField(
        'Номер контактного телефона',
        validators=[phone_regex], 
        max_length=17, 
        blank=True
    )
    contact_email = models.EmailField(
        'Контактный Email',
        null = True,
        blank = True,
    )
    communication_method = models.CharField(
        'Предпочтительный способ связи',
        choices = COMMUNICATION_METHODS,
        max_length = 1,
        default = '1',
    )
    photo = models.ImageField(
        'Фото или лого партнера',
        upload_to = 'partners',
        null = True,
        blank = True,
    )


class InteractionHistory(models.Model):
    partner = models.ForeignKey(
        Partner,
        verbose_name = 'Партнер',
        on_delete = models.CASCADE, 
    )
    interaction_link = models.CharField(
        'Канал связи', 
        choices = COMMUNICATION_METHODS,
        max_length = 1,
    )
    date_time = models.DateTimeField(
        'Дата и время взамодействия',
        auto_now_add = True,
    )
    about = models.TextField(
        'По какому вопросу',
        max_length = 1024,
    )
    result = models.TextField(
        'Результат взаимодействия',
        max_length = 256,
    )


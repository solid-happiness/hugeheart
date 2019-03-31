from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator

USER_ROLES = [
    ('volunteer', 'Волонтер'),
    ('organizer', 'Организатор'),
    ('admin', 'Администратор'),
]

PARTNER_ROLE = [
    ('1', 'Юридическое лицо'),
    ('2', 'Физическое лицо'),
]

COMMUNICATION_METHODS = [
    ('email', 'Email'),
    ('phone', 'Телефон'),
    ('meet', 'Личная встреча'),
]


class UserProfile(User):
    short_description = models.TextField(
        'Краткое описание',
        max_length=256,
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
        choices=USER_ROLES,
        max_length=9,
    )
    photo = models.ImageField(
        'Фотография',
        upload_to='users',
        null=True,
        blank=True,
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.get_full_name() or self.username,
            "img": str(self.photo) and self.photo.url,
            "shortDescription": self.short_description,
            "role": self.role,
            "verboseRole": self.get_role_display(),
        }

    def __str__(self):
        return str(self.username)

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'


class Partner(models.Model):
    role = models.CharField(
        'Статус партнера',
        choices=PARTNER_ROLE,
        max_length=1,
    )
    name = models.CharField(
        'Название организации или ФИО физ.лица',
        max_length=128,
    )
    slug = models.CharField(
        'Короткое название, метка',
        max_length=128,
        unique=True
    )
    tin = models.CharField(
        'Идентификационный номер налогоплательщика',
        max_length=32,
        null=True,
        blank=True,
    )
    url = models.URLField(
        'Веб-сайт',
        null=True,
        blank=True,
    )
    email = models.EmailField(
        'Email',
        null=True,
        blank=True,
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
        max_length=256,
    )
    description = models.TextField(
        'Полное описание',
        max_length=1024,
        null=True,
        blank=True,
    )
    contact_name = models.CharField(
        'ФИО контактного лица',
        max_length=128,
    )
    contact_phone_number = models.CharField(
        'Номер контактного телефона',
        validators=[phone_regex],
        max_length=17,
        blank=True
    )
    contact_email = models.EmailField(
        'Контактный Email',
        null=True,
        blank=True,
    )
    communication_method = models.CharField(
        'Предпочтительный способ связи',
        choices=COMMUNICATION_METHODS,
        max_length=5,
        default='email',
    )
    photo = models.ImageField(
        'Фото или лого партнера',
        upload_to='partners',
        null=True,
        blank=True,
    )
    tags = models.ManyToManyField(
        'tasks.Tag',
        related_name='partner',
        verbose_name='Тэги',
        blank=True,
    )

    def to_dict(self):
        p, a = self.contact_email, self.contact_phone_number
        if self.communication_method == '2':
            p, a = a, p

        try:
            interaction_histories = self.interaction_histories.all()
        except InteractionHistory.DoesNotExist:
            interaction_histories = []

        return {
            "id": self.id,
            "name": self.name,
            "img": str(self.photo) and self.photo.url,
            "slug": self.slug,
            "shortDescription": self.short_description,
            "description": self.description,
            "communicationPrefer": p,
            "communicationAlternative": a,
            "interactionHistory": [history.to_dict() for history in interaction_histories],
            "tags": [str(tag) for tag in self.tags.all()],
        }

    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name = 'Партнер'
        verbose_name_plural = 'Партнеры'


class InteractionHistory(models.Model):
    partner = models.ForeignKey(
        Partner,
        verbose_name='Партнер',
        related_name='interaction_histories',
        on_delete=models.CASCADE,
    )
    interaction_link = models.CharField(
        'Канал связи',
        choices=COMMUNICATION_METHODS,
        max_length=1,
    )
    date_time = models.DateTimeField(
        'Дата и время взамодействия',
        auto_now_add=True,
    )
    about = models.TextField(
        'По какому вопросу',
        max_length=1024,
    )
    result = models.TextField(
        'Результат взаимодействия',
        max_length=256,
    )

    def to_dict(self):
        return {
            'interactionLink': self.interaction_link,
            'interactionLinkVerbose': self.get_interaction_link_display(),
            'dateTime': self.date_time,
            'about': self.about,
            'result': self.result,
        }

    def __str__(self):
        return str(self.partner)

    class Meta:
        verbose_name = 'История взаимодействия с партнером'
        verbose_name_plural = 'Истории взаимодействий с партнером'

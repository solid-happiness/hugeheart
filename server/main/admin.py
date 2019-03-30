from django.contrib import admin
from . import models

admin.site.register(models.UserProfile)
admin.site.register(models.Partner)
admin.site.register(models.InteractionHistory)


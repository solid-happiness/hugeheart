# Generated by Django 2.1.7 on 2019-03-31 06:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0011_merge_20190331_0855'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='interactionhistory',
            options={'verbose_name': 'История взаимодействия с партнером', 'verbose_name_plural': 'Истории взаимодействий с партнером'},
        ),
    ]
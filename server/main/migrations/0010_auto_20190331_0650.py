# Generated by Django 2.1.7 on 2019-03-31 03:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0009_auto_20190331_0348'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='interactionhistory',
            options={'verbose_name': 'История взаимодействия с партнером', 'verbose_name_plural': 'История взаимодействий с партнером'},
        ),
        migrations.AlterField(
            model_name='interactionhistory',
            name='partner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='interaction_histories', to='main.Partner', verbose_name='Партнер'),
        ),
    ]

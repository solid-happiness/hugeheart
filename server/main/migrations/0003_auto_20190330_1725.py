# Generated by Django 2.1.7 on 2019-03-30 14:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_auto_20190330_1555'),
    ]

    operations = [
        migrations.AlterField(
            model_name='partner',
            name='tin',
            field=models.CharField(blank=True, max_length=32, null=True, verbose_name='Идентификационный номер налогоплательщика'),
        ),
    ]

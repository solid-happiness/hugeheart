# Generated by Django 2.1.7 on 2019-03-30 19:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_auto_20190330_2232'),
        ('tasks', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='TaskComment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField(max_length=1024, verbose_name='Текст комментария')),
                ('datetime', models.DateTimeField(auto_now_add=True, verbose_name='Дата и время создания комментария')),
                ('author', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='main.UserProfile', verbose_name='Автор комментария')),
            ],
        ),
        migrations.AlterField(
            model_name='task',
            name='level',
            field=models.CharField(choices=[('volunteer', 'Волонтер'), ('arganizer', 'Организатор'), ('admin', 'Администратор')], max_length=1, verbose_name='Уровень задачи'),
        ),
        migrations.AddField(
            model_name='taskcomment',
            name='task',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tasks.Task', verbose_name='Для задачи'),
        ),
    ]

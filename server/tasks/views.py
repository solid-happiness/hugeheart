import json

from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.db.models import Q

from .models import Task, Tag, TaskComment
from events.models import Event
from main.models import UserProfile
from functools import reduce


@login_required
def get_tasks(request):
    """
    View, которая возвращает JSON с информацией о задачах, автором которых является конкретный пользователь.
    Доступна по /api/tasks
    """
    user = request.user.userprofile

    if user.role == 'admin':
        tasks = Task.objects.all()
    elif user.role == 'organizer':
        try:
            events = Event.objects.filter(responsible=user)
        except Event.DoesNotExist:
            return JsonResponse({})

        tasks_raw = [[*event.tasks.all()] for event in events]
        tasks = reduce(lambda d, el: d.extend(el) or d, tasks_raw, [])

    elif user.role == 'volunteer':
        try:
            tasks = Task.objects.filter(task_performers=user)
        except Task.DoesNotExist:
            return JsonResponse({})

    return JsonResponse({
        'tasks': [task.to_dict() for task in tasks],
    })


@login_required
def get_task(request, task_id):
    """
    View, которая возвращает JSON с информацией о задаче, с id task_id.
    Доступна по /api/tasks/<task_id>
    """
    try:
        task = Task.objects.get(id=task_id)
        comments = [comment.to_dict() for comment in task.taskcomment_set.all()]
    except Task.DoesNotExist:
        return JsonResponse({})

    return JsonResponse({**task.to_dict(), 'comments': comments})


def search(request):
    query = request.GET.get('query')
    tasks = Task.objects.filter(
        Q(title__icontains=query) |
        Q(description__icontains=query) |
        Q(tags__tag__icontains=query) |
        Q(event__slug__icontains=query) |
        Q(event__name__icontains=query)
    ).distinct()

    return JsonResponse({
        'tasks': [task.to_dict() for task in tasks],
        'query': query,
    })


def get_users(request):
    users = [{'username': user.username, 'fullName': user.get_full_name()} for user in UserProfile.objects.exclude(role='admin')]
    return JsonResponse({'users': users})

def create_task(request):
    params = json.loads(request.body.decode('utf8'))

    event = Event.objects.get(slug=params.get('event'))
    author = UserProfile.objects.get(user=request.user.userprofile)
    task = Task.objects.create(
        level=params.get('level'),
        title=params.get('title'),
        description=params.get('description'),
        event=event,
        author=author,
        need_performers=params.get('needPerformers'),
        deadline=params.get('deadline'),
        priority=params.get('priority'),
    )
    performers = UserProfile.objects.filter(username__in=params.get('performers'))
    task.task_performers.set(performers)

    task_tags = [Tag.objects.get_or_create(tag=tag) for tag in params.get('tags')]
    if params.get('needPerformers'):
        task_tags.append(Tag.objects.get(tag='Нужна помощь'))
    task.tags.set(task_tags)
    return JsonResponse(rask.to_dict())


def change_task_status(request):
    params = json.loads(request.body.decode('utf8'))

    user = request.user.userprofile
    task = Task.objects.get(id=params.get('id'))
    new_status = params.get('newStatus')

    if new_status == 'check' and not task.status == 'check':
        description = f'Задача: {task.title}\nОписание задачи: {task.description} \nИсполнитель: {user.get_full_name() or user.username}'

        author = UserProfile.objects.get(username='bot')
        new_task = Task.objects.create(
            level=task.author.role,
            title='Проверить выполнение задачи',
            description=description,
            event=task.event,
            author=author,
            deadline="2099-03-30T19:11:28Z",
            priority='medium',
        )
        new_task.task_performers.set([task.author, ])
        new_task.tags.set([Tag.objects.get(tag='Проверка'), ])
        task.status = 'check'
        task.save()
    else:
        task.status = new_status
        task.save()
    TaskComment.objects.create(
        author=user,
        text=f'Статус задачи изменен. Новый статус: {task.get_status_display()}\nАвтор:{user.get_full_name() or user.username}',
        task=task,
    )
    return JsonResponse({**task.to_dict()})

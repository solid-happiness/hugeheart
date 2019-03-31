from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.db.models import Q

from .models import Task, Tag
from events.models import Event
from main.models import UserProfile


@login_required
def get_tasks(request):
    """
    View, которая возвращает JSON с информацией о задачах, автором которых является конкретный пользователь.
    Доступна по /api/tasks
    """
    user = request.user

    if user.userprofile.role == 'admin':
        tasks = Task.objects.all()
    elif user.userprofile.role == 'organizer':
        try:
            events = Event.objects.filter(responsible=user)
        except Event.DoesNotExist:
            return JsonResponse({})

        tasks = [event.tasks.get() for event in events]

    elif user.userprofile.role == 'volunteer':
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
    except Task.DoesNotExist:
        return JsonResponse({})

    return JsonResponse(task.to_dict())


def search(request):
    query = request.GET.get('query')
    tasks = Task.objects.filter(
        Q(title__icontains=query) |
        Q(description__icontains=query) | 
        Q(tags__tag__icontains=query) |
        Q(event__slug__icontains=query) | 
        Q(event__name__icontains=query)
    )

    return JsonResponse({
        'tasks': [task.to_dict() for task in tasks],
        'query': query,
    })


def create_task(request):
    params = json.loads(request.body.decode('utf8'))

    event = Event.objects.get(slug=params.get('event'))
    author = UserProfile.objects.get(user=request.user)
    task = Task.objects.create(
        level=params.get('level'), 
        title=params.get('title'),  
        description=params.get('description'), 
        event=event,
        author=author,
        need_performers = params.get('needPerformers'),
        deadline = params.get('deadline'),
        priority = params.get('priority'),
    )
    performers = UserProfile.objects.filter(username__in=params.get('performers'))
    task.task_performers.set(performers)
    task_tags = []
    for tag in params.get('tags'):
        try:
            t = Tag.objects.get(tag=tag)
        except Tag.DoesNotExist:
            t = Tag.objects.create(tag=tag)
        task_tags.append(t)
    task.tags.set(task_tags)

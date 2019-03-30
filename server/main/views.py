from django.http import JsonResponse


def main(request):
    """
    View, которая возвращает JSON с информацией обо всех столовых.
    Доступна по /api/
    """
    return JsonResponse({'events': []})

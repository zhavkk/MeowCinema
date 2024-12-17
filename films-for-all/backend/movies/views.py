from rest_framework import generics
from .models import Movie
from .serializers import MovieSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db.models import Q
from .ml_model import get_recommendations as ml_get_recommendations

class MovieListCreateView(generics.ListCreateAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

class MovieSearchView(generics.ListAPIView):
    serializer_class = MovieSerializer

    def get_queryset(self):
        query = self.request.query_params.get('query', '')
        return Movie.objects.filter(
            Q(title__icontains=query) |
            Q(description__icontains=query) |
            Q(main_actors__icontains=query)
        ).order_by('-rating')

@api_view(['GET'])
def get_recommendations(request):
    # Пример простых рекомендаций: топ 10 по рейтингу
    top_movies = Movie.objects.all().order_by('-rating')[:10]
    serializer = MovieSerializer(top_movies, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_ml_recommendations(request):
    movie_title = request.query_params.get('title', None)
    if not movie_title:
        return Response({'error': 'Параметр title обязателен'}, status=400)
    
    try:
        recommended_titles = ml_get_recommendations(movie_title, Movie.objects.all())
        recommended_movies = Movie.objects.filter(title__in=recommended_titles)
        serializer = MovieSerializer(recommended_movies, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=500)

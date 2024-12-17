from django.urls import path
from .views import MovieListCreateView, MovieSearchView, get_recommendations, get_ml_recommendations

urlpatterns = [
    path('', MovieListCreateView.as_view(), name='movie-list-create'),
    path('search/', MovieSearchView.as_view(), name='movie-search'),
    path('recommendations/', get_recommendations, name='recommendations'),
    path('ml_recommendations/', get_ml_recommendations, name='ml-recommendations'),
]

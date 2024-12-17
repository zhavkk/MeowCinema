from django.db import models

class Movie(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    main_actors = models.TextField(help_text='Список актеров через запятую')
    genre = models.TextField(help_text='Список жанров через запятую')
    release_date = models.DateField()
    rating = models.FloatField(default=0.0)

    def __str__(self):
        return self.title

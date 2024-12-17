import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

def get_recommendations(movie_title, movies_queryset):
    # Преобразуем QuerySet в DataFrame
    df = pd.DataFrame(list(movies_queryset.values()))
    tfidf = TfidfVectorizer(stop_words='english')
    df['description'] = df['description'].fillna('')
    tfidf_matrix = tfidf.fit_transform(df['description'])

    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
    indices = pd.Series(df.index, index=df['title']).drop_duplicates()

    if movie_title not in indices:
        raise ValueError("Фильм не найден в базе данных.")

    idx = indices[movie_title]

    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:11]  # Топ 10 рекомендаций

    movie_indices = [i[0] for i in sim_scores]
    return df['title'].iloc[movie_indices].tolist()

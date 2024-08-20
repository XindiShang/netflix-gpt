import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import { usePopularMoviesQuery } from '@/services/queries/movie.query';
import { type Movie } from '@/types/movie';

export type Filter = { search?: string };

const Browse = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const filters = {
    language: currentLanguage,
    page: 1,
  };

  const { isLoading, data } = usePopularMoviesQuery(filters);

  return (
    <div>
      <Header />
      {isLoading && <p>Loading...</p>}
      {data?.results.map((movie: Movie) => (
        <div key={movie.id}>
          <h2>{movie.title}</h2>
        </div>
      ))}
    </div>
  );
};

export default Browse;

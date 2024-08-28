import { useTranslation } from 'react-i18next';
import ExploreIcon from '@/assets/images/explore.svg?react';
import NotFoundIcon from '@/assets/images/not-found.svg?react';
import MovieList from '@/components/Movie/MovieList';
import useGptStore from '@/store/useGptStore';

const GptSuggestions = () => {
  const { recommendedMovieTitles, movieSearchResults, isSearchError } =
    useGptStore();

  const { t } = useTranslation();

  if (isSearchError)
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 p-4 text-white bg-black rounded-lg bg-opacity-90">
        <NotFoundIcon />
        <p>{t('gpt.noResults')}</p>
      </div>
    );

  if (recommendedMovieTitles.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 p-4 text-white bg-black rounded-lg bg-opacity-90">
        <ExploreIcon />
        <p>{t('gpt.explore')}</p>
      </div>
    );

  return (
    <div className="h-full p-4 text-white bg-black rounded-lg bg-opacity-90">
      <div>
        {recommendedMovieTitles.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieSearchResults[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default GptSuggestions;

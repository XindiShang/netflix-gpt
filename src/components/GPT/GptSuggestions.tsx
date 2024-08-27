import MovieList from '@/components/Movie/MovieList';
import useGptStore from '@/store/useGptStore';

const GptSuggestions = () => {
  const { recommendedMovieTitles, movieSearchResults } = useGptStore();

  if (recommendedMovieTitles.length === 0)
    return (
      <div className="h-full p-4 text-white bg-black rounded-lg bg-opacity-90">
        <p>No recommendations available</p>
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

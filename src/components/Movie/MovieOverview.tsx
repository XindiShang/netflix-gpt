import { type MovieDetails } from '@/types/movie';

// TODO: i18n
const MovieOverview = ({ movieDetails }: { movieDetails?: MovieDetails }) => {
  if (!movieDetails) {
    return (
      <div className="flex items-center justify-center h-full p-4 text-white bg-black rounded-lg bg-opacity-90">
        <div className="loading loading-spinner text-primary"></div>
      </div>
    );
  }

  /* eslint-disable @typescript-eslint/naming-convention */
  const {
    title,
    budget,
    genres,
    overview,
    popularity,
    release_date,
    revenue,
    vote_average,
    vote_count,
  } = movieDetails;
  /* eslint-enable @typescript-eslint/naming-convention */

  return (
    <div className="h-screen p-4 m-4 overflow-x-hidden text-white bg-gray-900 border rounded-lg border-b-white">
      <h1 className="mb-4 text-xl font-bold text-center md:text-2xl">
        About this Movie
      </h1>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold md:text-xl">Name:</h2>
          <p>{title}</p>
          <h2 className="mt-4 text-lg font-semibold md:text-xl">Overview:</h2>
          <p>{overview}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold md:text-xl">Budget:</h2>
          <p>${budget / 1000000} million</p>
          <h2 className="mt-4 text-lg font-semibold md:text-xl">Revenue:</h2>
          <p>${revenue / 1000000} million</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <h2 className="text-lg font-semibold md:text-xl">Popularity:</h2>
          <p>{popularity}</p>
          <h2 className="mt-4 text-lg font-semibold md:text-xl">
            Release Date:
          </h2>
          <p>{release_date}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold md:text-xl">Average Votes:</h2>
          <p>{vote_average}</p>
          <h2 className="mt-4 text-lg font-semibold md:text-xl">Vote Count:</h2>
          <p>{vote_count}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold md:text-xl">Genres: </h2>
          {genres && genres.length > 0 ? (
            <ul className="space-x-2">
              {genres.map((genre, index) => (
                <li className="badge" key={index}>
                  {genre.name}
                </li>
              ))}
            </ul>
          ) : (
            <p>No genres available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieOverview;

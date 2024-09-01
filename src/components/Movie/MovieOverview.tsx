import { useTranslation } from 'react-i18next';
import { formatMoney } from '@/lib/helper';
import { type MovieDetails } from '@/types/movie';

const MovieOverview = ({ movieDetails }: { movieDetails?: MovieDetails }) => {
  const { t } = useTranslation();

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
    runtime,
    release_date,
    revenue,
    vote_average,
    popularity,
  } = movieDetails;
  /* eslint-enable @typescript-eslint/naming-convention */

  const styleValue: React.CSSProperties & Record<string, string | number> = {
    '--value': (popularity / 5000) * 100,
  };

  const voteAverageEmoji =
    vote_average >= 7 ? '👍' : vote_average >= 4 ? '👌' : '👎';

  return (
    <div className="h-screen p-6 mx-4 overflow-x-hidden text-white rounded-lg shadow-xl bg-neutral glass">
      <h1 className="mb-8 text-2xl font-bold text-center md:text-3xl">
        {t('movie.details')}
      </h1>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <h2 className="mb-2 text-lg font-semibold md:text-xl">
              {t('movie.name')}:
            </h2>
            <p>{title}</p>
          </div>
          <div>
            <h2 className="mb-2 text-lg font-semibold md:text-xl">
              {t('movie.overview')}:
            </h2>
            <p>{overview}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="mb-2 text-lg font-semibold md:text-xl">
              {t('movie.budget')}:
            </h2>
            <p>
              ${formatMoney(budget)} {t('movie.million')}
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-lg font-semibold md:text-xl">
              {t('movie.revenue')}:
            </h2>
            <p>
              ${formatMoney(revenue)} {t('movie.million')}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 mt-8 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <h2 className="mb-2 text-lg font-semibold md:text-xl">
              {t('movie.duration')}:
            </h2>
            <p>
              {runtime} {t('movie.runtime')}
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-lg font-semibold md:text-xl">
              {t('movie.releaseDate')}:
            </h2>
            <p>{release_date}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="mb-2 text-lg font-semibold md:text-xl">
              {t('movie.voteAverage')}:
            </h2>
            <div className="flex items-center space-x-2">
              <span>{vote_average.toFixed(1)}</span>
              <span>{voteAverageEmoji}</span>
            </div>
          </div>
          <div>
            <h2 className="mb-2 text-lg font-semibold md:text-xl">
              {t('movie.popularity')}:
            </h2>
            <div
              className={`bg-black border-4 border-black radial-progress ${
                popularity >= 4000
                  ? 'text-green-500'
                  : popularity >= 2000
                  ? 'text-yellow-500'
                  : 'text-red-500'
              }`}
              style={styleValue}
              role="progressbar"
            >
              {Math.round((popularity / 5000) * 100)}%
            </div>
          </div>
        </div>

        <div className="col-span-2">
          <h2 className="mb-2 text-lg font-semibold md:text-xl">
            {t('movie.genres')}:
          </h2>
          {genres && genres.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {genres.map((genre, index) => (
                <li
                  className="px-3 py-1 text-sm font-medium text-black bg-white rounded-lg"
                  key={index}
                >
                  {genre.name}
                </li>
              ))}
            </ul>
          ) : (
            <p>{t('movie.noGenres')}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieOverview;

import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { FALLBACK_IMG_URL, IMG_CDN_URL } from '@/lib/constants';

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
  };
}
const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only load once when it comes into view
    threshold: 0.1, // Load when 10% of the image is visible
  });

  return (
    <div ref={ref} className="w-36 md:w-48">
      {inView && (
        <Link to={`/movie/${movie.id}`}>
          <img
            src={`${IMG_CDN_URL}${movie.poster_path}`}
            alt={movie.title}
            className="object-cover w-full h-full"
            onError={(e) => {
              e.currentTarget.src = FALLBACK_IMG_URL;
            }}
          />
        </Link>
      )}
    </div>
  );
};

export default MovieCard;

import { useInView } from 'react-intersection-observer';
import { IMG_CDN_URL } from '@/utils/constants';

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
        // TODO: Add a fallback image
        <img
          src={`${IMG_CDN_URL}${movie.poster_path}`}
          alt={movie.title}
          className="object-cover w-full h-full"
        />
      )}
    </div>
  );
};

export default MovieCard;

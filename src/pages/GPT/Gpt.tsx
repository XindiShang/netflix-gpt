import { BG_URL } from '@/lib/constants';
import GptSearchBar from './GptSearchBar';
import GptSuggestions from './GptSuggestions';

const Gpt = () => {
  return (
    <div className="h-full">
      <div className="fixed">
        <img
          className="object-cover h-screen md:object-none md:w-screen"
          src={BG_URL}
          alt="background_image"
        />
      </div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex-shrink-0">
          <GptSearchBar />
        </div>
        <div className="flex-1 p-4 md:px-24">
          <GptSuggestions />
        </div>
      </div>
    </div>
  );
};

export default Gpt;

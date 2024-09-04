import { HERO_BACKGROUND } from '@/lib/constants';
import Auth from '@/pages/Auth';

// 1. if use ONLY ONE background image, like below
// 2. if use multiple background images and place them from top to bottom
// <div className="min-h-[43.75rem] px-0 pt-40 pb-16">...absolute image div...</div>

const Home = () => {
  return (
    <div className="relative z-0 flex flex-col w-full overflow-hidden bg-black">
      {/* hero section md only */}
      <div className="absolute top-0 left-0 hidden w-full h-full overflow-hidden opacity-50 sm:block -z-10">
        <img
          className="object-cover min-w-full min-h-full"
          src={HERO_BACKGROUND}
          alt="hero"
        ></img>
      </div>

      <div className="sm:mb-14 sm:mx-auto mt-24 py-0 px-[5%] flex-1 grow">
        <Auth />
      </div>
    </div>
  );
};

export default Home;

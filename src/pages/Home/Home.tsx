import Auth from '@/pages/Auth';
import { HERO_BACKGROUND } from '@/utils/constants';

// 1. if use ONLY ONE background image, like below
// 2. if use multiple background images and place them from top to bottom
// <div className="min-h-[43.75rem] px-0 pt-40 pb-16">...absolute image div...</div>

const Home = () => {
  return (
    <div className="relative z-0 flex flex-col w-full min-h-screen overflow-hidden bg-black">
      {/* hero section md only */}
      <div className="absolute top-0 left-0 hidden w-full h-screen min-h-screen overflow-hidden opacity-50 sm:block -z-10">
        {/* <div className="relative w-full h-full overflow-hidden"> */}
        <img
          className="object-cover min-w-full min-h-full"
          src={HERO_BACKGROUND}
          alt="hero"
        ></img>
        {/* transparent filter */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent via-60% to-black"></div> */}
        {/* </div> */}
      </div>

      <div className="sm:mb-14 sm:mx-auto mt-24 py-0 px-[5%] flex-1 grow">
        <Auth />
      </div>
    </div>
  );
};

export default Home;

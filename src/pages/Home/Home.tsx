import Header from '@/components/Header';
import Login from '@/pages/Login';
import { HERO_BACKGROUND } from '@/utils/constants';

// 1. if use ONLY ONE background image, like below
// 2. if use multiple background images and place them from top to bottom
// <div className="min-h-[43.75rem] px-0 pt-40 pb-16">...absolute image div...</div>

const Home = () => {
  return (
    <div className="relative z-0 flex flex-col min-h-screen overflow-hidden text-white bg-black">
      <Header />
      {/* hero section */}
      <div className="absolute top-0 left-0 w-full h-screen min-h-screen overflow-hidden opacity-50 -z-10">
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

      <div className="mb-14 max-w-[450px] mx-auto my-0 py-0 px-[5%]">
        <div className="flex items-center justify-center">
          <Login />
        </div>
      </div>
    </div>
  );
};

export default Home;

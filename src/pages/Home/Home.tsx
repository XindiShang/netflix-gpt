import Login from '@/pages/Login';
import { HERO_BACKGROUND } from '@/utils/constants';

const Home = () => {
  return (
    <div>
      {/* hero section */}
      <div className="absolute top-0 left-0">
        <div className="relative w-full h-full overflow-hidden">
          <img
            className="object-cover w-full h-full scale-125"
            src={HERO_BACKGROUND}
            alt="hero"
          ></img>
          {/* transparent filter */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent via-60% to-black"></div>
        </div>
      </div>

      <div className="flex items-center justify-center h-screen">
        <Login />
      </div>
    </div>
  );
};

export default Home;

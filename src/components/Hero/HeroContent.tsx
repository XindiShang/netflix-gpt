import { useTranslation } from 'react-i18next';
import { PlayIcon } from '@heroicons/react/24/outline';

interface HeroContentProps {
  title: string;
  description: string;
  onCtaClick: () => void;
}

const HeroContent: React.FC<HeroContentProps> = ({
  title,
  description,
  onCtaClick,
}) => {
  const { t } = useTranslation();

  return (
    <div className="relative flex flex-col justify-end h-full p-8 px-6 bottom-[10%] text-white md:justify-center md:-bottom-[10%] just md:px-24">
      <h1 className="mb-4 text-2xl font-bold md:text-5xl">{title}</h1>
      <p className="hidden w-1/2 mb-8 text-lg md:inline-block">{description}</p>
      <div className="flex space-x-4">
        <button className="btn btn-primary" onClick={onCtaClick}>
          <PlayIcon className="w-6 h-6" />
          {t('hero.ctaLabel')}
        </button>
        <button className="btn btn-neutral">{t('hero.moreInfo')}</button>
      </div>
    </div>
  );
};

export default HeroContent;

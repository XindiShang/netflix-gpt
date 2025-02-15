import { useTranslation } from 'react-i18next';
import { InformationCircleIcon, PlayIcon } from '@heroicons/react/24/outline';

interface HeroContentProps {
  title: string;
  description: string;
  onCtaClick: () => void;
  onInfoClick: () => void;
}

const HeroContent: React.FC<HeroContentProps> = ({
  title,
  description,
  onCtaClick,
  onInfoClick,
}) => {
  const { t } = useTranslation();

  return (
    <div className="absolute top-0 left-0 w-full h-full pt-[30%] md:pt-[15%] px-6 md:px-24 text-white">
      <h1 className="mb-4 text-2xl font-bold md:text-5xl">{title}</h1>
      <p className="hidden w-1/2 mb-8 text-lg md:inline-block">{description}</p>
      <div className="flex space-x-4">
        <button className="btn" onClick={onCtaClick}>
          <PlayIcon className="w-5 h-5" />
          {t('hero.ctaLabel')}
        </button>
        <button className="btn btn-neutral" onClick={onInfoClick}>
          <InformationCircleIcon className="w-5 h-5" />
          {t('hero.moreInfo')}
        </button>
      </div>
    </div>
  );
};

export default HeroContent;

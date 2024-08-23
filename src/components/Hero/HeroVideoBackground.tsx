interface HeroVideoBackgroundProps {
  videoUrl: string;
}

const HeroVideoBackground: React.FC<HeroVideoBackgroundProps> = ({
  videoUrl,
}) => {
  return (
    <iframe
      className="w-full h-full"
      src={videoUrl}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};

export default HeroVideoBackground;

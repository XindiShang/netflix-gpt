interface HeroVideoBackgroundProps {
  videoUrl: string;
}

const HeroVideoBackground: React.FC<HeroVideoBackgroundProps> = ({
  videoUrl,
}) => {
  return (
    <iframe
      className="absolute top-0 left-0 w-screen h-screen aspect-square md:aspect-video -z-10"
      src={videoUrl}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};

export default HeroVideoBackground;

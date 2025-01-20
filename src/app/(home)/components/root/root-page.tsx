import ArtBoard from "./art-board";
import DaisyCountdown from "./daisy-countdown";
import FullBleedCarousel from "./full-bleed-carousel";
import MapInfo from "./map-info";

const RootPage = async () => {
  const date = process.env.NEXT_PUBLIC_HOME_DDAY_DATE;
  const time = process.env.NEXT_PUBLIC_HOME_DDAY_TIME;

  return (
    <div className="flex flex-col justify-center">
      <DaisyCountdown date={date} time={time} />
      <ArtBoard />
      <FullBleedCarousel />
      <MapInfo />
    </div>
  );
};

export default RootPage;

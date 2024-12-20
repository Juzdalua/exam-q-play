import ArtBoard from "./art-board";
import DaisyCountdown from "./daisy-countdown";
import FullBleedCarousel from "./full-bleed-carousel";
import MapInfo from "./map-info";

const RootPage = async () => {
  const date = "2024-12-25";
  const time = "13:30";

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

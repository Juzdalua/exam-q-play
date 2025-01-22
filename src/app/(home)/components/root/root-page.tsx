import ArtBoard from "./art-board";
import DaisyCountdown from "./daisy-countdown";
import FullBleedCarousel from "./full-bleed-carousel";
import MapInfo from "./map-info";

const RootPage = async () => {

  return (
    <div className="flex flex-col justify-center">
      <DaisyCountdown/>
      <ArtBoard />
      <FullBleedCarousel />
      <MapInfo />
    </div>
  );
};

export default RootPage;

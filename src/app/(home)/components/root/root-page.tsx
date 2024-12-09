import DDayTimer from "./dday-timer";
import FullBleedCarousel from "./full-bleed-carousel";

const RootPage = async () => {
  const date = "2024-12-25";
  const time = "13:30";

  return (
    <div className="flex flex-col justify-center">
      <DDayTimer date={date} time={time} />
      <FullBleedCarousel />
    </div>
  );
};

export default RootPage;

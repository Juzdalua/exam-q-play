import Link from "next/link";

const MapInfo = () => {
  return (
    <div className="flex justify-center">
      <div className="mt-20 flex flex-col items-center h-[550px] w-[400px]">
        <img className="h-[550px] object-contain rounded-box" src="https://i.imgur.com/Hp6ig72.png" alt="asd" />
        <div className="flex flex-col items-end justify-center w-full pr-10 h-full">
          <span className="text-xl">12321321312</span>
          <span className="text-xl">12321321312</span>
          <Link target="_blank" href={process.env.NEXT_PUBLIC_MAP_URL}>
            <span className="underline underline-offset-1">지도 보기</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MapInfo;
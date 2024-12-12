const ArtBoard = () => {
  return (
    <div className="flex justify-center">
      <div className="mt-20 flex flex-col items-center h-[650px] w-[400px]">
        <img className="h-[550px] object-contain rounded-box" src={process.env.NEXT_PUBLIC_MAIN_PHOTO_URL} alt="asd" />
        <div className="flex flex-col items-end justify-center w-full pr-10 h-full">
          <span className="text-xl">12321321312</span>
          <span className="text-xl">12321321312</span>
        </div>
      </div>
    </div>
  );
};
export default ArtBoard;

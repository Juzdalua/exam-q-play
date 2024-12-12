import { Metadata } from "next";
import RoomMap from "./components/room-map";
import Streaming from "./components/streaming";

export const metadata: Metadata = {
  title: "Room",
};

const Room = () => {


  return (
    <div className="flex flex-col h-full">
      <Streaming />
      <RoomMap />
    </div>
  );
};

export default Room;

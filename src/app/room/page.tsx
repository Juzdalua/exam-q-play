import { Metadata } from "next";
import RoomMap from "./components/room-map";

export const metadata: Metadata = {
  title: "Room",
};

const Room = () => {
  return (
    <div>
      <RoomMap />
    </div>
  );
};

export default Room;

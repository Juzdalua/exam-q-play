"use client";

import { useGlobalContext } from "@/src/components/global-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MAX_ROW = 6;
const MAX_COL = 23;
const enterDoorLeft = [4, 3];
const enterDoorRight = [26, 15];
const map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const spriteImages = {
  down: ["/characters/male_01.png", "/characters/male_02.png", "/characters/male_03.png"],
  left: ["/characters/male_04.png", "/characters/male_05.png", "/characters/male_06.png"],
  right: ["/characters/male_07.png", "/characters/male_08.png", "/characters/male_09.png"],
  up: ["/characters/male_10.png", "/characters/male_11.png", "/characters/male_12.png"],
};

const RoomMap = () => {
  const router = useRouter();
  const { token, setToken } = useGlobalContext();
  const [posY, setPosY] = useState(enterDoorLeft[0]);
  const [posX, setPosX] = useState(enterDoorLeft[1]);
  const [direction, setDirection] = useState("down");
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!token) {
      router.push("/auth/connect");
    }
  }, [router]);

  const handleKeyDown = (e) => {
    setFrame((prev) => (prev + 1) % 3);
    if (e.key === "ArrowUp") {
      setDirection("up");
      if (posY > 0 && map[posY - 1][posX] === 0) setPosY(posY - 1);
    } else if (e.key === "ArrowDown") {
      setDirection("down");
      if (posY < MAX_ROW - 1 && map[posY + 1][posX] === 0) setPosY(posY + 1);
    } else if (e.key === "ArrowLeft") {
      setDirection("left");
      if (posX > 0 && map[posY][posX - 1] === 0) setPosX(posX - 1);
    } else if (e.key === "ArrowRight") {
      setDirection("right");
      if (posX < MAX_COL - 1 && map[posY][posX + 1] === 0) setPosX(posX + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [posX, posY]);

  return (
    <div className="flex justify-center bottom-0">
      <div
        className="grid gap-0"
        style={{
          gridTemplateRows: `repeat(${MAX_ROW}, 60px)`,
          gridTemplateColumns: `repeat(${MAX_COL}, 40px)`,
        }}
      >
        {map.flatMap((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-10 h-15 border ${cell === 1 ? "bg-gray-700" : "bg-gray-300"}`}
              style={{
                position: "relative",
                overflow: "hidden",
              }}
            >
              {rowIndex === posY && colIndex === posX && (
                <img
                  src={spriteImages[direction][frame]} // 현재 방향과 프레임에 따라 이미지 선택
                  alt="character"
                  className="absolute"
                  style={{
                    width: "40px",
                    height: "60px",
                  }}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RoomMap;

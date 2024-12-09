"use client";

import { useState, useEffect } from "react";

interface DDayTimerProps {
  date: string;
  time: string;
  //targetDate: string; // ISO 형식 (e.g., "2024-12-10T00:00:00")
}

const ConvertStringDay = (day: number) => {
  switch (day) {
    case 0:
      return "Sun";
    case 1:
      return "Mon";
    case 2:
      return "Tue";
    case 3:
      return "Wed";
    case 4:
      return "Thu";
    case 5:
      return "Fri";
    case 6:
      return "Sat";
  }
};

const ConvertFullStringDay = (day: number) => {
  switch (day) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
  }
};

const DDayTimer = ({ date, time }: DDayTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  const targetDate = `${date}T${time}:00`;
  const targetDateTemp = new Date(targetDate);

  useEffect(() => {
    const targetTime = new Date(targetDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      // d-
      if (difference >= 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft(`D-${days} ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
      }

      // d+
      else {
        const daysPassed = Math.floor(Math.abs(difference) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((Math.abs(difference) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((Math.abs(difference) % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((Math.abs(difference) % (1000 * 60)) / 1000);

        setTimeLeft(`D+${daysPassed} ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
      }
    };

    const timerId = setInterval(updateTimer, 1000);

    return () => clearInterval(timerId);
  }, [targetDate]);

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <div className="text-xl mb-5">{`${date.split("-")[0]}.${date.split("-")[1]}.${date.split("-")[2]}. ${ConvertStringDay(targetDateTemp.getDay())} ${
        time.split(":")[0]
      }:${time.split(":")[1]}`}</div>
      <div className="text-xl">{timeLeft}</div>
    </div>
  );
};

export default DDayTimer;

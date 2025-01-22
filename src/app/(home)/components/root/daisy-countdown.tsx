"use client";

import { useEffect, useState } from "react";

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

const DaisyCountdown = () => {
  const [targetDateTime, setTargetDateTime] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  useEffect(() => {
    const date = process.env.NEXT_PUBLIC_HOME_DDAY_DATE;
    const time = process.env.NEXT_PUBLIC_HOME_DDAY_TIME;

    const targetDate = new Date(`${date}T${time}:00`);
    setTargetDateTime(targetDate.getTime());
  }, []);

  useEffect(() => {
    if (!targetDateTime) return;

    const interval = setInterval(() => {
      const timeLeft = targetDateTime - Date.now();
      setRemainingTime(timeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDateTime]);

  const isPast = remainingTime < 0;
  const absRemainingTime = Math.abs(remainingTime);

  const days = Math.floor(absRemainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((absRemainingTime / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((absRemainingTime / (1000 * 60)) % 60);
  const seconds = Math.floor((absRemainingTime / 1000) % 60);

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <div className="text-xl mb-5">
        {`${process.env.NEXT_PUBLIC_HOME_DDAY_DATE?.split("-")[0]}.${process.env.NEXT_PUBLIC_HOME_DDAY_DATE?.split("-")[1]}.${
          process.env.NEXT_PUBLIC_HOME_DDAY_DATE?.split("-")[2]
        }. ${ConvertStringDay(new Date(`${process.env.NEXT_PUBLIC_HOME_DDAY_DATE}T${process.env.NEXT_PUBLIC_HOME_DDAY_TIME}:00`).getDay())} ${
          process.env.NEXT_PUBLIC_HOME_DDAY_TIME?.split(":")[0]
        }:${process.env.NEXT_PUBLIC_HOME_DDAY_TIME?.split(":")[1]}`}
      </div>
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <div className="flex flex-col items-center align-middle font-mono ">
            <span className="text-5xl">{days}</span>
            days
          </div>
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": hours } as React.CSSProperties}></span>
          </span>
          hours
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": minutes } as React.CSSProperties}></span>
          </span>
          min
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": seconds } as React.CSSProperties}></span>
          </span>
          sec
        </div>
      </div>
      <div className="text-2xl mt-4 font-bold">{isPast ? `D+${days}` : `D-${days}`}</div>
    </div>
  );
};

export default DaisyCountdown;

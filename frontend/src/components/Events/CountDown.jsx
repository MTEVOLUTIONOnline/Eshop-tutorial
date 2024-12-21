import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../server";

const CountDown = ({ data }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    if (
      !timeLeft.hours &&
      !timeLeft.minutes &&
      !timeLeft.seconds
    ) {
      axios.delete(`${server}/event/delete-shop-event/${data._id}`);
    }

    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const difference = +new Date(data.Finish_Date) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  const formatTime = (value) => (value < 10 ? `0${value}` : value); // Adiciona zero à esquerda se necessário

  return (
    <div className="text-[25px] text-[#475ad2] font-mono">
      {timeLeft.hours || timeLeft.minutes || timeLeft.seconds ? (
        <>
          {formatTime(timeLeft.hours)} : {formatTime(timeLeft.minutes)} : {formatTime(timeLeft.seconds)}
        </>
      ) : (
        <span className="text-[red]">00 : 00 : 00</span>
      )}
    </div>
  );
};

export default CountDown;

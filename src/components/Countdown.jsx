import React from "react";

export const Countdown = (props) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="relative flex justify-center items-center">
        <div className="w-[100px] h-[100px] bg-radial from-[#FF1515] to-transparent rounded-full opacity-35 blur-xl"></div>
        <div className="w-[100px] h-[100px] rounded-2xl flex font text-2xl text-[#FF1515] justify-center items-center absolute border-[#FF1515]/15 rotate-45 border-[4px]">
          <p className="-rotate-45">{props.num}</p>
        </div>
      </div>
      <div className="font stroked-text-light text-2xl text-transparent">
        {props.text}
      </div>
    </div>
  );
};

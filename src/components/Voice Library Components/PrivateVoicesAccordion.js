import React, { useEffect } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaRegClone } from "react-icons/fa6";
import { IoIosAdd } from "react-icons/io";
import { IoSync } from "react-icons/io5";
import { useState } from "react";

export default function PrivateVoicesAccordion({ privateButtonClicked }) {
  const [className, setClassName] = useState("");

  useEffect(() => {
    if (privateButtonClicked) {
      setClassName("rotate-90");
    } else {
      setClassName("rotate-0");
    }
  }, [privateButtonClicked]);

  return (
    <div className="dark:bg-[#1D232A] bg-[#FFFFFF] w-full rounded-2xl p-3 flex flex-col gap-2 hover:bg-[#E8E9EB] dark:hover:bg-[#2B3039] hover:cursor-pointer">
      <div className="grid grid-cols-[0.5fr_3fr_3fr] items-center">
        <MdOutlineKeyboardArrowRight className={`text-2xl ${className}`} />
        <p className="font-semibold text-left text-sm">
          Private Voices <span className="text-xs">(924/924)</span>
        </p>
        <div className="grid grid-rows-3 gap-2 sm:flex sm:gap-2 sm:justify-end">
          <button className="p-2 bg-[#FFFFFF] dark:bg-[#191E24] text-xs font-semibold flex items-center justify-center gap-1 border border-black hover:bg-[#F2F2F2] dark:border-white dark:hover:bg-[#2B3039] rounded-xl">
            <FaRegClone /> Clone
          </button>
          <button className="p-2 bg-[#FFFFFF] dark:bg-[#191E24] text-xs font-semibold flex items-center justify-center gap-1 border border-black hover:bg-[#F2F2F2] dark:border-white dark:hover:bg-[#2B3039] rounded-xl">
            <IoIosAdd /> Add
          </button>
          <button className="p-2 bg-[#FFFFFF] dark:bg-[#191E24] text-xs font-semibold flex items-center justify-center gap-1 border border-black hover:bg-[#F2F2F2] dark:border-white dark:hover:bg-[#2B3039] rounded-xl">
            <IoSync /> Sync
          </button>
        </div>
      </div>
      <div className="text-left">
        <p className="text-xs">
          These voices were manually added from the ElevenLabs Voice Library to
          Vapi's ElevenLabs Account. To use your own private voices, add your
          credentials.
        </p>
      </div>
    </div>
  );
}

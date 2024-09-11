import React from "react";
import SearchDropdown from "../../components/Voice Library Components/SearchDropdown";
import GenderDropdown from "../../components/Voice Library Components/GenderDropdown";
import AccentDropdown from "../../components/Voice Library Components/AccentDropdown";

export default function ControlDiv() {
  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#1D232A] p-5 rounded-2xl sm:grid sm:grid-cols-2 sm:gap-2 md:flex md:gap-2">
      <div className="flex flex-col w-full gap-2">
        <p className="text-sm">Search</p>
        <SearchDropdown />
      </div>
      <div className="flex flex-col w-full gap-2">
        <p className="text-sm">Gender</p>
        <GenderDropdown />
      </div>
      <div className="flex flex-col w-full gap-2">
        <p className="text-sm">Accent</p>
        <AccentDropdown />
      </div>
    </div>
  );
}

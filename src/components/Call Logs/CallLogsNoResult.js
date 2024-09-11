import React from "react";
import { TbZoomExclamation } from "react-icons/tb";

export default function CallLogsNoResult() {
  return (
    <div className="h-5/6 flex flex-col justify-center">
      <div className="w-full flex justify-center">
        <TbZoomExclamation className="text-5xl" />
      </div>
      <div className="w-full flex flex-col items-center">
        <p className="w-1/2 font-semibold text-center">
          No results found in this batch of logs.
        </p>
        <p className="w-1/2 text-center">
          You can load another batch of logs and see if you can find what you
          are looking for or clear filters to go back.
        </p>
      </div>
    </div>
  );
}

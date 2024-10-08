import React from "react";
import { MdOutlineUpdate } from "react-icons/md";
import { toast } from "react-toastify";

export default function PublishUpdatedPhoneNumber({
  setIsPublishUpdatedPhoneNumber,
  phoneNumberId,
  phoneNumberObj,
}) {
  const handleupdatePhoneNumber = async () => {
    let result = null;
    const raw = JSON.stringify({
      fallbackDestination: {
        type: "number",
        numberE164CheckEnabled:
          phoneNumberObj.fallbackDestination.numberE164CheckEnabled,
        number: phoneNumberObj.fallbackDestination.number,
        extension: phoneNumberObj.fallbackDestination.extension,
        callerId: phoneNumberObj.fallbackDestination.callerId,
        message: phoneNumberObj.fallbackDestination.message,
        description: phoneNumberObj.fallbackDestination.description,
      },
      name: phoneNumberObj.name,
      assistantId: phoneNumberObj.assistantId,
      squadId: phoneNumberObj.squadId,
      serverUrl: phoneNumberObj.serverUrl,
      serverUrlSecret: phoneNumberObj.serverUrlSecret,
    });
    try {
      const options = {
        method: "PATCH",
        headers: {
          Authorization: "Bearer e39adb17-33cb-472b-87c2-97f7ee91139f",
          "Content-Type": "application/json",
        },
        body: raw,
      };
      const response = await fetch(
        `https://api.vapi.ai/phone-number/${phoneNumberId}`,
        options
      );
      result = await response.json();
      if (response.ok) {
        if (result) {
          console.log("Updated Phone Number: ", result);
          toast.success("Published Successfully!");
          setIsPublishUpdatedPhoneNumber(false);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      id="updateModal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed pt-96 md:pt-20 inset-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <button
            type="button"
            onClick={() => setIsPublishUpdatedPhoneNumber(false)}
            className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <MdOutlineUpdate className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
          <p className="mb-4 text-gray-500 dark:text-gray-300">
            Are you sure you want to update this item?
          </p>
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={() => setIsPublishUpdatedPhoneNumber(false)}
              type="button"
              className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancel
            </button>
            <button
              type="submit"
              className="py-2 px-3 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-900"
              onClick={handleupdatePhoneNumber}
            >
              Yes, I'm sure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

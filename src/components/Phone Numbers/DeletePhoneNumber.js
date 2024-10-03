import React from "react";
import { API_URL, VAPI_API_URL } from "../../store";
import { toast } from "react-toastify";

export default function DeletePhoneNumber({
  deletePhoneNumberId,
  setShowDeletePhoneNumber,
  userId,
  setShowPhoneNoDetail,
}) {
  const deletePhoneNumberFromVapi = () => {
    const url = `${VAPI_API_URL}phone-number/${deletePhoneNumberId}`;
    const options = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer e39adb17-33cb-472b-87c2-97f7ee91139f",
      },
    };

    console.log("Fetching URL:", url);
    console.log("Options:", options);

    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to delete phone number: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((result) => {
        toast.success("Phone Number deleted successfully");
        // setPhoneNumbers(phoneNumbers.filter((no) => no.id !== phoneNumberId));
        // setShowPhoneNoDetail(false);
      })
      .catch((error) => {
        console.error("Error deleting phone number:", error);
        toast.error("Failed to delete phone number");
      });
  };

  const deletePhoneNumberFromServer = async () => {
    try {
      const response = await fetch(
        API_URL + "api/users/delete-phone-number/" + userId,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumberId: deletePhoneNumberId,
          }),
        }
      );
      const result = await response.json();
      if (response.ok) {
        console.log("Result: ", result);
        setShowDeletePhoneNumber(false);
        setShowPhoneNoDetail(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePhoneNumber = () => {
    deletePhoneNumberFromVapi();
    deletePhoneNumberFromServer();
  };

  return (
    <>
      <div
        id="deleteModal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed pt-96 md:pt-20 inset-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          {/* Modal content */}
          <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <button
              type="button"
              onClick={() => setShowDeletePhoneNumber(false)}
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
            <svg
              className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <p className="mb-4 text-gray-500 dark:text-gray-300">
              Are you sure you want to delete this item?
            </p>
            <div className="flex justify-center items-center space-x-4">
              <button
                onClick={() => setShowDeletePhoneNumber(false)}
                type="button"
                className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
              <button
                type="submit"
                className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                onClick={handleDeletePhoneNumber}
              >
                Yes, I'm sure
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

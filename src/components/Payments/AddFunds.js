import React, { useState, useEffect } from "react";
import { API_URL } from "../../store";
import axios from "axios";
import { toast } from "react-toastify";

const AddFunds = ({ isModalOpen, setIsModalOpen, setLoading }) => {
  const userId = JSON.parse(localStorage.getItem("user")).id;
  const [fundsAmount, setFundsAmount] = useState(0);
  const [showError, setShowError] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleYesButton = async () => {
    if (fundsAmount >= 10) {
      setShowError(false);

      // Load the PayPal SDK
      try {
        const { data: clientId } = await axios.get(
          API_URL + "api/payments/get-client-id"
        );
        const script = document.createElement("script");
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
        script.async = true;
        script.onload = () => setSdkReady(true);
        document.body.appendChild(script);
      } catch (err) {
        console.error(err);
      }
    } else {
      setShowError(true);
    }
  };

  useEffect(() => {
    if (sdkReady) {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: fundsAmount,
                  },
                },
              ],
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
              sendUserIdAndTransactionInfo();
              toggleModal();
            });
          },
          onError: (err) => {
            console.error(err);
          },
        })
        .render("#paypal-button-container");
    }
  }, [sdkReady, fundsAmount]);

  const sendUserIdAndTransactionInfo = async () => {
    let result = null;
    const amount = parseInt(fundsAmount);
    console.log(typeof amount);
    try {
      const response = await fetch(
        API_URL + `api/payments/transaction-amount/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Ensure the server knows you're sending JSON
          },
          body: JSON.stringify({
            amount: amount, // Ensure 'amount' matches what the backend expects
          }),
        }
      );

      result = await response.json();
      if (response.ok) {
        if (result) {
          console.log("Transaction amount sent response: ", result);
          toast.success("Transaction Successful!");
          setLoading(true);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {isModalOpen && (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={toggleModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>

              <div className="flex flex-col gap-5 p-4 md:p-5 text-center">
                <div className="divider text-white">
                  <h1 className="text-xl font-semibold text-black dark:text-white">
                    Add Funds
                  </h1>
                </div>
                <div className="w-full">
                  <p className="text-black dark:text-white">
                    Enter the amount below which you want to send.
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="addFunds"
                    className="block text-black dark:text-white"
                  >
                    Enter Amount:
                  </label>
                  <div className="flex items-center gap-2">
                    $
                    <input
                      type="number"
                      id="addFunds"
                      className="block w-16 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-black focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      required
                      value={fundsAmount}
                      onChange={(e) => setFundsAmount(e.target.value)}
                    />
                  </div>
                </div>
                {showError && (
                  <>
                    <p className="text-red-600 text-lg font-semibold">
                      The minimum amount to send is $10!
                    </p>
                  </>
                )}
                <div className="w-full flex justify-center gap-5">
                  <button
                    onClick={toggleModal}
                    type="button"
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    No, cancel
                  </button>
                  <button
                    onClick={handleYesButton}
                    type="button"
                    className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  >
                    Yes, I'm sure
                  </button>
                </div>

                {/* PayPal button container */}
                <div id="paypal-button-container"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddFunds;

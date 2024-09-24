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
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 overflow-y-auto"
        >
          <div className="relative p-6 w-full max-w-lg max-h-full">
            <div className="relative bg-white dark:bg-[#14171A] rounded-lg shadow-lg">
              {/* Close Button */}
              <button
                type="button"
                className="absolute top-4 right-4 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-2 transition-colors dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={toggleModal}
              >
                <svg
                  className="w-5 h-5"
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

              {/* Modal Content */}
              <div className="p-6 md:p-8 text-center">
                <h1 className="text-2xl font-semibold text-black dark:text-white mb-6">
                  Add Funds
                </h1>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                  Please enter the amount to add:
                </p>

                {/* Input Section */}
                <div className="flex justify-center items-center mb-6">
                  <input
                    type="number"
                    id="addFunds"
                    className="w-32 text-center border border-gray-300 bg-gray-50 rounded-lg p-2.5 text-black focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required
                    value={fundsAmount}
                    onChange={(e) => setFundsAmount(e.target.value)}
                  />
                </div>

                {/* Error Message */}
                {showError && (
                  <p className="text-red-600 text-lg font-semibold mb-6">
                    The minimum amount to send is $10!
                  </p>
                )}

                {/* Action Buttons */}
                <div className="flex justify-center gap-4 mb-4">
                  <button
                    onClick={toggleModal}
                    type="button"
                    className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                  >
                    No, cancel
                  </button>
                  <button
                    onClick={handleYesButton}
                    type="button"
                    className="py-2.5 px-5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
                  >
                    Yes, I'm sure
                  </button>
                </div>

                {/* PayPal Button Container */}
                <div id="paypal-button-container" className="mt-4"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddFunds;

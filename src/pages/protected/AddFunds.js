import React, { useEffect, useState } from "react";
import { setPageTitle } from "../../features/common/headerSlice";
import { useDispatch } from "react-redux";
import "../../components/Add Funds/CardNumberInput.css";
import Billing from "../../features/settings/billing";

const AddFunds = () => {
  const dispatch = useDispatch();
  const [fundsToTransfer, setFundsToTransfer] = useState(10);
  const [totalAmount, setTotalAmount] = useState(0);
  const [fullName, setFullName] = useState("");
  const [cardNumber, setCardNumber] = useState(0);
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState(0);

  useEffect(() => {
    dispatch(setPageTitle({ title: "Add Funds" }));
  }, [dispatch]);

  useEffect(() => {
    if (fundsToTransfer < 10) {
      setTotalAmount(10);
    } else {
      setTotalAmount(fundsToTransfer);
    }
  }, [fundsToTransfer]);

  const handleInputChange = (e, index) => {
    const value = e.target.value;

    if (value.length <= 4) {
      let newCardNumber = [...cardNumber];
      newCardNumber[index] = value;
      setCardNumber(newCardNumber);

      // Move to next input when 4 digits are entered
      if (value.length === 4 && index < 3) {
        document.getElementById(`card-input-${index + 1}`).focus();
      }
    }
  };

  const handleCardExpirationDate = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove any non-digit characters

    if (value.length >= 3) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4); // Add "/" after the month
    }
    setExpiryDate(value);
  };

  const handleSubmit = () => {
    console.log("Hello!!");
  };

  return (
    <>
      {/*mt-6 flex flex-col gap-10 sm:mt-8 lg:flex-row lg:items-start lg:gap-12*/}
      <div className="w-full flex flex-col gap-10 mb-10">
        <div className="mt-6 grow sm:mt-8 lg:mt-0">
          <div className="space-y-4 rounded-lg bg-[#FFFFFF] p-6 dark:bg-[#1D232A]">
            <h1 className="text-xl font-semibold">Enter Funds Amount</h1>
            <div className="divider"></div>
            <div className="space-y-2">
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                  <label htmlFor="fundsAmount">Funds</label>
                </dt>
                <dd className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                  ${" "}
                  <input
                    name="fundsAmount"
                    id="fundsAmount"
                    type="number"
                    className="block w-20 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    required
                    placeholder="$100"
                    value={fundsToTransfer}
                    onChange={(e) => setFundsToTransfer(e.target.value)}
                  />
                </dd>
              </dl>
            </div>

            <dl className="flex items-center justify-between gap-4 pt-4">
              <dt className="text-base font-semibold text-gray-900 dark:text-white">
                Total
              </dt>
              <dd className="text-xl font-bold text-gray-900 dark:text-white">
                $ {totalAmount}
              </dd>
            </dl>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full rounded-lg bg-[#FFFFFF] p-4 dark:bg-[#1D232A] sm:p-6 lg:p-8" // lg:max-w-xl sm:max-h-[350px]
        >
          <h1 className="text-xl font-semibold">Card Details</h1>
          <div className="divider"></div>
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="full_name"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Full name (as displayed on card)*
              </label>
              <input
                type="text"
                id="full_name"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                placeholder="Bonnie Green"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="card-number-input"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Card number*
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="card-input-0"
                  className="block w-14 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder="0000"
                  value={cardNumber[0]}
                  onChange={(e) => handleInputChange(e, 0)}
                  maxLength="4"
                  required
                />
                -
                <input
                  type="number"
                  id="card-input-1"
                  className="block w-14 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder="0000"
                  value={cardNumber[1]}
                  onChange={(e) => handleInputChange(e, 1)}
                  maxLength="4"
                  required
                />
                -
                <input
                  type="number"
                  id="card-input-2"
                  className="block w-14 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder="0000"
                  value={cardNumber[2]}
                  onChange={(e) => handleInputChange(e, 2)}
                  maxLength="4"
                  required
                />
                -
                <input
                  type="number"
                  id="card-input-3"
                  className="block w-14 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder="0000"
                  value={cardNumber[3]}
                  onChange={(e) => handleInputChange(e, 3)}
                  maxLength="4"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="card-expiration-input"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Card expiration*
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                  <svg
                    className="h-4 w-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="card-expiration-input"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-9 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="MM/YY"
                  value={expiryDate}
                  maxLength="5" // Limit to 5 characters (MM/YY)
                  onChange={handleCardExpirationDate}
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="cvv-input"
                className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                CVV*
                <button
                  data-tooltip-target="cvv-desc"
                  data-tooltip-trigger="hover"
                  className="text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
                >
                  <svg
                    className="h-4 w-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div
                  id="cvv-desc"
                  role="tooltip"
                  className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                >
                  The last 3 digits on back of card
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
              </label>
              <input
                type="text"
                id="cvv-input"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                placeholder="•••"
                required
                maxLength="4"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-lg bg-[#4A00FF] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#3F00E7] focus:outline-none focus:ring-4  focus:ring-blue-300 dark:bg-[#7480FF] dark:hover:bg-[#646EE4] dark:focus:ring-[#5763e8]"
          >
            Pay now
          </button>
        </form>
      </div>
      <Billing />
    </>
  );
};

export default AddFunds;

import React, { useEffect, useState } from "react";
import { setPageTitle } from "../../features/common/headerSlice";
import { useDispatch } from "react-redux";
import "../../components/Payments/CardNumberInput.css";
import Billing from "../../features/settings/billing";
import AddFunds from "../../components/Payments/AddFunds";
import { API_URL } from "../../store";
import { toast } from "react-toastify";
import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";
import TitleCard from "../../components/Cards/TitleCard";

const Payments = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const userId = JSON.parse(localStorage.getItem("user")).id;
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [lastTransactionDateTime, setLastTransactionDateTime] = useState("");

  useEffect(() => {
    dispatch(setPageTitle({ title: "Payments" }));
  }, [dispatch]);

  useEffect(() => {
    let result = null;

    const fetchTransactionHistory = async () => {
      try {
        const response = await fetch(
          API_URL + `api/payments/transaction-history/${userId}`,
          {
            methods: "GET",
          }
        );
        result = await response.json();
        if (response.ok) {
          if (result) {
            console.log("Transaction History: ", result);
            setTransactionHistory(result.transactionHistory);
            setCurrentBalance(result.currentBalance);
            setLastTransactionDateTime(result.lastTransaction);
            setLoading(false);
          } else {
            setLoading(false);
            toast.warning("No data Found!!");
          }
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchTransactionHistory();
  }, [userId, loading]);

  const handleAddFundsButton = () => {
    setShowAddFunds(true);
  };

  return (
    <>
      {loading ? (
        <>
          <div className="w-full h-full flex justify-center items-center">
            <span className="loading loading-spinner loading-lg bg-[#4A00FF] dark:bg-[white]"></span>
          </div>
        </>
      ) : (
        <>
          <div className="w-full flex justify-end gap-3">
            <button
              className="h-8 text-white bg-[#4A00FF] hover:bg-[#3F00E7] font-medium rounded-lg text-sm px-3 py-2.5 text-center flex justify-center items-center dark:bg-[#7480FF] dark:hover:bg-[#646EE4] "
              onClick={handleAddFundsButton}
            >
              $ Add Balance
            </button>
            <button
              className="h-8 text-white mr-4 bg-[#4A00FF] hover:bg-[#3F00E7] font-medium rounded-lg text-sm px-3 py-2.5 text-center flex  items-center dark:bg-[#7480FF] dark:hover:bg-[#646EE4] "
              onClick={() => setLoading(true)}
            >
              <ArrowPathIcon className="w-4 mr-2" />
              Refresh Data
            </button>
          </div>
          <div className="dark:bg-[#14171A] bg-white p-6 rounded-3xl mt-5">
            <h3 className="text-xl font-medium dark:text-white text-gray-800">
              Total Balance
            </h3>
            <div className="flex mt-2 flex-row justify-between">
              <h2 className="text-5xl font-extrabold text-[#4A00FF] dark:text-white ">
                {currentBalance.toFixed(2)} $
              </h2>
            </div>

            <ul className="text-gray-800 dark:text-white mt-4 space-y-4">
              <li className="flex flex-wrap gap-4 text-sm font-bold ">
                {" "}
                {lastTransactionDateTime && (
                  <>
                    <h1 className="flex flex-row">
                      <span className="font-normal">
                        last transaction was at {""}
                        <span className="text-[#4A00FF] dark:text-white font-semibold">
                          {new Date(lastTransactionDateTime).toLocaleTimeString(
                            [],
                            { hour: "2-digit", minute: "2-digit", hour12: true }
                          )}
                        </span>
                      </span>

                      <span className="ml-1 font-normal">
                        on {""}
                        <span className="text-[#4A00FF] dark:text-white font-semibold">
                          {new Date(lastTransactionDateTime).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "long", day: "numeric" }
                          )}
                        </span>
                      </span>
                    </h1>
                  </>
                )}
              </li>
            </ul>
          </div>
          {/* <div className="w-full dark:bg-[#1D232A] p-5 rounded-2xl flex justify-between mb-10 text-xl font-semibold">
            <div className="flex flex-col pr-2 gap-3">
              <h1 className="text-2xl">
                Current Balance:
                <span className="font-extrabold"> ${currentBalance}</span>
              </h1>
              {lastTransactionDateTime && (
                <>
                  <h1 className="flex flex-col">
                    Last Transaction:
                    <span className="ml-10 font-normal">
                      {" "}
                      Date:{" "}
                      <strong>{lastTransactionDateTime.split("T")[0]}</strong>
                    </span>
                  </h1>
                </>
              )}
            </div>
            <div className="flex gap-3 justify-end">
              <button
                className="h-10 text-white bg-[#4A00FF] hover:bg-[#3F00E7] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center dark:bg-[#7480FF] dark:hover:bg-[#646EE4] dark:focus:ring-[#5763e8]"
                onClick={handleAddFundsButton}
              >
                Add Funds
              </button>
            </div>
          </div> */}
          <br />
          <Billing transactionHistory={transactionHistory} />
          {showAddFunds && (
            <>
              <AddFunds
                isModalOpen={showAddFunds}
                setIsModalOpen={setShowAddFunds}
                setLoading={setLoading}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default Payments;

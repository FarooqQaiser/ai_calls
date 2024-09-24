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
            <span className="loading loading-spinner loading-lg bg-[#4A00FF] dark:bg-white"></span>
          </div>
        </>
      ) : (
        <>
          <div className="w-full dark:bg-[#1D232A] p-5 rounded-2xl flex justify-between mb-10 text-xl font-semibold">
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
              {/* <button
                className="h-10 text-white bg-[#4A00FF] hover:bg-[#3F00E7] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center dark:bg-[#7480FF] dark:hover:bg-[#646EE4] dark:focus:ring-[#5763e8]"
                onClick={() => setLoading(true)}
              >
                <ArrowPathIcon className="w-4 mr-2" />
                Refresh Data
              </button> */}
            </div>
          </div>
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

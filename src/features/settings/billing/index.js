import { useState } from "react";
import { FaArrowDownShortWide } from "react-icons/fa6";

function Billing({ transactionHistory }) {
  const [isLatestFirst, setIsLatestFirst] = useState(true);

  const getPaymentStatus = (status) => {
    if (status === "Paid")
      return <div className="badge badge-success">{status}</div>;
    if (status === "Pending")
      return <div className="badge badge-primary">{status}</div>;
    else return <div className="badge badge-ghost">{status}</div>;
  };

  const sortedTransactions = [...transactionHistory].sort((a, b) => {
    return isLatestFirst
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date);
  });

  const toggleSortOrder = () => {
    setIsLatestFirst(!isLatestFirst);
  };

  return (
    <>
      <div className="dark:bg-[#14171A] bg-white dark:text-white text-gray-800 p-6 items-center text-center justify-center rounded-3xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Transaction History</h2>
          <button
            className="btn btn-sm btn-primary text-white"
            onClick={toggleSortOrder}
          >
            {isLatestFirst ? (
              <FaArrowDownShortWide />
            ) : (
              <FaArrowDownShortWide className="rotate-180" />
            )}
          </button>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="table w-full justify-between text-center">
            <thead>
              <tr className="text-gray-800 dark:text-white">
                <th className="w-10">Sr</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.map((transaction, index) => (
                <tr key={index}>
                  <td className="w-10">{index + 1}</td>
                  <td>$ {transaction.amount.toFixed(2)}</td>
                  <td>
                    {new Date(transaction.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td>
                    {new Date(transaction.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Billing;

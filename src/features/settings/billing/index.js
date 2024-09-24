import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import { showNotification } from "../../common/headerSlice";
import { API_URL } from "../../../store";

function Billing({ transactionHistory }) {
  const getPaymentStatus = (status) => {
    if (status === "Paid")
      return <div className="badge badge-success">{status}</div>;
    if (status === "Pending")
      return <div className="badge badge-primary">{status}</div>;
    else return <div className="badge badge-ghost">{status}</div>;
  };

  return (
    <>
      <TitleCard title="Billing History" topMargin="mt-0">
        <div className="overflow-x-auto w-full">
          <table className="table w-full text-center">
            <thead>
              <tr>
                <th className="w-10">Sr#</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {transactionHistory.map((transaction, index) => {
                return (
                  <tr key={index}>
                    <td className="w-10">{index + 1}</td>
                    <td>${transaction.amount}</td>
                    <td>{transaction.date.split("T")[0]}</td>
                    <td>{transaction.date.split("T")[1].split(".")[0]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Billing;

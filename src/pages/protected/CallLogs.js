import React, { useEffect, useState } from "react";
import { IoCopy } from "react-icons/io5";
import { toast } from "react-toastify";
import { DATA } from "../../components/Call Logs/CallLogData";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { VAPI_API_URL } from "../../store";
import CallLogsNoResult from "../../components/Call Logs/CallLogsNoResult";

const CallLogs = () => {
  const [isCallLogs, setIsCallLogs] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // setData(DATA);
    getCallLogs();
  }, []);

  useEffect(() => {
    dispatch(setPageTitle({ title: "Call Logs" }));
  }, []);

  const handleCopyButton = (callID) => {
    let isCopy = navigator.clipboard.writeText(callID);
    if (isCopy) {
      toast.success(`Call ID Copied to Clipboard`);
    }
  };

  const getCallLogs = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${process.env.REACT_APP_TOKEN}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(VAPI_API_URL + "call", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("calls", result);
        if (result.length > 0) {
          setData(result);
          setIsCallLogs(true);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      {isCallLogs ? (
        <>
          <table className="text-sm w-full bg-[#FFFFFF] p-5 dark:bg-[#1D232A] rounded-2xl">
            <tr className="">
              <th className="font-semibold text-center border-r border-r-gray-600 p-2">
                Type
              </th>
              <th className="font-semibold text-center border-r border-r-gray-600 p-2">
                Call ID
              </th>
              <th className="font-semibold text-center border-r border-r-gray-600 p-2">
                Call Cost
              </th>
              <th className="font-semibold text-center border-r border-r-gray-600 p-2">
                Ended Reason
              </th>
              {/* <th className="font-semibold text-center border-r border-r-gray-600 p-2">
                Assistant
              </th> */}
              <th className="font-semibold text-center border-r border-r-gray-600 p-2">
                Phone Number
              </th>
              <th className="font-semibold text-center border-r border-r-gray-600 p-2">
                Customer
              </th>
              {/* <th className="font-semibold text-center p-2">
                Call Times & Duration
              </th> */}
            </tr>
            {data.map((item, index) => {
              return (
                <>
                  <tr key={index} className="border-t border-t-gray-600">
                    <td
                      key={index}
                      className="text-left border-r border-r-gray-600 p-2"
                    >
                      <p className="dark:bg-[#191E24] bg-[#F2F2F2] text-center p-2 rounded-lg">
                        {item.type}
                      </p>
                    </td>
                    <td className="text-left border-r border-r-gray-600">
                      <div className="flex flex-row justify-center items-center">
                        <input
                          type="type"
                          readOnly
                          name="callID"
                          value={item.id}
                          className="dark:bg-[#191E24] bg-[#F2F2F2] text-center px-1 py-2 rounded-l-lg"
                        />
                        <button
                          className="dark:bg-[#191E24] bg-[#F2F2F2] rounded-r-lg pr-1 py-2.5"
                          onClick={() => handleCopyButton(item.id)}
                        >
                          <IoCopy />
                        </button>
                      </div>
                    </td>
                    <td className="text-left border-r border-r-gray-600 p-2">
                      <p className="dark:bg-[#191E24] bg-[#F2F2F2] text-center p-2 rounded-lg">
                        ${item.cost}
                      </p>
                    </td>
                    <td className="text-left border-r border-r-gray-600 p-2">
                      <p className="bg-green-800 text-white text-center p-1 rounded-xl">
                        {item.endedReason}
                      </p>
                    </td>
                    {/* <td className="text-left border-r border-r-gray-600 p-2">
                      <p className="dark:bg-[#191E24] bg-[#F2F2F2] text-center p-2 rounded-lg">
                        {item.name}
                      </p>
                    </td> */}
                    <td className="text-left border-r border-r-gray-600 p-2">
                      <p className="dark:bg-[#191E24] bg-[#F2F2F2] text-center p-2 rounded-lg">
                        {item.phoneNumber?.twilioPhoneNumber
                          ? item.phoneNumber?.twilioPhoneNumber
                          : ""}
                      </p>
                    </td>
                    <td className="text-left border-r border-r-gray-600 p-2">
                      <p className="dark:bg-[#191E24] bg-[#F2F2F2] text-center p-2 rounded-lg">
                        {item.customer?.number ? item.customer?.number : ""}
                      </p>
                    </td>
                    {/* <td className="text-left p-2">
                      <p className="dark:bg-[#191E24] bg-[#F2F2F2] text-center p-2 rounded-lg">
                         {item.callTimeDuration}
                      </p>
                    </td> */}
                  </tr>
                </>
              );
            })}
          </table>
        </>
      ) : (
        <>
          <CallLogsNoResult />
        </>
      )}
    </>
  );
};

export default CallLogs;

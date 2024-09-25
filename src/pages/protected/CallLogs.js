import React, { useEffect, useState } from "react";
import { IoCopy } from "react-icons/io5";
import { toast } from "react-toastify";
import { DATA } from "../../components/Call Logs/CallLogData";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { VAPI_API_URL } from "../../store";
import CallLogsNoResult from "../../components/Call Logs/CallLogsNoResult";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";

const CallLogs = () => {
  const [isCallLogs, setIsCallLogs] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showCallLogsNoResult, setShowCallLogsNoResult] = useState(false);

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    // if (getToken) {
    //   getAllUsers()
    //   getAllGroupNames()
    //   setToken(getToken)
    // }
    if (!getToken) {
      navigate("/login");
    }
  }, [navigate]);

  // useEffect(() => {
  //   // setData(DATA);
  //   getCallLogs();
  // }, []);

  useEffect(() => {
    dispatch(setPageTitle({ title: "Call Logs" }));
  }, [dispatch]);

  const handleCopyButton = (callID) => {
    let isCopy = navigator.clipboard.writeText(callID);
    if (isCopy) {
      toast.success(`Call ID Copied to Clipboard`);
    }
  };

  const getCallLogs = async () => {
    let result = null;

    try {
      const options = {
        method: "GET",
        headers: {
          Authorization: "Bearer e39adb17-33cb-472b-87c2-97f7ee91139f",
        },
      };
      const response = await fetch("https://api.vapi.ai/call", options);
      result = await response.json();
      if (response.ok) {
        if (result) {
          console.log("List of Call Logs: ", result);
          setData(result);
          setIsCallLogs(true);
        } else {
          setShowCallLogsNoResult(true);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCallLogs();
  }, []);

  const handleDuration = (item, index) => {
    const startedAt = moment(
      item.startedAt.split("T")[1].split(".")[0],
      "hh:mm:ss"
    );
    const updatedAt = moment(
      item.updatedAt.split("T")[1].split(".")[0],
      "hh:mm:ss"
    );
    const diffInMs = updatedAt.diff(startedAt);
    const durationInSeconds =
      " - (Duration: " + Math.floor(diffInMs / 1000) + "s) - ";

    const duration = document.querySelector(`.duration${index}`);
    if (duration.innerHTML === "...") {
      duration.innerHTML = durationInSeconds;
    } else {
      duration.innerHTML = "...";
    }
  };

  return (
    <>
      {isCallLogs ? (
        <>
          <table className="text-sm w-full bg-[#FFFFFF] p-5 dark:bg-[#14171A] rounded-2xl">
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
              <th className="font-semibold text-center p-2">
                Call Times & Duration
              </th>
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
                        {item.phoneNumber ? (
                          <>
                            {item.phoneNumber?.twilioPhoneNumber
                              ? item.phoneNumber?.twilioPhoneNumber
                              : ""}
                          </>
                        ) : (
                          <>Empty</>
                        )}
                      </p>
                    </td>
                    <td className="text-left border-r border-r-gray-600 p-2">
                      <p className="dark:bg-[#191E24] bg-[#F2F2F2] text-center p-2 rounded-lg">
                        {item.customer ? (
                          <>
                            {item.customer?.number ? item.customer?.number : ""}
                          </>
                        ) : (
                          <>Empty</>
                        )}
                      </p>
                    </td>
                    <td className="text-left p-2">
                      <p className="dark:bg-[#191E24] bg-[#F2F2F2] text-center p-2 rounded-lg">
                        {item.startedAt.split("T")[0]}
                        <button
                          className={`duration${index} p-1 rounded-lg hover:text-[#35978B]`}
                          onClick={() => handleDuration(item, index)}
                        >
                          ...
                        </button>
                        {item.updatedAt.split("T")[0]}
                      </p>
                    </td>
                  </tr>
                </>
              );
            })}
          </table>
        </>
      ) : (
        <>
          <div className="w-full h-full flex justify-center items-center">
            <span className="loading loading-spinner loading-lg bg-[#4A00FF] dark:bg-white"></span>
          </div>
          {showCallLogsNoResult && <CallLogsNoResult />}
        </>
      )}
    </>
  );
};

export default CallLogs;

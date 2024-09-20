import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
import { openModal } from "../../features/common/modalSlice";
import { FaMobileRetro } from "react-icons/fa6";
import { LuAlertTriangle } from "react-icons/lu";
import PublishIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import PlusICon from "@heroicons/react/24/outline/PlusCircleIcon";
import PhoneICon from "@heroicons/react/24/outline/PhoneIcon";
import { setPageTitle } from "../../features/common/headerSlice";
import { CCard, CCardBody, CFormSelect } from "@coreui/react";
import { IoCopy } from "react-icons/io5";
import { toast } from "react-toastify";
import { API_URL, VAPI_API_URL } from "../../store";
import { useNavigate } from "react-router-dom";
import { phoneNumberDataPayload } from "../../components/Phone Numbers/DataPayload";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import PublishUpdatedPhoneNumber from "../../components/Phone Numbers/PublishUpdatedPhoneNumber";
import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";

const PhoneNumbers = () => {
  const dispatch = useDispatch();
  // const [showImport, setShowImport] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPhoneNoDetail, setShowPhoneNoDetail] = useState(false);
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState({});
  const [phoneNumberId, setPhoneNumberId] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [assistants, setAssistants] = useState([]);
  const navigate = useNavigate();
  const [isPublishUpdatedPhoneNumber, setIsPublishUpdatedPhoneNumber] =
    useState(false);
  const [showImportNumber, setShowImportNumber] = useState(false);
  const phoneNumberObj = phoneNumberDataPayload;
  const [assistantId, setAssistantId] = useState("");
  const [label, setLabel] = useState("");
  // const [callerId, setCallerId] = useState("");
  // const [description, setDescription] = useState("");
  // const [extension, setExtension] = useState("");
  // const [message, setMessage] = useState("");
  const [number, setNumber] = useState(0);
  // const [numberE164CheckEnabled, setNumberE164CheckEnabled] = useState(false);
  // const type = "number";
  // const [name, setName] = useState("");
  // const [serverUrl, setServerUrl] = useState("");
  // const [serverUrlSecret, setServerUrlSecret] = useState("");
  // const [squadId, setSquadId] = useState("");
  const userId = JSON.parse(localStorage.getItem("user")).id;

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
  //   setCurrentPhoneNumber(
  //     phoneNumbers.filter((no) => no.id === phoneNumberId)[0]
  //   );
  // }, [phoneNumberId, phoneNumbers]);

  useEffect(() => {
    dispatch(setPageTitle({ title: "Phone Numbers" }));

    const fetchPhoneNumbers = async () => {
      setLoading(true);
      let result = null;
      try {
        const response = await fetch(
          API_URL + `api/users/get-users-phone-numbers/${userId}`,
          {
            method: "GET",
          }
        );
        result = await response.json();
        if (response.ok) {
          if (result) {
            setLoading(false);
            setPhoneNumbers(result);
            console.log("Result: ", result);
            // setCurrentPhoneNumber(result[0]);
            setPhoneNumberId(result[0].id);
            setShowPhoneNoDetail(true);
          } else {
            setLoading(false);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchPhoneNumbers();

    const fetchAssistants = async () => {
      let result = null;
      try {
        const response = await fetch(
          API_URL + `api/users/get-users-assistant/${userId}`,
          {
            method: "GET",
          }
        );
        result = await response.json();
        if (response.ok) {
          if (result) {
            setAssistants(result);
            console.log("Assistants: ", result);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchAssistants();
  }, [dispatch, showPhoneNoDetail, userId]);

  useEffect(() => {
    let result = null;

    const fetchSinglePhoneNumber = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            Authorization: "Bearer e39adb17-33cb-472b-87c2-97f7ee91139f",
          },
        };
        const response = await fetch(
          `https://api.vapi.ai/phone-number/${phoneNumberId}`,
          options
        );
        result = await response.json();
        if (response.ok) {
          if (result) {
            console.log("Single phone number: ", result);
            setCurrentPhoneNumber(result);
            setLabel(result.name);
            setNumber(result.number);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (phoneNumberId) {
      fetchSinglePhoneNumber();
    }
  }, [phoneNumberId, phoneNumbers]);

  useEffect(() => {
    phoneNumberObj.assistantId = assistantId;
    phoneNumberObj.name = label;
    if (number) {
      phoneNumberObj.fallbackDestination.number = number;
    }
  }, [phoneNumberObj, assistantId, number, label]);

  const openImportNumberModal = () => {
    dispatch(
      openModal({
        title: "Import Number",
        bodyType: MODAL_BODY_TYPES.IMPORT_NUMBER,
        showDetail: showPhoneNoDetail,
        setShowDetail: setShowPhoneNoDetail,
      })
    );
  };
  const handleCopyButton = (callID) => {
    let isCopy = navigator.clipboard.writeText(callID);
    if (isCopy) {
      toast.success(`Copied to Clipboard`);
    }
  };

  const handleDeletePhoneNumber = (phoneNumberId) => {
    const url = `${VAPI_API_URL}phone-number/${phoneNumberId}`;
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
        setShowPhoneNoDetail(false);
      })
      .catch((error) => {
        console.error("Error deleting phone number:", error);
        toast.error("Failed to delete phone number");
      });
  };

  const handlePublishButton = () => {
    if (number === 0) {
      toast.error("Please enter Fallback Number!");
    } else if (assistantId === "") {
      toast.error("Please select an assistant!");
    } else {
      setIsPublishUpdatedPhoneNumber(true);
    }
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
          <div className="flex h-screen overflow-hidden">
            <div className="w-full overflow-hidden">
              {showPhoneNoDetail ? (
                <div className="flex flex-col md:flex-row h-screen">
                  <div
                    data-testid="assistant-menu"
                    className="border-r border-border w-full max-h-[250px] md:w-[280px] md:h-full overflow-y-auto"
                  >
                    <div className="flex sticky p-2 top-0 border-b border-border bg-foreground/5 backdrop-blur-lg">
                      <button
                        type="button"
                        disabled
                        onClick={() => openImportNumberModal()}
                        className="w-full opacity-50 mr-3 text-white bg-[#5D17EB] hover:bg-[#4c2992] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center dark:bg-[#5D17EB] dark:hover:bg-[#4c2992] dark:focus:ring-[#4c2992]"
                      >
                        Buy Number
                      </button>
                      <button
                        type="button"
                        onClick={() => openImportNumberModal()}
                        className="w-full text-white bg-[#5D17EB] hover:bg-[#4c2992] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center dark:bg-[#5D17EB] dark:hover:bg-[#4c2992] dark:focus:ring-[#4c2992]"
                      >
                        Import
                        <PlusICon className="w-5 h-5 ml-3" />
                      </button>
                    </div>
                    <p className="text-xs text-yellow-600 pt-2 italic">
                      Please add card details to Buy a Number
                    </p>
                    <div
                      role="list"
                      data-testid="phoneNumbers-list"
                      className="flex-col w-full pt-4 hide-scrollbar gap-y-2"
                    >
                      {phoneNumbers &&
                        phoneNumbers.length > 0 &&
                        phoneNumbers.map((no, index) => (
                          <div
                            key={index}
                            className={`group flex flex-col p-2 rounded-lg w-full border border-transparent hover:bg-background/50 cursor-pointer transition-all duration-150 ease-in-out ${
                              currentPhoneNumber?.number === no.number
                                ? "bg-primary/10"
                                : ""
                            }`}
                            onClick={() => setPhoneNumberId(no.id)}
                          >
                            <div className="flex justify-between items-center transition-all duration-150 ease-in-out">
                              <div className="flex flex-col justify-between items-start">
                                <div className="ellipsis-text font-semibold text-sm text-text">
                                  {no.number}
                                </div>
                                <div className="flex gap-1.5 items-center overflow-hidden">
                                  <p className="ellipsis-text text-sm text-text/40"></p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="p-4 flex-1 overflow-auto">
                    <div className="flex flex-col items-start mb-3">
                      <div className="ellipsis-text font-bold text-xl mb-1 flex w-full justify-between">
                        {currentPhoneNumber?.number}
                        {/* <div className="flex justify-end md:w-[320px] bg-foreground/5 backdrop-blur-sm">
                          <button
                            className="text-white bg-[#4A00FF] hover:bg-[#3F00E7] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center dark:bg-[#7480FF] dark:hover:bg-[#646EE4] dark:focus:ring-[#5763e8]"
                            onClick={() => setLoading(true)}
                          >
                            <ArrowPathIcon className="w-4 mr-2" />
                            Refresh Data
                          </button>
                        </div> */}
                      </div>
                      <div className="font-bold text-xs">Twilio Number</div>
                      <div className="text-left my-2 flex flex-col gap-2 w-full md:flex-row md:gap-0 justify-between">
                        <div className="flex flex-row">
                          <input
                            type="text"
                            readOnly
                            name="callID"
                            value={
                              currentPhoneNumber ? currentPhoneNumber.id : ""
                            }
                            className="bg-white dark:bg-[#14171A] text-center p-2 rounded-l-lg"
                          />
                          <button
                            className="bg-white dark:bg-[#14171A] rounded-r-lg p-2"
                            onClick={() =>
                              handleCopyButton(currentPhoneNumber?.id)
                            }
                            aria-label="Copy ID"
                          >
                            <IoCopy />
                          </button>
                        </div>
                        <div className="relative flex group mr-5">
                          <button
                            type="button"
                            className="w-auto mr-2 text-white bg-[#4A00FF] hover:bg-[#3F00E7] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center flex justify-center items-center dark:bg-[#7480FF] dark:hover:bg-[#646EE4] dark:focus:ring-[#5763e8]"
                            onClick={handlePublishButton}
                          >
                            <PublishIcon className="w-5 h-5 mr-2" />
                            Publish
                          </button>
                          <button
                            type="button"
                            className="py-2.5 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            onClick={() =>
                              handleDeletePhoneNumber(currentPhoneNumber.id)
                            }
                            aria-label="Delete Phone Number"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                          {/* <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-max p-2 text-sm text-white bg-gray-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Delete Number
                      </span> */}
                        </div>
                      </div>
                      <div className="text-xs">
                        This number was imported from your Twilio account.
                      </div>
                    </div>
                    <div className="bg-white dark:bg-[#14171A] p-3 mt-3 rounded-xl">
                      <CCard>
                        <CCardBody className="bg-background/80">
                          <h1 className="font-extrabold text-lg text-black dark:text-white">
                            Inbound Settings
                          </h1>
                          <p className="text-sm mt-1">
                            You can assign an assistant to the phone number so
                            that whenever someone calls this phone number, the
                            assistant will automatically be assigned to the
                            call.
                          </p>
                          <div>
                            <label className="mb-2 mt-3 text-sm font-medium text-gray-900 dark:text-white flex justify-start items-center">
                              Inbound Phone Number
                            </label>
                            <input
                              type="text"
                              id="inbound_phone_number"
                              className="text-sm rounded-lg block w-full p-2.5 mb-3 bg-base-200 cursor-not-allowed"
                              placeholder=""
                              required
                              readOnly
                              value={currentPhoneNumber?.number}
                            />
                          </div>
                          <div className="mt-3">
                            <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white flex justify-start items-center">
                              Assistant
                            </label>
                            <CFormSelect
                              className="text-sm rounded-lg block w-full p-2.5 mb-3 bg-base-200"
                              onChange={(e) => {
                                setAssistantId(e.target.value);
                              }}
                            >
                              <option value="">Select an assistant</option>
                              {assistants.map((assistant) => (
                                <option key={assistant.id} value={assistant.id}>
                                  {assistant.name}
                                </option>
                              ))}
                            </CFormSelect>
                          </div>
                          <div className="mt-3">
                            <label className="mb-2 text-gray-900 dark:text-white flex flex-col justify-start items-start">
                              <span className="mb-1 text-sm font-medium">
                                Fallback Destination
                              </span>
                              <span className="text-xs">
                                Set a fallback destination for inbound calls.
                              </span>
                            </label>
                            <input
                              type="text"
                              id="fallback_destination"
                              className="text-sm rounded-lg block w-full p-2.5 mb-3 bg-base-200"
                              placeholder="Enter a Phone number"
                              value={number}
                              onChange={(e) => {
                                const input = e.target.value;
                                const numericValue = input.replace(
                                  /[^0-9]/g,
                                  ""
                                );
                                setNumber(numericValue);
                              }}
                              required
                            />
                          </div>
                        </CCardBody>
                      </CCard>
                    </div>
                    <div className="bg-white dark:bg-[#14171A] p-3 my-4 rounded-xl">
                      <CCard>
                        <CCardBody className="bg-background/80">
                          <h1 className="font-extrabold text-lg text-black dark:text-white">
                            Outbound Form
                          </h1>
                          <p className="text-sm mt-1">
                            You can assign an outbound phone number, set up a
                            fallback destination, and set up a squad to be
                            called if the assistant is not available.
                          </p>
                          <div className="mt-3">
                            <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white flex justify-start items-start">
                              Outbound Phone Number
                            </label>
                            <input
                              type="text"
                              id="outbound_phone_number"
                              className="text-sm rounded-lg block w-full p-2.5 mb-3 bg-base-200"
                              placeholder="Enter a Phone number"
                              required
                            />
                          </div>
                          <div className="mt-3">
                            <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white flex justify-start items-center">
                              Assistant
                            </label>
                            <CFormSelect className="text-sm rounded-lg block w-full p-2.5 mb-3 bg-base-200">
                              <option value="">Select an assistant</option>
                              {assistants.map((assistant) => (
                                <option key={assistant.id} value={assistant.id}>
                                  {assistant.name}
                                </option>
                              ))}
                            </CFormSelect>
                          </div>
                          <div className="mt-3">
                            <label className="mb-2 text-gray-900 dark:text-white flex flex-col justify-start items-start">
                              <span className="mb-1 text-sm font-medium">
                                Fallback Destination
                              </span>
                              <span className="text-xs">
                                Set a fallback destination for outbound calls.
                              </span>
                            </label>
                            <input
                              type="text"
                              id="fallback_destination_outbound"
                              className="text-sm rounded-lg block w-full p-2.5 mb-3 bg-base-200"
                              placeholder="Enter a Phone number"
                              // value={}
                              required
                            />
                          </div>
                        </CCardBody>
                      </CCard>
                    </div>
                  </div>
                  {isPublishUpdatedPhoneNumber && (
                    <>
                      <PublishUpdatedPhoneNumber
                        setIsPublishUpdatedPhoneNumber={
                          setIsPublishUpdatedPhoneNumber
                        }
                        phoneNumberId={phoneNumberId}
                        phoneNumberObj={phoneNumberObj}
                      />
                    </>
                  )}
                </div>
              ) : (
                <div className="flex h-screen items-center justify-center overflow-hidden">
                  <div className="text-center">
                    <div
                      data-testid="assistant-menu"
                      className="border-r border-border w-[280px] h-full overflow-y-auto"
                    >
                      <div className="flex sticky p-2 top-0 border-b border-border bg-foreground/5 backdrop-blur-lg">
                        <button
                          type="button"
                          disabled
                          onClick={() => openImportNumberModal()}
                          className="w-full opacity-50 mr-3 text-white bg-[#5D17EB] hover:bg-[#4c2992] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center dark:bg-[#5D17EB] dark:hover:bg-[#4c2992] dark:focus:ring-[#4c2992]"
                        >
                          Buy Number
                        </button>
                        <button
                          type="button"
                          onClick={() => openImportNumberModal()}
                          className="w-full text-white bg-[#5D17EB] hover:bg-[#4c2992] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center dark:bg-[#5D17EB] dark:hover:bg-[#4c2992] dark:focus:ring-[#4c2992]"
                        >
                          Import
                          <PlusICon className="w-5 h-5 ml-3" />
                        </button>
                      </div>
                      <p className="text-xs text-yellow-600 pt-2 italic">
                        Please add card details to Buy a Number
                      </p>
                      <div
                        role="list"
                        data-testid="phoneNumbers-list"
                        className="flex-col w-full pt-4 hide-scrollbar gap-y-2"
                      >
                        {phoneNumbers &&
                          phoneNumbers.length > 0 &&
                          phoneNumbers.map((no, index) => (
                            <div
                              key={index}
                              className={`group flex flex-col p-2 rounded-lg w-full border border-transparent hover:bg-background/50 cursor-pointer transition-all duration-150 ease-in-out ${
                                currentPhoneNumber?.number === no.number
                                  ? "bg-primary/10"
                                  : ""
                              }`}
                              onClick={() => setPhoneNumberId(no.id)}
                            >
                              <div className="flex justify-between items-center transition-all duration-150 ease-in-out">
                                <div className="flex flex-col justify-between items-start">
                                  <div className="ellipsis-text font-semibold text-sm text-text">
                                    {no.number}
                                  </div>
                                  <div className="flex gap-1.5 items-center overflow-hidden">
                                    <p className="ellipsis-text text-sm text-text/40"></p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PhoneNumbers;

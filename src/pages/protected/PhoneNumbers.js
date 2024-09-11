import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
import { openModal } from "../../features/common/modalSlice";
import { FaMobileRetro } from "react-icons/fa6";
import { LuAlertTriangle } from "react-icons/lu";
import PlusICon from "@heroicons/react/24/outline/PlusCircleIcon";
import PhoneICon from "@heroicons/react/24/outline/PhoneIcon";
import { setPageTitle } from "../../features/common/headerSlice";
import { CCard, CCardBody, CFormSelect } from "@coreui/react";
import { IoCopy } from "react-icons/io5";
import { toast } from "react-toastify";
import { VAPI_API_URL } from "../../store";

const PhoneNumbers = () => {
  const dispatch = useDispatch();
  // const [showImport, setShowImport] = useState(true);
  const [showPhoneNoDetail, setShowPhoneNoDetail] = useState(true);
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState({});
  const [phoneNumberId, setPhoneNumberId] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState([]);

  useEffect(() => {
    setCurrentPhoneNumber(
      phoneNumbers.filter((no) => no.id == phoneNumberId)[0]
    );
  }, [phoneNumberId]);

  useEffect(() => {
    dispatch(setPageTitle({ title: "Phone Numbers" }));
    getPhoneNumbers();
  }, []);

  useEffect(() => {
    console.log("showPhoneNoDetail changed");
  }, [showPhoneNoDetail]);

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
  const getPhoneNumbers = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${process.env.REACT_APP_TOKEN}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(VAPI_API_URL + "phone-number", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("phone numbers", result);
        setPhoneNumbers(result);
        setCurrentPhoneNumber(result[0]);
        setPhoneNumberId(result[0].id);
      })
      .catch((error) => console.error(error));
  };
  return (
    <>
      {!showPhoneNoDetail && (
        <div className="h-screen flex flex-col justify-center items-center relative z-0">
          <div class="flex justify-center items-center w-[330px]">
            <div class="text-left text-muted-foreground will-change-auto">
              <div
                class="flex justify-left will-change-auto transform-none"
                style={{ opacity: "1", filter: "blur(0px)" }}
              >
                <FaMobileRetro className="w-16 h-16" />
              </div>
              <h2
                class="text-xl font-medium text-text will-change-auto transform-none"
                style={{ opacity: "1", filter: "blur(0px)" }}
              >
                Phone Numbers
              </h2>
              <p
                class="text-md text-text/40 mb-4 will-change-auto transform-none"
                style={{ opacity: "1", filter: "blur(0px)" }}
              >
                Assistants are able to be connected to phone numbers for calls.{" "}
              </p>
              <p
                class="text-md text-text/40 will-change-auto transform-none"
                style={{ opacity: "1", filter: "blur(0px)" }}
              >
                You can import from Twilio, vonage, or by one directly from Vapi
                for use with your assistants.{" "}
              </p>
            </div>
          </div>
          <div className="flex justify-start items-center my-3 ml-28">
            <button
              type="button"
              disabled
              className="w-auto mr-3 opacity-50 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Buy Number
              <PlusICon className="w-5 h-5 ml-3" />
            </button>
            <button
              type="button"
              onClick={() => openImportNumberModal()}
              className="w-auto mr-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Import
              <PlusICon className="w-5 h-5 ml-3" />
            </button>
            <button
              type="button"
              className="w-auto mr-3 bg-background focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center"
            >
              Documentation
            </button>
          </div>
          <div
            class="flex items-center p-3 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
            role="alert"
          >
            <LuAlertTriangle className="w-5 h-5 text-yellow-600 mr-3" />
            <div>
              Please add{" "}
              <a href="/" className="hover:underline">
                card detail
              </a>{" "}
              to buy a number
            </div>
          </div>
        </div>
      )}
      {showPhoneNoDetail && (
        <div className="flex justify-start h-full">
          <div
            data-testid="assistant-menu"
            className="border-r border-border hide-scrollbar h-[200px] sm:h-full w-full sm:max-w-[320px]"
          >
            <div className="flex sticky p-2 top-0 border-b border-border bg-foreground/5 backdrop-blur-lg">
              <button
                type="button"
                disabled
                onClick={() => openImportNumberModal()}
                className="w-full opacity-50 mr-3  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Buy Number
              </button>
              <button
                type="button"
                onClick={() => openImportNumberModal()}
                className="w-full  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
              className="flex-col w-full sm:max-w-[320px] pt-4 hide-scrollbar gap-y-2 hidden sm:flex"
            >
              {phoneNumbers &&
                phoneNumbers.length > 0 &&
                phoneNumbers.map((no, index) => (
                  <div
                    className={`group flex flex-col p-2 rounded-lg w-full border border-transparent hover:bg-background/50 cursor-pointer transition-all duration-150 ease-in-out ${
                      currentPhoneNumber?.number == no.number
                        ? "bg-primary/10"
                        : ""
                    }`}
                    onClick={() => setPhoneNumberId(no.id)}
                  >
                    <div className="flex justify-between items-center  transition-all duration-150 ease-in-out">
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
          <div className="p-4">
            <div className="flex justify-start flex-col items-start mb-3">
              <div className="ellipsis-text font-bold text-xl mb-1">
                {currentPhoneNumber?.number}
              </div>
              <div className="font-bold text-xs">Twilio Number</div>
              <div className="text-left my-2">
                <div className="flex flex-row">
                  <input
                    type="type"
                    readOnly
                    name="callID"
                    value="84ah887nb-hdb7nb-ddb89"
                    className="bg-gray-200 dark:bg-[#14171A] text-center p-2 rounded-l-lg"
                  />
                  <button
                    className="bg-gray-200 dark:bg-[#14171A] rounded-r-lg p-2"
                    onClick={() => handleCopyButton("84ah887nb-hdb7nb-ddb89")}
                  >
                    <IoCopy />
                  </button>
                </div>
              </div>
              <div className="text-xs">
                This number was imported from your twilio account.
              </div>
            </div>
            <div className="bg-gray-200 dark:bg-[#14171A] p-3 mt-3 rounded-xl border">
              <CCard>
                <CCardBody className="bg-background/80">
                  <h1 className="font-extrabold">Inbound Settings</h1>
                  <p>
                    You can assign an assistant to the phone number so that
                    whenever someone calls this phoneNumber the assistant will
                    automatically be assigned to the call.
                  </p>
                  <div className="rounded-xl p-3 bg-gray-200 dark:bg-[#1A1C1F] border-[#1A1C1F] dark:border-bg-gray-300 shadow border mt-3">
                    <div>
                      <label class="mb-2 text-sm font-medium text-gray-900 dark:text-white flex justify-start items-center">
                        Inbound Phone Number
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        class="text-sm rounded-lg block w-full p-2.5 mb-3"
                        placeholder=""
                        required
                        value={currentPhoneNumber?.number}
                      />
                    </div>
                    <hr />
                    <div className="mt-3">
                      <label class="mb-2 text-sm font-medium text-gray-900 dark:text-white flex justify-start items-center">
                        Assistant
                      </label>
                      <CFormSelect class="text-sm rounded-lg block w-full p-2.5 mb-3">
                        <option>Select Assistant</option>
                        <option value="1" selected>
                          Auto master
                        </option>
                        <option value="2">Two</option>
                        <option value="3" disabled>
                          Three
                        </option>
                      </CFormSelect>
                    </div>
                    <hr />
                    <div className="mt-3">
                      <label class="mb-2 text-gray-900 dark:text-white flex flex-col justify-start items-start">
                        <span className="mb-1 text-sm font-medium">
                          Fallback Destination
                        </span>
                        <span className="text-xs">
                          Set a fallback destination for inbound call.
                        </span>
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        class="text-sm rounded-lg block w-full p-2.5 mb-3"
                        placeholder="Enter a Phone number"
                        required
                      />
                    </div>
                  </div>
                </CCardBody>
              </CCard>
            </div>
            <div className="bg-gray-200 dark:bg-[#14171A] p-3 my-4 rounded-xl border">
              <CCard>
                <CCardBody className="bg-background/80">
                  <h1 className="font-extrabold">Outbound Form</h1>
                  <p>
                    You can assign an outbound phone number, setup a fallback
                    and setup a squad to be called if the assistant is not
                    available.
                  </p>
                  <div className="rounded-xl p-3 bg-gray-200 dark:bg-[#1A1C1F] border-[#1A1C1F] dark:border-bg-gray-300 shadow border mt-3">
                    <div className="mt-3">
                      <label class="mb-2 text-sm font-medium text-gray-900 dark:text-white flex justify-start items-start">
                        Outbound Phone Number
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        class="text-sm rounded-lg block w-full p-2.5 mb-3"
                        placeholder="Enter a Phone number"
                        required
                      />
                    </div>
                    <hr />
                    <div className="mt-3">
                      <label class="mb-2 text-sm font-medium text-gray-900 dark:text-white flex justify-start items-center">
                        Assistant
                      </label>
                      <CFormSelect class="text-sm rounded-lg block w-full p-2.5 mb-3">
                        <option>Select Assistant..</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3" disabled>
                          Three
                        </option>
                      </CFormSelect>
                    </div>
                    <hr />
                    <div className="mt-3">
                      <label class="mb-2 text-gray-900 dark:text-white flex flex-col justify-start items-start">
                        <span className="mb-1 text-sm font-medium">Squad</span>
                        <span className="text-xs">
                          If the assistant is not available, the call be routed
                          to the specific squad.
                        </span>
                      </label>
                      <CFormSelect class="text-sm rounded-lg block w-full p-2.5 mb-3">
                        <option>Select Squad..</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3" disabled>
                          Three
                        </option>
                      </CFormSelect>
                    </div>
                    <hr />
                    <button
                      type="button"
                      onClick={() => openImportNumberModal()}
                      disabled
                      className="w-auto mt-3 opacity-50 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <PhoneICon className="w-5 h-5 mr-2" />
                      Outbound Call
                    </button>
                  </div>
                </CCardBody>
              </CCard>
            </div>
            <br />
            <br />
          </div>
        </div>
      )}
    </>
  );
};

export default PhoneNumbers;

import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { addNewLead } from "../../leads/leadSlice";
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane } from "@coreui/react";

const INITIAL_TWILIO_OBJ = {
  phone_number: "",
  account_sid: "",
  auth_token: "",
  label: "",
};
const INITIAL_VONAGE_OBJ = {
  phone_number: "",
  api_key: "",
  api_secret: "",
  label: "",
};

function ImportNumber({ closeModal, showDetail, setShowDetail }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [twilioObj, setTwilioObj] = useState(INITIAL_TWILIO_OBJ);
  const [vonageObj, setVonageObj] = useState(INITIAL_VONAGE_OBJ);
  const [activeKey, setActiveKey] = useState("twilio");

  const handleChange = useCallback(() => {
    setShowDetail(!showDetail);
  }, [setShowDetail]);

  const importFromTwilio = () => {
    if (twilioObj.account_sid.trim() === "")
      return setErrorMessage("Twilio account SID is required!");
    else if (twilioObj.auth_token.trim() === "")
      return setErrorMessage("Twilio auth token is required!");
    else if (twilioObj.label.trim() === "")
      return setErrorMessage("Label is required");
    else if (twilioObj.phone_number.trim() === "")
      return setErrorMessage("Phone number is required");
    else {
      let twilioImportObj = {
        phone_number: twilioObj.phone_number,
        account_sid: twilioObj.account_sid,
        auth_token: twilioObj.auth_token,
        label: twilioObj.label,
      };
      //   dispatch(addNewLead({ newLeadObj }));
      console.log(twilioImportObj);
      dispatch(
        showNotification({ message: "Phone number imported", status: 1 })
      );
      closeModal();
      // setShowDetail();
      handleChange();
    }
  };
  const importFromVonage = () => {
    if (vonageObj.api_key.trim() === "")
      return setErrorMessage("API Key is required!");
    else if (vonageObj.api_secret.trim() === "")
      return setErrorMessage("API secret is required!");
    else if (vonageObj.label.trim() === "")
      return setErrorMessage("Label is required");
    else if (vonageObj.phone_number.trim() === "")
      return setErrorMessage("Phone number is required");
    else {
      let vonageImportObj = {
        phone_number: vonageObj.phone_number,
        api_key: vonageObj.api_key,
        api_secret: vonageObj.api_secret,
        label: vonageObj.label,
      };
      //   dispatch(addNewLead({ newLeadObj }));
      console.log(vonageImportObj);
      dispatch(
        showNotification({ message: "Phone number imported", status: 1 })
      );
      closeModal();
    }
  };

  const updateTwilioFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setTwilioObj({ ...twilioObj, [updateType]: value });
  };

  const updateVonageFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setVonageObj({ ...vonageObj, [updateType]: value });
  };

  return (
    <>
      <CNav
        variant="pills"
        role="tablist"
        class="items-center justify-center text-muted-foreground p-1.5 gap-x-2 bg-background/80 backdrop-blur-lg rounded-xl shadow-sm shadow-black/20 grid w-auto grid-cols-2"
      >
        <CNavItem>
          <CNavLink
            href="#!"
            active={activeKey === "twilio"}
            onClick={() => setActiveKey("twilio")}
            class={`w-full inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1 text-sm font-medium hover:bg-hover disabled:pointer-events-none disabled:opacity-50 focus:border ${
              activeKey == "twilio"
                ? "shadow text-primary border border-border bg-gray-200 dark:bg-[#1C1E21] "
                : ""
            } border-transparent flex-1 cursor-pointer`}
          >
            Twilio
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="#!"
            active={activeKey === "vonage"}
            onClick={() => setActiveKey("vonage")}
            class={`w-full inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1 text-sm font-medium hover:bg-hover disabled:pointer-events-none disabled:opacity-50 focus:border ${
              activeKey == "vonage"
                ? "shadow text-primary border bg-gray-200 dark:bg-[#1C1E21] "
                : ""
            } border-transparent flex-1 cursor-pointer`}
          >
            Vonage
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        {activeKey == "twilio" && (
          <CTabPane
            role="tabpanel"
            aria-labelledby="twilio-tab"
            visible={activeKey === "twilio"}
          >
            <InputText
              type="text"
              defaultValue={twilioObj.phone_number}
              updateType="phone_number"
              containerStyle="mt-4"
              labelTitle="Twilio Phone Number"
              updateFormValue={updateTwilioFormValue}
              placeholder="+123456789"
            />
            <InputText
              type="text"
              defaultValue={twilioObj.account_sid}
              updateType="account_sid"
              containerStyle="mt-4"
              labelTitle="Twilio Account SID"
              updateFormValue={updateTwilioFormValue}
              placeholder="Twilio Account SID"
            />
            <InputText
              type="text"
              defaultValue={twilioObj.auth_token}
              updateType="auth_token"
              containerStyle="mt-4"
              labelTitle="Twilio Auth Token"
              updateFormValue={updateTwilioFormValue}
              placeholder="Twilio Auth Token"
            />
            <InputText
              type="text"
              defaultValue={twilioObj.label}
              updateType="label"
              containerStyle="mt-4"
              labelTitle="Label"
              updateFormValue={updateTwilioFormValue}
              placeholder="Label for Phone Number"
            />
            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
              <button className="btn btn-ghost" onClick={() => closeModal()}>
                Cancel
              </button>
              <button
                className="btn btn-primary px-6"
                onClick={() => importFromTwilio()}
              >
                Import from Twilio
              </button>
            </div>
          </CTabPane>
        )}
        {activeKey == "vonage" && (
          <CTabPane
            role="tabpanel"
            aria-labelledby="vonage-tab"
            visible={activeKey === "vonage"}
          >
            <InputText
              type="text"
              defaultValue={vonageObj.phone_number}
              updateType="phone_number"
              containerStyle="mt-4"
              labelTitle="Vonage Phone Number"
              updateFormValue={updateVonageFormValue}
              placeholder="+123456789"
            />
            <InputText
              type="text"
              defaultValue={vonageObj.api_key}
              updateType="api_key"
              containerStyle="mt-4"
              labelTitle="API Key"
              updateFormValue={updateVonageFormValue}
              placeholder="Enter API Key"
            />
            <InputText
              type="text"
              defaultValue={vonageObj.api_secret}
              updateType="api_secret"
              containerStyle="mt-4"
              labelTitle="API Secret"
              updateFormValue={updateVonageFormValue}
              placeholder="Enter API Secret"
            />
            <InputText
              type="text"
              defaultValue={vonageObj.label}
              updateType="label"
              containerStyle="mt-4"
              labelTitle="Label"
              updateFormValue={updateVonageFormValue}
              placeholder="Label for Phone Number"
            />
            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
              <button className="btn btn-ghost" onClick={() => closeModal()}>
                Cancel
              </button>
              <button
                className="btn btn-primary px-6"
                onClick={() => importFromVonage()}
              >
                Import from Vonage
              </button>
            </div>
          </CTabPane>
        )}
      </CTabContent>
    </>
  );
}

export default ImportNumber;

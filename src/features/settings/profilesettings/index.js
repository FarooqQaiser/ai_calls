// import moment from "moment"
// import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"; //, useSelector
import TitleCard from "../../../components/Cards/TitleCard";
import { showNotification } from "../../common/headerSlice";
import InputText from "../../../components/Input/InputText";
// import TextAreaInput from "../../../components/Input/TextAreaInput";
// import ToogleInput from "../../../components/Input/ToogleInput";
import { useState } from "react";

function ProfileSettings() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const dispatch = useDispatch();

  // Call API to update profile settings changes
  const updateProfile = () => {
    dispatch(showNotification({ message: "Profile Updated", status: 1 }));
  };

  const updateFormValue = ({ updateType, value }) => {
    console.log(updateType);
    setUser({ ...user, [updateType]: value });
  };

  return (
    <>
      <TitleCard title="Profile Settings" topMargin="mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputText
            type={"text"}
            updateType={"firstName"}
            labelTitle={"First Name"}
            defaultValue={user.firstName}
            updateFormValue={updateFormValue}
          />
          <InputText
            type={"text"}
            updateType={"lastName"}
            labelTitle={"Last Name"}
            defaultValue={user.lastName}
            updateFormValue={updateFormValue}
          />
          <InputText
            type={"email"}
            updateType={"email"}
            labelTitle={"Email Id"}
            defaultValue={user.email}
            updateFormValue={updateFormValue}
          />
          {/* <InputText
            labelTitle="Title"
            defaultValue="UI/UX Designer"
            updateFormValue={updateFormValue}
          /> */}
          {/* <InputText
            labelTitle="Place"
            defaultValue="California"
            updateFormValue={updateFormValue}
          /> */}
          {/* <TextAreaInput
            labelTitle="About"
            defaultValue="Doing what I love, part time traveller"
            updateFormValue={updateFormValue}
          /> */}
        </div>
        <div className="divider"></div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputText
            labelTitle="Language"
            defaultValue="English"
            updateFormValue={updateFormValue}
          />
          <InputText
            labelTitle="Timezone"
            defaultValue="IST"
            updateFormValue={updateFormValue}
          />
          <ToogleInput
            updateType="syncData"
            labelTitle="Sync Data"
            defaultValue={true}
            updateFormValue={updateFormValue}
          />
        </div> */}

        <div className="">
          {" "}
          {/*mt-16*/}
          <button
            className="btn btn-primary float-right"
            onClick={() => updateProfile()}
          >
            Update
          </button>
        </div>
      </TitleCard>
    </>
  );
}

export default ProfileSettings;

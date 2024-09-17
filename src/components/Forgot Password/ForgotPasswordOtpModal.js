import React, { useEffect, useState } from "react";
import ErrorText from "../Typography/ErrorText";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../../store";
// import { API_URL } from "../../store";

export default function ForgotPasswordOtpModal({ email }) {
  //   const Email = email;
  const [errorMessage, setErrorMessage] = useState("");
  const [inputs, setInputs] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e, nextInputId, prevInputId) => {
    const { value, id, key } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [id]: value,
    }));
    if (value.length === 1 && key !== "Backspace") {
      document.getElementById(nextInputId)?.focus();
    }
    if (key === "Backspace" && value.length === 0) {
      document.getElementById(prevInputId)?.focus();
    }
  };

  const handleSubmit = async () => {
    const combinedValue = Object.values(inputs).join("");
    console.log("Combined Value:", combinedValue);
    console.log("Email mojood ha: ", email);
    try {
      const response = await fetch(`${API_URL}api/users/match-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp: combinedValue,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Incorrect OTP. Please try again.");
      } else {
        console.log(data);
        const user = {
          email: email,
          otp: combinedValue,
        };
        localStorage.setItem("User", JSON.stringify(user));
        navigate("/reset-password");
        toast.success("Verification Completed");
      }
    } catch (error) {
      setErrorMessage(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 py-12 backdrop-blur-sm">
        <div className="relative bg-white dark:bg-[#1D232A] px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your email: {email}</p>
              </div>
            </div>

            <div>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col space-y-6">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-s">
                    {[
                      "input1",
                      "input2",
                      "input3",
                      "input4",
                      "input5",
                      "input6",
                    ].map((id, index) => (
                      <div key={id} className="w-16 h-16">
                        <input
                          className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-400 dark:border-[#555fc9] text-lg bg-white dark:bg-[#14181d] focus:bg-gray-50 focus:ring-1 dark:ring-[#555fc9] ring-[#3F00E7]"
                          type="text"
                          name=""
                          id={id}
                          maxLength="1"
                          value={inputs[id]}
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              `input${index + 2}`,
                              `input${index}`
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <ErrorText styleClass="my-2">{errorMessage}</ErrorText>

                  <div className="flex flex-col space-y-5">
                    <div>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-[#3F00E7] hover:bg-[#5b33ca] dark:bg-[#555fc9] dark:hover:bg-[#464ea5] border-none text-white text-sm shadow-sm"
                      >
                        Verify Account
                      </button>
                    </div>

                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didn't receive the code?</p>
                      <a
                        className="flex flex-row items-center text-[#555fc9]"
                        href="http://"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Resend
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

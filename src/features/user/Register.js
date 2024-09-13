import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LandingIntro from "./LandingIntro";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";
import { API_URL } from "../../store";
import { toast } from "react-toastify";

function Register() {
  const INITIAL_REGISTER_OBJ = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatedPassword: "",
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [registerObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    console.log("Submitting form with data:", registerObj);

    if (registerObj.firstName.trim() === "")
      return setErrorMessage("First Name is required!");
    if (registerObj.lastName.trim() === "")
      return setErrorMessage("Last Name is required!");
    if (registerObj.email.trim() === "")
      return setErrorMessage("Email Id is required!");
    if (registerObj.password.trim() === "")
      return setErrorMessage("Password is required!");
    if (registerObj.repeatedPassword.trim() === "")
      return setErrorMessage("Please repeat your password!");

    try {
      setLoading(true);

      const response = await fetch(API_URL + "api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: registerObj.firstName,
          lastName: registerObj.lastName,
          email: registerObj.email,
          password: registerObj.password,
          repeatedPassword: registerObj.repeatedPassword,
        }),
      });

      setEmail(registerObj.email);
      console.log(email);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed. Please try again."
        );
      }

      setRegisterObj(INITIAL_REGISTER_OBJ);

      if (data.userId) {
        localStorage.setItem("userId", data.userId);
      }

      setShowModal(true);

      toast.success("Email Sent ");

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message || "An error occurred. Please try again.");
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setRegisterObj({ ...registerObj, [updateType]: value });
  };

  const [inputs, setInputs] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
  });

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
    const userId = localStorage.getItem("userId");
    try {
      setLoading(true);
      const response = await fetch(API_URL + `api/users/verify-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          verificationToken: combinedValue,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed. Please try again."
        );
      }
      setShowModal(false);
      toast.success("Verification Completed");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl shadow-xl">
        <div className="grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl">
          {/* <div className="bg-base-100 rounded-xl"> */}
          <div className="">
            <LandingIntro />
          </div>
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">
              Register
            </h2>
            <form onSubmit={submitForm}>
              <div className="mb-4">
                <InputText
                  defaultValue={registerObj.firstName}
                  updateType="firstName"
                  containerStyle="mt-4"
                  labelTitle="First Name"
                  updateFormValue={updateFormValue}
                />
                <InputText
                  defaultValue={registerObj.lastName}
                  updateType="lastName"
                  containerStyle="mt-4"
                  labelTitle="Last Name"
                  updateFormValue={updateFormValue}
                />
                <InputText
                  defaultValue={registerObj.email}
                  type="email"
                  updateType="email"
                  containerStyle="mt-4"
                  labelTitle="Email Id"
                  updateFormValue={updateFormValue}
                />
                <InputText
                  defaultValue={registerObj.password}
                  type="password"
                  updateType="password"
                  containerStyle="mt-4"
                  labelTitle="Password"
                  updateFormValue={updateFormValue}
                />
                <InputText
                  defaultValue={registerObj.repeatedPassword}
                  type="password"
                  updateType="repeatedPassword"
                  containerStyle="mt-4"
                  labelTitle="Repeat Password"
                  updateFormValue={updateFormValue}
                />
              </div>

              <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
              <button
                type="submit"
                className={
                  "btn mt-2 w-full btn-primary" + (loading ? " loading" : "")
                }
              >
                Register
              </button>

              <div className="text-center mt-4">
                Already have an account?{" "}
                <Link to="/login">
                  <span className="inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Login
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 py-12 backdrop-blur-sm">
          <div className="relative bg-white dark:bg-[#1D232A] px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
            <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
              <div className="flex flex-col items-center justify-center text-center space-y-2">
                <div className="font-semibold text-3xl">
                  <p>Email Verification</p>
                </div>
                <div className="flex flex-row text-sm font-medium text-gray-400">
                  <p>We have sent a code to your email ${email}</p>
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
      )}
    </div>
  );
}

export default Register;

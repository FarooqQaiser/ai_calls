import { useState } from "react";
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed. Please try again."
        );
      }
      toast.success("Registration successful! Redirecting...");

      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message || "An error occurred. Please try again.");
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setRegisterObj({ ...registerObj, [updateType]: value });
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
    </div>
  );
}

export default Register;

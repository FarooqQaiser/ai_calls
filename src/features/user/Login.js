import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LandingIntro from "./LandingIntro";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";
import { API_URL } from "../../store";
import { toast } from "react-toastify";

function Login() {
  const INITIAL_LOGIN_OBJ = {
    password: "",
    emailId: "",
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (loginObj.emailId.trim() === "")
      return setErrorMessage("Email Id is required!");
    if (loginObj.password.trim() === "")
      return setErrorMessage("Password is required!");

    setLoading(false);
    navigate("/");
    // try {
    //   setLoading(true);

    //   const response = await fetch(API_URL + "api/users/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       email: loginObj.emailId,
    //       password: loginObj.password,
    //     }),
    //   });

    //   const data = await response.json();
    //   if (!response.ok) {
    //     throw new Error(
    //       data.message || "Login failed. Please check your credentials."
    //     );
    //   }

    //   const { token, user } = data;
    //   localStorage.setItem("token", token);
    //   localStorage.setItem("user", JSON.stringify(user));
    //   const storedUser = JSON.parse(localStorage.getItem("user"));
    //   const userName = storedUser?.firstName;

    //   setLoading(false);
    //   navigate("/");
    //   toast.success(`Welcome ${userName}`, {
    //     position: "top-right",
    //     autoClose: 1000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // } catch (error) {
    //   toast.error(error.message || "An error occurred. Please try again.");
    //   setLoading(false);
    //   setErrorMessage(error.message || "An error occurred. Please try again.");
    // }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLoginObj({ ...loginObj, [updateType]: value });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl shadow-xl">
        <div className="grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl">
          {/* <div className="bg-base-100 rounded-xl"> */}
          <div className="">
            <LandingIntro />
          </div>
          <div className="py-24 px-10 ">
            <h2 className="text-2xl font-semibold mb-2 text-center">Login</h2>
            <form onSubmit={submitForm}>
              <div className="mb-4">
                <InputText
                  type="email"
                  defaultValue={loginObj.emailId}
                  updateType="emailId"
                  containerStyle="mt-4"
                  labelTitle="Email Id"
                  updateFormValue={updateFormValue}
                />
                <InputText
                  type="password"
                  defaultValue={loginObj.password}
                  updateType="password"
                  containerStyle="mt-4"
                  labelTitle="Password"
                  updateFormValue={updateFormValue}
                />
              </div>

              <div className="text-right text-primary">
                <Link to="/forgot-password">
                  <span className="text-sm inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Forgot Password?
                  </span>
                </Link>
              </div>

              {/* <ErrorText styleClass="mt-8">{errorMessage}</ErrorText> */}
              <button
                type="submit"
                className={`btn mt-2 w-full btn-primary `}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <div className="text-center mt-4">
                Don't have an account yet?{" "}
                <Link to="/register">
                  <span className="inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Register
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

export default Login;

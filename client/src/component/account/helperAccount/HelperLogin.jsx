import React, { useEffect } from "react";
// BOOTSTRAP IMPORTS
import { InputGroup, Form, Col } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const HelperLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [messageERROR, setMessageERROR] = useState("");
  const currentYear = new Date().getFullYear();
  const userLanguage = navigator.language;
  const navigate = useNavigate();
  const token = localStorage.getItem("token-helper");
  const helperToken = localStorage.getItem("token-helper");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!email) {
      setEmailError("Email is required");
    } else if (!email.includes("@")) {
      setEmailError("Enter a valid email address");
    } else {
      setEmailError("");
    }
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (!password) {
      setPasswordError("Password is required");
    } else if (password.length < 8) {
      setPasswordError("password must be at least 8 characters");
    } else {
      setPasswordError("");
    }
  };

  const toastNotificationSuccess = (message) => {
    toast.success(message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const toastNotificationError = (message) => {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleLogIn = async (e) => {
    try {
      e.preventDefault();
      const helper = await fetch("/api/v1/auth/helper/login_user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await helper.json();

      if (data?.exist === false) {
        toastNotificationError(data?.errorMessage);
        navigate("/helper/account_register");
      } else if (data?.session) {
        toastNotificationSuccess(data?.message);
        localStorage.setItem("token-helper", data?.session);
        window.location.href = "/account/helper";
      } else {
        toastNotificationError(data?.errorMessage);
        navigate("/account/helper_register", { replace: true });
      }
    } catch (error) {
      setMessageERROR(
        "An unexpected error occurred. Please try again later. Or refresh the page"
      );
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/home", { replace: true });
    } else if (helperToken) {
      navigate("/account/helper", { replace: true });
    }
  }, [token, helperToken, navigate]);

  return (
    <>
      <div className="signup-container">
        <Form
          onSubmit={handleLogIn}
          className="drop-shadow-2xl rounded was-validated"
        >
          <div className="signup-container__top">
            <div className="mb-3">
              <h1 className="signup-container__top-header">Login helper</h1>
              <p className="signup-container__top-para">
                Please provide you details
              </p>
            </div>
            {messageERROR && (
              <p className="text-red-500 mb-1">{messageERROR}</p>
            )}
            <InputGroup as={Col} hasValidation className="mb-3">
              <InputGroup.Text id="basic-addon2" className="rounded-none">
                <i className="fa-solid fa-envelope"></i>
              </InputGroup.Text>
              <Form.Control
                className="rounded-none"
                placeholder="someone@example.com"
                type="email"
                aria-label="email"
                aria-labelledby="basic-addon2"
                name="email"
                value={email}
                onChange={handleEmailChange}
                isValid={!!emailError}
                isInvalid={emailError && emailError}
                required
              />
              {emailError ? (
                <Form.Control.Feedback type="invalid">
                  {emailError}
                </Form.Control.Feedback>
              ) : (
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              )}
            </InputGroup>
            <InputGroup as={Col} hasValidation>
              <InputGroup.Text id="basic-addon3" className="rounded-none">
                <i className="fa-solid fa-lock"></i>
              </InputGroup.Text>
              <Form.Control
                className="rounded-none"
                placeholder="at least 8 characters"
                type="password"
                aria-label="password"
                aria-labelledby="basic-addon3"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                isValid={!!passwordError}
                isInvalid={passwordError && passwordError}
                required
              />
              {passwordError ? (
                <Form.Control.Feedback type="invalid">
                  {passwordError}
                </Form.Control.Feedback>
              ) : (
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              )}
            </InputGroup>
            <p className="opacity-60 text-sm my-2">
              By creating an account you agree to our{" "}
              <span className="text-sky-600">terms</span> and{" "}
              <span className="text-sky-600">conditions</span>
            </p>
            <button
              type="submit"
              className="transition-all duration-700 ease-linear bg-yellow-600 hover:bg-yellow-700 text-white mt-1 flex items-center justify-center  gap-2 border p-2 mb-2 hover:cursor-pointer rounded-lg"
            >
              <i className="fa-solid fa-envelope text-sm"></i>
              <span className="text-md">Continue with email</span>
            </button>
            <Link
              to="/account/helper_login"
              className="transition-all duration-700 ease-linear bg-violet-600 text-white mt-1 flex items-center justify-center  gap-2 border p-2 mb-2 hover:cursor-pointer rounded-lg hover:bg-violet-700"
            >
              <i className="fa-solid fa-car text-sm"></i>
              <span className="text-md">Continue as a helper</span>
            </Link>
            <div className="flex items-center justify-center gap-1 p-2 mb-2">
              <p>Don't have an account with us ?</p>
              <Link
                to="/account/helper_register"
                className="text-md text-yellow-500 hover:text-yellow-600 font-bold"
              >
                Register
              </Link>
            </div>
          </div>
        </Form>
        <p className="absolute mb-3 bottom-0 font-[500] text-l flex items-center gap-2 z-[400]">
          <span className="text-yellow-600 font-bold">Communicatee.</span>{" "}
          copyright &copy;
          <span>{currentYear}</span> <span>{userLanguage}</span>
        </p>
      </div>
    </>
  );
};

import React, { useEffect } from "react";
import { InputGroup, Form, Col } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const HelperRegister = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [messageERROR, setMessageERROR] = useState("");
  const currentYear = new Date().getFullYear();
  const userLanguage = navigator.language;
  const navigate = useNavigate();
  const token = localStorage.getItem("token-helper");
  const helperToken = localStorage.getItem("token-helper");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (!username.trim()) {
      setUsernameError("Username is required");
    } else {
      setUsernameError("");
    }
  };
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
  const handleMobileChange = (e) => {
    setMobile(e.target.value);

    if (!mobile) {
      setMobileError("Mobile number is required");
    } else {
      setMobileError("");
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
      progress: undefined,
      theme: "dark",
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
      progress: undefined,
      theme: "dark",
    });
  };

  const handleCreateUser = async (e) => {
    try {
      e.preventDefault();
      const helper = await fetch("/api/v1/auth/helper/register_user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, mobile, password }),
      });
      const data = await helper.json();

      if (data?.exist === true) {
        toastNotificationError("User already registered");
        navigate("/account/helper_login", { replace: true });
      } else if (data?.session) {
        toastNotificationError(data?.errorMessage);
        localStorage.setItem("token-helper", data?.session);
        window.location.href = "/account/helper";
      } else {
        toastNotificationError(data?.errorMessage);
        navigate("/account/helper_register", { replace: true });
      }
    } catch (error) {
      setMessageERROR(error.message);
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
      <section className="signup-container">
        <Form
          onSubmit={handleCreateUser}
          className="drop-shadow-2xl rounded was-validated"
        >
          <div className="signup-container__top">
            <div className="mb-3">
              <h1 className="signup-container__top-header">
                Register for helper
              </h1>
              <p className="signup-container__top-para">
                Please provide you details
              </p>
            </div>
            {messageERROR && (
              <p className="text-red-500 mb-1">{messageERROR}</p>
            )}
            <InputGroup as={Col} hasValidation className="mb-3">
              <InputGroup.Text id="basic-addon1" className="rounded-none">
                <i className="fa-solid fa-user"></i>
              </InputGroup.Text>
              <Form.Control
                className="rounded-none"
                placeholder="John Doe"
                type="text"
                aria-label="username"
                aria-labelledby="basic-addon1"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                isValid={!!usernameError}
                isInvalid={usernameError && usernameError}
                required
              />
              {usernameError ? (
                <Form.Control.Feedback type="invalid">
                  {usernameError}
                </Form.Control.Feedback>
              ) : (
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              )}
            </InputGroup>
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
            <InputGroup as={Col} hasValidation className="mb-3">
              <InputGroup.Text id="basic-addon4" className="rounded-none">
                <i className="fa-solid fa-phone"></i>
              </InputGroup.Text>
              <Form.Control
                className="rounded-none"
                placeholder="+27 79 123 1234"
                type="tel"
                aria-label="tel"
                aria-labelledby="basic-addon4"
                name="tel"
                value={mobile}
                onChange={handleMobileChange}
                isValid={!!mobileError}
                isInvalid={mobileError && mobileError}
                required
              />
              {mobileError ? (
                <Form.Control.Feedback type="invalid">
                  {mobileError}
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
              className=" bg-yellow-500 text-white mt-1 flex items-center justify-center  gap-2 border p-2 mb-2 hover:cursor-pointer rounded-lg hover:bg-yellow-600"
            >
              <i className="fa-solid fa-envelope text-lg"></i>
              <span className="text-md">Continue with email</span>
            </button>
            <Link
              to="/account/register"
              className=" bg-sky-500 text-white mt-1 flex items-center justify-center  gap-2 border p-2 mb-2 hover:cursor-pointer rounded-lg hover:bg-sky-600"
            >
              <i className="fa-solid fa-user text-lg"></i>
              <span className="text-md">Continue as a user</span>
            </Link>
            <div className="flex items-center justify-center gap-1 p-2 mb-2">
              <p>Already have an account with us ?</p>
              <Link
                to="/account/helper_login"
                className="text-md text-yellow-500 hover:text-yellow-600 font-bold"
              >
                login
              </Link>
            </div>
          </div>
        </Form>
        <p className="absolute mb-3 bottom-0 font-[500] text-l flex items-center gap-2 z-[400]">
          <span className="text-yellow-600 font-bold">Communicatee.</span>{" "}
          copyright &copy;
          <span>{currentYear}</span> <span>{userLanguage}</span>
        </p>
      </section>
    </>
  );
};

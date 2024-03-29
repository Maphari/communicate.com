import React, { useEffect, useState } from "react";
import { InputGroup, Form, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GoogleLogoImage from "../../../assets/google-logo.png";
import FacebookLogoImage from "../../../assets/facebook-logo.png"
import SpotifyLogoImage from "../../../assets/spotify-logo.png"
import axios from "axios";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [messageERROR, setMessageERROR] = useState("");
  const currentYear = new Date().getFullYear();
  const userLanguage = navigator.language;
  const token = localStorage.getItem("token");
  const helperToken = localStorage.getItem("token-helper");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);

    if (!username) {
      setUsernameError("Username is required");
    } else if (username.trim().length < 4) {
      setUsernameError("Username must be at least 4 characters long");
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

      const user = await fetch("/api/v1/auth/signup_user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, mobile, password }),
      });
      const data = await user.json();

      if (data?.exist === true) {
        toastNotificationError("User already exists login");
        navigate("/account/login");
      } else if (data?.session) {
        toastNotificationSuccess(data?.message);
        localStorage.setItem("token", data?.session);
        window.location.href = "/home";
      } else {
        toastNotificationError(data?.message);
        navigate("/account/register", { replace: true });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessageERROR("Invalid username or password");
      } else {
        setMessageERROR(
          "An unexpected error occurred. Please try again later. Or refresh the page"
        );
      }
    }
  };

  async function handleGoogleLogin() {
    window.open("/api/auth/google", "_self");
    const res = await axios.get("/api/auth/passport_success");
    const clientid = res?.data?.user?.clientID;
    localStorage.setItem("token", clientid);
  }

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
          onSubmit={handleCreateUser}
          className="drop-shadow-2xl rounded was-validated"
        >
          <div className="signup-container__top">
            <div className="mb-3">
              <h1 className="signup-container__top-header">Create account</h1>
              <p className="signup-container__top-para">
                Please provide you details
              </p>
            </div>
            {messageERROR && (
              <p className="text-red-500 mb-1">{messageERROR}</p>
            )}
            <InputGroup as={Col} hasValidation className="mb-3">
              <InputGroup.Text id="basic-addon2" className="rounded-none">
                <i className="fa-solid fa-user"></i>
              </InputGroup.Text>
              <Form.Control
                className="rounded-none"
                placeholder="John Doe"
                type="text"
                aria-label="username"
                aria-labelledby="basic-addon2"
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
              <InputGroup.Text id="basic-addon2" className="rounded-none">
                <i className="fa-solid fa-phone"></i>
              </InputGroup.Text>
              <Form.Control
                className="rounded-none"
                placeholder="+27 79 123 1234"
                type="tel"
                aria-label="tel"
                aria-labelledby="basic-addon2"
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
            <div className="flex items-center gap-2">
            <button
              type="submit"
              className="w-full transition-all duration-700 ease-linear bg-yellow-600 hover:bg-yellow-700 text-white mt-1 flex items-center justify-center  gap-2 border p-2 mb-2 hover:cursor-pointer rounded-lg"
            >
              <i className="fa-solid fa-envelope text-sm"></i>
              <span className="text-[0.90rem]">Continue with email</span>
            </button>
            <Link
              to="/account/helper_login"
              className="w-full transition-all duration-700 ease-linear bg-violet-600 text-white mt-1 flex items-center justify-center  gap-2 border p-2 mb-2 hover:cursor-pointer rounded-lg hover:bg-violet-700"
            >
              <i className="fa-solid fa-car text-sm"></i>
              <span className="text-[0.90rem]">Continue as a helper</span>
            </Link>
            </div>
           <div className="flex gap-1">
            <div className="mt-0 w-full">
              <div className="transition-all duration-700 ease-linear flex items-center justify-center gap-1 border p-2 mb-2   hover:cursor-pointer rounded-lg hover:bg-gray-200">
                <img src={GoogleLogoImage} alt="google logo" className="w-4" />
                <a
                  onClick={handleGoogleLogin}
                  className="text-[0.90rem] hover:text-gray-950"
                >
                  Continue with Google
                </a>
              </div>
            </div>
            </div>
            <div className="flex items-center justify-center gap-1 p-2 mb-2">
              <p>Already have an account with us ?</p>
              <Link
                to="/account/login"
                className="text-md text-yellow-500 hover:text-yellow-600 font-bold"
              >
                login
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

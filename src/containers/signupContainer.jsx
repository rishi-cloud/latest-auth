import React, { useContext, useState, useCallback } from "react";
import { debounce } from "lodash";
import { AccountContext } from "../providers/AccountContext";
import { AppContext } from "../providers/AppContext";
import { CommonDataContext } from "../providers/CommonDataContext";
import { validatePassword } from "../validator/PasswordValidator";
import { TrackingContext } from "../providers/TrackingProvider";
import Cookies from "universal-cookie";

export default function SignupContainer(props) {
  // Context Data
  const { SignupWithPassword, loginWithPassword } = useContext(AccountContext);
  const { connections, setLoginText } = useContext(CommonDataContext);
  const { trackClickEvent } = useContext(TrackingContext);
  const { setWhichPage } = useContext(AppContext);
  const { LoginForm, setLoginForm } = useContext(CommonDataContext);
  const { setSignupText } = useContext(CommonDataContext);
  // Context Data

  // Initialized States
  const [isValid, setIsValid] = useState(false);
  const [passwordRules, setPasswordRules] = useState(null);
  const [showSignupForm, setShowSignupForm] = useState(true);
  const { SignupForm, setSignupForm } = useContext(CommonDataContext);
  const [PasswordPolicyState, setPasswordPolicyState] = useState({
    No_more_than_2_identical_characters_in_a_row: false,
    Special_characters: false,
    Lower_case_Upper_Case_Numbers: false,
    Length_Check: false,
    Non_empty_Password_Required: false,
    UpperCaseCheck: false,
    LowerCaseCheck: false,
    NumberCheck: false,
  });
  const [SignupError, setSignupError] = useState({
    email: "",
    isEmailError: "",
    databaseError: "",
    errorCode: "",
  });
  const [loader, setLoader] = useState(false);
  // Initialized States

  // Object Initialization
  const cookies = new Cookies();

  const debounceSubmit = useCallback(
    debounce(() => {
      setSignupForm({
        ...SignupForm,
        isSubmitting: false,
      });
      setIsValid(false);
    }, 2000),
    []
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    console.log("not getting inside this");
    if (
      SignupForm.email !== "" &&
      SignupForm.password !== "" &&
      SignupForm.confirmPassword !== "" &&
      SignupForm.password === SignupForm.confirmPassword &&
      isValid
    ) {
      setSignupForm({
        ...SignupForm,
        isSubmitting: true,
      });
      try {
        trackClickEvent("submitting-for-signup");
        const res = await SignupWithPassword(
          SignupForm.email,
          SignupForm.password
        );
        if (res.email) {
          await loginWithPassword(SignupForm.email, SignupForm.password);
        }
      } catch (e) {
        setSignupForm({
          ...SignupForm,
          email: "",
          password: "",
          confirmPassword: "",
          isSubmitting: false,
        });
        if (e.code === "invalid_signup") {
          setLoginText({
            title: "Looks_like_you_already_have_an_account",
            subtitle: "This_email_already_exists",
          });
          setLoginForm({
            ...LoginForm,
            email: SignupForm.email,
            password: "",
          });
          setWhichPage("login-page");
          trackClickEvent("User-Already-Registered");
        } else if (
          e.code === "extensibility_error" &&
          e.description ===
            "Denied user registration in Pre User Registration Hook"
        ) {
          setShowSignupForm(false);
          setSignupText({
            title: "We_are_sorry_but_we_could_not_create_your_account",
            subtitle: "we_cannot_create_an_account",
          });
        } else {
          setSignupError({
            ...SignupError,
            databaseError: e.description,
            errorCode: e.code,
          });
          trackClickEvent("failure-at-signup");
        }
      }
    }

    setLoader(false);
  };
  const changePage = () => {
    const checkCookies = cookies.get("ua");
    if (!checkCookies) {
      cookies.set("ua", { at: "password" }, { path: "/" });
    } else {
      cookies.set("ua", { ...checkCookies, at: "password" }, { path: "/" });
    }

    const currentCount = cookies.get("ua");
    console.log(currentCount);
    setLoginForm({ ...LoginForm, email: "", password: "" });
    setSignupForm({
      ...SignupForm,
      email: "",
      password: "",
      confirmPassword: "",
    });
    setSignupText({
      title: "Create_your_McAfee_account",
      subtitle:
        "Enter_your_email_address_set_password_and_well_get_your_account_created",
    });
    setWhichPage("login-page");
  };

  const onClick = (e) => {
    setPasswordRules(connections[0]);
  };
  const onChange = (e) => {
    if (e.target.name === "password" && passwordRules) {
      validatePassword(
        passwordRules,
        e.target.value,
        PasswordPolicyState,
        setPasswordPolicyState,
        setIsValid
      );
    }
    setSignupForm({
      ...SignupForm,
      [e.target.name]: e.target.value,
    });
  };

  const child = React.Children.only(props.children);
  return React.cloneElement(child, {
    onSubmit,
    SignupForm,
    onChange,
    onClick,
    passwordRules,
    PasswordPolicyState,
    isValid,
    SignupError,
    loader,
    setLoginForm,
    LoginForm,
    changePage,
    showSignupForm,
  });
}

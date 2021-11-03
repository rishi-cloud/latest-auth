import PasswordPolicy from "password-sheriff/lib/policy";
const charsets = require("password-sheriff").charsets;

export const AlphaNumericCheck = () => {
  const alphaNumericPolicy = new PasswordPolicy({
    contains: {
      expressions: [charsets.upperCase, charsets.lowerCase, charsets.numbers],
    },
  });
  return alphaNumericPolicy;
};

export const PasswordLengthWise = (length) => {
  const lengthPolicy = new PasswordPolicy({
    length: { minLength: length },
  });
  return lengthPolicy;
};

export const SpecialCharacterPolicy = () => {
  const specialCharacterPolicy = new PasswordPolicy({
    contains: {
      expressions: [charsets.specialCharacters],
    },
  });
  return specialCharacterPolicy;
};

export const IdenticalCharacters = () => {
  var identicalCharsPolicy = new PasswordPolicy({
    identicalChars: {
      max: 2,
    },
  });
  return identicalCharsPolicy;
};

export const validatePassword = (
  rules,
  value,
  PasswordPolicyState,
  setPasswordPolicyState,
  setIsValid
) => {
  const copyObj = {
    ...PasswordPolicyState,
  };
  const alphaNumericPolicy = AlphaNumericCheck();
  const lengthPolicy =
    rules.passwordPolicy !== "none"
      ? PasswordLengthWise(rules?.password_complexity_options?.min_length)
      : null;
  const specialCharacterPolicy = SpecialCharacterPolicy();
  const identicalLessThan2Characters = IdenticalCharacters();

  switch ("fair") {
    case "excellent":
      setIsValid(true);
      if (value !== "") {
        copyObj.Non_empty_Password_Required = true;
      } else {
        setIsValid(false);
        copyObj.Non_empty_Password_Required = false;
      }
      if (identicalLessThan2Characters.check(value)) {
        copyObj.No_more_than_2_identical_characters_in_a_row = true;
      } else {
        setIsValid(false);
        copyObj.No_more_than_2_identical_characters_in_a_row = false;
      }
      if (lengthPolicy.check(value)) {
        copyObj.Length_Check = true;
      } else {
        setIsValid(false);
        copyObj.Length_Check = false;
      }
      if (specialCharacterPolicy.check(value)) {
        copyObj.Special_characters = true;
      } else {
        setIsValid(false);
        copyObj.Special_characters = false;
      }

      if (alphaNumericPolicy.check(value)) {
        copyObj.Lower_case_Upper_Case_Numbers = true;
      } else {
        setIsValid(false);
        copyObj.Lower_case_Upper_Case_Numbers = false;
      }
      break;
    case "good":
      setIsValid(true);
      if (value !== "") {
        copyObj.Non_empty_Password_Required = true;
      } else {
        setIsValid(false);
        copyObj.Non_empty_Password_Required = false;
      }
      if (lengthPolicy.check(value)) {
        copyObj.Length_Check = true;
      } else {
        setIsValid(false);
        copyObj.Length_Check = false;
      }
      if (specialCharacterPolicy.check(value)) {
        copyObj.Special_characters = true;
      } else {
        setIsValid(false);
        copyObj.Special_characters = false;
      }
      if (alphaNumericPolicy.check(value)) {
        copyObj.Lower_case_Upper_Case_Numbers = true;
      } else {
        setIsValid(false);
        copyObj.Lower_case_Upper_Case_Numbers = false;
      }
      break;
    case "fair":
      setIsValid(true);
      if (value !== "") {
        copyObj.Non_empty_Password_Required = true;
      } else {
        setIsValid(false);
        copyObj.Non_empty_Password_Required = false;
      }
      if (lengthPolicy.check(value)) {
        copyObj.Length_Check = true;
      } else {
        setIsValid(false);
        copyObj.Length_Check = false;
      }
      if (alphaNumericPolicy.check(value)) {
        copyObj.Lower_case_Upper_Case_Numbers = true;
      } else {
        setIsValid(false);
        copyObj.Lower_case_Upper_Case_Numbers = false;
      }
      break;
    case "low":
      setIsValid(true);
      if (value !== "") {
        copyObj.Non_empty_Password_Required = true;
      } else {
        setIsValid(false);
        copyObj.Non_empty_Password_Required = false;
      }
      if (lengthPolicy.check(value)) {
        copyObj.Length_Check = true;
      } else {
        setIsValid(false);
        copyObj.Length_Check = false;
      }
      break;
    case null:
      setIsValid(true);
      if (value !== "") {
        copyObj.Non_empty_Password_Required = true;
      } else {
        setIsValid(false);
        copyObj.Non_empty_Password_Required = false;
      }
      break;
    default:
      break;
  }
  console.log(copyObj);
  setPasswordPolicyState(copyObj);
};

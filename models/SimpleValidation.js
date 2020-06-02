export const validateEmail = (email) => {
  if (email.length <= 6) {
    return false;
  } else if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
    return false;
  } else {
    return true;
  }
};

export const validateName = (name) => {
  if (name.length <= 4) {
    return false;
  } else if (name.length >= 4) {
    return true;
  }
};

const specialCharacters = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "-",
  "_",
  "{",
  "}",
  "[",
  "]",
  ":",
  ";",
  ".",
  ",",
  "?",
  "<",
  ">",
  "?",
  "/",
  "|",
  "+",
  "=",
];
const numberArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

export const validatePassword = (password) => {
  if (password.length < 8) {
    // return console.log("returning  based on length");
    return false;
  }
  const containsSpecial = () => {
    for (var i = 0; i < password.length; i++) {
      for (var x = 0; x < specialCharacters.length; x++) {
        if (password[i] === specialCharacters[x]) {
          return true;
          // return console.log("returning true based on specialCharacters");
        }
      }
    }
  };
  const containsNumber = () => {
    for (var i = 0; i < password.length; i++) {
      for (var x = 0; x < numberArray.length; x++) {
        if (password[i] === numberArray[x]) {
          return true;
          // return console.log("returning true based on number");
        }
      }
    }
  };

  containsNumber();
  containsSpecial();

  if (containsSpecial() && containsNumber()) {
    console.log("valid password");
    return true;
    // return console.log("returning true as final return");
  } else if (!containsSpecial() || !containsNumber()) {
    console.log("invalid password");
    // return false;
    return console.log("returning false as final return");
  }
};

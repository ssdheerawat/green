export const validateForm = async (value) => {
  let error = {};
  const keyName = Object.keys(value);

  for (let i = 0; i < keyName.length; i++) {
    error[keyName[i]] = [];

    let values = value[keyName[i]];
    const result = await startValidation(values, keyName[i]);

    error[keyName[i]] = result;
  }
  return error;
};

const startValidation = async (values, keyName) => {
  //const typeError = await typeCheck(values, keyName);

  const validateError = await checkValidate(values, keyName);

  if (validateError.length) {
    return validateError;
  }

  


  return [];
};



const checkValidate = async (values, key) => {
  let err = [];

  if (values.validation) {
    try {
      for (let j = 0; j < values.validation.length; j++) {
        switch (checkCases(values, j)) {
          case "require":
            err.push(errorSet("require", `The field is required`));
            break;
          case "email":
            err.push(errorSet("email", "The e-mail address entered is invalid"));
            break;
          case "number":
            err.push(errorSet("number", "Value is not Number"));
            break;
          case "mobile":
            err.push(errorSet("mobile", "Invalid mobile number"));
            break;
          default:
    
            
        }
      }
      return err;
    } catch (e) {}
  } else {
    return [];
  }
};

const checkCases = (values, j) => {
  let returnVal = "";
  if (values.validation[j] === "require" && values.value === "") {
    returnVal = "require";
  } else if (
    values.validation[j] === "email" &&
    !emailRegex.test(values.value)
  ) {
    returnVal = "email";
  } else if (
    values.validation[j] === "number" &&
    !numberRegEx.test(values.value)
  ) {
    returnVal = "number";
  } else if (
    values.validation[j] === "mobile" &&
    !mobileRegEx.test(values.value)
  ) {
    returnVal = "mobile";
  }
  return returnVal;
};

const errorSet = (type, message) => {
  return {
    validation_type: type,
    message: message,
    status: true,
  };
};

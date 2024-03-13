export const uservalidationschema = {
  name: {
    isLength: {
      options: { min: 4, max: 10 },
      errorMessage: "Invalid name length 4 - 10",
    },
  },
  password: {
    isLength: {
      options: { min: 4, max: 10 },
      errorMessage: "Invalid password length 4 - 10",
    },
    isAlphanumeric: {
      errorMessage: "Password must be Alphanumeric",
    },
  },
};

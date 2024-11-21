export function getErrorText(text: string): string | undefined {
  const errorMessages = {
    emailInUse: "email-already-in-use",
    invalidCredentials: "invalid-credential",
  };

  if (text.toLowerCase().includes(errorMessages.emailInUse.toLowerCase())) {
    return "Email already in use";
  } else if (
    text.toLowerCase().includes(errorMessages.invalidCredentials.toLowerCase())
  ) {
    return "Invalid Credentials";
  } else {
    return "Something Occurred";
  }
}

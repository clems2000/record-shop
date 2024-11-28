export const BADREQUESTMESSAGE = "Not found"
export const SERVERERRORMESSAGE = "Server error"
export const SOMETHINGWENTWRONGMESSAGE = "Something went wrong"
export const NOTFOUNDMESSAGE = "Not found"

export function errorHandling (error) {
  switch (error.status) {
    case 404:
      return NOTFOUNDMESSAGE;
    case 500:
      return SERVERERRORMESSAGE;
    case 400:
      return BADREQUESTMESSAGE;
    default:
      return SOMETHINGWENTWRONGMESSAGE;
  }
}
import {i18n} from '@/utils/languages/i18n.js'

export const BADREQUESTMESSAGE = 'apiErrorMessages.badRequest'
export const SERVERERRORMESSAGE = "apiErrorMessages.serverError"
export const SOMETHINGWENTWRONGMESSAGE = "apiErrorMessages.someThingWentWrong"
export const NOTFOUNDMESSAGE = "apiErrorMessages.badRequest"

export function errorHandling (error) {
  switch (error.status) {
    case 404:
      return i18n.global.t(NOTFOUNDMESSAGE);
    case 500:
      return i18n.global.t(SERVERERRORMESSAGE);
    case 400:
      return i18n.global.t(BADREQUESTMESSAGE);
    default:
      return i18n.global.t(SOMETHINGWENTWRONGMESSAGE);
  }
}
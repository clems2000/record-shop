import { ApiException } from '@/services/apiException.js'
import { errorHandling } from '@/utils/apiErrorHandling.js'
import { i18n } from '@/utils/languages/i18n.js'

export function handleError(error) {
  if (error instanceof ApiException) {
    return errorHandling(error);
  } else {
    return error.message || i18n.global.t('apiErrorMessages.someThingWentWrong');
  }
}
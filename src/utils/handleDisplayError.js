import { ApiException } from '@/services/apiException.js'
import { errorHandling } from '@/utils/apiErrorHandling.js'

export function handleError(error) {
  if (error instanceof ApiException) {
    return errorHandling(error);
  } else {
    return error.message || 'Something went wrong';
  }
}
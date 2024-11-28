import { handleError } from './handleDisplayError'
import { ApiException } from '@/services/apiException.js'
import { describe, it, expect } from 'vitest'

describe('handleDisplayError', () => {
  it('should return an API error message', () => {
    const error = new ApiException(404);
    expect(handleError(error)).toBe('Not found');
  })

  it('should return an error message for good response but an error from api', () => {
    const error = {"message": "test response"}
    expect(handleError(error)).toBe('test response');
  })

  it('should return default error, with something went wrong message', () => {
    const error = "Something went wrong"
    expect(handleError(error)).toBe('Something went wrong');
  })
})
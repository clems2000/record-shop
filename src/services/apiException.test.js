import { ApiException } from '@/services/apiException.js'
import { describe, it, expect } from 'vitest'

describe('apiException', () => {
  it('should create and instance of Error', () => {
    const exception = new ApiException(404)
    expect(exception).toBeInstanceOf(Error)
  })

  it('should assign the correct status, when created', () => {
    const stauts = 404
    const exception = new ApiException(stauts)
    expect(exception.status).toBe(stauts)
  })
})
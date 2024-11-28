import { errorHandling, SOMETHINGWENTWRONGMESSAGE, BADREQUESTMESSAGE, NOTFOUNDMESSAGE, SERVERERRORMESSAGE } from '@/utils/apiErrorHandling.js'
import { describe, it, expect } from 'vitest'

describe('errorHandling', () => {
  it(`should return ${NOTFOUNDMESSAGE} for 404 error`, () => {
    const error = { status: 404 }
    expect(errorHandling(error)).toBe(NOTFOUNDMESSAGE)
  })

  it(`should return ${SERVERERRORMESSAGE} for 500 error`, () => {
    const error = { status: 500 }
    expect(errorHandling(error)).toBe(SERVERERRORMESSAGE)
  })

  it(`should return ${BADREQUESTMESSAGE} for 400 error`, () => {
    const error = { status: 400 }
    expect(errorHandling(error)).toBe(BADREQUESTMESSAGE)
  })

  it(`should return ${SOMETHINGWENTWRONGMESSAGE} for any other error`, () => {
    const error = { status: 0 }
    expect(errorHandling(error)).toBe(SOMETHINGWENTWRONGMESSAGE)
  })
})
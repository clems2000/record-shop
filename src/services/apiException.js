export class ApiException extends Error {
  constructor(status) {
    super()
    this.status = status
  }
}
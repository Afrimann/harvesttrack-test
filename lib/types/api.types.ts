export interface ApiResponse<T = unknown> {
  data: T
  message?: string
}

export class HttpError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(message)
    this.name = 'HttpError'
  }
}

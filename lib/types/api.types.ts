export interface ApiResponse<T = unknown> {
  data: T
  message?: string
}

export class HttpError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly error?: string,
    public readonly code?: string,
  ) {
    super(message)
    this.name = 'HttpError'
  }
}

import { NextResponse } from 'next/server'

export enum ErrorType {
  NotFound = 'NotFound',
  Unauthorized = 'Unauthorized',
  Forbidden = 'Forbidden',
  BadRequest = 'BadRequest',
  InternalServerError = 'InternalServerError',
  Conflict = 'Conflict',
  UnprocessableEntity = 'UnprocessableEntity',
  TooManyRequests = 'TooManyRequests',
  ServiceUnavailable = 'ServiceUnavailable',
  GatewayTimeout = 'GatewayTimeout',
  Unknown = 'Unknown',
}

export enum ErrorMessage {
  NotFound = 'Not Found',
  Unauthorized = 'Unauthorized',
  Forbidden = 'Forbidden',
  BadRequest = 'Bad Request',
  InternalServerError = 'Internal Server Error',
  Conflict = 'Conflict',
  UnprocessableEntity = 'Unprocessable Entity',
  TooManyRequests = 'Too Many Requests',
  ServiceUnavailable = 'Service Unavailable',
  GatewayTimeout = 'Gateway Timeout',
  Unknown = 'Unknown',
}

export enum StatusCode {
  NotFound = 404,
  Unauthorized = 401,
  Forbidden = 403,
  BadRequest = 400,
  InternalServerError = 500,
  Conflict = 409,
  UnprocessableEntity = 422,
  TooManyRequests = 429,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
  Unknown = 520,
}

export const handleResponse = (data: any, errorType: ErrorType | null) => {
  return NextResponse.json({
    data,
    error: errorType
      ? {
          message: ErrorMessage[errorType],
          type: errorType,
        }
      : null,
  })
}

import { pipe } from 'fp-ts/lib/function'
import * as t from 'io-ts'
import * as TE from 'fp-ts/lib/TaskEither'

enum Errors {
  NETWORK_ERROR = 'Network Error',
  DECODE_ERROR = 'Decode Error',
}

export type IntegrationError =
  | { type: Errors.NETWORK_ERROR; message: string }
  | { type: Errors.DECODE_ERROR; message: string }

export function netError(e: Error): IntegrationError {
  return {
    type: Errors.NETWORK_ERROR,
    message: e.message,
  }
}

export function decodeError(e: t.Errors): IntegrationError {
  const missingKeys = e.map((e) => e.context.map(({ key }) => key).join('.'))

  return {
    type: Errors.DECODE_ERROR,
    message: `${missingKeys}`,
  }
}

export const decode = (codec: t.Type<any>) => (res: unknown) =>
  pipe(TE.fromEither(codec.decode(res)), TE.mapLeft(decodeError))

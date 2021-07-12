import { EntriesCodec } from '@nighttrax/codecs'
import axios from 'axios'
import { pipe } from 'fp-ts/lib/function'
import * as E from 'fp-ts/Either'
import * as TE from 'fp-ts/lib/TaskEither'

import { netError, decode } from './helpers'

function makeRequest() {
  return pipe(
    TE.tryCatch(() => axios.get('http://localhost:4000/entries'), E.toError),
    TE.map((d) => d.data),
    TE.mapLeft((e) => netError(e))
  )
}

export function getEntries() {
  return pipe(
    makeRequest(),
    TE.chain(decode(EntriesCodec)),
    TE.getOrElse((err) => {
      throw new Error(err.message)
    })
  )()
}

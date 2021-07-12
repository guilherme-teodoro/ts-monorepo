import * as t from 'io-ts';

import { CurrencyFromString, DateFromStringISO } from './customTypes';

export const EntryCodec = t.type({
  amount: CurrencyFromString,
  date: DateFromStringISO,
  description: t.string,
  id: t.number,
  type: t.union([t.literal('credit'), t.literal('debit')]),
});

export type Entry = t.TypeOf<typeof EntryCodec>;

export const EntriesCodec = t.array(EntryCodec);

export type Entries = t.TypeOf<typeof EntriesCodec>;

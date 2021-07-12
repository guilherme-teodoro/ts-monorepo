import * as t from 'io-ts';
import { pipe } from 'fp-ts/lib/function';
import * as E from 'fp-ts/Either';
import { isValid, parseISO, format } from 'date-fns';
import Currency from 'currency.js';
import { buildCurrency, currency } from '@nighttrax/utils';

export const DateFromStringISO = new t.Type<Date, string, unknown>(
  'DateFromStringISO',
  (u): u is Date => u instanceof Date,
  (s, c) => {
    return pipe(
      t.string.validate(s, c),
      E.chain((s) => {
        const parsedDate = parseISO(s);
        return isValid(parsedDate) ? t.success(parsedDate) : t.failure(s, c);
      })
    );
  },
  (date) => format(date, 'yyyy-MM-dd')
);

export const CurrencyFromString = new t.Type<currency, number, unknown>(
  'CurrencyFromString',
  (u): u is Currency => u instanceof Currency,
  (s, c) => {
    return pipe(
      t.number.validate(s, c),
      E.chain((s) => {
        try {
          const n = buildCurrency(s);
          return t.success(n);
        } catch {
          return t.failure(s, c);
        }
      })
    );
  },
  (a) => a.intValue
);

import Currency from 'currency.js'

export type currency = Currency

export const buildCurrency = (s: number) =>
  Currency(s, {
    symbol: 'R$',
    decimal: ',',
    separator: '.',
    precision: 2,
    fromCents: true,
  })

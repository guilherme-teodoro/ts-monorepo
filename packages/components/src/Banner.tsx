import React from 'react'
import { Container } from './Container'
import currency from 'currency.js'

export const Banner: React.FC<{ amount: currency }> = ({ amount }) => (
  <div className="bg-orange-600 text-white py-20">
    <Container>
      <div>Saldo atual</div>
      <div className="text-3xl font-bold">{amount.format()}</div>
    </Container>
  </div>
)

import React from 'react'
import { EntryItem, Container, Banner, Card } from '@nighttrax/components'
import { Entries, Entry } from '@nighttrax/codecs'
import { getEntries } from '@nighttrax/integrations'
import { Machine, assign } from 'xstate'
import { useMachine } from '@xstate/react'
import { buildCurrency } from '@nighttrax/utils'
import currency from 'currency.js'
import 'tailwindcss/tailwind.css'

interface EntriesMachineStateSchema {
  states: {
    idle: {}
    fetch: {}
    success: {}
  }
}

interface EntriesMachineContext {
  entries: Entries
}

export type EntriesMachineEvents = { type: 'FETCH' }

const EntriesMachine = Machine<
  EntriesMachineContext,
  EntriesMachineStateSchema,
  EntriesMachineEvents
>(
  {
    initial: 'idle',
    context: {
      entries: [],
    },
    states: {
      idle: {
        always: {
          target: 'fetch',
        },
      },
      fetch: {
        invoke: {
          src: 'getEntries',
          onDone: {
            actions: assign({
              entries: (
                context: EntriesMachineContext,
                data: { data: Entries }
              ) => data.data,
            }),
            target: 'success',
          },
        },
      },
      success: {},
    },
  },
  {
    services: {
      getEntries,
    },
  }
)

const Index = () => {
  const [state] = useMachine(EntriesMachine)

  const sum = state.context.entries.reduce((acc: currency, d: Entry) => {
    return d.type === 'credit' ? acc.add(d.amount) : acc.subtract(d.amount)
  }, buildCurrency(0))

  return (
    <>
      <Banner amount={sum} />
      <Container>
        <Card>
          <div className="space-y-4 p-10">
            {state.context.entries.map((entry: Entry) => (
              <EntryItem key={entry.id} entry={entry} />
            ))}
          </div>
        </Card>
      </Container>
    </>
  )
}

export default Index

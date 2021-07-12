import { getEntries } from '@nighttrax/integrations'

describe('integrations/entries', () => {
  it('getEntries()', async () => {
    const entries = await getEntries()
    expect(entries).toBeTruthy()
  })
})

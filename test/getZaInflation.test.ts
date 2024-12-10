import { describe, expect, it } from 'vitest'
import { getZaInflation } from '../lib/index'

describe('getZaInflation', async () => {
  it('should return the correct value', async () => {
    const amount = getZaInflation({
      amount: 408_500,
      year: 2012,
      yearTo: 2024
    })
    expect(amount).toBe(757614)
  })
})

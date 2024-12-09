import { describe, expect, it } from 'vitest'
import { calculateInflation } from '../lib/index'

describe('calculateInflation', async () => {
  it('should return the correct value', async () => {
    const amount = calculateInflation({
      amount: 408_500,
      yearFrom: 2012,
      yearTo: 2024
    })
    expect(amount).toBe(757614)
  })
})

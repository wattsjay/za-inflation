/*
MIT License

Copyright (c) 2024 Jay Watts

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import { data } from './data'
export { data }

/**
 * Calculate the inflation of an amount between two years.
 *
 * @example
 * ```ts
 * const amount = getZaInflation({
 *  amount: 100_000,
 *  year: 2002,
 *  yearTo: 2024 {optional} // default is 2024
 * })
 *
 * console.log(amount) // 329470
 * ```
 */
export function getZaInflation({
  amount,
  year,
  yearTo = 2024
}: {
  amount: number
  year: number
  yearTo?: number
}) {
  const fromIndex = data[year.toString() as keyof typeof data]
  if (!fromIndex) {
    throw new Error('Invalid start year. Has to be between 1929 and 2024')
  }

  const toIndex = data[yearTo.toString() as keyof typeof data]
  if (!toIndex) {
    throw new Error('Invalid end year. Has to be between 1929 and 2024')
  }

  const inflation = toIndex / fromIndex
  return Math.round(inflation * amount)
}

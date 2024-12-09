import fs from 'fs'

type Data = {
  months: number[] | null
  averageChange: number | null
  averageIndex: number | null
}

const REFERENCE_YEAR = 2021
const REFERENCE_INDEX = 97.5

const round = (val: number) => Math.round(val * 100) / 100

const raw = fs
  // @source https://www.statssa.gov.za/publications/P0141/CPIHistory.pdf
  .readFileSync('./data/raw.txt', 'utf-8')
  .split('\n')
  .map((line) => line.split(' '))

const parsed: Record<string, Omit<Data, 'averageIndex'>> = {}

raw.forEach((line) => {
  const yearIndexes = line.map((value) => parseFloat(value.replace(',', '.')))

  if (yearIndexes.length === 2) {
    parsed[yearIndexes[0]] = {
      months: null,
      averageChange: yearIndexes[1]
    }
  } else {
    const months = yearIndexes.slice(1, 13) ?? null
    const averageChange = yearIndexes[13] ?? null
    parsed[yearIndexes[0]] = {
      months: months,
      averageChange:
        averageChange !== null ? averageChange
        : months ?
          round(months.reduce((sum, month) => sum + month, 0) / months.length)
        : null
    }
  }
})

const data: Record<string, Data> = {}

Object.entries(parsed).forEach(([year, _data]) => {
  data[year] = {
    ..._data,
    averageIndex: _data.averageChange ? getYearIndex(year) : null
  }
})

function getYearIndex(year: string) {
  if (Number(year) === REFERENCE_YEAR) {
    return REFERENCE_INDEX
  }

  const isLaterThanReference = Number(year) > REFERENCE_YEAR
  /**
   * Get slice of data from REFERENCE_YEAR to year
   *
   * @example
   * [2018, 2019, 2020, 2021, 2022, 2023, 2024]
   *          ^           ^           ^
   *          |           |           |
   *          |           REFERENCE   |
   *          caseA                   |
   *                                  caseB
   *
   * IF caseA THEN slice from 2018 to 2021
   * IF caseB THEN slice from 2021 to 2024
   */
  const slice = Object.entries(parsed)
    .filter((yearData) => {
      const sampleYear = Number(yearData[0])
      const focusedYear = Number(year)

      if (isLaterThanReference) {
        return sampleYear > REFERENCE_YEAR && sampleYear <= focusedYear
      } else {
        return sampleYear < REFERENCE_YEAR && sampleYear >= focusedYear
      }
    })
    .map(([, data]) => data.averageChange)
  const sorted = isLaterThanReference ? slice : slice.reverse()

  return sorted.reduce((sum, change) => {
    let _averageIndex: number | null = null

    if (sum && change) {
      if (isLaterThanReference) {
        _averageIndex = sum * (1 + change / 100)
      } else {
        _averageIndex = sum / (1 + change / 100)
      }
    }

    return _averageIndex ? round(_averageIndex) : _averageIndex
  }, REFERENCE_INDEX)
}

fs.writeFileSync(
  './lib/data.ts',
  `export const data = ${JSON.stringify(
    (() => {
      const indexOnlyData: Record<string, number> = {}
      Object.entries(data).forEach(([year, { averageIndex }]) => {
        if (averageIndex) {
          indexOnlyData[year] = averageIndex
        }
      })

      return indexOnlyData
    })(),
    null,
    2
  )}`
)

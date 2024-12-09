# South Africa Inflation Calculator

Calculate the inflation of an amount between two years for South Africa.

## Install

```shell
npm i za-inflation
```

## Usage

```ts
// How much is the purchase price of a BMW 320d
// bought in 2012 in today's money?

const amount = calculateInflation({
  amount: 408_500,
  yearFrom: 2012,
  yearTo: 2024 // {optional} defaults to the latest year
})

console.log(amount) // R757,614.00 (so much cheaper than today's!)
```

## Limitations

1. The limitations of from the source from [Stats SA](https://www.statssa.gov.za/publications/P0141/CPIHistory.pdf) apply. For example, this data-set state the following:

> - Primary urban areas up to and including December 2008. All urban areas from January 2009. The series were linked so as to
>   provide a continuous index.
> - Substantial changes were made to the compilation of the CPI in January 2009.

2. The average % change for the year is based on the available monthly values. If a year does not have all the months available, then the average is based on the available months. For example, Stats SA has not yet released CPI & for the months after October, 2024.

3. This is an alpha release, and although the calculations are simple, I am not a financial professional. I advise that this should not be used for sensitive applications. That said, in the coming production release, more tests will be added to verify the accuracy of results.

---

## Develop

### Clone

```shell
git clone https://github.com/wattsjay/za-inflation.git
cd za-inflation
npm i
```

### Dependencies

- **`Vite`** (6.0.1)
  - `vitest` (2.1.8)
  - `vite-plugin-dts` (4.3.0)
- **`ESlint`** (9.16.0)
  - `eslint-config-prettier` (9.1.0)
  - `eslint-plugin-prettier` (5.2.1)
- **`Prettier`** (3.4.2)
- **`TypeScript`** (5.6.2)
  - `typescript-eslint` (8.17.0)

### Test

```shell
npm run test
```

### Build

```shell
npm run build
```

---

## Contributions

Pull Requests are welcomed directly to the `main` branch.

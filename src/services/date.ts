import moment, { Moment } from 'moment'
import { MonthsOutput } from '../models'

export const getMonthsInYearFromNow = () => {
  return getMonthsInYear(moment(), moment().add(12, 'month'))
}

export const getMonthsInYear = (start: Moment, end: Moment): MonthsOutput[] => {
  return Array.from<MonthsOutput>({ length: end.diff(start, 'month') + 1 }).map((_, index) => {
    const month = moment(start).add(index, 'month')

    return { key: month.format('YYYY.MM'), name: month.format('MMMM'), year: month.format('YYYY') }
  })
}
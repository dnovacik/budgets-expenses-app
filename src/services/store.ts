import { AsyncStorage } from 'react-native'
import { BudgetAndExpenses, Budget, ExpenseType } from './../models/index'
import { getMonthsInYearFromNow } from './date'

const DATA_KEY = 'BUDGETS_KEY'

export let cachedBudgets: BudgetAndExpenses

export const initializeBudgets = async (): Promise<boolean> => {
  AsyncStorage.clear()
  const saved = await getBudgets()

  if (saved) {
    cachedBudgets = saved

    return true
  }

  const budgets: BudgetAndExpenses = {
    budgets: getMonthsInYearFromNow().map((month, index) => {
      return {
        date: month.key,
        budget: 2000.00 + (index * 20),
        expenses: [
          {
            type: ExpenseType.GROCERIES,
            value: 50.42 * (index+1) * Math.random()
          },
          {
            type: ExpenseType.ENTERTAINMENT,
            value: 30.42 * (index+1) * Math.random()
          },
          {
            type: ExpenseType.BILLS,
            value: 17.02 * (index+1) * Math.random()
          }
        ]
      }
    })
  }

  const result = await setBudgets(budgets)

  if (result) {
    cachedBudgets = budgets

    return true
  }

  return false
}

export const getBudgets = async (): Promise<BudgetAndExpenses | null> => {
  if (cachedBudgets) {
    return cachedBudgets
  }

  return getValue(DATA_KEY)
    .then((result) => {
      if (result) {
        return JSON.parse(result) as BudgetAndExpenses
      }

      return null
    })
    .catch((err) => {
      console.log(err)

      return null
    })
}

export const setBudgets = async (budget: BudgetAndExpenses): Promise<boolean> => {
  const result = await setValue(DATA_KEY, budget)
    .then((result) => {
      if (result) {
        return true
      }

      return false
    })
    .catch((err) => {
      console.log(err)

      return false
    })

  if (result) {
    cachedBudgets = budget

    return true
  }

  return false
}

export const updateExpenses = async (dateKey: string, monthBudget: Budget): Promise<boolean> => {
  const budgets = await getBudgets()

  if (budgets) {
    let toUpdate = budgets.budgets.find(b => b.date === dateKey)

    if (toUpdate) {
      toUpdate = monthBudget

      console.log(budgets)

      const result = await setBudgets(budgets)

      console.log(budgets)

      if (result) {
        return true
      }

      return false
    }

    return false
  }

  return false
}

export const getValue = async (key: string) => {
  return await AsyncStorage.getItem(key)
}

export const setValue = async (key: string, value: Object) => {
  return await AsyncStorage.setItem(key, JSON.stringify(value))
    .then(() => true)
    .catch(() => false)
}
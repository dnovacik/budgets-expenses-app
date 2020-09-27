import { types, cast, Instance } from 'mobx-state-tree'
import { getMonthsInYearFromNow } from './../services/date'
import { onStoreReady } from './../services/event'
import { ExpenseType, Budget, Currency } from './../models/index'

export interface IBudget extends Instance<typeof BudgetModel> { }
export interface IRootStore extends Instance<typeof RootStore> { }

const ExpenseModel = types.model('Expense', {
  value: types.number,
  type: types.enumeration<ExpenseType>([...Object.values(ExpenseType)])
})

const BudgetModel = types.model('Budget', {
  id: types.identifier,
  monthName: types.string,
  year: types.string,
  budget: types.number,
  expenses: types.array(ExpenseModel),
  total: types.number,
})

const RootStore = types.model('RootStore', {
  currency: types.enumeration<Currency>([...Object.values(Currency)]),
  monthlyBudget: types.number,
  startAmount: types.number,
  budgets: types.array(BudgetModel),
  selectedBudget: types.maybeNull(types.reference(BudgetModel))
})
  .views((self) => ({
    totalExpenses() {
      if (self.selectedBudget) {
        const totalString = self.selectedBudget.total.toFixed(2).split('.')

        return {
          value: self.selectedBudget.total,
          wholeNumber: totalString.shift() ?? '0',
          decimal: `.${totalString.shift() ?? '0'}`
        }
      }

      return null
    }
  }))
  .actions((self) => ({
    setSelectedBudget(budget: IBudget) {
      self.selectedBudget = budget
    },
    calculateTotalExpense(budget: Budget) {
      const total = budget.expenses.map(e => e.value).reduce((prev, next) => prev + next)

      budget.total = total
    },
    sortExpenses(budget: IBudget) {
      budget.expenses.replace(budget.expenses.slice().sort((a, b) => b.value - a.value))
    }
  }))
  .actions((self) => ({
    initializeBaseSettings(currency: Currency, monthlyBudget: number, startAmount: number = 0) {
      self.currency = currency
      self.monthlyBudget = monthlyBudget
      self.startAmount = startAmount
    },
    initializeBudgets() {
      if (self.budgets.length > 0) {
        self.setSelectedBudget(self.budgets[0])
        onStoreReady()

        return
      }

      const initBudgets = getMonthsInYearFromNow().map((month, index) => {
        return {
          id: month.key,
          monthName: month.name,
          year: month.year,
          budget: self.monthlyBudget,
          expenses: [],
          total: 0
        }
      })

      self.budgets = cast(initBudgets)

      self.setSelectedBudget(self.budgets[0])
    },
    addExpense(type: ExpenseType, value: number) {
      if (self.selectedBudget) {
        const existingExpense = self.selectedBudget.expenses.find(e => e.type === type)

        if (existingExpense) {
          existingExpense.value += value
          self.sortExpenses(self.selectedBudget)
          self.calculateTotalExpense(self.selectedBudget)
        } else {
          self.selectedBudget.expenses.push({
            type: type,
            value: value
          })
          self.sortExpenses(self.selectedBudget)
          self.calculateTotalExpense(self.selectedBudget)
        }
      }
    },
  }))
  .create({
    currency: Currency.EURO,
    monthlyBudget: 0,
    startAmount: 0,
    budgets: [],
    selectedBudget: null
  })

export default RootStore

export const initializeStore = (currency: Currency, monthlyBudget: number, startAmount: number = 0) => {
  RootStore.initializeBaseSettings(currency, monthlyBudget, startAmount)
  RootStore.initializeBudgets()
}
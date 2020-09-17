import { types, cast, Instance } from 'mobx-state-tree'
import { getMonthsInYearFromNow } from './../services/date'
import { onStoreReady } from './../services/event'
import { ExpenseType, Budget } from './../models/index'

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
          budget: 2000.00 + (index * 20),
          expenses: [
            {
              type: ExpenseType.GROCERIES,
              value: 50.42 * (index + 1) * 0.2
            },
            {
              type: ExpenseType.ENTERTAINMENT,
              value: 30.42 * (index + 1) * 0.2
            },
            {
              type: ExpenseType.BILLS,
              value: 17.02 * (index + 1) * 0.2
            },
            {
              type: ExpenseType.MORTGAGE,
              value: 13.02 * (index + 1) * 0.2
            },
            {
              type: ExpenseType.CLOTHES,
              value: 8 * (index + 1) * 0.2
            }
          ],
          total: 0
        }
      })

      initBudgets.map((budget) => {
        const total = budget.expenses.map(e => e.value).reduce((prev, next) => prev + next)

        budget.total = total
      })

      self.budgets = cast(initBudgets)

      self.setSelectedBudget(self.budgets[0])
      onStoreReady()
    },
    addExpense(type: ExpenseType, value: number) {
      if (self.selectedBudget) {
        const existingExpense = self.selectedBudget.expenses.find(e => e.type === type)

        if (existingExpense) {
          existingExpense.value += value
          self.sortExpenses(self.selectedBudget)
          self.calculateTotalExpense(self.selectedBudget)
        }
      }
    },

  }))
  .create({
    budgets: [],
    selectedBudget: null
  })

export default RootStore

export const initializeStore = () => {
  RootStore.initializeBudgets()
}
// budgets

export enum ExpenseType {
  GROCERIES = 'GROCERIES',
  ENTERTAINMENT = 'ENTERTAINMENT',
  BILLS = 'BILLS'
}

export interface Expense {
  value: number
  type: ExpenseType
}

export interface Budget {
  date: string
  budget: number
  expenses: Expense[]
}

export interface BudgetAndExpenses {
  budgets: Budget[]
}

// dates
export interface MonthsOutput {
  key: string
  name: string
}
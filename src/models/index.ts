// budgets

export enum ExpenseType {
  GROCERIES = 'GROCERIES',
  ENTERTAINMENT = 'ENTERTAINMENT',
  BILLS = 'BILLS',
  MORTGAGE = 'MORTGAGE',
  CLOTHES = 'CLOTHES'
}

export interface Expense {
  value: number
  type: ExpenseType
}

export interface Budget {
  id: string
  budget: number
  expenses: Expense[]
  total: number
}

export interface BudgetAndExpenses {
  budgets: Budget[]
}

// dates
export interface MonthsOutput {
  key: string
  name: string
  year: string
}

export enum Currency {
  DOLLAR = '$',
  EURO = '€'
}
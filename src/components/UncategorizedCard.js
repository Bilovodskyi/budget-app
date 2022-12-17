import { useBudgets } from '../contexts/BudgetsContext'
import BudgetCard from './BudgetCard'



export default function UncategorizedCard(props) {
    const { getBudgetExpenses } = useBudgets()
    const amount = getBudgetExpenses('0').reduce((total, expense) => total + expense.amount, 0)
    if (amount === 0) return null

    return <BudgetCard amount={amount} name='Uncategorized' {...props} />
}

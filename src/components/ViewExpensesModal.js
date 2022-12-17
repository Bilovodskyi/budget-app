import { useBudgets } from "../contexts/BudgetsContext"
import { currencyFormatter } from "../utils"
import deleteIcon from "../icon/delete.png"

export default function ViewExpensesModal({ budgetId, showModal, closeModal }) {

    const { getBudgetExpenses, budgets, deleteBudget, deleteExpense, deleteUncategorized } = useBudgets()
    
    const expenses = getBudgetExpenses(budgetId)
    const budget = budgetId === '0' ? {name: 'Uncategorized', id: 0} : budgets.find(b => b.id === budgetId)

    return (
    <dialog className={`view-expenses-modal ${showModal ? 'show' : ''}`}>
        <div className="form-replace">
        <div className="modal-header">
            <h1 className="modal-title">Expenses - {budget?.name}</h1>
            <div onClick={() => closeModal()} className="modal-close-btn">&times;</div>
        </div>
        <div className="modal-body">
          {expenses.map(expense => (
            <div className="expense" key={expense.id}>
                <div className="expense-name">{expense.description}</div>
                <div className="expenses-align-right">
                    <div className="expense-amount">{currencyFormatter.format(expense.amount)}</div>
                    <div onClick={() => deleteExpense(expense)} className="modal-close-btn"><img src={deleteIcon} alt="delete icon" /></div>
                </div>
            </div>
          ))}
        </div>
        {budgetId !== '0' ? <div className="modal-add-btn">
            <button onClick={() => {
                deleteBudget(budget)
                closeModal()
            }}>Delete Budget</button>
        </div> : <div className="modal-add-btn">
            <button onClick={() => {
                deleteUncategorized()
                closeModal()
            }}>Delete Budget</button>
        </div> }
        </div>
    </dialog>
  )
}


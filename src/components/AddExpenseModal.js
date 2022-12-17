import { useEffect, useRef } from "react"
import { useBudgets } from "../contexts/BudgetsContext"

export default function AddExpenseModal({ showModal, closeModal, dropDownMenu, dropDownMenuId }) {
    const descriptionRef = useRef()
    const amountRef = useRef()
    const budgetIdRef = useRef()
    const formRef = useRef()

    const { addExpense, budgets } = useBudgets()
    const handleSubmit = (e) => {
        e.preventDefault()
        addExpense(
            {
                description: descriptionRef.current.value,
                amount: parseFloat(amountRef.current.value),
                budgetId: budgetIdRef.current.value 
            }
        )
        closeModal()
    }

    useEffect(() => {
        formRef.current?.reset()
    }, [handleSubmit])

    return (
    <dialog className={`expense-modal ${showModal ? 'show' : ''}`}>
        <form ref={formRef} action="submit" onSubmit={handleSubmit}>
            <div className="modal-header">
                <h1 className="modal-title">New Expense</h1>
                <div onClick={() => closeModal()} className="modal-close-btn">&times;</div>
            </div>
            <div className="modal-body">
                <label htmlFor="name">Description</label>
                <input type="text" name="name" ref={descriptionRef} required/>
                <label htmlFor="max">Amount</label>
                <input type="number" name="max" ref={amountRef} required min={0} step={0.01} />
                <label htmlFor="budget">Budget</label>
                <select ref={budgetIdRef}>
                <option key={dropDownMenuId} value={dropDownMenuId}>{dropDownMenu}</option>
            {budgets.filter(budget => budget.id !== dropDownMenuId).map(budget => (
              <option key={budget.id} value={budget.id}>
                {budget.name}
              </option>
            ))}
                </select>

            </div>
            <div className="modal-add-btn">
                <button type="submit">Add</button>
            </div>
        </form>

    </dialog>


    
  )
}

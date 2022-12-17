import { useEffect, useRef } from "react"
import { useBudgets } from "../contexts/BudgetsContext"

export default function AddBudgetModal({ showModal, closeModal }) {
    const nameRef = useRef()
    const maxRef = useRef()
    const formRef = useRef()

    const { addBudget } = useBudgets()
    const handleSubmit = (e) => {
        e.preventDefault()
        addBudget(
            {
                name: nameRef.current.value,
                max: parseFloat(maxRef.current.value)
            }
        )
        closeModal()
    }

    useEffect(() => {
        formRef.current?.reset()
    }, [handleSubmit])

    return (
    <dialog className={`budget-modal ${showModal ? 'show' : ''}`}>
        <form ref={formRef} action="submit" onSubmit={handleSubmit}>
            <div className="modal-header">
                <h1 className="modal-title">New Budget</h1>
                <div onClick={() => closeModal()} className="modal-close-btn">&times;</div>
            </div>
            <div className="modal-body">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" ref={nameRef} required/>
                <label htmlFor="max">Maximum Spending</label>
                <input type="number" name="max" ref={maxRef} required min={0} step={0.01} />
            </div>
            <div className="modal-add-btn">
                <button type="submit">Add</button>
            </div>
        </form>
    </dialog>
  )
}

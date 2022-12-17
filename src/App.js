import React, { useState } from "react";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import ViewExpensesModal from "./components/ViewExpensesModal"
import BudgetCard from "./components/BudgetCard";
import UncategorizedCard from "./components/UncategorizedCard";
import TotalCard from "./components/TotalCard";
import { useBudgets } from "./contexts/BudgetsContext";



function App() {
  const [showBudgetModal, setShowBudgetModal] = useState(false)
  const [showExpenseModal, setShowExpenseModal] = useState(false)
  const [showViewExpenseModal, setShowViewExpenseModal] = useState(false)
  const [viewExpensesModalId, setViewExpensesModalId] = useState()
  const [dropDownMenu, setDropDownMenu] = useState('Uncategorized')
  const [dropDownMenuId, setDropDownMenuId] = useState(0)

  const { budgets, getBudgetExpenses, deleteAll } = useBudgets() 

  const getProgressBarVariant = (amount, max) => {
    const ratio = amount / max
    if (ratio < .5) {
      return 'blue' 
    }
    if (ratio < .9) {
      return 'yellow' 
    }
    if (ratio >= .9) {
      return 'red' 
    }
    }


  const getProgressBarLength = (amount, max) => {
    const percent = amount / max * 100
    return percent >= 0 && percent <= 100 ? percent : 100 
  }

  const openBudgetModal = () => {
    setShowBudgetModal(true)
  }

  const closeBudgetModal = () => {
    setShowBudgetModal(false)
  }

  const openExpenseModal = (budgetName, budgetId) => {
    if(budgetName) {
      setShowExpenseModal(true)
      setDropDownMenu(budgetName)
      setDropDownMenuId(budgetId)
    } else {
      setShowExpenseModal(true)
      setDropDownMenu('Uncategorized')
      setDropDownMenuId(0)
    }
  }

  const closeExpenseModal = () => {
    setShowExpenseModal(false)
  }

  const openViewExpensesModal = (budgetId) => {
    setShowViewExpenseModal(true)
    setViewExpensesModalId(budgetId)
  }

  const closeViewExpensesModal = () => {
    setShowViewExpenseModal(false)
    setViewExpensesModalId()
  }

 
  return (
  <>
    <div className="title-container">
      <h1 className="title">Budgets</h1>
      <div className="btn-holder">
        <button onClick={openBudgetModal} className="add-budget">Add Budget</button>
        <button onClick={() => openExpenseModal(false, false)} className="add-expense">Add Expense</button>
        <button onClick={deleteAll} className="delete-all">Delete All</button>
      </div>
    </div>
    <div className="card-container">
      {budgets.map(budget => {
        const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
        return <BudgetCard key={budget.id} name={budget.name} amount={amount} max={budget.max} getProgressBarVariant={getProgressBarVariant} getProgressBarLength={getProgressBarLength} onAddExpenseClick={() => openExpenseModal(budget.name, budget.id)} onViewExpensesClick={() => openViewExpensesModal(budget.id)}/>
      })}
      <UncategorizedCard onAddExpenseClick={() => openExpenseModal(0)} onViewExpensesClick={() => openViewExpensesModal('0')} />
      <TotalCard getProgressBarVariant={getProgressBarVariant} getProgressBarLength={getProgressBarLength}/>
    </div>
    <AddBudgetModal showModal={showBudgetModal} closeModal={closeBudgetModal}/>
    <AddExpenseModal showModal={showExpenseModal} dropDownMenu={dropDownMenu} dropDownMenuId={dropDownMenuId} closeModal={closeExpenseModal} />
    <ViewExpensesModal budgetId={viewExpensesModalId} showModal={showViewExpenseModal} closeModal={closeViewExpensesModal} />
  </>
  )

  }

export default App;

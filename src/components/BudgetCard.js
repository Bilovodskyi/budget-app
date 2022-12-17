import React from 'react'
import { currencyFormatter } from '../utils'

export default function BudgetCard( {name, amount, max, getProgressBarVariant, getProgressBarLength, onAddExpenseClick, hideButtons, onViewExpensesClick} ) {
  return (
    <div className={`card ${amount > max ? 'red' : ''}`}>
        <div className='card-title'>
            <div className='card-name'>{name}</div>
            <div className='card-amount'>{currencyFormatter.format(amount)}{max && <span> / {currencyFormatter.format(max)}</span>}</div>
        </div>
        {max >= 0 && <div className="progress-bar">
            <div className="wrapper">
                <span className={`progress-bar-fill ${getProgressBarVariant(amount, max)}`} style={{ width: `${getProgressBarLength(amount, max)}%`}}></span>
            </div>
        </div>}
        {!hideButtons && <div className="card-btn-holder">
           <button className="card-add-expense" onClick={onAddExpenseClick}>Add Expense</button>
           <button className="card-view-expenses" onClick={onViewExpensesClick}>Manage</button>
        </div>}
    </div> 
  )
}

 
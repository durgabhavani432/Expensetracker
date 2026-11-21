

import './index.css'
const ExpensesTable = ({
  expenses,
  onEdit,
  onDelete
}) => {
  const formatDate = value => {
    return new Date(value + 'T00:00:00').toLocaleDateString(
      'en-IN',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }
    )
  }

  return (
    <div className="expenses-table-section">

      <h2>▤ Your Expenses</h2>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {expenses.length > 0 ? (
              expenses.map(expense => (
                <tr key={expense.id}>
                  <td>{expense.title}</td>

                  <td>
                    ₹ {Number(expense.amount).toLocaleString('en-IN')}
                  </td>

                  <td>
                    <span className={`category ${expense.category.toLowerCase()}`}>
                      {expense.category}
                    </span>
                  </td>

                  <td>{formatDate(expense.date)}</td>

                  <td className="actions">
                    <button
                      className="edit-btn"
                      onClick={() => onEdit(expense)}
                    >
                      ✎
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => onDelete(expense.id)}
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No expenses found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default ExpensesTable

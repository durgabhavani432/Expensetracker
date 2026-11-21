
import './index.css'
const ExpenseForm = ({
  title,
  amount,
  category,
  date,
  setTitle,
  setAmount,
  setCategory,
  setDate,
  onSubmit,
  editId,
  onCancel
}) => {
  return (
    <section className="expense-form-section">

      <h2>➕ {editId ? 'Update Expense' : 'Add Expense'}</h2>

      <form className="expense-form" onSubmit={onSubmit}>

        <input
          type="text"
          placeholder="Title (e.g. Lunch)"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />

        <input
          type="number"
          min="0.01"
          step="0.01"
          placeholder="Amount (₹)"
          value={amount}
          onChange={event => setAmount(event.target.value)}
        />

        <select
          value={category}
          onChange={event => setCategory(event.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Others">Others</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={event => setDate(event.target.value)}
        />

        <button type="submit" className="add-btn">
          {editId ? 'Update Expense' : 'Add Expense'}
        </button>

        {editId && (
          <button
            type="button"
            className="cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}

      </form>
    </section>
  )
}

export default ExpenseForm

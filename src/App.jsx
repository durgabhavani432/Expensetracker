import './App.css'
import  { useState, useEffect } from 'react'
import Header from './components/Header'
import SummaryCards from './components/SummaryCards'
import EarningsForm from './components/EarningsForm'
import ExpenseForm from './components/ExpenseForm'
import Filters from './components/Filters'
import ExpensesTable from './components/ExpensesTable'
import CategorySummary from './components/CategorySummary'

import './App.css'

const App = () => {
const [errorMessage, setErrorMessage] = useState('')
  // Earnings state
  const [earnings, setEarnings] = useState(() => {
    return Number(localStorage.getItem('earnings')) || 0
  })

  // Expenses state
  const [expenses, setExpenses] = useState(() => {
    return JSON.parse(localStorage.getItem('expenses')) || []
  })

  // Expense form states
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState(
    new Date().toISOString().split('T')[0]
  )

  // Search and filter states
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('All Categories')
  const [filterDate, setFilterDate] = useState('All Dates')

  // Edit state
  const [editId, setEditId] = useState(null)

  // Earnings form visibility
  const [showEarnings, setShowEarnings] = useState(false)

  // Save earnings in localStorage
  useEffect(() => {
    localStorage.setItem('earnings', earnings)
  }, [earnings])

  // Save expenses in localStorage
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  // Calculate total expenses
  const totalExpenses = expenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  )

  // Calculate remaining balance
  const remainingBalance = earnings - totalExpenses

  // Add or update expense
  
const handleSubmit = event => {
  event.preventDefault()
  setErrorMessage('')

  if (!title.trim() || !amount || !category || !date) {
    alert('Please fill all the fields')
    return
  }

  if (Number(amount) <= 0) {
    alert('Enter a valid amount')
    return
  }

  // Calculate available balance when adding or editing
  const currentExpense = editId !== null
    ? expenses.find(item => item.id === editId)
    : null

  const availableBalance =
    remainingBalance + (currentExpense ? Number(currentExpense.amount) : 0)

  // Check insufficient balance
  if (Number(amount) > availableBalance) {
    setErrorMessage(
      `Insufficient balance! Available balance is ₹${availableBalance.toLocaleString('en-IN')}`
    )
    return
  }

  const expenseData = {
  id: editId !== null ? editId : crypto.randomUUID(),
  title: title.trim(),
  amount: Number(amount),
  category,
  date
}

  if (editId !== null) {
    setExpenses(prev =>
      prev.map(item =>
        item.id === editId ? expenseData : item
      )
    )
  } else {
    setExpenses(prev => [...prev, expenseData])
  }

  clearForm()
}

  // Clear expense form
  const clearForm = () => {
    setTitle('')
    setAmount('')
    setCategory('')
    setDate(new Date().toISOString().split('T')[0])
    setEditId(null)
  }

  // Edit expense
  const handleEdit = expense => {
    setTitle(expense.title)
    setAmount(String(expense.amount))
    setCategory(expense.category)
    setDate(expense.date)
    setEditId(expense.id)
  }

  // Delete expense
  const handleDelete = id => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this expense?'
    )

    if (confirmDelete) {
      setExpenses(prev =>
        prev.filter(item => item.id !== id)
      )

      if (editId === id) {
        clearForm()
      }
    }
  }

  // Update earnings
  const handleSaveEarnings = value => {
    setEarnings(value)
    setShowEarnings(false)
  }

  // Filter expenses
  const filteredExpenses = expenses.filter(expense => {

    const matchesSearch = expense.title
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesCategory =
      filterCategory === 'All Categories' ||
      expense.category === filterCategory

    const expenseDate = new Date(expense.date + 'T00:00:00')
    const today = new Date()

    const matchesDate =
      filterDate === 'All Dates' ||
      (filterDate === 'Today' &&
        expense.date === new Date().toISOString().split('T')[0]) ||
      (filterDate === 'This Month' &&
        expenseDate.getMonth() === today.getMonth() &&
        expenseDate.getFullYear() === today.getFullYear()) ||
      (filterDate === 'This Year' &&
        expenseDate.getFullYear() === today.getFullYear())

    return matchesSearch && matchesCategory && matchesDate
  })

  return (
    <div className="app">

      <Header />

      <SummaryCards
        earnings={earnings}
        totalExpenses={totalExpenses}
        remainingBalance={remainingBalance}
        onUpdateEarnings={() => setShowEarnings(!showEarnings)}
      />

      {showEarnings && (
        <EarningsForm
          earnings={earnings}
          onSave={handleSaveEarnings}
        />
      )}
      {errorMessage && (
  <p className="error-message">
    {errorMessage}
  </p>
)}

      <ExpenseForm
        title={title}
        amount={amount}
        category={category}
        date={date}
        setTitle={setTitle}
        setAmount={setAmount}
        setCategory={setCategory}
        setDate={setDate}
        onSubmit={handleSubmit}
        editId={editId}
        onCancel={clearForm}
      />

      <Filters
        search={search}
        setSearch={setSearch}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        filterDate={filterDate}
        setFilterDate={setFilterDate}
      />

      <section className="bottom-section">

        <ExpensesTable
          expenses={filteredExpenses}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <CategorySummary expenses={expenses} />

      </section>

    </div>
  )
}

export default App


import  { useState } from 'react'
import './index.css'
const EarningsForm = ({ earnings, onSave }) => {
  const [newEarnings, setNewEarnings] = useState(earnings)

  const handleSubmit = event => {
    event.preventDefault()

    if (newEarnings === '' || Number(newEarnings) < 0) {
      alert('Please enter valid earnings')
      return
    }

    onSave(Number(newEarnings))
  }

  return (
    <form className="earnings-form" onSubmit={handleSubmit}>
      <h2>Update Your Earnings</h2>

      <input
        type="number"
        min="0"
        placeholder="Enter your total earnings"
        value={newEarnings}
        onChange={event => setNewEarnings(event.target.value)}
      />

      <button type="submit">Save Earnings</button>
    </form>
  )
}

export default EarningsForm

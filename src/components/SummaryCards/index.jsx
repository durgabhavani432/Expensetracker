
import './index.css'
const SummaryCards = ({
  earnings,
  totalExpenses,
  remainingBalance,
  onUpdateEarnings
}) => {
  return (
    <section className="dashboard">

      <div className="summary-card earnings-card">
        <div className="summary-icon">💰</div>

        <div>
          <h2>Total Earnings</h2>
          <h1>₹ {earnings.toLocaleString('en-IN')}</h1>

          <button
            className="update-btn"
            onClick={onUpdateEarnings}
          >
            Update Earnings
          </button>
        </div>
      </div>

      <div className="summary-card expenses-card">
        <div className="summary-icon">➖</div>

        <div>
          <h2>Total Expenses</h2>
          <h1>₹ {totalExpenses.toLocaleString('en-IN')}</h1>
        </div>
      </div>

      <div className="summary-card balance-card">
        <div className="summary-icon">✔</div>

        <div>
          <h2>Remaining Balance</h2>
          <h1>₹ {remainingBalance.toLocaleString('en-IN')}</h1>
        </div>
      </div>

    </section>
  )
}

export default SummaryCards



import './index.css'
const CategorySummary = ({ expenses }) => {
  const categories = ['Food', 'Travel', 'Shopping', 'Others']

  const categorySummary = categories.map(category => {
    const total = expenses
      .filter(expense => expense.category === category)
      .reduce((sum, expense) => sum + Number(expense.amount), 0)

    return {
      category,
      total
    }
  })

  return (
    <div className="category-section">

      <h2>▥ Category Summary</h2>

      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {categorySummary.map(item => (
            <tr key={item.category}>
              <td>
                <span className="category-icon">
                  {item.category === 'Food' && '🍴'}
                  {item.category === 'Travel' && '✈️'}
                  {item.category === 'Shopping' && '🛍️'}
                  {item.category === 'Others' && '•••'}
                </span>

                {item.category}
              </td>

              <td>
                ₹ {item.total.toLocaleString('en-IN')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default CategorySummary

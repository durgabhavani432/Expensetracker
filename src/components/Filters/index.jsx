import './index.css'
const Filters = ({
  search,
  setSearch,
  filterCategory,
  setFilterCategory,
  filterDate,
  setFilterDate
}) => {
  return (
    <section className="filter-section">

      <input
        type="text"
        placeholder="🔍 Search by title..."
        value={search}
        onChange={event => setSearch(event.target.value)}
      />

      <div className="filter-group">
        <label>Filter by Category:</label>

        <select
          value={filterCategory}
          onChange={event => setFilterCategory(event.target.value)}
        >
          <option>All Categories</option>
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Others</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Filter by Date:</label>

        <select
          value={filterDate}
          onChange={event => setFilterDate(event.target.value)}
        >
          <option>All Dates</option>
          <option>Today</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>

    </section>
  )
}

export default Filters

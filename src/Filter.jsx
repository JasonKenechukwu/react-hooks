function Filter({ titleFilter, ratingFilter, onTitleChange, onRatingChange }) {
  return (
    <div className="filter-bar">
      <label>
        <span>Title</span>
        <input
          type="text"
          value={titleFilter}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Search by title"
        />
      </label>
      <label>
        <span>Minimum rating</span>
        <input
          type="number"
          min="1"
          max="5"
          value={ratingFilter}
          onChange={(e) => onRatingChange(Number(e.target.value))}
        />
      </label>
    </div>
  );
}

export default Filter;

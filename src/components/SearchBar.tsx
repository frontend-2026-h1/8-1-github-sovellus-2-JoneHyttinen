type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  filterValue: string;
  onFilterChange: (value: string) => void;
};

export function SearchBar({
  value,
  onChange,
  onSearch,
  filterValue,
  onFilterChange,
}: SearchBarProps) {
  return (
    <div className="search-panel">
      <form
        className="search"
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          onSearch();
        }}
      >
        <label htmlFor="repository-query" className="search__label">
          Search repositories
        </label>
        <input
          id="repository-query"
          className="search__input"
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-label="Repository search term"
        />
        <button className="search__button" type="submit">
          Search
        </button>
      </form>

      <div className="filter">
        <label htmlFor="repository-filter" className="filter__label">
          Filter results by repository name
        </label>
        <input
          id="repository-filter"
          className="filter__input"
          type="text"
          value={filterValue}
          onChange={(event) => onFilterChange(event.target.value)}
        />
      </div>
    </div>
  );
}

import { useState } from "react";
import { SearchBar } from "./SearchBar.tsx";
import { RepositoryTable } from "./RepositoryTable.tsx";
import { useGithubRepositories } from "../hooks/useGithubRepositories.ts";

export function GithubExplorer() {
  const {
    repositories,
    searchTerm,
    setSearchTerm,
    statusMessage,
    handleSearch,
  } = useGithubRepositories();
  const [filterTerm, setFilterTerm] = useState("");

  const filteredRepositories = repositories.filter((repository) =>
    repository.fullName.toLowerCase().includes(filterTerm.trim().toLowerCase()),
  );

  return (
    <main className="explorer">
      <h1 className="explorer__title">GitHub Explorer</h1>
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        onSearch={handleSearch}
        filterValue={filterTerm}
        onFilterChange={setFilterTerm}
      />
      {statusMessage && <p className="explorer__message">{statusMessage}</p>}
      <RepositoryTable repositories={filteredRepositories} />
    </main>
  );
}

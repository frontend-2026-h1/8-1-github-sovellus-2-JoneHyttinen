type Repository = {
  fullName: string;
  url: string;
};

type RepositoryTableProps = {
  repositories: Repository[];
};

export function RepositoryTable({ repositories }: RepositoryTableProps) {
  return (
    <table className="results" aria-label="Repository search results">
      <thead>
        <tr>
          <th>Full Name</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {repositories.length === 0 ? (
          <tr>
            <td colSpan={2}>No repositories to display.</td>
          </tr>
        ) : (
          repositories.map((repository) => (
            <tr key={repository.fullName}>
              <td>{repository.fullName}</td>
              <td>
                <a href={repository.url} target="_blank" rel="noreferrer">
                  {repository.url}
                </a>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

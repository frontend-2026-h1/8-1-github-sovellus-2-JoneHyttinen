import { useEffect, useState } from "react";

type GitHubRepository = {
  full_name: string;
  html_url: string;
};

type SearchRepositoriesResponse = {
  items: GitHubRepository[];
};

type RepositoryViewModel = {
  fullName: string;
  url: string;
};

export function useGithubRepositories() {
  const [repositories, setRepositories] = useState<RepositoryViewModel[]>([]);
  const [searchTerm, setSearchTerm] = useState("react");
  const [statusMessage, setStatusMessage] = useState("Loading repositories...");

  const searchRepositories = async (
    keyword: string,
  ): Promise<RepositoryViewModel[]> => {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(keyword)}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch repositories");
    }

    const data: SearchRepositoriesResponse = await response.json();
    return data.items.map((repository) => ({
      fullName: repository.full_name,
      url: repository.html_url,
    }));
  };

  const fetchRepositories = async (keyword: string) => {
    const trimmedKeyword = keyword.trim();

    if (!trimmedKeyword) {
      setStatusMessage("Please enter a keyword before searching.");
      return;
    }

    setStatusMessage("Loading repositories...");

    try {
      const mappedRepositories = await searchRepositories(trimmedKeyword);

      setRepositories(mappedRepositories);
      setStatusMessage(
        mappedRepositories.length > 0 ? "" : "No repositories found.",
      );
    } catch {
      setStatusMessage("Failed to fetch repositories.");
    }
  };

  useEffect(() => {
    let isCancelled = false;

    void searchRepositories("react")
      .then((mappedRepositories) => {
        if (isCancelled) {
          return;
        }

        setRepositories(mappedRepositories);
        setStatusMessage(
          mappedRepositories.length > 0 ? "" : "No repositories found.",
        );
      })
      .catch(() => {
        if (!isCancelled) {
          setStatusMessage("Failed to fetch repositories.");
        }
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  const handleSearch = () => {
    void fetchRepositories(searchTerm);
  };

  return {
    repositories,
    searchTerm,
    setSearchTerm,
    statusMessage,
    handleSearch,
  };
}

import axios from "axios";

const github = axios.create({
  baseURL: "https://api.github.com",
});

// Get search results
export const searchUsers = async (text) => {
  const params = new URLSearchParams({ q: text });

  try {
    const response = await github.get(`/search/users?${params}`);
    return response.data.items; // GitHub API returns users in `items`
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return []; // Return an empty array if an error occurs
  }
};

// Get single user and repo

export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`),
  ]);

  return { user: user.data, repos: repos.data };
};

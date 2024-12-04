// Get search results
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });

  try {
    const response = await fetch(
      `https://api.github.com/search/users?${params}`
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const { items } = await response.json();

    return items;
  } catch (error) {
    console.error("Fetch Users Error:", error.message);
  }
};

//get single user
export const getUser = async (login) => {
  try {
    const response = await fetch(`https://api.github.com/users/${login}`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();

      return data;
    }
  } catch (error) {
    console.error("Fetch Users Error:", error.message);
  }
};

//get user repos
export const getUserRepos = async (login) => {
  const params = new URLSearchParams({
    sort: "created",
    per_page: 10,
  });

  try {
    const response = await fetch(
      `https://api.github.com/users/${login}/repos?${params}`
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Fetch Users Error:", error.message);
  }
};

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

import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // Get search results
  const searchUsers = async (text) => {
    setLoading();

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

      dispatch({
        type: "GET_USERS",
        payload: items,
      });
    } catch (error) {
      console.error("Fetch Users Error:", error.message);
    }
  };

  //get single user
  const getUser = async (login) => {
    try {
      const response = await fetch(`https://api.github.com/users/${login}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      if (response.status === 404) {
        window.location = "/notfound";
      } else {
        const data = await response.json();

        dispatch({
          type: "GET_USER",
          payload: data,
        });
      }
    } catch (error) {
      console.error("Fetch Users Error:", error.message);
    }
  };

  //get user repos
  const getUserRepos = async (login) => {
    setLoading();

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

      dispatch({
        type: "GET_REPOs",
        payload: data,
      });
    } catch (error) {
      console.error("Fetch Users Error:", error.message);
    }
  };

  //clear users from state
  const clearUsers = () => dispatch({ type: "CLEAR_USERS" });

  // Set loading
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        repos: state.repos,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;

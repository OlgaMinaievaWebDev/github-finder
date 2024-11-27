import { useEffect, useState } from "react";

function UserResults() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch(`https://api.github.com/users`);
    const data = await response.json();

    setUsers(data);
    setLoading(false);
  };

  if (!loading) {
    return (
      <div className="grid grid-col-1 gap-8 xl:grid-col-4 lg:grid-col-3 md:grid-col-2">
        {users.map((user) => {
          <h3 className="text-blue-500">{user.login}</h3>;
          console.log(user.login);
        })}
      </div>
    );
  } else {
    return <h3>Loading...</h3>;
  }
}

export default UserResults;

import { useEffect, useState } from "react";
import axios from "axios";
import SidebarLayout from "../../components/layout/SidebarLayout";

function AdminUsers() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  const deleteUser = async (id) => {

    if (!window.confirm("Delete this user?")) return;

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchUsers();

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SidebarLayout>

      <h2 className="text-2xl font-bold mb-6 text-indigo-600">
        All Users
      </h2>

      <div className="bg-white shadow rounded-xl overflow-hidden">

        <table className="w-full text-left">

          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>

            {users.map((user) => (

              <tr key={user.id} className="border-t">

                <td className="p-4">
                  {user.id}
                </td>

                <td className="p-4">
                  {user.name}
                </td>

                <td className="p-4">
                  {user.email}
                </td>

                <td className="p-4">
                  <span className="px-3 py-1 rounded bg-indigo-100 text-indigo-600 text-xs">
                    {user.role}
                  </span>
                </td>

                <td className="p-4">

                  {user.role !== "ADMIN" && (
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </SidebarLayout>
  );
}

export default AdminUsers;
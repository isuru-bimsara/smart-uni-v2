import { useEffect, useState } from "react";
import { adminApi } from "../../api/admin";

const ROLES = ["USER", "TECHNICIAN", "ADMIN"];

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await adminApi.getUsers();
      setUsers(res.data.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load users");
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await adminApi.updateRole(id, newRole);
      fetchUsers();
    } catch (err) {
      alert("Failed to update role");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

      <table className="w-full border bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Change Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="p-2 flex items-center gap-2">
                {u.picture && (
                  <img
                    src={u.picture}
                    alt="profile"
                    className="w-8 h-8 rounded-full"
                  />
                )}
                {u.name}
              </td>

              <td className="p-2">{u.email}</td>

              <td className="p-2 font-semibold">{u.role}</td>

              <td className="p-2">
                <select
                  value={u.role}
                  onChange={(e) =>
                    handleRoleChange(u.id, e.target.value)
                  }
                  className="border px-2 py-1 rounded"
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
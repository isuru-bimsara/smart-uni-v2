//frontend/src/api/admin.js
import api from "./axios";

export const adminApi = {
  getUsers: () => api.get("/admin/users"),

  updateRole: (id, role) =>
    api.patch(`/admin/users/${id}/role`, { role }),
};
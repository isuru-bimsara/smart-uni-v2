import api from "./axios";

export const authApi = {
  getMe: () => api.get("/auth/me"),
  loginWithGoogle: () => {
    // window.location.href = '/oauth2/authorization/google'
    window.location.href = "http://localhost:8083/oauth2/authorization/google";
  },
};

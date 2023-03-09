import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    isAuthenticated: false,
    user: null,
    token: null as string | null,
  }),
  getters: {
    isLoggedIn: (state) => state.isAuthenticated,
    currentUser: (state) => state.user,
    currentToken: (state) => state.token,
  },
  actions: {
    login(token: string, user: any) {
      this.isAuthenticated = true;
      this.token = token;
      this.user = user;
    },
    logout() {
      this.isAuthenticated = false;
      this.token = null;
      this.user = null;
    },
  },
});

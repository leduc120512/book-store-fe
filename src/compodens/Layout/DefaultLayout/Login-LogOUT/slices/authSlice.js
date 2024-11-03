import { createSlice } from "@reduxjs/toolkit";

// TypeScript interfaces (if using TypeScript)
interface User {
  id: string;
  name: string;
  // Add other user properties as needed
}

interface AuthState {
  user: User | null;
  token: string;
}

// Khôi phục thông tin người dùng từ localStorage
const getUserFromLocalStorage = (): User | null => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (err) {
    console.error("Stored user is not valid JSON", err);
    return null;
  }
};

const initialState: AuthState = {
  user: getUserFromLocalStorage(),
  token: localStorage.getItem("token") || "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = "";
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

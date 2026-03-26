import { create } from "zustand";
import type { User } from "firebase/auth";

interface AuthState{
    user: User | null
    // 修改 user 的方法,一个函数，用来更新 user ,要么是 User 对象，要么是 null（两种可能）
    setUser: (user: User | null) => void
}

export const useAuthStore = create<AuthState>( (set) => ({
    user:null,
    setUser: (user) => set({ user}),
}))
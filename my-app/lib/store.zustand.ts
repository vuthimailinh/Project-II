import { create } from 'zustand';

interface UserInfo {
    email: string;
    username: string;
    role: string;
    phoneNumber: string;
    image?: string;
    status: string;
}

interface UserState {
    user: UserInfo | null;
    setUser: (user: UserInfo) => void;
}

const useUserInfoStore = create<UserState>((set) => ({
    user: null,
    setUser: (newUser) => set((state) => ({ user: newUser })),
}));

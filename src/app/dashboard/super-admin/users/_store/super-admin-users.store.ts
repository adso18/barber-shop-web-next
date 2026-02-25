import { create } from 'zustand';
import type { User } from '@/services/users/user.types';

interface SuperAdminUsersStore {
	editUser: User | null;
	userToDelete: User | null;
	setEditUser: (user: User | null) => void;
	setUserToDelete: (user: User | null) => void;
}

export const useSuperAdminUsersStore = create<SuperAdminUsersStore>((set) => ({
	editUser: null,
	userToDelete: null,
	setEditUser: (editUser) => set({ editUser }),
	setUserToDelete: (userToDelete) => set({ userToDelete }),
}));

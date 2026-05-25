// lib/stores/authStore.ts
import { create } from 'zustand';
import type { UserProfile } from '@/types/user';
import { AuthStore } from '@/types/store/auth-store';



export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  signup: async (data) => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    
    if (!res.ok) {
      throw new Error(result.error);
    }
    
    // After signup, auto login
    await useAuthStore.getState().login(data.email, data.password);
  },

   login: async (email, password) => {
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const result = await res.json();
    
    if (!res.ok) {
      throw new Error(result.error);
    }

    // Fetch profile after login
   /*  await useAuthStore.getState().fetchProfile(); */
  },

   logout: async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    set({ user: null, isAuthenticated: false });
  },
   fetchProfile: async () => {
    try {
      set({ isLoading: true });
      const res = await fetch('/api/user/profile');
      
      if (res.ok) {
        const user = await res.json();
        set({ user, isAuthenticated: true });
      } else {
        set({ user: null, isAuthenticated: false });
      }
    } catch {
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));
// lib/stores/authStore.ts
import { create } from 'zustand';
import { auth, googleProvider } from '@/lib/firebase/config';
import { signInWithPopup } from 'firebase/auth';
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
    
    if (!res.ok) throw new Error(result.error);
    
    await useAuthStore.getState().login(data.email, data.password);
  },

  login: async (email, password) => {
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const result = await res.json();
    
    if (!res.ok) throw new Error(result.error);

    await useAuthStore.getState().fetchProfile();
  },

  // Add Google login method
  loginWithGoogle: async () => {
    try {
      // Sign in with Google popup
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      // Send token to backend
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);

      await useAuthStore.getState().fetchProfile();
    } catch (error: any) {
      throw new Error(error.message || 'Google login failed');
    }
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
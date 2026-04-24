import { useState, useCallback } from 'react';

// Simulated user credentials for demo
const MOCK_USERS = [
  { email: 'admin@example.com', password: 'Admin@1234' },
  { email: 'user@example.com',  password: 'User@5678'  },
];

/**
 * useAuth — custom hook encapsulating the auth state machine.
 *
 * States: idle | loading | success | error
 */
export function useAuth() {
  const [authState, setAuthState] = useState({
    status: 'idle',   // 'idle' | 'loading' | 'success' | 'error'
    message: '',
    user: null,
  });

  const login = useCallback(async ({ email, password }) => {
    setAuthState({ status: 'loading', message: '', user: null });

    // Simulate a network round-trip (1.8 s)
    await new Promise((res) => setTimeout(res, 1800));

    const match = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (match) {
      setAuthState({
        status: 'success',
        message: `Welcome back, ${email.split('@')[0]}! You are now signed in.`,
        user: { email },
      });
    } else {
      setAuthState({
        status: 'error',
        message: 'Invalid email or password. Please try again.',
        user: null,
      });
    }
  }, []);

  const reset = useCallback(() => {
    setAuthState({ status: 'idle', message: '', user: null });
  }, []);

  return { authState, login, reset };
}

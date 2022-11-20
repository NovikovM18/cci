import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

const App = createContext();

export default function AppContext({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [])

  return (
    <App.Provider
      value={{
        user,
        setUser,
        loading,
      }}
    >
      { children }
    </App.Provider>
  )
}

export const AppState = () => {
  return useContext(App);
}

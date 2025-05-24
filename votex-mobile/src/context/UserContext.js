import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, createContext } from 'react';
import Constants from 'expo-constants';

const API_BASE_URL =
  Constants?.expoConfig?.extra?.API_BASE_URL ||
  Constants?.manifest?.extra?.API_BASE_URL ||
  "http://127.0.0.1:5000"; // optional fallback

export const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const res = await fetch(`${API_BASE_URL}/api/student/profile`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await res.json();
          if (res.ok) setUser(data.student);
        }
      } catch (error) {
        console.error('Auto-login error:', error);
      }
    };

    loadUser();
  }, []);


  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

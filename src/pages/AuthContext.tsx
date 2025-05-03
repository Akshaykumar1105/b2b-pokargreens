import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id?: string;
  name?: string;
  email: string;
  password?: string; // Don't store passwords client-side in production
  role?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;
  register: (user: User) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  currentUser: null,
  login: () => {},
  logout: () => {},
  register: () => false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("currentUser");
      }
    }
  }, []);

  const login = (user: User) => {
    const { password, ...userWithoutPassword } = user;
    setCurrentUser(userWithoutPassword);
    setIsLoggedIn(true);
    localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
  };

  const logout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("rememberedUser");
  };

  const register = (user: User): boolean => {
    try {
      const storedUsersData = localStorage.getItem("users");
      let users: User[] = [];

      if (storedUsersData) {
        try {
          users = JSON.parse(storedUsersData);
          if (!Array.isArray(users)) users = [users];

          if (users.some((u) => u.email.toLowerCase() === user.email.toLowerCase())) {
            console.log("User already exists:", user.email);
            return false;
          }
        } catch {
          users = [];
        }
      }

      const newUser = { ...user, id: crypto.randomUUID() };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      login(newUser);
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

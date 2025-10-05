"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type UserRole = "participant" | "organizer" | "admin"

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  walletBalance: number
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string, role?: UserRole) => void
  signup: (name: string, email: string, password: string, role: UserRole) => void
  logout: () => void
  updateBalance: (amount: number) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = (email: string, password: string, role: UserRole = "participant") => {
    // Simulated login
    setUser({
      id: "1",
      name: email.split("@")[0],
      email,
      role,
      walletBalance: 5000, // Static balance
    })
  }

  const signup = (name: string, email: string, password: string, role: UserRole) => {
    // Simulated signup
    setUser({
      id: "1",
      name,
      email,
      role,
      walletBalance: 5000, // Static balance
    })
  }

  const logout = () => {
    setUser(null)
  }

  const updateBalance = (amount: number) => {
    setUser(currentUser => {
      if (!currentUser) return null;
      return { ...currentUser, walletBalance: currentUser.walletBalance + amount };
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateBalance,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

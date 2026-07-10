"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * AuthCard component provides a unified login/signup form interface.
 * Handles input state management, client-side validation, and simulated auth flows.
 */
export default function AuthCard() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "", server: "" });
  const router = useRouter();

  // Handles input changes and clears field-specific errors upon user interaction
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear specific field errors when the user interacts with the input
    if (errors[name as keyof typeof errors] || errors.server) {
      setErrors({ ...errors, [name]: "", server: "" });
    }
  };

  // Performs client-side form validation before submission
  const validate = () => {
    const newErrors = { email: "", password: "", server: "" };
    let isValid = true;

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsLoading(true);

    // Simulate asynchronous authentication request
    setTimeout(() => {
      setIsLoading(false);
      
      // Mocked backend error response for demonstration purposes
      if (formData.email === "fail@test.com") {
        setErrors((prev) => ({ ...prev, server: "Invalid email or password." }));
      } else {
        router.push("/dashboard");
      }
    }, 1500);
  };

  return (
    <div className="bg-[var(--color-trove-card-surface)] p-8 sm:p-10 border border-[var(--color-trove-border)] rounded-[var(--radius-trove-card)] shadow-sm text-center">
      
      <div className="w-12 h-12 bg-[var(--color-trove-primary)] text-white flex items-center justify-center rounded-lg mx-auto mb-6 text-xl font-bold">
        T
      </div>

      <h1 className="text-[26px] font-semibold text-[var(--color-trove-text-default)] mb-2">
        {isLogin ? "Welcome back" : "Create an account"}
      </h1>

      <p className="text-[14px] text-[var(--color-trove-text-neutral)] mb-8">
        {isLogin ? "Sign in to your account" : "Enter your details to get started"}
      </p>

      {/* Server-side error alert */}
      {errors.server && (
        <div className="mb-4 p-3 bg-[var(--color-trove-negative)]/10 border border-[var(--color-trove-negative)] rounded-lg text-[12px] text-[var(--color-trove-negative)]">
          {errors.server}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
        
        {/* Email Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-[var(--color-trove-text-neutral)]">Email address</label>
          <input 
            type="text" 
            name="email" // Attribute required for dynamic change handler
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg bg-[var(--color-trove-bg-default)] border ${errors.email ? 'border-[var(--color-trove-negative)]' : 'border-[var(--color-trove-border)]'} text-[14px] text-[var(--color-trove-text-default)] focus:outline-none focus:border-[var(--color-trove-primary)]`}
          />
          {errors.email && <span className="text-[11px] text-[var(--color-trove-negative)]">{errors.email}</span>}
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-[var(--color-trove-text-neutral)]">Password</label>
          <input 
            type="password" 
            name="password" // Attribute required for dynamic change handler
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg bg-[var(--color-trove-bg-default)] border ${errors.password ? 'border-[var(--color-trove-negative)]' : 'border-[var(--color-trove-border)]'} text-[14px] text-[var(--color-trove-text-default)] focus:outline-none focus:border-[var(--color-trove-primary)]`}
          />
          {errors.password && <span className="text-[11px] text-[var(--color-trove-negative)]">{errors.password}</span>}
        </div>

        <button 
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 py-3 bg-[var(--color-trove-primary)] text-white text-[14px] font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-70 flex justify-center items-center h-[48px]"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Processing...
            </span>
          ) : (
            isLogin ? "Sign in" : "Create account"
          )}
        </button>
      </form>

      {/* Conditional rendering for password recovery */}
      {isLogin && (
        <div className="mt-6">
          <button className="text-[12px] text-[var(--color-trove-text-neutral)] hover:text-[var(--color-trove-primary)] transition-colors">
            Forgot password?
          </button>
        </div>
      )}

      {/* Section separator */}
      <hr className="my-6 border-[var(--color-trove-border)]" />

      {/* Switch between login and registration views */}
      <button 
        onClick={() => {
          setIsLogin(!isLogin);
          setErrors({ email: "", password: "", server: "" }); 
          setFormData({ email: "", password: "" });
        }}
        className="text-[14px] text-[var(--color-trove-text-default)] hover:text-[var(--color-trove-primary)] transition-colors font-medium"
      >
        {isLogin ? "Create a Trove account" : "Already have an account? Sign in"}
      </button>

    </div>
  );
}
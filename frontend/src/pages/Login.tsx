import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../utils/axios";
import Notification from "../components/Notification";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [notification, setNotification] = useState({ success: false, message: "", show: false });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/login", formData);
      const { access_token, user } = res.data;
      const { role } = user;

      localStorage.setItem("token", access_token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", role);

      api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

      setNotification({
        success: true,
        message: "Login successful! Redirecting...",
        show: true,
      });

      setTimeout(() => navigate("/"), 1500);
    } catch (error: any) {
      let message = "Login failed. Please try again.";

      if (error?.response?.data?.message) {
        message = error.response.data.message;
      } else if (error?.response?.data?.errors) {
        const errors = Object.values(error.response.data.errors);
        if (errors.length > 0) {
          message = Array.isArray(errors[0]) ? errors[0][0] : String(errors[0]);
        }
      }

      setNotification({
        success: false,
        message,
        show: true,
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gray-100">
      {notification.show && (
        <Notification
          success={notification.success}
          message={notification.message}
          onClose={() => setNotification((prev) => ({ ...prev, show: false }))}
        />
      )}
      <div className="w-full max-w-md rounded-lg bg-white p-8 drop-shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Login</h1>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-500"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-orange-400 py-2 px-4 text-center font-medium text-white hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

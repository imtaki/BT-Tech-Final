export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Login</h1>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
        </div>
        
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-700 focus:outline-none focus:ring-1 focus:green-700"
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
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-700 focus:outline-none focus:ring-1 focus:ring-green-700"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full rounded-md bg-green-700 py-2 px-4 text-center font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:green-700 focus:ring-offset-2"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="w-full max-w-md rounded-2xl bg-white border border-blue-100 p-8 shadow-xl">
        <h2 className="text-2xl font-bold">Welcome Back</h2>
        <p className="text-sm text-slate-500 mt-1">Log in to BrandUp AI Builder.</p>
        <div className="mt-6 space-y-3">
          <input className="w-full rounded-lg border p-3" placeholder="Email" />
          <input className="w-full rounded-lg border p-3" placeholder="Password" type="password" />
          <Link to="/dashboard" className="block text-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-500 text-white p-3 font-medium">Login</Link>
        </div>
      </div>
    </div>
  );
}

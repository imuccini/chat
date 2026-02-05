'use client';

import { useActionState } from 'react';
import { loginAction } from '@/app/actions/adminAuth';

export default function AdminLogin() {
    const [state, action, isPending] = useActionState(loginAction, { error: '' });

    return (
        <div className="flex items-center justify-center min-h-screen bg-white sm:bg-gray-100">
            <div className="w-full h-screen sm:h-auto sm:w-96 p-8 bg-white sm:rounded sm:shadow-md flex flex-col justify-center">
                <h1 className="mb-6 text-2xl font-bold text-center">Admin Login</h1>
                <form action={action} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Username</label>
                        <input
                            name="username"
                            type="text"
                            className="w-full p-2 border rounded"
                            defaultValue="admin"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Password</label>
                        <input
                            name="password"
                            type="password"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isPending ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}

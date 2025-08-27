import { useSelector, useDispatch } from 'react-redux';
import { updateFields } from "../features/auth/login/hook/loginSlice.js";
import { LoginService } from "../features/auth/login/api/loginService.jsx";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function Login() {
    const { email, password, isLoading, emailError, passwordError, message, LoggedIn } = useSelector(state => state.login);
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async () => {
        dispatch(LoginService({ email, password }));
    };

    if (LoggedIn) {
        window.location.reload();
    }

    return (
        <div className="relative flex min-h-screen flex-col justify-center bg-gradient-to-br from-[#06101a] via-[#0d1a29] to-[#12273c] overflow-x-hidden">
            {/* Decorative Blur Circles */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#4aa6ff] rounded-full opacity-10 blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#3ac1ff] rounded-full opacity-10 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#2a4365] rounded-full opacity-5 blur-3xl"></div>
            </div>

            <div className="layout-container flex h-full flex-col relative z-10">
                <div className="px-4 md:px-40 flex flex-1 justify-center py-5">
                    <div className="layout-content-container flex flex-col w-full max-w-[900px] py-5 flex-1">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

                            {/* Branding Side */}
                            <div className="hidden lg:flex flex-col justify-center items-center space-y-6">
                                <div className="relative w-full max-w-md">
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#4aa6ff] to-[#3ac1ff] rounded-2xl blur opacity-20"></div>
                                    <img
                                        src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=2070&q=80"
                                        alt="workspace"
                                        className="relative rounded-2xl shadow-2xl w-full h-80 object-cover border border-[#2a4365]"
                                    />
                                </div>
                                <div className="text-center space-y-4">
                                    <h1 className="text-4xl font-bold bg-gradient-to-r from-[#4aa6ff] to-[#3ac1ff] bg-clip-text text-transparent">
                                        Advnetra
                                    </h1>
                                    <p className="text-[#b0d8f5] text-lg leading-relaxed max-w-md">
                                        Plan your next escape, explore top destinations, and turn travel dreams into reality
                                    </p>
                                </div>
                            </div>

                            {/* Login Form */}
                            <div className="flex flex-col justify-center">
                                <div className="bg-[#0d1a29]/80 backdrop-blur-xl border border-[#2a4365] rounded-3xl p-8 shadow-2xl">
                                    <div className="lg:hidden text-center mb-8">
                                        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#4aa6ff] to-[#3ac1ff] bg-clip-text text-transparent mb-2">
                                            Advnetra
                                        </h1>
                                        <div className="w-full h-32 mb-4 rounded-xl overflow-hidden">
                                            <img
                                                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=2070&q=80"
                                                alt="workspace"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="text-center lg:text-left">
                                            <h2 className="text-white text-3xl font-bold mb-2">Welcome back</h2>
                                            <p className="text-[#b0d8f5] text-base">Sign in to continue your journey</p>
                                        </div>

                                        {/* Email */}
                                        <div className="space-y-2">
                                            <label className="text-[#b0d8f5] text-sm font-medium">Email Address</label>
                                            <div className="relative">
                                                <input
                                                    placeholder="Enter your email"
                                                    className="form-input w-full rounded-xl text-white border border-[#2a4365] bg-[#2a4365]/40 backdrop-blur-sm focus:ring-2 focus:ring-[#4aa6ff] h-14 placeholder:text-[#b0d8f5] pl-4 pr-4"
                                                    value={email}
                                                    onChange={(e) => dispatch(updateFields({ field: "email", value: e.target.value }))}
                                                />
                                            </div>
                                            {emailError && <p className="text-red-400 text-sm font-medium">{emailError}</p>}
                                        </div>

                                        {/* Password */}
                                        <div className="space-y-2">
                                            <label className="text-[#b0d8f5] text-sm font-medium">Password</label>
                                            <div className="relative">
                                                <input
                                                    placeholder="Enter your password"
                                                    type={showPassword ? "text" : "password"}
                                                    className="form-input w-full rounded-xl text-white border border-[#2a4365] bg-[#2a4365]/40 backdrop-blur-sm focus:ring-2 focus:ring-[#4aa6ff] h-14 placeholder:text-[#b0d8f5] pl-4 pr-12"
                                                    value={password}
                                                    onChange={(e) => dispatch(updateFields({ field: "password", value: e.target.value }))}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#b0d8f5] hover:text-[#4aa6ff]"
                                                >
                                                    {showPassword ? '🙈' : '👁️'}
                                                </button>
                                            </div>
                                            {passwordError && <p className="text-red-400 text-sm font-medium">{passwordError}</p>}
                                        </div>

                                        {message && <p className="text-red-400 text-sm font-medium">{message}</p>}

                                        <div className="flex justify-end">
                                            <button className="text-[#4aa6ff] font-medium hover:text-[#3ac1ff] text-sm">Forgot Password?</button>
                                        </div>

                                        <button
                                            className="flex items-center justify-center h-14 w-full rounded-xl bg-gradient-to-r from-[#4aa6ff] to-[#3ac1ff] hover:from-[#369af2] hover:to-[#34b2e5] text-[#0d1a29] text-lg font-bold transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:opacity-50"
                                            onClick={handleSubmit}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-5 h-5 border-2 border-[#0d1a29] border-t-transparent rounded-full animate-spin"></div>
                                                    <span>Signing in...</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <span>Sign In</span>
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                    </svg>
                                                </div>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

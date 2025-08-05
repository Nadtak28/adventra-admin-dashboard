import {useSelector, useDispatch} from 'react-redux'
import {updateFields} from "../features/auth/login/hook/loginSlice.js";
import {LoginService} from "../features/auth/login/api/loginService.jsx";
import {useEffect, useState} from "react";
import CircularProgress from '@mui/material/CircularProgress';
import {tokenStore} from "../utils/dataStore.js";
import {Navigate} from "react-router-dom";

export default function login(){
    const {email,password,isLoading,emailError,passwordError,message,LoggedIn} = useSelector(state => state.login)
    const dispatch = useDispatch()
    const [showPassword,setShowPassword]=useState(false)
    const handleSubmit = async () => {
        dispatch(LoginService({email, password}));
    }

    if(LoggedIn){
        return (<Navigate to="/dashboard" replace />)
    }

    return(
        <div className="relative flex size-full min-h-screen flex-col bg-gradient-to-br from-[#0a1b17] via-[#11221f] to-[#1a332d] overflow-x-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#12e7c0] rounded-full opacity-10 blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#519489] rounded-full opacity-10 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#234841] rounded-full opacity-5 blur-3xl"></div>
            </div>

            <div className="layout-container flex h-full grow flex-col relative z-10">
                <div className="px-4 md:px-40 flex flex-1 justify-center py-5">
                    <div className="layout-content-container flex flex-col w-full max-w-[900px] py-5 flex-1">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full items-center">

                            {/* Left side - Image and branding */}
                            <div className="hidden lg:flex flex-col justify-center items-center space-y-6">
                                <div className="relative w-full max-w-md">
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#12e7c0] to-[#519489] rounded-2xl blur opacity-20"></div>
                                    <img
                                        src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                                        alt="Modern workspace"
                                        className="relative rounded-2xl shadow-2xl w-full h-80 object-cover border border-[#234841]"
                                    />
                                </div>

                                <div className="text-center space-y-4">
                                    <h1 className="text-4xl font-bold bg-gradient-to-r from-[#12e7c0] to-[#519489] bg-clip-text text-transparent">
                                        Advnetra
                                    </h1>
                                    <p className="text-[#92c9bf] text-lg leading-relaxed max-w-md">
                                        Plan your next escape, explore top destinations, and turn travel dreams into reality</p>
                                </div>
                            </div>

                            {/* Right side - Login form */}
                            <div className="flex flex-col justify-center">
                                <div className="bg-[#11221f]/80 backdrop-blur-xl border border-[#234841] rounded-3xl p-8 shadow-2xl">
                                    {/* Mobile logo */}
                                    <div className="lg:hidden text-center mb-8">
                                        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#12e7c0] to-[#519489] bg-clip-text text-transparent mb-2">
                                            Advnetra
                                        </h1>
                                        <div className="w-full h-32 mb-4 rounded-xl overflow-hidden">
                                            <img
                                                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                                                alt="Modern workspace"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="text-center lg:text-left">
                                            <h2 className="text-white text-3xl font-bold leading-tight mb-2">
                                                Welcome back
                                            </h2>
                                            <p className="text-[#92c9bf] text-base">
                                                Sign in to continue your journey
                                            </p>
                                        </div>

                                        {/* Email input */}
                                        <div className="space-y-2">
                                            <label className="text-[#92c9bf] text-sm font-medium">Email Address</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <svg className="h-5 w-5 text-[#92c9bf]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                                    </svg>
                                                </div>
                                                <input
                                                    placeholder="Enter your email"
                                                    className="form-input flex w-full resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-2 focus:ring-[#12e7c0] border border-[#234841] bg-[#234841]/50 backdrop-blur-sm focus:border-[#12e7c0] h-14 placeholder:text-[#92c9bf] pl-12 pr-4 text-base font-normal leading-normal transition-all duration-200"
                                                    value={email}
                                                    onChange={(e) => {
                                                        dispatch(updateFields({field: "email", value: e.target.value}));
                                                    }}/>
                                            </div>
                                            {emailError && (
                                                <p className="text-red-400 text-sm font-medium flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    {emailError}
                                                </p>
                                            )}
                                        </div>

                                        {/* Password input */}
                                        <div className="space-y-2">
                                            <label className="text-[#92c9bf] text-sm font-medium">Password</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <svg className="h-5 w-5 text-[#92c9bf]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                    </svg>
                                                </div>
                                                <input
                                                    placeholder="Enter your password"
                                                    type={showPassword ? "text" : "password"}
                                                    className="form-input flex w-full resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-2 focus:ring-[#12e7c0] border border-[#234841] bg-[#234841]/50 backdrop-blur-sm focus:border-[#12e7c0] h-14 placeholder:text-[#92c9bf] pl-12 pr-12 text-base font-normal leading-normal transition-all duration-200"
                                                    value={password}
                                                    onChange={(e) => {
                                                        dispatch(updateFields({field: "password", value: e.target.value}));
                                                    }}/>
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#92c9bf] hover:text-[#12e7c0] transition-colors duration-200"
                                                >
                                                    {showPassword ? (
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
                                                        </svg>
                                                    ) : (
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                            {passwordError && (
                                                <p className="text-red-400 text-sm font-medium flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    {passwordError}
                                                </p>
                                            )}
                                        </div>
                                        {message && (
                                            <p className="text-red-400 text-sm font-medium flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                {message}
                                            </p>
                                        )}
                                        {/* Forgot password */}
                                        <div className="flex justify-end">
                                            <button className="text-[#12e7c0] font-medium hover:text-[#519489] transition-colors duration-200 text-sm">
                                                Forgot Password?
                                            </button>
                                        </div>

                                        {/* Login button */}
                                        <button
                                            className="flex cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-8 w-full bg-gradient-to-r from-[#12e7c0] to-[#519489] hover:from-[#0fc4a3] hover:to-[#4a8479] text-[#11221f] text-lg font-bold leading-normal tracking-[0.015em] transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                            onClick={handleSubmit}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-5 h-5 border-2 border-[#11221f] border-t-transparent rounded-full animate-spin"></div>
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
    )
}
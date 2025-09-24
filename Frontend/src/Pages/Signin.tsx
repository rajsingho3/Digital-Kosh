import { useState } from 'react';
import { BiSolidWalletAlt } from 'react-icons/bi';
import { useRef } from 'react';
import axios from 'axios';
import { BackendUrl } from '../config';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';

export default function Signin(){
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    async function signIn() {
        try {
            if(isLoading) return;
            setIsLoading(true);

            // Get Values
            const email = emailRef.current?.value?.trim();
            const password = passwordRef.current?.value?.trim();

            // Validate all fields
            if(!email || !password){
                alert("Email and password are required");
                setIsLoading(false);
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Please enter a valid email address");
                setIsLoading(false);
                return;
            }

            const response = await axios.post(BackendUrl + "/api/v1/user/signin", {
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                withCredentials: false,
                timeout: 10000 // 10 seconds timeout
            });

            if(response.status === 200 && response.data.token) {
                // Store token in localStorage for persistent auth
                localStorage.setItem('token', response.data.token);
                
                // Store user data
                localStorage.setItem('user', JSON.stringify(response.data.user));
                
                // Clear fields
                if(emailRef.current) emailRef.current.value = "";
                if(passwordRef.current) passwordRef.current.value = "";
                
                // Show success message and redirect
                alert("Sign in successful!");
                navigate('/'); // Navigate to home page or dashboard
            } else {
                alert("Sign in failed. Please check your credentials.");
            }
        } catch (error: any) {
            console.log("Error in Signin:", error);
            
            if (error.response) {
                console.log("Server responded with error:", {
                    status: error.response.status,
                    data: error.response.data
                });
                
                if (error.response.data && error.response.data.error) {
                    alert(error.response.data.error);
                } else if (error.response.status === 401) {
                    alert("Invalid email or password. Please try again.");
                } else {
                    alert(`Server error occurred (${error.response.status}). Please try again later.`);
                }
            } else if (error.request) {
                console.log("No response received:", error.request);
                alert("No response from server. Please check your internet connection and ensure the backend is running.");
            } else {
                console.log("Error setting up request:", error.message);
                alert(`Error: ${error.message}`);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white py-12 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-100 opacity-50"></div>
            <div className="absolute top-1/4 -left-24 w-80 h-80 rounded-full bg-blue-100 opacity-40"></div>
            <div className="absolute -bottom-20 right-1/4 w-64 h-64 rounded-full bg-blue-200 opacity-30"></div>
            
            <div className="w-[450px] border border-blue-100 rounded-2xl shadow-2xl bg-white p-8 z-10 backdrop-blur-sm bg-opacity-95">
                <div className='flex justify-center items-center mb-6'>
                    <Link to="/" className="flex items-center hover:opacity-80 transition-all hover:scale-105">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-3 rounded-lg shadow-md mr-3">
                            <BiSolidWalletAlt className='text-4xl' />
                        </div>
                        <span className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text'>Digital Kosh</span>
                    </Link>
                </div>
                <div className='font-bold text-3xl text-center mb-3 text-gray-800'>
                    Sign In
                </div>
                <p className="text-center text-gray-500 mb-8">Welcome back to Digital Kosh</p>
                
                <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); signIn(); }}>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1 ml-1">Email <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <FiMail className="text-gray-400" />
                            </div>
                            <input 
                                ref={emailRef}
                                type='email'
                                id='email'  
                                placeholder='Enter your email address'
                                disabled={isLoading}                  
                                className='w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none'
                            />
                        </div>
                    </div>
                    
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1 ml-1">Password <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <FiLock className="text-gray-400" />
                            </div>
                            <input 
                                ref={passwordRef}
                                type='password'
                                id='password'  
                                placeholder='Enter your password'    
                                disabled={isLoading}                 
                                className='w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none'
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center">
                            <input
                                id="remember_me"
                                name="remember_me"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                disabled={isLoading}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                            />
                            <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-600 cursor-pointer">
                                Remember me
                            </label>
                        </div>
                        <div>
                            <a href="#" className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-all">
                                Forgot password?
                            </a>
                        </div>
                    </div>

                    <div className="mt-8">
                        <button 
                            type="submit"
                            disabled={isLoading}
                            className={`w-full px-6 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'transform hover:-translate-y-1'}`}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing In...
                                </span>
                            ) : "Sign In"}
                        </button>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-all">
                                Create account
                            </Link>
                        </p>
                    </div>
                </form>
                
                <div className="mt-8 text-center text-sm text-gray-500 border-t border-gray-100 pt-6">
                    <p className="flex items-center justify-center">
                        <BiSolidWalletAlt className="text-gray-400 mr-2" /> Secure login with Digital Kosh
                    </p>
                </div>
            </div>
        </div>
    )
}
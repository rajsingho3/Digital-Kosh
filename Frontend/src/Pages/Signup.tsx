import { useState } from 'react';
import { BiSolidWalletAlt } from 'react-icons/bi';
import { useRef } from 'react';
import axios from 'axios';
import { BackendUrl } from '../config'
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiPhone, FiLock, FiUser } from 'react-icons/fi';


export default function Signup() {
    const firstnameRef = useRef<HTMLInputElement>(null);
    const lastnameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const phonenoRef = useRef<HTMLInputElement>(null);
    const [isloading, setIsloading] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const navigate = useNavigate();

    async function signUp(){
        try {
            if(isloading) return;
            setIsloading(true);

            // Get Values
            const firstname = firstnameRef.current?.value?.trim();
            const lastname = lastnameRef.current?.value?.trim();
            const email = emailRef.current?.value?.trim();
            const password = passwordRef.current?.value?.trim();
            const phoneno = phonenoRef.current?.value?.trim();

            // Validate all fields
            if(!firstname || !lastname || !email || !password || !phoneno){
                alert("All fields are required");
                setIsloading(false);
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Please enter a valid email address");
                setIsloading(false);
                return;
            }
            
            // Validate password strength
            if (password.length < 8) {
                alert("Password must be at least 8 characters long");
                setIsloading(false);
                return;
            }
            
            // Validate phone number (basic validation)
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(phoneno)) {
                alert("Please enter a valid 10-digit phone number");
                setIsloading(false);
                return;
            }
            
            // Validate terms acceptance
            if (!termsAccepted) {
                alert("Please accept the Terms of Service and Privacy Policy to continue");
                setIsloading(false);
                return;
            }
           
            
            const response = await axios.post(BackendUrl + "/api/v1/user/signup", {
                firstname,
                lastname,
                email,
                password,
                phoneno
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                withCredentials: false,
                timeout: 10000 // 10 seconds timeout
            });

            if((response.status == 200 || response.status == 201) && response.data.message){
                alert("SignUp Successful! Redirecting to login page.");

                // Clear Fields
                if(firstnameRef.current) firstnameRef.current.value = "";
                if(lastnameRef.current) lastnameRef.current.value = "";
                if(emailRef.current) emailRef.current.value = "";
                if(passwordRef.current) passwordRef.current.value = "";
                if(phonenoRef.current) phonenoRef.current.value = "";
                
                // Redirect to login page after a small delay
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            
            } else{
                alert("Some thing went wrong");
            }

        } catch (error: any) {
            console.log("Error in Signup:", error);
            
            if (error.response) {
                
                console.log("Server responded with error:", {
                    status: error.response.status,
                    data: error.response.data,
                    headers: error.response.headers
                });
                
                if (error.response.data && error.response.data.message) {
                    alert(error.response.data.message);
                } else if (error.response.data && error.response.data.error) {
                    // Handle array of errors or single error object
                    const errorMsg = Array.isArray(error.response.data.error) 
                        ? error.response.data.error.map((e: any) => e.message).join(', ')
                        : typeof error.response.data.error === 'string'
                            ? error.response.data.error
                            : JSON.stringify(error.response.data.error);
                    alert(`Error: ${errorMsg}`);
                } else if (error.response.status === 409) {
                    alert("User with this email already exists. Please login or use a different email.");
                } else if (error.response.status === 400) {
                    alert("Invalid information provided. Please check your details.");
                } else {
                    alert(`Server error occurred (${error.response.status}). Please try again later.`);
                }
            } else if (error.request) {
                // The request was made but no response was received
                console.log("No response received:", error.request);
                alert("No response from server. Please check your internet connection and ensure the backend is running.");
            } else {
                // Something happened in setting up the request
                console.log("Error setting up request:", error.message);
                alert(`Error setting up request: ${error.message}`);
            }
        }
        finally{
        setIsloading(false);
    }
    }
    return (
        <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white py-12 relative overflow-hidden" >
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
                  <span className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text'> Digital Kosh </span>
                </Link>
               </div>
               <div className='font-bold text-3xl text-center mb-3 text-gray-800'>
                Create Account
               </div>
               <p className="text-center text-gray-500 mb-8">Join Digital Kosh and manage your finances easily</p>
               <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); signUp(); }}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="firstname" className="text-sm font-medium text-gray-700 mb-1 ml-1">First Name <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <FiUser className="text-gray-400" />
                            </div>
                            <input 
                                ref={firstnameRef}
                                type='text'
                                id='firstname'  
                                placeholder='Enter first name'      
                                disabled={isloading}               
                                className='w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none'
                            />
                        </div>
                    </div>
                    
                    <div className="flex flex-col">
                        <label htmlFor="lastname" className="text-sm font-medium text-gray-700 mb-1 ml-1">Last Name <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <FiUser className="text-gray-400" />
                            </div>
                            <input 
                                ref={lastnameRef}
                                type='text'
                                id='lastname'  
                                placeholder='Enter last name'  
                                disabled={isloading}                   
                                className='w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none'
                            />
                        </div>
                    </div>
                </div>

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
                            disabled={isloading}                  
                            className='w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none'
                        />
                    </div>
                </div>
                
                <div className="flex flex-col">
                    <label htmlFor="phoneno" className="text-sm font-medium text-gray-700 mb-1 ml-1">Phone Number <span className="text-red-500">*</span></label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <FiPhone className="text-gray-400" />
                        </div>
                        <input 
                            ref={phonenoRef}
                            type='text'
                            id='phoneno'  
                            placeholder='Enter 10-digit number'   
                            disabled={isloading}                  
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
                            placeholder='Min. 8 characters'    
                            disabled={isloading}                 
                            className='w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none'
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-1 ml-1">Must be at least 8 characters long</p>
                </div>
                <div className="flex items-center mt-6">
                    <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        disabled={isloading}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-600 cursor-pointer">
                        I agree to the <a href="#" className="text-blue-600 hover:text-blue-800">Terms of Service</a> and <a href="#" className="text-blue-600 hover:text-blue-800">Privacy Policy</a>
                    </label>
                </div>

                <div className="mt-8">
                    <button 
                        type="submit"
                        disabled={isloading || !termsAccepted}
                        className={`w-full px-6 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300 ${(isloading || !termsAccepted) ? 'opacity-70 cursor-not-allowed' : 'transform hover:-translate-y-1'}`}
                    >
                        {isloading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating Account...
                            </span>
                        ) : "Create Account"}
                    </button>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-all">
                            Sign in
                        </Link>
                    </p>
                </div>
               </form>
               
               <div className="mt-8 text-center text-sm text-gray-500 border-t border-gray-100 pt-6">
                    <p className="flex items-center justify-center">
                        <BiSolidWalletAlt className="text-gray-400 mr-2" /> Secure signup with Digital Kosh
                    </p>
               </div>
            </div>
        </div>
    );
}



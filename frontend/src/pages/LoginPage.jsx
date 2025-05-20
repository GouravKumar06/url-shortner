import { useState } from 'react';
import LoginForm from '../components/LoginForm'
import RegistrationForm from '../components/RegistrationForm'



const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          { isLogin ? <LoginForm setIsLogin={setIsLogin}/> : <RegistrationForm setIsLogin={setIsLogin} />}
        </div>
    </div>
  )
}

export default LoginPage
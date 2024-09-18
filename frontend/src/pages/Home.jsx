import { useNavigate } from 'react-router-dom';
import homeBg from '../resources/home-bg.webp';
import logo from '../resources/logo.png';
import Button from '../components/Button';


function Home() {
    const navigate = useNavigate();

    const handleSignin = () => {
        navigate('/signin');
    }

  return (
    <div className="relative bg-cover bg-center h-screen flex flex-col" style={{ backgroundImage: `url(${homeBg})` }}>
      <div className="absolute inset-0 bg-black opacity-75"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className='flex justify-between items-center'> 
          <img src={logo} alt='logo' className='w-48 pt-5 pl-10'/>
          <div className='pr-10 pt-5'><Button label="Login" onClick={handleSignin}/></div>
        </div>
        
        <div className="flex-grow flex flex-col justify-center items-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-4">Welcome to FlexiPay</h1>
            <p className="text-xl text-white mb-6">Your Ultimate Payment Solution</p>

            <div className='flex items-center max-w-md mx-auto'>
              <input 
                type="text" 
                placeholder="Email" 
                className='px-6 py-3 rounded-none w-80 focus:outline-none'
              />
              <div className='bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-none w-40 cursor-pointer'>Get Started</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
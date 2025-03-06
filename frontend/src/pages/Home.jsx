import { useNavigate } from 'react-router-dom';
import logo from '../resources/logo.png';
import Button from '../components/Button';
import image1 from '../resources/home_image1.jpg';
import image2 from '../resources/home_image2.jpg';
import Card from '../components/Card';
import TestimonialCard from '../components/TestimonialCard';
import test1 from '../resources/test1.jpg';
import test2 from '../resources/test2.jpg';
import test3 from '../resources/test3.png';
import test4 from '../resources/test4.png';
import arrow from '../resources/arrow.png';
import Footer from '../components/Footer';

function Home() {
    const navigate = useNavigate();

    const handleSignin = () => {
        navigate('/signin');
    };

    const handleSignup = () => {
        navigate('/signup');
    };

    const handleDashboardClick=()=>{
        navigate('/dashboard')
    }

    return (
        <div className="relative min-h-screen flex flex-col">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center p-5 w-full">
                <img src={logo} alt="logo" className="w-36 md:w-48 mb-4 md:mb-0" />
                <div className="flex  md:flex-row gap-4 md:gap-6 w-full md:w-auto">
                    <Button label="My Dashboard" onClick={handleDashboardClick} className="w-1/2 md:w-auto" />
                    <Button label="Login" onClick={handleSignin} className="w-1/2 md:w-auto" />
                </div>
            </div>


            {/* Main Content Section */}
            <div className="flex-grow flex flex-col md:flex-row justify-between items-center px-5 md:px-10">
                {/* Welcome Message and Text */}
                <div className="max-w-xl p-5 md:p-10 translate-y-0 md:translate-y-8 text-center md:text-left">
                    <h1 className="text-3xl md:text-5xl font-bold text-black mb-4">Welcome to FlexiPay</h1>
                    <p className="text-lg md:text-xl text-black mb-6 mt-5">
                        Experience the ultimate convenience with our payments app, designed to make sending money to your friends and family fast and hassle-free.
                    </p>
                    <Button
                        label={
                            <span className="flex items-center justify-center">
                                Get Started
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-2"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                        }
                        onClick={handleSignup}
                        className="w-full md:w-2/3 py-4 group rounded-lg"
                        textClassName="text-lg font-bold tracking-wider"
                    />
                </div>

                {/* Images Section */}
                <div className="relative w-64 h-64 md:w-96 md:h-96 mt-10 md:mt-0">
                    {/* Image 1 - Positioned diagonally */}
                    <img
                        src={image1}
                        alt="Image 1"
                        className="absolute w-48 md:w-80 h-auto transform rotate-12 translate-x-10 md:translate-x-20 translate-y-1"
                    />
                    {/* Image 2 - Positioned diagonally */}
                    <img
                        src={image2}
                        alt="Image 2"
                        className="absolute w-40 md:w-64 h-auto transform -translate-x-20 md:-translate-x-44 translate-y-20 md:translate-y-40"
                    />
                </div>
            </div>

            {/* Additional Divs Section */}
            <div className="p-5 md:p-10">
                <div className="flex justify-center p-5 md:p-10 font-extrabold font-serif text-purple-700 text-2xl md:text-4xl">
                    How FlexiPay Works
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <Card
                        step_number={1}
                        heading={"Signup on FlexiPay"}
                        description={"Click on Get Started and signup to FlexiPay or just signin to your FlexiPay account"}
                    />
                    <img src={arrow} alt="arrow_image" className="w-16 h-16 md:w-28 md:h-28 rotate-90 md:rotate-0" />
                    <Card
                        step_number={2}
                        heading={"Search Your Contact"}
                        description={"Once signed in, search for your contact. Click on Send Money to initiate payment."}
                    />
                    <img src={arrow} alt="arrow_image" className="w-16 h-16 md:w-28 md:h-28 rotate-90 md:rotate-0" />
                    <Card
                        step_number={3}
                        heading={"Send Money"}
                        description={"Enter the amount and click Send. \n In just three-click Money is safely sent."}
                    />
                </div>
                <div className="flex justify-center p-5 md:p-10 font-extrabold font-serif text-purple-700 text-2xl md:text-4xl">
                    What Our Customers Say
                </div>
                <div className="p-5 md:p-8">
                    <div className="flex flex-col md:flex-row justify-between gap-8">
                        <TestimonialCard
                            image={test1}
                            name={"Election Champ"}
                            testimonial={"As someone who frequently sends money to family overseas, FlexiPay has been a game-changer for me. The transactions are quick, the fees are low, and the app is incredibly reliable. I feel confident using FlexiPay for all my payment needs. It’s simply the best!"}
                        />
                        <TestimonialCard
                            image={test2}
                            name={"Rocket Boy"}
                            testimonial={"FlexiPay has made splitting bills and sending money to my friends so much easier. I no longer have to worry about carrying cash or dealing with complicated bank transfers. The app is fast, secure, and incredibly user-friendly. I can’t imagine my life without it now!"}
                        />
                        <TestimonialCard
                            image={test3}
                            name={"Mr. White"}
                            testimonial={"I’ve tried several payment apps, but FlexiPay stands out because of its simplicity and security. I can send money to my contacts in seconds, and the app’s interface is so clean and easy to navigate. It’s become my go-to app for all my digital transactions!"}
                        />
                        <TestimonialCard
                            image={test4}
                            name={"Mr. Sociopath"}
                            testimonial={"FlexiPay has completely transformed the way I handle my finances. Sending money to my friends and family is now as easy as a few taps on my phone. The app is so intuitive, and I love how fast the transactions are processed. Highly recommend it to anyone looking for a reliable payment app!"}
                        />
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <Footer />
        </div>
    );
}

export default Home;
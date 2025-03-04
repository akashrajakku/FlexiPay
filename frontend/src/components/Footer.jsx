import fb from '../resources/facebook.png';
import x from '../resources/twitter.png';
import insta from '../resources/instagram.png';
import linkedin from '../resources/linkedin.png';
import yt from '../resources/youtube.png';

function Footer() {
    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-center p-5">
                <div className="pl-5 md:pl-10 mb-4 md:mb-0">&copy; 2025 FlexiPay</div>
                <div className="flex gap-4 items-center">
                    <div className="text-gray-500">Follow Us</div>
                    <div className="h-7 w-7"><a href='https://www.facebook.com/profile.php?id=100028942639279'><img src={fb} alt="facebook" /></a></div>
                    <div className="h-7 w-7"><a href='https://x.com/akashrajakku263'><img src={x} alt="X" /></a></div>
                    <div className="h-7 w-7"><a href='https://www.instagram.com/'><img src={insta} alt="instagram" /></a></div>
                    <div className="h-7 w-7"><a href='https://www.youtube.com/'><img src={yt} alt="youtube" /></a></div>
                    <div className="h-7 w-7"><a href='https://www.linkedin.com/in/akashrajakku263/'><img src={linkedin} alt="linkedin" /></a></div>
                </div>
            </div>
            <div className="w-full h-3 bg-purple-700"></div>
            <div className="w-full h-3 bg-purple-900"></div>
        </>
    );
}

export default Footer;
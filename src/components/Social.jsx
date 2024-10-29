import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaYoutube, FaTwitter, FaFacebook, FaInstagram} from "react-icons/fa";
import { MdEmail } from "react-icons/md";



const Social = ({containerStyles, iconStyles}) => {

    const socials = [
        //{icon: <FaGithub/>, path: ''},
        {icon: <FaLinkedinIn/>, path: 'https://www.linkedin.com/company/auradot-ai/'},
        { icon: <MdEmail />, path: '/contact' }, 
    
    ]

 


    return ( 
        <div className={containerStyles} >
            {socials.map((item, index) => {
                return (
                    <a target="_blank" key={index} href={item.path} className={iconStyles}>
                        {item.icon}
                    </a>
                )
            })}
        </div> 
    );
}
 
export default Social;
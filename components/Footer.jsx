import css from '../styles/footer.module.css'
import {UilFacebook,UilGithub,UilLinkedin} from '@iconscout/react-unicons'
import Image from 'next/image';
import Logo from '../assets/Logo.png'
const Footer = () => {
    return (
        <div className={css.container}>
            <span>&copy; Lord Voldemort 2022</span>
            <div className={css.social}>
                <UilFacebook size={40}/>
                <UilGithub size={40}/>
                <UilLinkedin size={40}/>
            </div>

            <div className={css.logo}>
                <Image src={Logo} alt="" width={80} height={80}/>
                <span>Sw<span style={{color: 'var(--themeRed)'}}>ia</span>to</span>
            </div>
        </div>

    )
}

export default Footer;
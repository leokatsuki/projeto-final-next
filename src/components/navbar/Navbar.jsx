import Image from 'next/image'
import styles from './navbar.module.css'
import Link from 'next/link'
import AuthLinks from '../authLinks/AuthLinks'

const Navbar = () => {
  return (
    <div className={styles.container}>
        <div className={styles.links}>
            <Image src="/logo.svg" width={48} height={48} className={styles.logo} />
            <Link href="/" className={styles.link}>Inicio</Link>
            <Link href="/about" className={styles.link}>Sobre</Link>
            <Link href="/blog" className={styles.link}>Noticias</Link>
        </div>
        <AuthLinks />
    </div>
  )
}

export default Navbar
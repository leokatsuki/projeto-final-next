import Image from 'next/image'
import styles from './footer.module.css'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <Image src="/logo.svg" alt="lama blog" width={150} height={100} />
        </div>
        <p className={styles.desc}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim
          necessitatibus similique aspernatur obcaecati veritatis. Aperiam cum
          porro sequi, totam minima consequuntur, aspernatur deleniti vero
          repellendus dorales.
        </p>
        <div className={styles.icons}>
          <Image src="/icon-facebook.svg" alt="" width={30} height={30} />
          <Image src="/icon-instagram.svg" alt="" width={30} height={30} />
          <Image src="/icon-twitter.svg" alt="" width={30} height={30} />
          <Image src="/icon-youtube.svg" alt="" width={30} height={30} />
        </div>
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Links</span>
          <Link href="/">Inicio</Link>
          <Link href="/blog">Noticias</Link>
          <Link href="/about">Sobre</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Social</span>
          <Link href="/">Facebook</Link>
          <Link href="/">Instagram</Link>
          <Link href="/">Twitter</Link>
          <Link href="/">Youtube</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Quer receber novas noticias?</span>
          <div className='row'>
            <input className={styles.input} type="text" placeholder='Digite seu e-mail' />
            <span className={styles.button}>Cadastrar</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
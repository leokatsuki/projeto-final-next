import Link from 'next/link'
import styles from './notFound.module.css'
import Image from 'next/image'

const NotFound = () => {
    return (
        <div className={styles.container}>
            <div>
                <Image src="/logo.svg" width={150} height={150} className={styles.logo} alt="" />
            </div>

            <div className={styles.textContainer}>
                <h1 className={styles.title}>404</h1>
                <h3>Página não encontrada!</h3>
                <p className={styles.desc}>
                    A página que você tá procurando não existe 
                    ou foi removida. Clique para voltar 
                    para o site.
                </p>
                <Link href="/" className={styles.btn}>Voltar p/ home</Link>
            </div>
        </div>
    )
}

export default NotFound
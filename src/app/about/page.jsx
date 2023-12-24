import Image from 'next/image'
import styles from './about.module.css'

const AboutPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <Image src="/logo.svg" width={150} height={150} alt="" />
                <p className={styles.desc}>
                    Trata-se de uma aplicação feita com Next.js e componentes react
                    para aprendizagem da tecnologia dentro do curso de desenvolvimento
                    web fullstack no INFNET.
                </p>
                <a
                    href="https://posgraduacao.infnet.edu.br/ead/pos-graduacao-desenvolvimento-web-full-stack/"
                    target="_blank"
                    className={styles.btn}
                    rel="noreferrer"
                >
                    Quero ver mais
                </a>
            </div>
        </div>
    )
}

export default AboutPage
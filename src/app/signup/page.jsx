import Image from 'next/image'
import styles from './signUpPage.module.css'
import Link from 'next/link'

const SignUpPage = () => {
  return (
    <div className={styles.container}>
            <div>
                <Image src="/logo.svg" width={150} height={50} alt="" />
            </div>

            <div className={styles.textContainer}>
                <h2 className={styles.title}>
                    Olá, faça o cadastro para continuar.
                </h2>
                <p>
                    Ja e membro? <Link href="/login" className={styles.link}>Faca o login aqui</Link>
                </p>
            </div>

            <div className={styles.inputContainer}>
                <form className={styles.forms}>
                    <div>
                        <h4 className={styles.subtitle}>Username</h4>
                        <input
                            type="text"
                            id="user"
                            name="user"
                            className={styles.input}
                        />
                    </div>

                    <div>
                        <h4 className={styles.subtitle}>Email</h4>
                        <input
                            type="text"
                            id="user"
                            name="user"
                            className={styles.input}
                        />
                    </div>

                    <div>
                        <h4 className={styles.subtitle}>Senha</h4>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className={styles.input}
                        />
                    </div>

                    <button className={styles.btn}>Cadastrar</button>
                </form>
            </div>
        </div>
  )
}

export default SignUpPage
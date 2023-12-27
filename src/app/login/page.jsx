"use client";
import Image from 'next/image'
import styles from './loginPage.module.css'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const LoginPage = () => {
    const { status } = useSession();
    const router = useRouter();
    const [data, setData] = useState({
        email: "",
        password: "",
    })


    if (status === "loading") {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (status === "authenticated"){
        router.push("/")
    }

    const loginUser = async (e) => {
        e.preventDefault();
        signIn('credentials', {
            ...data,
            redirect: false,
        });
        router.push("/")

    }

    return (
        <div className={styles.container}>
            <div>
                <Image src="/logo.svg" width={150} height={50} alt="" />
            </div>

            <div className={styles.textContainer}>
                <h2 className={styles.title}>
                    Olá, faça o login para continuar.
                </h2>
                <p>
                    Ainda nao e membro? <Link href="/signup" className={styles.link}>Cadastre-se aqui</Link>
                </p>
            </div>

            <div className={styles.inputContainer}>
                <form className={styles.forms} onSubmit={loginUser}>
                    <div>
                        <h4 className={styles.subtitle}>Email</h4>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className={styles.input}
                            value={data.email}
                            onChange={(e) => {setData({...data, email: e.target.value})}}
                        />
                        <p className={styles.error}>{data.errors.email}</p>
                    </div>

                    <div>
                        <h4 className={styles.subtitle}>Senha</h4>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className={styles.input}
                            value={data.password}
                            onChange={(e) => {setData({...data, password: e.target.value})}}
                        />
                        <p className={styles.error}>{data.errors.password}</p>
                    </div>

                    <button className={styles.btn} type='submit'>Entrar</button>
                </form>
            </div>

            <div className={styles.lines}>
                <div className={styles.line}></div>
                <div className={styles.other}>
                    <span>Ou continue com</span>
                </div>
                <div className={styles.line}></div>
            </div>

            <div className={styles.socialLinks}>
                <div className={`${styles.btn} ${styles.align} ${styles.google}`} onClick={() => signIn("google")}>
                    <Image src="/icon-google.svg" alt='' width={20} height={20} />
                    Google
                </div>
                <div className={`${styles.btn} ${styles.align} ${styles.github}`} onClick={() => signIn("github")}>
                    <Image src="/icon-github.svg" alt='' width={20} height={20} />
                    Github
                </div>
            </div>
        </div>
    )
}

export default LoginPage
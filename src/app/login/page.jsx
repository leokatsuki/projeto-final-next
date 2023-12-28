"use client";
import Image from 'next/image'
import styles from './loginPage.module.css'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const LoginPage = () => {
    const { status, error } = useSession();
    const router = useRouter();
    const [data, setData] = useState({
        email: "",
        password: "",
    })
    const [errorMessage, setErrorMessage] = useState('');


    if (status === "loading") {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (status === "authenticated"){
        router.push("/")
    }


    
    const loginUser = async (e) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            ...data,
            redirect: false,
        });
        
        if(result?.error){
            console.error('Erro na autenticacao:', result.error);
            setErrorMessage('Email ou senha incorreta. Tente Novamente!');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }else{
            router.push("/")
        }
        
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
                    </div>

                    <button className={styles.btn} type='submit'>Entrar</button>
                    {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
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
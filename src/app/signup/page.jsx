"use client";
import Image from 'next/image'
import styles from './signUpPage.module.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';

const schema = z.object({
    name: z.string().min(2).max(20),
    email: z.string().email(),
    password: z.string().min(6),
});

const SignUpPage = () => {
    const router = useRouter()
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
    })
    const [errorMessage, setErrorMessage] = useState('');

    const registerUser = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({data})
        })

        if (res.status === 200) {
            const userInfo = await res.json();
            console.log(userInfo);
            router.push('/login');
        } else {
            const error = await res.text();
            console.log('Erro no cadastro', error);
            setErrorMessage(error);
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    }

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
                <form className={styles.forms} onSubmit={registerUser}>
                    <div>
                        <h4 className={styles.subtitle}>Username</h4>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className={styles.input}
                            value={data.name}
                            onChange={(e) => {setData({...data, name: e.target.value})}}
                        />
                    </div>

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

                    <button type='submit' className={styles.btn}>Cadastrar</button>
                    {errorMessage && (<p className={styles.errorMessage}>{errorMessage}</p>)}
                </form>
            </div>
        </div>
  )
}

export default SignUpPage
"use client";
import Image from 'next/image'
import styles from './signUpPage.module.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';

const schema = z.object({
    name: z.string().min(2, { message: "Usuário deve ter no mínimo 2 caracteres." }).max(20, { message: "Usuário deve ter no máximo 20 caracteres." }).refine((value) => value.trim() !== '', { message: "Usuário é obrigatório." }),
    email: z.string().email({ message: "Email incorreto." }).refine((value) => value.trim() !== '', { message: "Email é obrigatório." }),
    password: z.string().min(6, { message: "A senha deve possuir no mínimo 6 caracteres." }).refine((value) => value.trim() !== '', { message: "Senha é obrigatória." }),
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
        try {
            schema.parse(data);

            const res = await fetch('https://projeto-final-next-mocha.vercel.app/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data }),
            });

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
        } catch (error) {
            setErrorMessage(error.errors[0]?.message || 'Erro no cadastro.');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    };

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
                            required
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
                            required
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
                            required
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
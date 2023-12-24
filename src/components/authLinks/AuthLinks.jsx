"use client"
import { useState } from 'react';
import styles from './authLinks.module.css'
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

const AuthLinks = () => {
    const [open, setOpen] = useState(false);

    const {status} = useSession();

  return (
    <>
        {status === "unauthenticated" ? (
            <Link href="/login" className={`${styles.links} ${styles.button}`}>Login</Link>
        ) : (
            <div className={styles.links}>
                <Link href="/newpost">Novo Post</Link>
                <span className={styles.button} onClick={signOut}>Logout</span>
            </div>
        )}
        <div className={styles.burger} onClick={() => setOpen(!open)}>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
        </div>
        {open && (
            <div className={styles.responsiveMenu}>
            <Link href="/">Inicio</Link>
            <Link href="/about">Sobre</Link>
            <Link href="/blog">Noticias</Link>
            {status === "unauthenticated" ? (
                <Link href="/login" className={styles.button}>Login</Link>
            ) : (
                <>
                <Link href="/newpost">Novo Post</Link>
                <span className={styles.button}>Logout</span>
                </>
            )}
            </div>
        )}
    </>
  )
}

export default AuthLinks
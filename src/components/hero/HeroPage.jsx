"use client";
import Link from 'next/link'
import styles from './heroPage.module.css'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

const HeroPage = () => {
    const { status } = useSession();
    return (
        <div className={styles.container}>
            <div className={styles.hero}>
                <div className={styles.textContainer}>
                    <h1 className={styles.title}>
                        blog<span className={styles.span}>.</span>
                    </h1>
                    <p className={styles.desc}>
                        Um blog para todos. Escrever, ler, se conectar.
                    </p>
                    <div className={styles.links}>
                        <Link href="/blog" className={styles.btn}>
                            Ler noticias
                        </Link>
                        {status === "unauthenticated" ? (
                            <Link href="/login" className={styles.btn}>
                                Login
                            </Link>
                        ) : (
                            <Link href="/newpost" className={styles.btn}>
                                Começar a escrever
                            </Link>
                        )}
                    </div>
                </div>
                <div>
                    <Image src="/logohome.svg" alt="" className={styles.image} width={100} height={100} />
                </div>
            </div>
        </div>
    )
}

export default HeroPage
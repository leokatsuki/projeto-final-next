"use client";
import Link from 'next/link'
import styles from './comments.module.css'
import Image from 'next/image'
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { useState } from 'react';

const fetcher = async (url) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
}

const Comments = ({ postSlug }) => {
  const { data: session, status } = useSession();

  const { data, mutate, isLoading } = useSWR(`https://verdant-pika-6abce7.netlify.app/api/comments?postSlug=${postSlug}`,
    fetcher
  );

  const [desc, setDesc] = useState("");

  const handleSubmit = async () => {
    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ desc, postSlug })
    });
    mutate();
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comentarios</h1>
      {status === "authenticated" ? (
        <div className={styles.write}>
          <textarea
            placeholder="escreva um comentario..."
            className={styles.input}
            onChange={e => setDesc(e.target.value)}
          />
          <button className={styles.button} onClick={handleSubmit}>
            Enviar
          </button>
        </div>
      ) : (
        <Link href="/login" className={styles.login}>Faca login para comentar</Link>
      )}
      <div className={styles.comments}>
        {data?.map((item) => (
          <div className={styles.comment} key={item._id}>
            <div className={styles.user}>
              {item.user.image ? (
                <Image
                  src={item.user.image}
                  alt=""
                  width={50}
                  height={50}
                  className={styles.image}
                />
              ) : (
                <Image
                  src="/default-avatar.jpg"
                  alt=""
                  width={50}
                  height={50}
                  className={styles.image}
                />
              )}
              <div className={styles.userInfo}>
                <span className={styles.username}>{item.user.name}</span>
                <span className={styles.date}>{item.createdAt.substring(0, 10)}</span>
              </div>
            </div>
            <p className={styles.desc}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Comments
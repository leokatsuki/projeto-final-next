import Image from 'next/image'
import styles from './card.module.css'
import Link from 'next/link'

const Card = ({key, item}) => {
    return (
        <div className={styles.card} key={key}>
            <div className={styles.imgContainer}>
                <Link href={`/posts/${item.slug}`}>
                    <Image src={item.img} alt="" fill className={styles.img}/>
                </Link>
            </div>
            <div className={styles.textContainer}>
                <span className={styles.date}>{item.createdAt.substring(0,10)}</span>
                <Link href={`/posts/${item.slug}`} className='link-title'>
                    <h3 className={styles.title}>{item.title}</h3>
                </Link>
                <p className={styles.desc}>
                    {item.resume.substring(0, 60)}
                </p>
                <Link href={`/posts/${item.slug}`} className={styles.btn}>Ler mais</Link>
            </div>
        </div>
    )
}

export default Card
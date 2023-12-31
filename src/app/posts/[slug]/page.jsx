import Comments from '@/components/comments/Comments'
import styles from './postPage.module.css'
import Image from 'next/image'

const getData = async (slug) => {
  const res = await fetch(`https://projeto-final-next-mocha.vercel.app/api/posts/${slug}`, {
    cache: "no-store"
  })

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
}

const PostPage = async ({ params }) => {
  const { slug } = params;

  const data = await getData(slug);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{data?.title}</h1>
          <div className={styles.user}>
            <div className={styles.userImageContainer}>
              {data.user.image ? (
                <Image
                  src={data.user.image}
                  alt=""
                  fill
                  className={styles.avatar}
                />
              ) : (
                <Image
                  src="/default-avatar.jpg"
                  alt=""
                  fill
                  className={styles.avatar}
                />
              )}
            </div>
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{data?.user.name}</span>
              <span className={styles.date}>{data?.createdAt.substring(0, 10)}</span>
            </div>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image src={data?.img} alt='' fill className={styles.image} />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.description}>
          <p>
            {data.desc}
          </p>
        </div>
        <div className={styles.commentSection}>
          <Comments postSlug={slug} />
        </div>
      </div>
    </div>
  )
}

export default PostPage
import Card from '@/components/card/Card'
import styles from './blogPage.module.css'

const getData = async () => {
    const res = await fetch("https://projeto-final-next-mocha.vercel.app/api/posts", {
        cache: "no-store"
    })

    if(!res.ok) {
        throw new Error("Failed");
    }

    return res.json();
}

const BlogPage = async () => {
    const data = await getData();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Recent Posts</h1>
            <div className={styles.posts}>
                {data?.map((item) => (
                    <Card item={item} key={item._id} />
                ))}
            </div>
        </div>
    )
}

export default BlogPage
import {Link} from "react-router-dom"
import styles from "./PostDetail.module.css"




const PostDetail = ({ post }) => {
    return (
        <div className={styles.post_detail}>
            <img src={post.image} alt={post.title} />
            <div className={styles.post_content}>
                <h2>{post.title}</h2>
                <div className={styles.tags}>
                    {post.tags.map((tag) => (
                        <Link key={tag} to={`/search?q=${tag}`} className={styles.tag}>
                            #{tag}
                        </Link>
                    ))}
                </div>
                <div className={styles.div_creatdby_button}>
                    <p className={styles.createdby}>por: {post.createdBy} </p>
                    <Link to={`/posts/${post.id}`} className={`${styles.btn} ${styles['btn-outline']}`}>
                        Ler
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PostDetail;
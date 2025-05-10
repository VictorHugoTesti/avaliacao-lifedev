import styles from "./Post.module.css"

import {userFetchDocument} from "../../hooks/useFetchDocument"
import {Link, useParams, useNavigate} from "react-router-dom"
import useGoBack from "../../utilities/useGoBack"

const Post = () => {
    const { id } = useParams()
    const { document: post } = userFetchDocument("posts", id)
    const goBack = useGoBack()

    
    return (
        <div className={styles.post_wrapper}>
           {post && (
            <>
                <div className={styles.post_header}>
                    <h1 className={styles.post_title}> {post.title} </h1>
                    <Link onClick={goBack} className={styles.back_button}>
                        Voltar
                    </Link>
                </div>
                <div className={styles.post_container}>
                    <div className={styles.post_content}>
                        {post.image && (
                            <img src={post.image} alt={post.title}  className={styles.post_image}/>
                        )}
                    </div>
                    <div className={styles.post_body}>
                        <p>{post.body}</p>
                    </div>
                    <div className={styles.tags_section}>
                        <h3>Este post trata sobre:</h3>
                        <div className={styles.tags_container}>
                            {post.tags?.map((tag) => (
                                <Link key={tag} to={`/search?q=${tag}`} className={styles.tag}>
                                    #{tag}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>            
            </>
           )}
        </div>
    )
}

export default Post;
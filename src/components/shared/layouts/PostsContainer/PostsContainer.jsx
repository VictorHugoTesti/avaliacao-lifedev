import styles from "./PostsContainer.module.css";

export const PostsContainer = ({children}) => {
    return (
        <div className={styles.posts_container}>
        {children}
    </div>
    )
}

export default PostsContainer
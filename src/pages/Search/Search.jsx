import styles from "./Search.module.css"

import {userFetchDocuments} from "../../hooks/useFetchDocuments"
import {userQuery} from '../../hooks/useQuery'

import PostDetail from '../../components/PostDetail'
import { PostsContainer } from "../../components/shared/layouts/index"
import {Link} from 'react-router-dom'

const Search = () => {
    const query = userQuery()
    const search = query.get("q")

    const {documents: posts} = userFetchDocuments("posts", search)

    return (
        <div className={styles.search_container}>
            <div className={styles.search_header}>
                <h1 className={styles.search_title}>
                    Resultados encontrados para: <span className={styles.search_term}>{search}</span>
                </h1>
                <Link to="/" className={styles.home_btn}>
                    Voltar
                </Link>
            </div>  
            <div className={styles.post_list}>
                {posts && posts.length === 0 && (
                    <div className={styles.noposts}>
                    <p>Não encontramos posts a partir dessa busca...</p>
                    <Link to="/" className="btn">
                        Voltar para a página inicial
                    </Link>
                    </div>
                )}
                {posts && posts.length > 0 && (
                    <PostsContainer>
                        {posts && posts.map((post) => 
                            <PostDetail key={post.id} post={post} />)}
                    </PostsContainer>
                )}
            </div>
        </div>
    )
}

export default Search
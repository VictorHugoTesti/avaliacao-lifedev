import styles from './Home.module.css'

import {userFetchDocuments} from "../../hooks/useFetchDocuments"
import {useNavigate, Link} from "react-router-dom"
import { useState } from 'react'
import PostDetail from "../../components/PostDetail"
import { PostsContainer } from "../../components/shared/layouts/index"

const Home = () => {
  
  const {documents: posts, loading} = userFetchDocuments("posts")
  const navigate = useNavigate()
  const [query, setQuery] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if(query) {
      return navigate(`/search?q=${query}`) 
    }
  }
  
  console.log(loading)

  return (
    <div className={styles.home}>
      <div className={styles.search}>
        <h1>Pesquisar Posts</h1>
        <form className={styles.search_form} onSubmit={handleSubmit}>
          <div className={styles.search_form_container}>
            <input 
            type="text"
            placeholder="Busque posts através de Tags..."
            onChange={(e) => setQuery(e.target.value)}
            />
            <button>Pesquisar</button>
          </div>
        </form>
      </div>
      <div className={styles.post_list}>
        {loading && <p>Carregando...</p>}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>            
            <p>Não foram Encontrados Posts</p>
            <Link to="/posts/create" className="btn">
              Criar primeiro Post
            </Link>
          </div>
        )}        
        {posts && posts.length > 0 && (
          <>
            <h1>Posts mais Recentes</h1>
            <PostsContainer>
              {posts && posts.map((post) => 
              <PostDetail key={post.id} post={post} />)}
            </PostsContainer>
          </>
        )}      
      </div>
    </div>
  )
}

export default Home
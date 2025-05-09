import styles from "./EditPost.module.css"

import { useState, useEffect } from "react"
import {useNavigate, useParams} from "react-router-dom"
import {useAuthValue} from "../../context/AuthContext"
import {userFetchDocument} from "../../hooks/useFetchDocument"
import {userUpdateDocument} from "../../hooks/useUpdateDocument"

const EditPost = () => {
    const {id} = useParams()
    const {document: post} = userFetchDocument("posts", id)

    console.log(post)

    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState([])
    const [formError, setFormError] =  useState("")

    useEffect(() => {
        if(post) {
            setTitle(post.title)
            setImage(post.image)
            setBody(post.body)

            const textTags = post.tags.join(", ")

            setTags(textTags)
        }
    }, [post])

    const { user } = useAuthValue()
    const navigate = useNavigate()
    const {updateDocument, response} = userUpdateDocument("posts")
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setFormError("")
        try {
            new URL(image)
        } catch(error) {
            setFormError("A imagem precisa de URL")
        }

        const tagsArray = tags.split(", ").map((tag) => tag.trim())

        console.log(tagsArray)
        console.log({
            title,
            image,
            body,
            tags: tagsArray,
        })

        const data = {
            title,
            image,
            body,
            tags: tagsArray,
        }

        console.log(post)

        updateDocument(id, data)

        navigate("/dashboard")
    }

    return (
        <div className={styles.edit_post}>
            {post && (
                <>
                <h2>Editando Post: {post.title}</h2>
                <p>Altere os Dados do Post</p>
                <form onSubmit={handleSubmit}>
                    <label>
                        <span>Título:</span>
                        <input type="text" 
                        name="text" 
                        required 
                        placeholder="Pense em um Título..." 
                        onChange={(e) => setTitle(e.target.value)} 
                        value={title}
                        />
                    </label>
                    <label> 
                        <span>URL da imagem:</span>
                        <input type="text" 
                        name="image" 
                        required
                        placeholder="Insira um Imagem..."
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
                        />
                    </label>
                    <p className={styles.preview_title}>Preview da Imagem atual:</p>
                    <img className={styles.image_preview} 
                    src={post.image} alt={post.title} 
                    />
                    <label>
                        <span>Conteudo:</span>
                        <textarea 
                        name="body"
                        required
                        placeholder="Insira o conteudo aqui"
                        onChange={(e) => setBody(e.target.value)}
                        value={body} 
                        ></textarea>
                    </label>
                    <label>
                        <span>Tags: </span>
                        <input type="text" 
                        name="tags" 
                        required
                        placeholder="Insira as Tags separadas por vírgula"
                        onChange={(e) => setTags(e.target.value)}
                        value={tags} 
                        />
                    </label>
                    <div className={styles.button_container}>
                        <button type="button" className="btn cancel" onClick={() => navigate("/dashboard")}>
                            Cancelar
                        </button>
                        {!response.loading && <button className="btn">Editar</button>}
                        {response.loading && (
                            <button className="btn" disabled>
                                Aguarde...
                            </button>
                        )}
                    </div>
                    {(response.error || formError) && (
                        <p className="error">{response.error || formError}</p>
                    )}
                </form>
                </>
            )}
        </div>
    )
}

export default EditPost;
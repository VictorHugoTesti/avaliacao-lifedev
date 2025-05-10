import styles from "./CreatePost.module.css"

import { useState } from "react"
import {userInsertDocument} from "../../hooks/useInsertDocument"
import {useNavigate} from "react-router-dom"
import {useAuthValue} from "../../context/AuthContext"
import { Timestamp } from "firebase/firestore"

const CreatePost = () => {
    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState([])
    const [formError, setFormError] = useState("")

    const {user} = useAuthValue()
    const navigate = useNavigate()
    const {insertDocument, response} = userInsertDocument("posts")

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormError("")   

        try {
            new URL(image)
        } catch(error) {
            setFormError("A imagem precisa ser uma URL.")
        }

        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())

        if(!title || !image || !tags || !body) {
            setFormError("Por Favor, preencha os campos!")
        }

        console.log(tagsArray)

        console.log(
            {title,
            image,
            body, 
            tags: tagsArray, 
            uid: user.uid, 
            createdBy: user.displayName,
            }
        )

        if(formError) return 
        
        insertDocument({
            title,
            image,
            body,
            tags: tagsArray,
            uid: user.uid, 
            createdBy: user.displayName,
            createdAt: Timestamp.now(),
        })

        navigate("/")
    }

    return (
        <div className={styles.create_post}>
            <h2>Criar Post</h2>
            <p>Escreva sobre o que quiser e compartilhe!</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Titulo:</span>
                    <input 
                    type="text" 
                    name="text" 
                    required 
                    placeholder="Pense em um bom título" 
                    onChange={(e) => setTitle(e.target.value)} 
                    value={title}
                    />
                </label>
                <label>
                    <span>URL da Imagem:</span>
                    <input 
                    type="text" 
                    name="image" 
                    required 
                    placeholder="Insira uma Imagem." 
                    onChange={(e) => setImage(e.target.value)} 
                    value={image} 
                    />
                </label>
                <label>
                    <span>Conteudo:</span>
                    <input 
                    type="body" 
                    required 
                    placeholder="Insira o Conteúdo aqui" 
                    onChange={(e) => setBody(e.target.value)} 
                    value={body} 
                    />
                </label>
                <label>
                    <span>Tags:</span>
                    <input 
                    type="text" 
                    name="tags" 
                    required 
                    placeholder="Insira as tags separadas por vírgula" 
                    onChange={(e) => setTags(e.target.value)} 
                    value={tags} 
                    />
                </label>
                {!response.loading && <button className="btn">Criar Post!!</button>}
                {response.loading && (<button className="btn" disabled> Aguarde...</button>)}
                {(response.error || formError) && (<p className="error">{response.error || formError}</p>)}
            </form>
        </div>
    )
}

export default CreatePost;
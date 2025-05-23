import styles from "./About.module.css"
import {Link} from "react-router-dom"

const About = () => {
    return (
        <div className={styles.about}>
            <h2>Sobre o Mini <span>Blog</span>Developer</h2>
            <p>Projeto criado para servir como base de aprendizado de React, no terceiro semestre do curso de Desenvolvimento de Software Multiplataforma da Fatec Matão</p>
            <Link to="/posts/create" className="btn">
                Criar Post
            </Link>
        </div>
    )
}

export default About;
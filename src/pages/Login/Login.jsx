import styles from './Login.module.css'

import { useEffect, useState } from 'react'
import { userAuthentication } from '../../hooks/useAuthentication'
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/config";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const { login, error: authError, loading } = userAuthentication()

    const handlerSubmit = async (e) => {
        e.preventDefault()

        setError("")
        const user = {
            email,
            password,
        }

        const res = await login(user)
        if(res && res.user) {
            navigate("/dashboard")
        }

        console.log(res)
    }

    const handlerLoginGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
            navigate("/dashboard")
        } catch (error) {
            console.error("Erro ao fazer Login via Gloogle.", error.message)
            setError("Erro ao Logar via Gloogle.")
        }
    }

    useEffect(() => {
        console.log(authError)
        if (authError) {
            setError(authError)
        }
    }, [authError])

    return (
        <div className={styles.login}>
            <h1>Entrar</h1>
            <p>Faça login em nossa plataforma de desenvolvedores</p>
            <form onSubmit={handlerSubmit}>
                <label>
                    <span>E-mail: </span>
                    <input
                        type='email'
                        name='email'
                        required
                        placeholder='E-mail do usuário'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </label>
                <label>
                    <span>Senha: </span>
                    <input
                        type='password'
                        name='password'
                        required
                        placeholder='Insira sua senha'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </label>
                
                {!loading && <button className='btn'>Entrar</button>}
                {loading && (
                    <button className='btn' disabled>Aguarde... </button>
                )}
                {error && <p>{error}</p>}
            </form>
            <div className={styles.googleLogin}>
                    <button className={`${styles.googleButton} btn`} onClick={handlerLoginGoogle}>
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                        alt="Google Logo" 
                        className={styles.googleImg}/> 
                        Entrar com Gloogle
                    </button>
                </div>
        </div>
    )
}

export default Login;
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
  } from 'firebase/auth' 
  import { useState, useEffect } from "react"
  import {auth as authFirebase, googleProvider} from "../firebase/config"
  
  export const userAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();
  
    function checkIfIsCancelled() {
      if (cancelled) {
        return;
      }
    }
  
    const createUser = async (data) => {
      checkIfIsCancelled();
  
      setLoading(true);
  
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
  
        await updateProfile(user, {
          displayName: data.displayName,
        });
  
        return user;
      } catch (error) {
        console.log(error.message);
        console.log(typeof error.message);
  
        let systemErrorMessage;
  
        if (error.message.includes("Password")) {
          systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
        } else if (error.message.includes("email-already")) {
          systemErrorMessage = "E-mail já cadastrado.";
        } else {
          systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
        }
  
        setError(systemErrorMessage);
      }
  
      setLoading(false);
    };
  
    const logout = () => {
      checkIfIsCancelled();
  
      signOut(auth);
    };
  
    const login = async (data) => {
      checkIfIsCancelled();
  
      setLoading(true);
      setError(false);
  
      try {
        await signInWithEmailAndPassword(auth, data.email, data.password);
      } catch (error) {
        console.log(error.message);
        console.log(typeof error.message);
        console.log(error.message.includes("user-not"));
  
        let systemErrorMessage;
  
        if (error.message.includes("user-not-found")) {
          systemErrorMessage = "Usuário não encontrado.";
        } else if (error.message.includes("wrong-password")) {
          systemErrorMessage = "Senha incorreta.";
        } else {
          systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
        }
  
        console.log(systemErrorMessage);
  
        setError(systemErrorMessage);
      }
  
      console.log(error);
  
      setLoading(false);
    };
  
    const loginGoogle = async () => {
      if(checkIfIsCancelled()) return
      setLoading(true)
      setError(null)

      try {
        const result = await singinWithPopup(authFirebase, googleProvider)
        return result.user;
      } catch (error) {
        console.error("Erro ao fazer login com Gloogle.", error.message)
        setError("Erro ao logar com o Gloogle.")
      }
      setLoading(false)
    }

    useEffect(() => {
      return () => setCancelled(true);
    }, []);
  
    return {
      auth,
      createUser,
      error,
      logout,
      login,
      loading,
      loginGoogle,
    };
  };
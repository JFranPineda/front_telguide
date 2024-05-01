import { useState } from "react"
import LoginForm from "./LoginForm.js"
import Notify from '../../components/Notify.js'

const Login = ({ setToken }) => {
  const [errorMessage, setErrorMessage] = useState(null)

  const notifyLogin = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  return (
    <div>
      <h2>Login</h2>
      <LoginForm
          setToken={setToken}
          setError={notifyLogin}
        />
      <Notify errorMessage={errorMessage} />
    </div>
  )
}

export default Login
import { Link } from "react-router-dom";
import SignForm from "../SignForm/SignForm";

export default function Login({ handleLogin }) {
  return (
    <div className="login">
      <SignForm
        name="login"
        title="Entrar"
        onSubmit={handleLogin}
        text={
          <Link className="sign-link" to="/signup">
            Ainda não é membro? Inscreva-se aqui!
          </Link>
        }
      />
    </div>
  );
}

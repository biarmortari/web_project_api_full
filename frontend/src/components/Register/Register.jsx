import { Link } from "react-router-dom";
import SignForm from "../SignForm/SignForm";

export default function Register({ handleRegistration }) {
  return (
    <div className="register">
      <SignForm
        name="register"
        title="Inscrever-se"
        onSubmit={handleRegistration}
        text={
          <Link className="sign-link" to="/signin">
            Já é um membro? Faça o login aqui!
          </Link>
        }
      />
    </div>
  );
}

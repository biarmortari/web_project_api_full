import { useState } from "react";

export default function SignForm(props) {
  const { name, title, text, onSubmit } = props;

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sanitizedData = {
      email: data.email.trim().toLowerCase(),
      password: data.password,
    };
    onSubmit(sanitizedData);
  };

  const formClass = `form form_sign form__${name}`;

  return (
    <form className={formClass} name={name} onSubmit={handleSubmit}>
      <h1 className="form__title form__title_sign">{title}</h1>
      <fieldset className="form__fieldset">
        <input
          id="email-input"
          required
          name="email"
          type="text"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          className="form__input form__input_sign form__input_email"
        />
        <span className="email-input-error form__input-error"></span>

        <input
          id="password-input"
          required
          name="password"
          type="password"
          placeholder="Senha"
          value={data.password}
          onChange={handleChange}
          className="form__input form__input_sign form__input_password"
        />
        <span className="password-input-error form__input-error"></span>
        <button
          type="submit"
          name="submit"
          className="form__button form__button_sign"
        >
          {title}
        </button>
      </fieldset>
      {text}
    </form>
  );
}

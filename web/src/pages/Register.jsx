import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    cpf: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, cpf } = values;
    if (password !== confirmPassword) {
      toast.error(
        "A senha e a senha de confirmação devem ser iguais.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "O nome de usuário deve ter mais de 3 caracteres.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "A senha deve ser igual ou maior que 8 caracteres.",
        toastOptions
      );
      return false;
    } else if (cpf.length !== 11) {
      toast.error("CPF é obrigatório e com todos dígitos", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { cpf, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        cpf,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };

  return (
    <main className="containerRegister w-max-screen h-screen bg-sky-800 flex justify-center items-center">
      <form
        action=""
        onSubmit={(event) => handleSubmit(event)}
        className="max-w-[500px] min-h-[500px] rounded-2xl bg-sky-600 flex flex-col justify-around items-center p-8">
        <div className="flex flex-col justify-center items-center m-5 space-y-6 ">
          <h1 className="text-2xl">ChatConnect</h1>
          <img src={Logo} alt="logo" width={100} height={100} className="flex justify-center items-center"/>
        </div>
        <div className="space-y-4 mb-4">
          <input
            type="text"
            placeholder="Usuário"
            name="username"
            onChange={(e) => handleChange(e)}
            className="buttonInput"
            autoComplete="off"
          />
          <input
            type="cpf"
            placeholder="CPF"
            name="cpf"
            onChange={(e) => handleChange(e)}
            className="buttonInput"
            autoComplete="off"
          />
          <input
            type="password"
            placeholder="Senha"
            name="password"
            onChange={(e) => handleChange(e)}
            className="buttonInput"
            autoComplete="off"
          />
          <input
            type="password"
            placeholder="Confirmar senha"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
            className="buttonInput"
            autoComplete="off"
          />
        </div>
        <button type="submit" className="buttonSubmit">CRIAR NOVO USUÁRIO</button>
        <span className="flex flex-col justify-center items-center space-y-2 mt-5 w-full">
          <p>Já tem uma conta ? </p>
          <Link to="/login" className="flex w-3/5 font-bold justify-center p-2 items-center bg-yellow-500 hover:bg-yellow-600 rounded-full">
            LOGIN
            </Link>
        </span>
      </form>
      <ToastContainer />
    </main>
  );
}

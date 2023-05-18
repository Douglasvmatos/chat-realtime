import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ cpf: "", password: ""});
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { cpf, password } = values;
    if (cpf === "") {
      toast.error("CPF e senha são obrigatórios.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("CPF e senha são obrigatórios.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { cpf, password } = values;
      const { data } = await axios.post(loginRoute, {
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
    <main className="loginWallpaper w-max-screen h-screen flex flex-col justify-evenly items-center">
      <h1 className="text-6xl font-extrabold">Chat Connect</h1>
      <div className="flex flex-row justify-around items-center w-full">
      <div className="max-w-[500px] text-center w-auto h-auto rounded-2xl p-6 bg-sky-600">
        <p className="text-2xl font-bold hidden lg:block">Para fazer parte da nossa comunidade e não perder nenhuma atualização, faça login agora mesmo!</p>
      </div>
      <form action="" onSubmit={(event) => handleSubmit(event)} className="min-w-[450px] min-h-[400px] rounded-2xl bg-sky-600 flex flex-col justify-around items-center p-8">
        <div className="brand flex flex-col space-y-4 w-full justify-evenly text-center items-center mb-4">
          <h1>Acesso à plataforma</h1>
          <img src={Logo} alt="logo" className="w-40" />
        </div>
        <div className="w-full h-full space-y-4 mb-4">
          <input
            type="text"
            placeholder="CPF"
            name="cpf"
            onChange={(e) => handleChange(e)}
            min="3"
            className="buttonInput"
            autoComplete="off"
          />
          <input
            type="password"
            placeholder="Senha"
            name="password"
            onChange={(e) => handleChange(e)}
            className="buttonInput"
          />
        </div>
        <button type="submit" className="buttonSubmit">
          ACESSAR
          </button>
        <div className="w-full flex flex-col justify-center items-center m-4 space-y-2">
          <p>Não tem uma conta? </p>
          <button className="flex  font-bold justify-center p-2 items-center w-4/5 bg-yellow-500 hover:bg-yellow-600 rounded-full"><Link to="/register">CRIAR UMA CONTA GRÁTIS.</Link></button>
        </div>
      </form>
      </div>
      <ToastContainer />
    </main>
  );
}


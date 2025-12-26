import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useState, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

import { setToken, getToken } from "../utils/token";

import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Api from "../utils/Api";
import "../contexts/CurrentUserContext";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import InfoTooltip from "../components/Main/components/Popup/InfoTooltip/InfoTooltip";

import Popup from "../components/Main/components/Popup/Popup";

import authApi from "../utils/auth";

import signupSuccess from "../images/signupSuccess.svg";
import signupFail from "../images/signupFail.svg";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    Api.setToken(jwt);

    authApi
      .checkToken(jwt)
      .then((res) => {
        const email = { email: res.data.email };
        setCurrentUser((prevData) => ({ ...prevData, ...email }));
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        console.log("Token inválido:", err);
      });
  }, []);

  const getUserData = async () => {
    try {
      const userData = await Api.getUserInfo();
      setCurrentUser((prev) => ({
        ...prev,
        ...userData,
      }));
    } catch (err) {
      console.log("Erro ao buscar dados do usuário:", err);
    }
  };

  const getCardsData = async () => {
    try {
      const [cards] = await Api.getAppInfo();
      setCards(cards);
    } catch (err) {
      console.log("Erro ao buscar cards:", err);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;

    getUserData();
    getCardsData();
  }, [isLoggedIn]);

  const handleUpdateUser = async (data) => {
    try {
      const newData = await Api.updateUserInfo(data);
      setCurrentUser(newData);
      handleClosePopup();
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  const handleUpdateAvatar = async (data) => {
    try {
      const newData = await Api.updateAvatar(data);
      setCurrentUser(newData);
      handleClosePopup();
    } catch (error) {
      console.error("Erro ao atualizar avatar:", error);
    }
  };

  async function handleCardLike(card) {
    try {
      const newCard = await Api.updateLike(card._id, !card.isLiked);

      setCards((prevCards) =>
        prevCards.map((currentCard) =>
          currentCard._id === card._id ? newCard : currentCard
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCardDelete(card) {
    try {
      await Api.deleteCard(card._id);
      setCards((state) => state.filter((c) => c._id !== card._id));
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAddPlaceSubmit(newCardData) {
    console.log(newCardData);
    try {
      const newCard = await Api.addCard(newCardData);
      setCards((prev) => [newCard, ...prev]);
      handleClosePopup();
    } catch (err) {
      console.error(err);
    }
  }

  const handleLogin = ({ email, password }) => {
    authApi
      .authorize(email, password)
      .then((res) => {
        setCurrentUser((prevData) => ({ ...prevData, ["email"]: email }));
        setToken(res.token);

        Api.setToken(res.token);

        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        console.log("error", error);
        const infoTooltip = {
          type: "tooltip",
          children: (
            <InfoTooltip
              icon={signupFail}
              message="Ops, algo saiu de errado! Por favor, tente novamente."
            />
          ),
        };
        handleOpenPopup(infoTooltip);
      });
  };

  const handleRegistration = ({ email, password }) => {
    authApi
      .register(email, password)
      .then(() => {
        const infoTooltip = {
          type: "tooltip",
          children: (
            <InfoTooltip
              icon={signupSuccess}
              message="Vitória! Você se registrou!"
            />
          ),
        };
        handleOpenPopup(infoTooltip);
        navigate("/");
      })
      .catch((error) => {
        console.log("error", error);
        const infoTooltip = {
          type: "tooltip",
          children: (
            <InfoTooltip
              icon={signupFail}
              message="Ops, algo saiu de errado! Por favor, tente novamente."
            />
          ),
        };
        handleOpenPopup(infoTooltip);
      });
  };

  return (
    <>
      <CurrentUserContext.Provider
        value={{
          currentUser,
          handleUpdateUser,
          handleUpdateAvatar,
          handleOpenPopup,
          handleClosePopup,
          cards,
          handleCardLike,
          handleCardDelete,
          handleAddPlaceSubmit,
          popup,
          isLoggedIn,
          setIsLoggedIn,
        }}
      >
        <div className="page">
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Main
                    onOpenPopup={handleOpenPopup}
                    onClosePopup={handleClosePopup}
                    popup={popup}
                  />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/signin"
              element={<Login handleLogin={handleLogin} />}
            ></Route>
            <Route
              path="/signup"
              element={<Register handleRegistration={handleRegistration} />}
            ></Route>
          </Routes>

          <Footer />
        </div>
        {popup && (
          <Popup
            onClose={handleClosePopup}
            title={popup.title}
            type={popup.type}
          >
            {popup.children}
          </Popup>
        )}
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;

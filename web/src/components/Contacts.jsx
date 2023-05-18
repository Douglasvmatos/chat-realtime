import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import Logout from "./Logout";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  }, [contacts]);

  const sortContacts = (a, b) => {
    if (a.loggedIn && !b.loggedIn) {
      return -1; 
    } else if (!a.loggedIn && b.loggedIn) {
      return 1; 
    } else {
      return 0; 
    }
  };

  const sortedContacts = contacts.sort(sortContacts);

  const changeCurrentChat = (index, contact) => {
    if (!contact.loggedIn) {
      alert(`Não é possível iniciar uma conversar com ${contact.username}, porque está offline.`);
      return;
    }

    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserName && currentUserImage && (
        <Container>
          <div className="flex justify-evenly rounded-xl items-center m-2 p-1 ">
            <Logout />
            <h3 className="text-xl">ChatConnect</h3>
            <img src={Logo} alt="logo" width={40} height={40} />
          </div>
          <div className="contacts mb-5">
            {sortedContacts.map((contact, index) => (
              <div
                key={contact._id}
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt=""
                  />
                </div>
                <div className="uppercase font-bold text-white">
                  <h3>{contact.username}</h3>
                </div>
                <div>
                  {contact.loggedIn ? (
                    <div className="w-5 h-5 bg-green-500 rounded-full" />
                  ) : (
                    <div className="w-5 h-5 bg-red-500 rounded-full" />
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="uppercase font-bold text-white">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  width: 350px;
  overflow: hidden;
  margin: 1rem;
  background: linear-gradient(to up, #4a5568, #9ca3af);
  box-shadow: 2px 2px 4px rgba(10, 10, 0, 1);
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.5rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #4a28ea;
      min-height: 5rem;
      min-width: 17rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      align-items: center;
      justify-content: space-around;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      }
    }
    .selected {
      background-color: #241178;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    padding: 0.5rem;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 3.5rem;
        max-inline-size: 100%;
      }
    }

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
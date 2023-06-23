import Aside from "../components/Aside/Aside";
import Container from "../components/Container/Container";
import NavBar from "../components/NavBar/NavBar";
import { useState } from "react";
import Setting from "../components/Profile/Setting";
import Subscription from "../components/Profile/subscription";
import Chat from "../components/Chat/Chat";
import DataUser from "../components/Profile/Profile";
import AdminProducts from "../components/Profile/AdminProducts";
import ProfileContainer from "../components/Container/ProfileContainer";
import { useSelector } from "react-redux";
import Overlay from "../components/Overlay/Overlay";
import IconChat from "../components/Chat/IconChat";
import AdminUser from "../components/Profile/AdminUser";

function Profile() {
  const [selectedOption, setSelectedOption] = useState("Perfil");
  const [header, setHeader] = useState("Perfil");
  const user = useSelector((state) => state.user.user);
  const role = useSelector((state) => state.user.role);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setHeader(option);
  };
  const h2 = {
    Perfil: (
      <>
        Hola <span className="nameUser">{user.name}</span>, este es tu perfil
      </>
    ),
    Configuracion: "Configuracion",
    Suscripcion: "Suscripcion",
    Productos: "Administra tus Productos",
    Usuarios: "Administrar Usuarios",
  };

  const optionComponents = {
    Perfil: <DataUser user={user} />,
    Configuracion: <Setting />,
  };
  if (role == "premium" || role == "user") {
    optionComponents["Suscripcion"] = <Subscription />;
  }
  if (role == "premium" || role == "admin") {
    optionComponents["Productos"] = <AdminProducts />;
  }
  if (role == "admin") {
    optionComponents["Usuarios"] = <AdminUser />;
  }

  const options = Object.keys(optionComponents);
  const [displayOverlay, setDisplayOverlay] = useState(false);
  const handleDisplay = () => {
    setDisplayOverlay(!displayOverlay);
  };
  return (
    <>
      <NavBar></NavBar>
      <Container>
        <ProfileContainer>
          <Aside
            options={options}
            handleOptionClick={handleOptionClick}
            selectedOption={selectedOption}
          ></Aside>
          <h2 className="headerProfile">{h2[header]}</h2>

          {optionComponents[selectedOption]}
          {displayOverlay && <Chat />}
          <Overlay
            style={displayOverlay ? "flex" : "none"}
            key="chat"
            onClick={handleDisplay}
          />
          <IconChat onClick={handleDisplay} />
        </ProfileContainer>
      </Container>
    </>
  );
}
export default Profile;

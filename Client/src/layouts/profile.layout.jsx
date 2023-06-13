import Aside from "../components/Aside/Aside";
import Container from "../components/Container/Container";
import SubContainer from "../components/Container/SubContainer";
import NavBar from "../components/NavBar/NavBar";
import { useContext, useState } from "react";
import Setting from "../components/Profile/Setting";
import Subscription from "../components/Profile/subscription";
import Chat from "../components/Chat/Chat";

import DataUser from "../components/Profile/Profile";
import AdminProducts from "../components/Profile/AdminProducts";
import ProfileContainer from "../components/Container/ProfileContainer";
import { useSelector } from "react-redux";

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
  };

  const optionComponents = {
    Perfil: <DataUser user={user} />,
    Configuracion: <Setting />,
  };
  if (role == "premium" || role == "user") {
    optionComponents["Suscripcion"] = <Subscription />;
  }
  if (role == "premium" || role == "admin") {
    optionComponents["Productos"] = <AdminProducts user={user} />;
  }

  const options = Object.keys(optionComponents);

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
          <Chat />
        </ProfileContainer>
      </Container>
    </>
  );
}
export default Profile;

import Aside from "../components/Aside/Aside";
import Container from "../components/Container/Container";
import SubContainer from "../components/Container/SubContainer";
import NavBar from "../components/NavBar/NavBar";
import { useContext, useState } from "react";
import Setting from "../components/Perfil/Setting";
import Subscription from "../components/Perfil/subscription";
import Chat from "../components/Chat/Chat";
import { ApiContext } from "../context/ApiContext";
import DataUser from "../components/Perfil/perfil";
import AdminProducts from "../components/Perfil/AdminProducts";

function Perfil() {
  const [selectedOption, setSelectedOption] = useState("Perfil");
  const { user } = useContext(ApiContext);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const optionComponents = {
    Perfil: <DataUser user={user} />,
    Configuracion: <Setting />,
    Suscripcion: <Subscription />,
  };
  if (user.role == "premium") {
    optionComponents["Productos"] = <AdminProducts user={user} />;
  }
  const options = Object.keys(optionComponents);

  return (
    <>
      <NavBar></NavBar>
      <Container>
        <Aside options={options} handleOptionClick={handleOptionClick}></Aside>
        <SubContainer>
          {optionComponents[selectedOption]}
          <Chat />
        </SubContainer>
      </Container>
    </>
  );
}
export default Perfil;

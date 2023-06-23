import CardContainer from "../components/Container/CardContainer";
import Container from "../components/Container/Container";
import NavBar from "../components/NavBar/NavBar";
import Chat from "../components/Chat/Chat";
import SubContainer from "../components/Container/SubContainer";
import Pagination from "../components/Pagination/pagination";
import IconChat from "../components/Chat/IconChat";
import { useState } from "react";
import Overlay from "../components/Overlay/Overlay";

function Catalog() {
  const [displayOverlay, setDisplayOverlay] = useState(false);
  const handleDisplay = () => {
    setDisplayOverlay(!displayOverlay);
  };
  return (
    <>
      <NavBar />
      <Container>
        <SubContainer>
          <CardContainer />
          {displayOverlay && <Chat />}
          <Overlay
            style={displayOverlay ? "flex" : "none"}
            key="chat"
            onClick={handleDisplay}
          />
          <IconChat onClick={handleDisplay} />
        </SubContainer>
      </Container>
    </>
  );
}
export default Catalog;

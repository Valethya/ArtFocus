import CardContainer from "../components/Container/CardContainer";
import Container from "../components/Container/Container";
import NavBar from "../components/NavBar/NavBar";
import Chat from "../components/Chat/Chat";
import SubContainer from "../components/Container/SubContainer";
import Pagination from "../components/Pagination/pagination";

function Catalog() {
  return (
    <>
      <NavBar />
      <Container>
        <SubContainer>
          <CardContainer />
          <Chat></Chat>
        </SubContainer>
      </Container>
    </>
  );
}
export default Catalog;

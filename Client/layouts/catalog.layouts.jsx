import CardContainer from "../components/Container/CardContainer";
import Container from "../components/Container/Container";
import NavBar from "../components/NavBar/NavBar";
import Chat from "../components/Chat/Chat";

function Catalog() {
  return (
    <>
      <NavBar />
      <Container>
        <CardContainer />
        <Chat></Chat>
      </Container>
    </>
  );
}
export default Catalog;

import Cart from "../components/Cart/Cart";
import Container from "../components/Container/Container";
import NavBar from "../components/NavBar/NavBar";
import SubContainer from "../components/Container/SubContainer";

function CartLayout() {
  return (
    <>
      <NavBar></NavBar>
      <Container>
        <SubContainer>
          <Cart></Cart>
        </SubContainer>
      </Container>
    </>
  );
}
export default CartLayout;

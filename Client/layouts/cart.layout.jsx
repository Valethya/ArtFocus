import Cart from "../components/Cart/Cart";
import Container from "../components/Container/Container";
import NavBar from "../components/NavBar/NavBar";

function CartLayout() {
  return (
    <>
      <NavBar></NavBar>
      <Container>
        <Cart></Cart>
      </Container>
    </>
  );
}
export default CartLayout;

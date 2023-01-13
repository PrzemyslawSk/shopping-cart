import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openCloseCart, updateAmountOfItems } from "../redux/cartSlice";
import { RootState } from "../redux/reduxStore";
import ShoppingCart from "./ShoppingCart";

function Navbar() {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const cartTotalQuantity = useSelector(
    (state: RootState) => state.cart.cartTotalQuantity
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateAmountOfItems());
  }, [cartItems]);

  return (
    <>
      <nav className="bg-white shadow-sm mb-3 position: sticky top-0">
        <div className="container mx-auto">
          <div className="flex py-4">
            <a
              className="my-auto mr-7 text-blue-500 hover:text-blue-700"
              href="/"
            >
              Home
            </a>
            <a
              className="my-auto mr-7 text-blue-500 hover:text-blue-700"
              href="/store"
            >
              Store
            </a>
            <a
              className="my-auto mr-7 text-blue-500 hover:text-blue-700"
              href="/about"
            >
              About
            </a>
            {cartTotalQuantity > 0 && (
              <button
                style={{
                  width: "2.8rem",
                  height: "2.8rem",
                  position: "relative",
                }}
                className="ml-auto bg-transparent hover:bg-blue-500 text-blue-500 hover:text-white p-3 border border-blue-500 hover:border-transparent rounded-full"
                onClick={() => dispatch(openCloseCart())}
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  fill="currentColor"
                >
                  <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
                </svg>
                <div
                  className="rounded-full bg-red-500 flex justify-center items-center"
                  style={{
                    color: "white",
                    fontSize: "15px",
                    width: "1.3rem",
                    height: "1.3rem",
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    transform: "translate(20%, 20%)",
                  }}
                >
                  {cartTotalQuantity}
                </div>
              </button>
            )}
          </div>
        </div>
      </nav>
      <ShoppingCart />
    </>
  );
}

export default Navbar;

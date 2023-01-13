import { useDispatch, useSelector } from "react-redux";
import { openCloseCart } from "../redux/cartSlice";
import { RootState } from "../redux/reduxStore";
import CartItem from "./CartItem";
import storeItems from "../data/items.json";
import formatCurrency from "../utilities/formatCurrency";

function ShoppingCart() {
  const isCartOpen = useSelector((state: RootState) => state.cart.isCartOpen);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch();
  return (
    <div
      className={`fixed z-40 h-screen p-4 overflow-y-auto bg-white w-80 dark:bg-gray-800 transition-transform right-0 top-0 ${
        isCartOpen ? "" : "translate-x-full"
      }`}
    >
      <h5 className="inline-flex items-center mb-4 font-semibold text-gray-500 ml-2 text-lg">
        Cart
      </h5>
      <button
        className="text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-lg p-1.5 absolute top-2.5 right-2.5 inline-flex items-center"
        onClick={() => dispatch(openCloseCart())}
      >
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
          />
        </svg>
      </button>

      <div className="flex flex-col relative items-stretch w-full">
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <div className="absolute right-4 text-lg font-semibold">
        Total{" "}
        {formatCurrency(
          cartItems.reduce((total, cartItem) => {
            const item = storeItems.find((i) => i.id === cartItem.id);
            return total + (item?.price || 0) * cartItem.quantity;
          }, 0)
        )}
      </div>
    </div>
  );
}

export default ShoppingCart;

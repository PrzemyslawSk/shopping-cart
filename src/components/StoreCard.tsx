import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "../redux/cartSlice";
import { RootState } from "../redux/reduxStore";
import formatCurrency from "../utilities/formatCurrency";

type StoreCardProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

function StoreCard({ id, name, price, imgUrl }: StoreCardProps) {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch();

  return (
    <>
      <div className="max-w-md rounded shadow-md h-full">
        <img className="w-full h-48 object-cover" src={imgUrl} alt="" />
        <div className="flex flex-col mx-3">
          <div className="flex justify-between items-baseline mt-3 mb-4">
            <span className="text-lg font-medium">{name}</span>
            <span className="text-md text-gray-600">
              {formatCurrency(price)}
            </span>
          </div>
          <div className="mt-auto pb-5">
            {(cartItems.find((item) => item.id === id)?.quantity || 0) === 0 ? (
              <button
                onClick={() => dispatch(addToCart({ id }))}
                className="flex items-center justify-center w-full h-9 bg-blue-500 rounded text-white hover:bg-blue-600"
              >
                + Add To Cart
              </button>
            ) : (
              <div className="flex flex-col items-center gap-2.5">
                <div className="flex items-center justify-center gap-1.5">
                  <button
                    onClick={() => dispatch(incrementQuantity({ id }))}
                    className="bg-blue-500 rounded text-white hover:bg-blue-600 w-8 h-8"
                  >
                    +
                  </button>
                  <div>
                    <span className="font-medium text-lg">
                      {cartItems.find((item) => item.id === id)?.quantity}
                    </span>{" "}
                    in cart
                  </div>
                  <button
                    onClick={() => dispatch(decrementQuantity({ id }))}
                    className="bg-blue-500 rounded text-white hover:bg-blue-600 w-8 h-8"
                  >
                    -
                  </button>
                </div>
                <button
                  onClick={() => dispatch(removeItem({ id }))}
                  className="bg-red-500 rounded text-white w-24 h-7 hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default StoreCard;

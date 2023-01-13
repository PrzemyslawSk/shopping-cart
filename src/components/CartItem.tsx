import { useDispatch } from "react-redux";
import storeItems from "../data/items.json";
import { removeItem } from "../redux/cartSlice";
import formatCurrency from "../utilities/formatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};

function CartItem({ id, quantity }: CartItemProps) {
  const dispatch = useDispatch();
  const item = storeItems.find((item) => item.id === id);
  if (item == null) return null;
  return (
    <div className="flex flex-row gap-x-2 place-content-center my-5 w-full">
      <img className="object-cover rounded w-28 h-20" src={item.imgUrl}></img>
      <div className="flex flex-col">
        <div className="text-[14px] font-normal whitespace-nowrap">
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-slate-400 text-[11px]">x{quantity}</span>
          )}
        </div>
        <div className="text-slate-400 text-[11px]">
          {formatCurrency(item.price)}
        </div>
        <div className="mt-auto text-[13px]">
          {formatCurrency(item.price * quantity)}
        </div>
      </div>
      <button className="ml-auto" onClick={() => dispatch(removeItem({ id }))}>
        &times;
      </button>
    </div>
  );
}

export default CartItem;

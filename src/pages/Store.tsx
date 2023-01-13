import StoreCard from "../components/StoreCard";
import storeItems from "../data/items.json";

function Store() {
  return (
    <>
      <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1">
        {storeItems.map((item) => (
          <div key={item.id}>
            <StoreCard {...item} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Store;

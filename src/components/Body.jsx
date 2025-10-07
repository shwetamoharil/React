import RestaurantCard from "./RestaurantCard";
import { resList } from "../utils/constants";
import { useState } from "react";

const Body = () => {
  const [restaurantList, setRestaurantList] = useState(resList);

  const onTopRatedRestaurantClick = () => {
    const filteredList = restaurantList.filter(
      (res) => res?.card?.card?.info?.avgRating > 4.2
    );
    setRestaurantList(filteredList);
  };
  return (
    <div className="body">
      <div className="filter">
        <button className="filter-btn" onClick={onTopRatedRestaurantClick}>
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {restaurantList?.map((res, index) => (
          <RestaurantCard
            name={res?.card?.card?.info?.name}
            cuisines={res?.card?.card?.info?.cuisines}
            rating={res?.card?.card?.info?.avgRating}
            time={res?.card?.card?.info?.sla?.deliveryTime}
            imgId={res?.card?.card?.info?.cloudinaryImageId}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Body;

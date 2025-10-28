import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import ShimmerUI from "./ShimmerUI";

const Body = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [filteredRestaurantList, setFilteredRestaurantList] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.52110&lng=73.85020&collection=80435&tags=layout_CCS_PureVeg&sortBy=&filters=&type=rcv2&offset=0&page_type=null"
    );
    const json = await data.json();
    const refinedData = json?.data?.cards?.filter((card) =>
      card?.card?.card?.["@type"]?.includes("food.v2.Restaurant")
    );
    setRestaurantList(refinedData);
    setFilteredRestaurantList(refinedData);
  };

  const onTopRatedRestaurantClick = () => {
    const filteredList = restaurantList.filter(
      (res) => Number(res?.card?.card?.info?.avgRating) > 4.2
    );
    setFilteredRestaurantList(filteredList);
  };

  const onSearchClickHanlder = () => {
    const searchList = restaurantList?.filter((res) =>
      res?.card?.card?.info?.name
        ?.toLowerCase()
        ?.includes(searchText.toLowerCase())
    );
    setFilteredRestaurantList(searchList);
  };

  if (restaurantList?.length === 0) {
    return <ShimmerUI />;
  }

  return (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button className="search-btn" onClick={onSearchClickHanlder}>
            Search
          </button>
        </div>
        <button className="filter-btn" onClick={onTopRatedRestaurantClick}>
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {filteredRestaurantList?.map((res, index) => (
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

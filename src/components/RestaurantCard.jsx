import { imgCloudinaryId } from "../utils/constants";

const RestaurantCard = ({ name, cuisines, rating, time, imgId }) => {
  return (
    <div className="res-card">
      <img className="res-logo" src={imgCloudinaryId + imgId} alt="anna-idli" />
      <h3>{name}</h3>
      <h4>{cuisines.join(" ")}</h4>
      <h4>{rating}</h4>
      <h4>{time + " mins"}</h4>
    </div>
  );
};

export default RestaurantCard;

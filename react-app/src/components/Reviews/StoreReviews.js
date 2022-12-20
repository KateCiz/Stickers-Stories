import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleItem } from "../../store/items";
import { deleteAReview } from "../../store/reviews";
import { AiFillStar } from "react-icons/ai";
import "./index.css";

function StoreReview({ review }){
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const loggedInUser = useSelector(state => state.session.user);

  let CreatedDate;

  if (review?.created_date) {
    const date = new Date(review?.created_date);
    const createdDay = date.getDate();
    const createdMonth = date.toLocaleString("default", { month: "short" });
    const createdYear = date.getFullYear();
    const createdStr = `${createdDay} ${createdMonth}, ${createdYear}`;
    CreatedDate = <p className="review-created">{createdStr}</p>;
  }

  let Stars;

  if(review?.star_rating === 5){
    Stars = <div className="item-review-rating"> <AiFillStar /> <AiFillStar /> <AiFillStar /> <AiFillStar /> <AiFillStar /></div>
  }
  if(review?.star_rating === 4){
    Stars = <div className="item-review-rating"> <AiFillStar /> <AiFillStar /> <AiFillStar /> <AiFillStar /></div>
  }
  if(review?.star_rating === 3){
    Stars = <div className="item-review-rating"> <AiFillStar /> <AiFillStar /> <AiFillStar /></div>
  }
  if(review?.star_rating === 2){
    Stars = <div className="item-review-rating"> <AiFillStar /> <AiFillStar /></div>
  }
  if(review?.star_rating === 1){
    Stars = <div className="item-review-rating"> <AiFillStar /></div>
  }

  return (
    <div className="one-store-review">
      <div className="review-user-div">
        <div
          className="review-user-image-div"
          style={{ backgroundImage: `url('${
            review?.user?.image_profile_url
            ? review?.user?.image_profile_url
            : "https://res.cloudinary.com/dymmlu1dw/image/upload/v1668556463/Stories%20%2B%20Stickers/Demo/generic_profile_pic_u2bfov.png"}')` }}>
        </div>
        <p className="review-username">{review?.user?.username}</p>
        {CreatedDate}
        {loggedInUser?.id === review?.user?.id &&
          <button 
          className="delete-review-btn"
          onClick={async () => await dispatch(deleteAReview(review?.id))
            .then(() => {dispatch(getSingleItem(itemId))})}
          >Delete</button>}
      </div>
      <div className="review-content-photo-div">
        {Stars}
        <p className="review-content">{review?.content}</p>
        {review?.photo !== null && <div
        className="review-photo-div"
        style={{ backgroundImage: `url('${review?.photo}')`}}>
        </div>}
      </div>
    </div>
  );
}

export default StoreReview;
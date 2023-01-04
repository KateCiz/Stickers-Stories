import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { getSingleItem, deleteAnItem } from "../../store/items";
import { AiFillStar } from "react-icons/ai";
import BigItemButton from "./BigItemButton";
import ItemReview from "../Reviews/ItemReview";
import { getAllReviewsForItem } from "../../store/reviews";

import './index.css';
import ReviewModal from "../Reviews/ReviewModal";

function FullItemPage() {
  const { itemId } = useParams();
  const item = useSelector((state) => state.itemState[itemId]);
  const loggedInUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    (async() => {
      const res = await dispatch(getSingleItem(itemId));
      if (res.status === 404){
        history.push('/404')
      }
    })();
  }, [dispatch]);

  return (
    <div className="full-page-full-item-div">
      <div className="full-page-item-div">
        <div className="image-side">
          <div
            className="full-page-item-img-div"
            style={{ backgroundImage: `url('${item?.image_url}')` }}
          ></div>
        </div>
        <div className="info-side">
          <div className="store-preview-div">
          <NavLink to={`/stores/${item?.Store?.id}`} style={{ textDecoration: "none" }}>
            <div
              className="store-preview-profile-image-container"
              style={{
                backgroundImage: `url('${
                  item?.Store?.profile_image_url
                    ? item?.Store?.profile_image_url
                    : "https://res.cloudinary.com/dymmlu1dw/image/upload/v1668556463/Stories%20%2B%20Stickers/Demo/generic_profile_pic_u2bfov.png"
                }')`,
              }}
            ></div>
              <p className="store-preview-name">{item?.Store?.name}</p>
          </NavLink>
          </div>
          <div className="full-page-item-main-info">
            <p className="full-page-item-name">{item?.name}</p>
            <div>
              <p className="full-page-item-rating">
                <AiFillStar />
                {item?.avg_star_rating}
              </p>
            </div>
            <p className="full-page-item-price">${item?.price}</p>
          </div>
          <div className="full-page-item-description-div">
            <p className="full-page-item-description">{item?.description}</p>
          </div>
          <div>
            <BigItemButton item={item} id={itemId}/>
            {loggedInUser?.store_id === item?.Store?.id &&
            <button className='delete-btn' onClick={async () => await dispatch(deleteAnItem(itemId)).then(() => {history.push(`/stores/${loggedInUser?.store_id}`)})}>Delete Item</button>
            }
            </div>
        </div>
      </div>
      <div className="item-reviews-div">
        <p className="item-reviews-header">Reviews: {item?.num_reviews}</p>
        {loggedInUser && (item?.Reviews?.filter(review => review?.user?.id === loggedInUser.id).length === 0) && <ReviewModal />}
        {item?.Reviews?.map((review, i) => {
          return (
            <ItemReview key={i} review={review} />
          )
        })}
      </div>
    </div>
  );
}

export default FullItemPage;

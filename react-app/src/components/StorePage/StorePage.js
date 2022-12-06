import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { getSingleStore } from "../../store/stores";
// import StoreFeed from "../ItemFeed/StoreFeed";
import ItemPreview from "../ItemFeed/ItemPreview";
import EditStoreModal from "../StoreCreate+Edit/EditStoreModal";
import './index.css';

function StorePage() {
  const { storeId } = useParams();
  const store = useSelector((state) => state.storeState[storeId]);
  const loggedInUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    (async() => {
      const res = await dispatch(getSingleStore(storeId));
      if (res.status === 404){
        history.push('/404')
      }
    })();
  }, [dispatch]);

  return (
    <div className="store-page-div">
       <div
        className="store-page-cover-img-div"
        style={{ backgroundImage: `url('${
          store?.cover_image_url
          ? store?.cover_image_url
          : "https://res.cloudinary.com/dymmlu1dw/image/upload/v1670276190/Stories%20%2B%20Stickers/Demo/demo_banner_jyflaa.png"}')` }}
      ></div>
      <div className="store-info-div">
        <div
          className="store-profile-image-container"
          style={{
            backgroundImage: `url('${
              store?.profile_image_url
                ? store?.profile_image_url
                : "https://res.cloudinary.com/dymmlu1dw/image/upload/v1668556463/Stories%20%2B%20Stickers/Demo/generic_profile_pic_u2bfov.png"
            }')`,
          }}
        ></div>
        <div className="store-info-text">
          <p className="store-name">{store?.name}</p>
          <p className="store-about">{store?.about}</p>
          { loggedInUser?.store_id === store?.id && <EditStoreModal />}
        </div>
      </div>

      <div className="store-items-info">
        <p className="store-items-count">Items: {store?.Items?.length ? store?.Items?.length : 0}</p>
        <p className="store-avg-review">Average Review: {store?.avg_reviews ? store?.avg_reviews?.toFixed(1) : "No reviews yet"}</p>
      </div>


      <div className="store-feed-div">
      <div className="store-feed-preview-items">
        {/* {loaded && */}
          {store?.Items?.map((item, i) => {
            return (
              <div key={i}>
                <NavLink
                  key={i}
                  to={`/items/${item.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <ItemPreview item={item} />
                </NavLink>
              </div>
            );
          })}
      </div>
    </div>
      {/* <div>
        <StoreReviews item={item} />
      </div> */}
    </div>
  );
}

export default StorePage;

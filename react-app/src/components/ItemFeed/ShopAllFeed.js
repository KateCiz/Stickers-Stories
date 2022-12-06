import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllItems } from "../../store/items"
import ItemPreview from "./ItemPreview";
import './preview.css';

function ShopAllFeed() {
    const dispatch = useDispatch();
    const items = Object.values(useSelector((state) => state.itemState));
    const [loaded, setLoaded] = useState(false)


    useEffect(() => {
      (async() => {
        await dispatch(getAllItems());
        setLoaded(true);
      })();
    }, [dispatch]);


    if (!loaded) {
      return null;
    }


    return (
      <div className="feed-div">
        <div
        className="homepage-banner"
        style={{ backgroundImage: `url('${"https://res.cloudinary.com/dymmlu1dw/image/upload/v1670125006/Stories%20%2B%20Stickers/stickers_stories_home_banner_1_xzf0xk.png"}')` }}
      ></div>
        <div className="feed-preview-items">
          {loaded && items?.map((item, i) => {
              return (
              <NavLink key={i} to={`/items/${item.id}`} style={{ textDecoration: "none" }}>
                 <ItemPreview item={item}/>
              </NavLink>
            );
          })}
        </div>
      </div>
    );
}

export default ShopAllFeed;

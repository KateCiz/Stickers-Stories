import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function BigItemButton({ item, id }){
    const loggedInUser = useSelector(state => state.session.user);

    let ItemButton;

    if(loggedInUser?.store_id === item?.Store?.id){ 
        // this can be revised after finishing the edit item page
        ItemButton =
            <NavLink className="edit-item-btn" to={`/edit-item/${id}`}>
                Edit Item
            </NavLink>
    }
return (
    <>
        {ItemButton}
    </>
)
}

export default BigItemButton;
import CreateItemForm from "./ItemCreateForm";
import EditItemForm from "./ItemEditForm";
import { useParams } from "react-router-dom";

function ItemFormPage({ itemPage }){
    const { itemId } = useParams();

    let ItemPage

    if(itemPage === "create"){
        ItemPage = <CreateItemForm />
    }

    if(itemPage === "edit"){
        ItemPage = <EditItemForm />
    }

    return (
        <>
            {ItemPage}
        </>
    )

};

export default ItemFormPage;
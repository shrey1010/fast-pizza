import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder({ order }) {
    const fetcher = useFetcher();
    return( <fetcher.Form method="PATCH" className="flex gap-2 text-right">
        <Button disabled={fetcher.state === "submitting"} type="small">Prioritize</Button>
    </fetcher.Form>
    );
}   
 

export default UpdateOrder; 

export async function action({ request, params }) {
    const  data = { priority : true}
    await  updateOrder(params.orderId, data); 
    return null;
}  
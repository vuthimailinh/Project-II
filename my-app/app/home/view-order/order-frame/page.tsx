import ListOrderFrame from "../list-order/page";
import UserMenuBar from "../user-bar/page";

export default function OrderFrame(){
    return (
        <div className="mx-32 my-16 space-x-[12px] flex">
            <UserMenuBar/>
            <ListOrderFrame/>
        </div>
    )
}
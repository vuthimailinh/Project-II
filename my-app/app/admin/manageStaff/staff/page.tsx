import { IUser } from "../../../../../back-end/src/models/User.model"
export default function StaffItem({ staff }: { staff: IUser }) {
    return (
        <div className="mt-8 ">
            <div className="border p-4">
                <p>Name: {staff.username}</p>
                <p>Email: {staff.email}</p>
                <p>Role: {staff.role}</p>
                <p>Phone Number: {staff.phoneNumber}</p>
            </div>
        </div>
    )
}



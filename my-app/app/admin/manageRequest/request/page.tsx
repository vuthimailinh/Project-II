import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { IListRegister } from "../../../../../back-end/src/models/ListRegister.model"
import { useState } from "react";
import axios from "axios";
export default function RequestItem({ request }: { request: IListRegister }) {
    const [showDialog, setShowDialog] = useState(false);
    const handleAccept = async (id: string, role: string) => {
        const token = localStorage.getItem('refresh_token');
        try {
            const response = await axios.post(
                'http://localhost:8080/api/v1/admin/accept',
                { id: id, type: role },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            console.log(response);
            
            setShowDialog(false);
        } catch (error) {
            console.error('Error accepting request:', error);
        }
    }

    const handleDecline = async (id: string, role: string) => {
        const token = localStorage.getItem('refresh_token');
        try {
            const response = await axios.post(
                'http://localhost:8080/api/v1/admin/notAccept',
                { id: id, type: role },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setShowDialog(false);
        } catch (error) {
            console.error('Error accepting request:', error);
        }
    }
    return (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
                <div className="border p-4 mt-8" onClick={() => setShowDialog(true)}>
                    <p>UserId: {request.userId}</p>
                    <p>Email: {request.email}</p>
                    <p>Role: {request.role}</p>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogTitle>Thông tin request</DialogTitle>
                <div className="border p-4 mt-8">
                    <p>UserId: {request.userId}</p>
                    <p>Email: {request.email}</p>
                    <p>Role: {request.role}</p>
                </div>
                <div className="mt-4 flex justify-between">
                    <button onClick={() => handleAccept(request.userId, request.role)} className="bg-green-500 text-white px-4 py-2 rounded-md">Chấp nhận</button>
                    <button onClick={() => handleDecline(request.userId, request.role)} className="bg-red-500 text-white px-4 py-2 rounded-md">Từ chối</button>
                </div>
            </DialogContent>
        </Dialog>
    )
}



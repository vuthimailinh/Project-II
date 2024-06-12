'use client'
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogTrigger } from "@radix-ui/react-dialog";
import axios from "axios";
import { Sign } from "crypto";
import { ArrowDownRight, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ImageUploading, { ImageListType } from 'react-images-uploading';

export default function Sidebar() {
    const [activeButton, setActiveButton] = useState("");

    useEffect(() => {
        const savedPath = localStorage.getItem("activeButton");
        if (savedPath) {
            setActiveButton(savedPath);
        } else {
            const path = window.location.pathname;
            if (path.includes("/admin/manageproduct")) {
                setActiveButton("manageproduct");
            } else if (path.includes("/admin/manageorder")) {
                setActiveButton("manageorder");
            } else if (path.includes("/admin/manageStaff")) {
                setActiveButton("manageStaff");
            } else if (path.includes("/admin/manageRequest")) {
                setActiveButton("manageRequest");
            } else if (path.includes("/admin/addProduct")) {
                setActiveButton("addProduct");
            }
        }
    }, []);

    const handleButtonClick = (button: string) => {
        setActiveButton(button);
        localStorage.setItem("activeButton", button);
    };

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [discount, setDiscount] = useState('');
    const [version, setVersion] = useState('');
    const [price, setPrice] = useState('');
    //const [images, setImage] = useState('');
    const [items, setItems] = useState('');
    const [open, setOpen] = useState(false);

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const productData = {
            name,
            brand,
            discount,
            version,
            price,
            category,
            images,
            items
        };
        // console.log(productData);

        try {
            const token = localStorage.getItem('refresh_token');
            const response = await axios.post(
                'http://localhost:8080/api/v1/product/create-product',
                productData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            setOpen(false);
        } catch (error) {

        }
    }

    const [images, setImages] = useState([]);
    const maxNumber = 69;

    const onChange = (
        imageList: ImageListType,
        addUpdateIndex: number[] | undefined
    ) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList as never[]);
    };
    return (
        <div className="flex gap-2">
            <Link
                href={"/admin/manageproduct"}
            >
                <Button variant="ghost"
                    className={activeButton === "manageproduct" ? "bg-blue-500 text-white" : ""}
                    onClick={() => handleButtonClick("manageproduct")}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="mr-2 w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                    </svg>
                    Quan ly san pham
                </Button>
            </Link>
            <Link
                onClick={() => handleButtonClick("manageOrder")}
                href={"/admin/manageorder"}
            >
                <Button variant="ghost"
                    className={activeButton === "manageOrder" ? "bg-blue-500 text-white" : ""}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>

                    Quan ly don hang
                </Button>
            </Link>
            <Link
                href={"/admin/manageStaff"}
            >
                <Button variant="ghost"
                    className={activeButton === "manageStaff" ? "bg-blue-500 text-white" : ""}
                    onClick={() => handleButtonClick("manageStaff")}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" mr-2 w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    Quan ly nhan vien
                </Button>
            </Link>

            <Link
                href={"/admin/manageRequest"}
            >
                <Button variant="ghost"
                    className={activeButton === "manageRequest" ? "bg-blue-500 text-white" : ""}
                    onClick={() => handleButtonClick("manageRequest")}
                >
                    <ArrowDownRight />
                    Quan ly yeu cau
                </Button>
            </Link>
            <Dialog open={open}>
                <DialogTrigger asChild>
                    <Button variant="ghost"
                        className={activeButton === "addProduct" ? "bg-blue-500 text-white" : ""}
                        onClick={() => {
                            setOpen(true);
                            handleButtonClick("addProduct");
                        }}
                    >
                        <Plus />
                        Thêm sản phẩm
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <form>
                        <DialogHeader>
                            <DialogTitle onClick={() => setOpen(false)}>Thêm sản phẩm</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="category" className="text-right">
                                    Category
                                </Label>
                                <Input
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="brand" className="text-right">
                                    Brand
                                </Label>
                                <Input
                                    id="brand"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="discount" className="text-right">
                                    Discount
                                </Label>
                                <Input
                                    id="discount"
                                    type="number"
                                    value={discount}
                                    onChange={(e) => setDiscount(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="version" className="text-right">
                                    Version
                                </Label>
                                <Input
                                    id="version"
                                    value={version}
                                    onChange={(e) => setVersion(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="price" className="text-right">
                                    Price
                                </Label>
                                <Input
                                    id="price"
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="images" className="text-right">
                                    Image
                                </Label>
                                {/*<Input
                                    id="images"
                                    value={images}
                                    onChange={(e) => setImage(e.target.value)}
                                    className="col-span-3"
                                />*/}
                                <div className="Sidebar">
                                    <ImageUploading
                                        multiple
                                        value={images}
                                        onChange={onChange}
                                        maxNumber={maxNumber}
                                    >
                                        {({
                                            imageList,
                                            onImageUpload,
                                            onImageRemoveAll,
                                            onImageUpdate,
                                            onImageRemove,
                                            isDragging,
                                            dragProps
                                        }) => (
                                            // write your building UI
                                            <div className="upload__image-wrapper">
                                                <div className="flex">
                                                    <Button
                                                        type="button"
                                                        style={isDragging ? { color: "red" } : undefined}
                                                        onClick={onImageUpload}
                                                        {...dragProps}
                                                    >
                                                        Upload the file
                                                    </Button>
                                                    &nbsp;
                                                    <Button
                                                        type="button"
                                                        onClick={onImageRemoveAll}>
                                                        Remove all images
                                                    </Button>
                                                </div>
                                                {imageList.map((image, index) => (
                                                    <div key={index} className="image-item">
                                                        <img src={image.dataURL} alt="" width="100" />
                                                        <div className=" flex image-item__btn-wrapper">
                                                            <Button
                                                                type="button"
                                                                onClick={() => onImageUpdate(index)}>
                                                                Update
                                                            </Button>
                                                            <Button
                                                                type="button"
                                                                onClick={() => onImageRemove(index)}>
                                                                Remove
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </ImageUploading>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="items" className="text-right">
                                    Items
                                </Label>
                                <Input
                                    id="items"
                                    value={items}
                                    onChange={(e) => setItems(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleSubmit}>Save</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
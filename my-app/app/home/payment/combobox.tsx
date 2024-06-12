"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Value } from "@radix-ui/react-select"
import { useState } from "react"
import { Input } from "@/components/ui/input"

const provinces = [
    {
        value: "hanoi",
        label: "Ha Noi",
        districts: [
            {
                value: "dongda",
                label: "Dong Da"
            },
            {
                value: "bađinh",
                label: "Ba Dinh"
            },
            {
                value: "haibatrung",
                label: "Hai Ba Trung",
                communes: [
                    {
                        valuedis: "bachkhoa",
                        labeldis: "Bach Khoa",
                    },
                    {
                        valuedis: "thanhnhan",
                        labeldis: "Thanh Nhan"
                    }
                ]
            }
        ]
    },
    {
        value: "thaibinh",
        label: "Thai Binh",
    }, {
        value: "hochiminh",
        label: "Ho Chi Minh",
    }, {
        value: "danang",
        label: "Da Nang",
    },

]


export default function ComboboxDemo() {
    const [openpro, setOpenPro] = useState(false)
    const [opendis, setOpenDis] = useState(false)
    const [opencom, setOpenCom] = useState(false)

    const [valuepro, setValuePro] = useState("")
    const [valuedis, setValueDis] = useState("")
    const [valuecom, setValueCom] = useState("")


    const selectedProvince = provinces.find(province => province.value === valuepro)



    return (
        <>
        <Popover open={openpro} onOpenChange={setOpenPro}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openpro}
                    className="w-[200px] justify-between"
                >
                    {valuepro
                        ? provinces.find((province) => province.value === valuepro)?.label
                        : "Select province..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search province..." />
                    <CommandEmpty>No province found.</CommandEmpty>
                    <CommandGroup>
                        <CommandList>
                            {provinces.map((province) => (
                                <CommandItem
                                    key={province.value}
                                    value={province.value}
                                    onSelect={(currentValue) => {
                                        setValuePro(currentValue === valuepro ? "" : currentValue)
                                        setOpenPro(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            valuepro === province.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {province.label}
                                </CommandItem>
                            ))}
                        </CommandList>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
        <Popover open={opendis} onOpenChange={setOpenDis}>
        <PopoverTrigger asChild>
            <Button
                variant="outline"
                role="combobox"
                aria-expanded={opendis}
                className="w-[200px] justify-between"
            >
                {
                valuedis
                    ? provinces.find((district) => district.value === valuedis)?.label
                    : "Select district..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
            <Command>
                <CommandInput placeholder="Search province..." />
                <CommandEmpty>No province found.</CommandEmpty>
                <CommandGroup>
                    <CommandList>
                        {provinces.map((province) => (
                            <CommandItem
                                key={province.value}
                                value={province.value}
                                onSelect={(currentValue) => {
                                    setValueDis(currentValue === valuedis ? "" : currentValue)
                                    setOpenDis(false)
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        valuedis === province.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {province.label}
                            </CommandItem>
                        ))}
                    </CommandList>
                </CommandGroup>
            </Command>
        </PopoverContent>
    </Popover>
    <Popover open={opencom} onOpenChange={setOpenCom}>
        <PopoverTrigger asChild>
            <Button
                variant="outline"
                role="combobox"
                aria-expanded={opendis}
                className="w-[200px] justify-between"
            >
                {
                valuecom
                    ? provinces.find((district) => district.value === valuecom)?.label
                    : "Select commune..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
            <Command>
                <CommandInput placeholder="Search province..." />
                <CommandEmpty>No commune found.</CommandEmpty>
                <CommandGroup>
                    <CommandList>
                        {provinces.map((province) => (
                            <CommandItem
                                key={province.value}
                                value={province.value}
                                onSelect={(currentValue) => {
                                    setValueDis(currentValue === valuedis ? "" : currentValue)
                                    setOpenDis(false)
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        valuedis === province.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {province.label}
                            </CommandItem>
                        ))}
                    </CommandList>
                </CommandGroup>
            </Command>
        </PopoverContent>
    </Popover>
    <Input placeholder="Duong va so nha">
    
    </Input>
    </>
    )
}

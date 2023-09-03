'use client'
import { useState } from "react";
import { Select, MenuItem } from "@mui/material";
import { obj } from './ApexConstant';

type DropDownProps = {
    handleCandle: (value: string) => void;
}

const DropDown = ({ handleCandle }: DropDownProps) => {
    const [show, setShow] = useState<boolean>(false);
    const [value1, setValue] = useState<string>('5m');
    const handleClick = () => {
        setShow(!show);
    }

    const handleSelectChange = (e: any) => {
        setShow(false);
        setValue(e.target.value);
        handleCandle(e.target.value);
    }

    return (
        <div className="dropDownContainer">
            {!show ? <button className='dropDownButton' onClick={() => handleClick()}>{value1}</button> : (show && <Select onChange={(e) => handleSelectChange(e)}
                sx={{
                    backgroundColor: 'lightgrey'
                }}
            >
                {obj.map((item, index) => {
                    return (
                        <MenuItem key={index} value={item}>{item}</MenuItem>
                    )
                })}
            </Select>)}
        </div>
    )
}
export default DropDown
'use client'
import { useState } from "react";
import { Select, MenuItem } from "@mui/material";

type DropDownProps = {
    handleCandle: (value: string) => void;
}

const DropDown = ({ handleCandle }: DropDownProps) => {
    const [show, setShow] = useState(false);
    const [value1, setValue] = useState('5m');
    const obj = ['1m', '5m', '15m', '30m', '1h', '3h', '4h', '6h', '12h', '1D', '1W', '1M']

    const handleClick = () => {
        setShow(!show);
    }

    const handleSelectChange = (e: any) => {
        console.log('nana', e.target.value);
        setShow(false);
        setValue(e.target.value);
        handleCandle(e.target.value);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {!show && <button style={{ width: '50px', height: '50px', backgroundColor: 'lightgrey' }} onClick={() => handleClick()}>{value1}</button>}
            {show && <Select onChange={(e) => handleSelectChange(e)}
                sx={{
                    width: 250,
                    height: 50,
                    color: 'white',
                    backgroundColor: 'white'
                }}
            >
                {obj.map((item, index) => {
                    return (
                        <MenuItem key={index} value={item}>{item}</MenuItem>
                    )
                })}
            </Select>}
        </div>
    )
}
export default DropDown
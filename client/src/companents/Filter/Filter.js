import { useState } from 'react';
import style from './style.module.css'
import getItemsList from '../Preview/Preview'
import { Button, FormControl, InputBase, InputLabel, MenuItem, Select, } from '@mui/material';





function Filter({ getItemsList }) {
    const [selectValue, setSelectValue] = useState({
        select: '',
        value: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (value === null) window.location.reload();
        setSelectValue({ ...selectValue, [name]: value });
        console.log(selectValue);
    };

    const handleSubmit = async () => {
        getItemsList([])
        const { result } = await getItemsList(selectValue);
        getItemsList(result);
    };


    return (
        <>
            <div className={style.header}>
               

                <FormControl className={style.formControl}>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Select
                    </InputLabel>
                    <Select className={style.select}
                        label="Select"
                        value={selectValue ? selectValue.select : null}
                        onChange={(event) => setSelectValue({ ...selectValue, select: event.target.value })}
                        clearable
                    >
                        <MenuItem value={"all"}><em>All</em></MenuItem>
                        <MenuItem value={'price'}>Price</MenuItem>
                        <MenuItem value={'product'}>Product</MenuItem>
                        <MenuItem value={'brand'}>Brand</MenuItem>
                    </Select>
                </FormControl>

                <InputBase
                    name="value"
                    onChange={handleChange}
                    placeholder="Value"
                />

                <Button onClick={handleSubmit} >GET</Button>

            </div>
        </>
    )
}

export default Filter;
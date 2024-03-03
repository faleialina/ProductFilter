import style from './style.module.css'
import Pagination from '@mui/material/Pagination';
import { useEffect, useState } from 'react';
import md5 from "md5";

function Preview() {

    const [page, setPage] = useState(1);
    const [countPage] = useState(50);
    const [listItems, setListItems] = useState([]);

    const lastIndex = page * countPage;
    const firstIndex = lastIndex - countPage;



    const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");

    const hash = md5(`Valantis_${stamp}`);

    const getItemsList = async () => {
        try {
            const objectToSerwerAuth = {
                "action": "get_items",
                "params": { "ids": ['1789ecf3-f81c-4f49-ada2-83804dcc74b0', '2b7c7643-6852-4562-8a72-7666c72b3518', '9f2722a8-dac6-4f71-b877-1731d30ae6db'] }
                // "params": {"offset": 10, "limit": 3}
            };
            const response = await fetch('http://api.valantis.store:40000', {
                method: 'POST',
                body: JSON.stringify(objectToSerwerAuth),
                headers: {
                    'Content-Type': 'application/json',
                    "X-Auth": hash
                }
            });
            const res = (await response.json()).result;
            console.log(res);

            setListItems(res);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {

        getItemsList();

    }, []);



    const res = listItems.map((elem, i) => <div>
        <div className={style.wrapper}>
            <div className={style.info}>
                <h1 className={style.item}>{elem.product}</h1>
                <p className={style.text}>id:  {elem.id}</p>
                <p className={style.text}>brand: {elem.brand}</p>
                <p className={style.text}>price: {elem.price}</p>
            </div>
        </div>
    </div>)
    const currentIndex = res.slice(firstIndex, lastIndex);

    return (
        <div>

            <div className={style.header}>
                <div className={style.img}></div>
                <h1>Product</h1>
            </div>

            <div className={style.main}>
                {currentIndex}
            </div>


            <Pagination count={listItems.length / countPage} page={page} onChange={(_, num) => setPage(num)} className={style.pagination} />

        </div>
    )
}
export default Preview;
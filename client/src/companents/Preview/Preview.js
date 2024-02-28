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





    useEffect(() => {
        const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");

        const hash = md5(`Valantis_${stamp}`);
        const getItemsList = async () => {
            try {
                const objectToSerwerAuth = {
                    "action": "get_items",
                    "params": { "ids": ["1789ecf3-f81c-4f49-ada2-83804dcc74b0"] }
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

                console.log(response.status);
                console.log(await response.json());
                setListItems(await response.json());

            } catch (err) {
                console.log(err);
            }
        };
        getItemsList();
    }, []);



    const res = listItems.map(elem => <div>
        <div className={style.wrapper}>
            <div className={style.info}>
                <h1 className={style.item}>{elem.product}</h1>
                <p className={style.text}>{elem.id}</p>
                <p className={style.text}>{elem.brand}</p>
                <p className={style.text}>{elem.price}</p>
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
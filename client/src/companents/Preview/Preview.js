import style from './style.module.css'
import Pagination from '@mui/material/Pagination';
import { useEffect, useState } from 'react';
import md5 from "md5";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Filter from '../Filter/Filter';

function Preview() {

    const [page, setPage] = useState(1);
    const [countPage] = useState(50);
    const [listItems, setListItems] = useState([]);

    const lastIndex = Math.ceil(page * countPage);
    const firstIndex = Math.ceil(lastIndex - countPage);


    const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");

    const hash = md5(`Valantis_${stamp}`);

    const obtainingAllId = async () => {
        try {
            const response = await fetch('http://api.valantis.store:40000', {
                method: 'POST',
                body: JSON.stringify({
                    action: "get_ids",
                    params: { "offset": 0, "limit": null }
                }),
                headers: {
                    'Content-Type': 'application/json',
                    "X-Auth": hash
                }
            });
            const res = (await response.json()).result;
            return res

        } catch (err) {
            console.log(err);
        }
    };

    const filteredList = async (req) => {
        try {
            if (req.select === 'price') req.value = parseInt(req.value)
            if (req.select === 'all') window.location.reload();
            const objectToSerwerAuth = {
                "action": "filter",
                "params": { [req.select]: req.value }
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
            return res

        } catch (err) {
            console.log(err);
        }
    };

    const getItemsList = async (req) => {
        try {
            const objectToSerwerAuth = {
                "action": "get_items",
                "params": { "ids": req === undefined ? await obtainingAllId() : await filteredList(req) }
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





    return (
        <div>

            <div className={style.header}>
                <div className={style.img}></div>
                <h1>Product</h1>
            </div>
            <Filter getItemsList={getItemsList} />
            <div className={style.header}>
                <TableContainer >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>

                                <TableCell >id</TableCell>
                                <TableCell>product</TableCell>
                                <TableCell>brand</TableCell>
                                <TableCell>price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listItems.map((elem, i) => (
                                <TableRow
                                    key={elem.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >

                                    <TableCell>{elem.id}</TableCell>
                                    <TableCell>{elem.product}</TableCell>
                                    <TableCell>{elem.brand}</TableCell>
                                    <TableCell>{elem.price}</TableCell>
                                </TableRow>
                            )).slice(firstIndex, lastIndex)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>



            <Pagination count={Math.ceil(listItems.length / countPage)} page={page} onChange={(_, num) => setPage(num)} className={style.pagination} />

        </div>
    )
}
export default Preview;
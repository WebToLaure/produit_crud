import { useState } from 'react';


export default function Product(props: any) {

    const [nomInput, setNomInput] = useState<string>("");
    const [priceInput, setPriceInput] = useState<string>("");
    const [quantityInput, setQuantityInput] = useState<string>("");
    const [showInput, setShowInput] = useState(false);

    async function patchProduct() {
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

                nom: nomInput,
                price: priceInput,
                quantity: quantityInput
            })
        };

        const response = await fetch(`http://localhost:8000/products/${props.item.id}`, requestOptions)
        const responseJson = await response.json();

        if (responseJson.statusCode === 200) {
            props.patch(responseJson.data)
            setShowInput(false);
        };
    }
    async function deleteProduct() {

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };

        const response = await fetch(`http://localhost:8000/products/${props.item.id}`, requestOptions)
        const responseJson = await response.json()
        console.log("Success!", responseJson);

        if (responseJson.statusCode === 200) {

            props.del(props.item.id)
        }
    };
    function update() {
        setShowInput(true)
    };

    return (

        <tr>
            <td scope="col">#</td>

            <td scope="col">{props.item?.nom}</td>

            <td scope="col">{props.item?.price}</td>
            <td scope="col">{props.item?.quantity}</td>
            <td scope="col">
                <button onClick={update} type="button" className="btn btn-outline-warning btn-rounded-floating ms-1" data-mdb-ripple-color="dark" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                    </svg>

                </button>
                <button onClick={deleteProduct} type="button" className="btn btn-outline-danger btn-rounded-floating ms-1" data-mdb-ripple-color="dark" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                    </svg>
                </button>
            </td>



            <td scope="col" >

                {showInput && <div>
                    <hr />
                    <input type='text' className="form-control" value={nomInput} placeholder="Modifiez le nom de votre produit" onChange={(event) => setNomInput(event.target.value)} aria-label="Recipient's username" aria-describedby="button-addon2"></input>
                    <input type='text' className="form-control" value={priceInput} placeholder="Modifiez le prix de votre produit" onChange={(event) => setPriceInput(event.target.value)} aria-label="Recipient's username" aria-describedby="button-addon2"></input>
                    <input type='text' className="form-control" value={quantityInput} placeholder="Modifiez la quantité stockée" onChange={(event) => setQuantityInput(event.target.value)} aria-label="Recipient's username" aria-describedby="button-addon2"></input>
                    <button onClick={patchProduct} type="button" className="btn btn-outline-success btn-sm" data-mdb-ripple-color="dark" >
                        <i className="bi bi-check-circle-fill"></i>
                    </button>
                </div>}
            </td>

        </tr>

    )


}
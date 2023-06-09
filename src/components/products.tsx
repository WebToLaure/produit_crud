import { useState, useEffect } from 'react';
import Product from '../components/product';
import '../App.css'




type TProduct = {
    id: number,
    nom: string,
    price: number,
    quantity: number,
}
export default function Products() {

    const [products, setProducts] = useState<TProduct[]>([]);
    const [nomInput, setNomInput] = useState<string>("");
    const [priceInput, setPriceInput] = useState<number>();
    const [quantityInput, setQuantityInput] = useState<number>();
    const [showInput, setShowInput] = useState(false);

    async function addProduct() {

        const requestOptions = {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nom: nomInput,
                price: priceInput,
                quantity: quantityInput
            })
        };
        console.log(requestOptions);
        const response = await fetch('http://localhost:8000/products/', requestOptions)
        const responseJson = await response.json();


        setProducts([...products, responseJson.data]);
        setNomInput("");
        setPriceInput(0);
        setQuantityInput(0);
        setShowInput(false);
    }

    async function getProducts() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }

        const response = await fetch('http://localhost:8000/products', requestOptions)
        const responseJson = await response.json();
        setProducts(responseJson.data);
    };

    useEffect(() => {
        getProducts();
    }, []);


    function patchProduct(item: TProduct) {
        const index = products.findIndex(product => product.id === item.id);
        products[index] = item;
        setProducts([...products]);

    }

    function deleteProduct(id: number) {
        const newProduct = products.filter(item => item.id !== id);
        setProducts(newProduct);
    }

    function add() {
        setShowInput(!showInput)
    }
    /* function update() {
        setShowInput(true)
    }; */

    const listOfProducts = products?.map(item => <Product del={deleteProduct} patch={patchProduct} item={item} key={item.id} />)
    console.log(listOfProducts, "test1");


    return (

        <>
            {/* <!-- Add Product button --> */}
            <button onClick={add} type="button" className="btn btn-dark btn-sm mt-4 ms-3" data-mdb-ripple-color="dark"> Ajouter un produit</button>

            {showInput && <fieldset className="form-floating mb-3">
                <legend>Ajout d'un produit</legend>
                <p>
                    <label htmlFor='nom'> Nom du produit</label>
                    <input type='text' className="form-control bg-light" value={nomInput} placeholder="Nom du Produit" onChange={(event) => setNomInput(event.target.value)} aria-label="Recipient's username" aria-describedby="button-addon2" autoFocus></input>
                </p>
                <p>
                    <label htmlFor='nom'> Prix unitaire</label>
                    <input type='text' className="form-control bg-light" value={priceInput} placeholder="Prix unitaire" onChange={(event) => setPriceInput(+event.target.value)} aria-label="Recipient's username" aria-describedby="button-addon2"></input>
                </p>
                <p>
                    <label htmlFor='nom'> Quantité</label>
                    <input type='text' className="form-control bg-light" value={quantityInput} placeholder="Quantité" onChange={(event) => setQuantityInput(+event.target.value)} aria-label="Recipient's username" aria-describedby="button-addon2"></input>
                </p>
                <button onClick={() => addProduct()} type="button" className="btn btn-light" data-mdb-ripple-color="dark">
                    Valider
                </button>
            </fieldset>}


            {/* get AllProducts */}

            <table className="table table-dark mt-2 me-4">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Prix</th>
                        <th scope="col">Quantité</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>

                    {listOfProducts}

                </tbody>
            </table>
        </>

    )

}
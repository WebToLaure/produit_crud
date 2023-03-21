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
    const [priceInput, setPriceInput] = useState<string>("");
    const [quantityInput, setQuantityInput] = useState<string>("");
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

        const response = await fetch('http://localhost:8000/products/', requestOptions)
        const responseJson = await response.json();
        setProducts([...products, responseJson.data]);
        setNomInput("");
        setPriceInput("");
        setQuantityInput("");
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
        const index = products.findIndex(elm => elm.id === item.id);
        products[index] = item;
        setProducts({ ...products });

    }

    function deleteProduct(id: number) {
        const newProduct = products.filter(item => item.id !== id);
        setProducts(newProduct);
    }

    function add() {
        setShowInput(true)
    }
    /* function update() {
        setShowInput(true)
    }; */

    const listOfProducts = products?.map(item => <Product del={deleteProduct} patch={patchProduct} item={item} key={item.id} />)
    console.log(listOfProducts, "test1");


    return (

        <div>
            {/* <!-- Add Product button --> */}
            <button onClick={add} type="button" className="btn btn-primary btn-sm mt-4" data-mdb-ripple-color="dark"> Ajouter un produit</button>

            {showInput && <div>
                <input type='text' className="form-control" value={nomInput} placeholder="Nom du Produit" onChange={(event) => setNomInput(event.target.value)} aria-label="Recipient's username" aria-describedby="button-addon2"></input>
                <input type='text' className="form-control" value={priceInput} placeholder="Montant unitaire" onChange={(event) => setPriceInput(event.target.value)} aria-label="Recipient's username" aria-describedby="button-addon2"></input>
                <input type='text' className="form-control" value={quantityInput} placeholder="Quantité" onChange={(event) => setQuantityInput(event.target.value)} aria-label="Recipient's username" aria-describedby="button-addon2"></input>
                <button onClick={() => addProduct()} type="button" className="btn btn-primary" data-mdb-ripple-color="dark">
                    Ajouter
                </button>
            </div>}


            {/* get AllProducts */}
            <div className="table-responsive">
                <table className="table mt-4">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
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
            </div>
        </div>
    )

}
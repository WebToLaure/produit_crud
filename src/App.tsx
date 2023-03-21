import './App.css';
import Products from './components/products';

function App() {
  return (
    <>
      <h3 className="title bg-dark">Produits</h3>
      <div className="container" id="containerAccueil">
        <Products></Products>
      </div>
    </>

  );
}

export default App;

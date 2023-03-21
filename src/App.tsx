import './App.css';
import Products from './components/products';

function App() {
  return (
    <div className="CvAccueil">
      <h3 className="title bg-primary">Produits</h3>
      <div className="container" id="containerAccueil">
        <Products></Products>
      </div>
    </div>

  );
}

export default App;

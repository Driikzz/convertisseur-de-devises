import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // j'ai déclaré toutes mes variables avec useState car c'est une variable qui peut changer dynamiquement
  const [montant, setMontant] = useState(0);
  const [devise1, setDevise1] = useState("EUR");
  const [devise2, setDevise2] = useState("USD");
  const [resultat, setResultat] = useState(0);

  // j'ai utilisé useEffect pour convertir les devises automatiquement lorsque le montant, la devise1 ou la devise2 change
  useEffect(() => {
    convertir();
  }, [montant, devise1, devise2]);

  function convertir() {
    if (devise1 === devise2) {
      setResultat(montant);
      return;
    }
    
    if (devise1 === "EUR" && devise2 === "USD") {
      setResultat((montant * 1.09).toFixed(2));
    } else if (devise1 === "USD" && devise2 === "EUR") {
      setResultat((montant * 0.92).toFixed(2));
    }
  }

  // j'ai préférer utiliser une fonction qui convertie "automatiquement" les devises au lieu de cliquer sur un bouton pour convertir mes devises
  // en utlisant le onChange, je peux modifier mes variables directement dans le champs de texte et cela convertie automatiquement mes devises
  function onChange(event) {
    const valeur = event.target.value;
    const nom = event.target.name;

    if (nom === "montant") setMontant(valeur);
    if (nom === "devise1") setDevise1(valeur);
    if (nom === "devise2") setDevise2(valeur);
  }

  // fonction qui permet juste d'inverser les devises
  function inverserDevises() {
    const temp = devise1;
    setDevise1(devise2);
    setDevise2(temp);
  }
  // j'ai préféré ne pas faire en sémentique car ce n'était pas noté dans l'exercice < il fallait le faire ? >
  return (
    <div className="app-container">
      <h1>Convertisseur de Devises</h1>
      <div className="container">
        <div className="converter-form">
          <input
            type="number"
            name="montant"
            value={montant}
            onChange={onChange}
            placeholder="Entrez le montant"
          />
          
          <div className="currency-row">
            <select 
              name="devise1" 
              value={devise1} 
              onChange={onChange}
              className="currency-select"
            >
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
            </select>
            
            <button 
              className="swap-button" 
              onClick={inverserDevises} 
              title="Inverser les devises"
            >
              <span className="swap-icon">↔</span>
            </button>
            
            <select 
              name="devise2" 
              value={devise2} 
              onChange={onChange}
              className="currency-select"
            >
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
            </select>
          </div>
          
          <p>
            {resultat} {devise2}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

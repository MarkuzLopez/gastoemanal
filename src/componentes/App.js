import React, { Component } from 'react';
import '../css/App.css';
import Header from './Header';
import Formulario from './Formulario';
import Listado from './Listado';
import {validarPresupuesto} from '../helper';
import ControlPresupuesto from './ControlPresupuesto';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      presupuesto: '',
      restante: '',
      gastos: {

      }
    }
  }

  componentDidMount() { 
      this.obtenerPresupuesto();
  }

  obtenerPresupuesto = () => { 
    let presupuesto = prompt('Cual es el presupuesto?');    
    
    let resultado =  validarPresupuesto(presupuesto);
    if(resultado) { 
      this.setState({ 
        presupuesto: presupuesto,
        restante: presupuesto
      })     
    } else { 
      console.log('presupuesto no valido');      
    }
  }



  // agregar un nuevo gasto al state

  agregarGasto = gasto => {

    // tomar una coppia del state actual 
    const gastos = { ...this.state.gastos }

    // agregar al gasto al objeto  del state 
    gastos[`gasto${Date.now()}`] = gasto;


    // restar el presupuesto 
    this.restarPresupuesto(gasto.cantidadGasto)

    // ponerlo en state  
    this.setState({
      gastos
    })

  }

  /// Restar del presupuesto cuando un gasto se crea
  restarPresupuesto = cantidad => { 
    // leer el gasnto
    let restar = Number(cantidad);

    // tomar una copia del State actual
    let restante =  this.state.restante;      
      
    // lo restamos 
    restante -= restar;
    
    restante =  String(restante);

    // agregamos el  uevo state  
    this.setState({ 
      restante
    })
  }


  render() {
    return (
      <div className="App containter">
        <Header
          titulo='Gasto Semanal'
        />
        <div className="contenido-principal contenido">
          <div className="row" >
            <div className="one-half column">
              <Formulario
                agregarGasto={this.agregarGasto}
              />
            </div>
            <div className="one-half column" >
              <Listado
                gastos={this.state.gastos}
              />
              <ControlPresupuesto 
                presupuesto = {this.state.presupuesto}
                restante = {this.state.restante}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

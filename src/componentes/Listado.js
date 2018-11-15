import React, { Component } from 'react';
import Gasto from './Gasto';
import PropTypes from 'prop-types';

class Listado extends Component {
    render() {
        return (
            <div className="gastos-realizados">
                <h2>LISTADO</h2>
                {
                    /// Object sirve para obtener la llave  y el map para iterarlo  
                    Object.keys(this.props.gastos).map(key => (
                        <Gasto
                            key={key}
                            gasto={this.props.gastos[key]}
                        />
                    ))
                }
            </div>
        )
    }
}

Listado.propTypes = { 
    gastos: PropTypes.object.isRequired
}

export default Listado;
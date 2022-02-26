import React, { useState } from 'react'
import { nanoid } from 'nanoid'
function App() {
  const [tarea, setTarea] = useState('');
  const [tareas, setTareas] = useState([]);
  const [modoEdicion, setMododEdicion] = useState(false);
  const [id, setId] = useState('');
  const [error, setError] = useState(null);

  const agregarTarea = (e) =>{
    e.preventDefault();
    if(!tarea.trim()){
      setError('Escriba algo por favor');
      return
    }
    console.log(tarea);
    setTareas([
      ...tareas,
      {id: nanoid(10) ,nombreTarea:tarea}
    ])
    setTarea('');
    setError(null);
  }
  const eliminarTarea = (id) => {
    const arrayFiltrado = tareas.filter((item) =>{
      return item.id !== id
    });
    setTareas(arrayFiltrado);
  }

  const editar = (item) => {
    setMododEdicion(true);
    setTarea(item.nombreTarea);
    setId(item.id);
  }
  const editarTarea = (e) =>{
    e.preventDefault();
    if(!tarea.trim()){
      setError('Escriba algo por favor');
      return
    }
    const arrayEditado = tareas.map(item => item.id === id ? {id: id, nombreTarea: tarea} : item);
    setTareas(arrayEditado);
    setMododEdicion(false);
    setTarea('');
    setId('');
    setError(null);
  }
  return (
    <div className="container mt-5">
      <h1 className="text-center">CRUD - Hecho por Juan Nicolas Hernandez Chavez</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">
            {

              tareas.length === 0 ? (
                <li className='list-group-item'>No hay tareas</li>  
              ):(
                tareas.map((item) =>{
                  return <li key={ item.id } className="list-group-item">
                    <span className="lead">{ item.nombreTarea }</span>
                    <button 
                      className="btn btn-danger btn-sm float-end mx-2"
                      onClick={ () => eliminarTarea(item.id) }
                    >
                      Eliminar
                    </button>
                    <button 
                      className="btn btn-warning btn-sm float-end"
                      onClick={ () => editar(item) }
                    >
                      Editar
                    </button>
                  </li>
                })
              )
            }
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {
              modoEdicion ? 'Editar Tareas' : 'Agregar Tarea'
            }
          </h4>
          <form onSubmit={ modoEdicion ? editarTarea : agregarTarea } >
            {
              error ? <span className='text-danger'>{ error }</span> : null 
            }
            <input
              type="text" 
              className="form-control mb-2" 
              placeholder="Ingrese la tarea"
              onChange={ e => setTarea(e.target.value) }
              value = { tarea }
            />
            {/* Para devolver un HTML se debe hacer dentro de unos parentesis */}
            <div className='d-grid'>
              {
                modoEdicion ? (
                  <button className="btn btn-warning" type="submit">Editar</button>
                ) : (
                  <button className="btn btn-dark" type="submit">Agregar</button>
                )
              }

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default App;

import { useState } from 'react';
import './App.css';
import Login from './components/Login';

const initialUsers = [
  {
    id: 1,
    name: 'Ruddy',
    lastName: 'García',
    age: 27,
  },
  {
    id: 2,
    name: 'Alex',
    lastName: 'González',
    age: 20,
  },
  {
    id: 3,
    name: 'Jhon',
    lastName: 'Doe',
    age: 20,
  },
];

function App() {
  const [aUsers, setUsers] = useState(initialUsers);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [form, setForm] = useState({
    name: '',
    lastName: '',
    age: null,
  });
  const [screen] = useState('Inicio');

  const renderUsers = () =>
    aUsers.map(oUser => (
      <tr key={oUser.id}>
        <td>{oUser.name}</td>
        <td>{oUser.lastName}</td>
        <td>{oUser.age}</td>
        <td>
          <button onClick={() => handleEdit(oUser.id)}>Editar</button>
          <button onClick={() => handleDelete(oUser.id)}>Quitar</button>
        </td>
      </tr>
    ));

  const handleAdd = () => {
    let aTemp = [...aUsers];

    const maxId1 = aTemp.reduce((anterior, actual) => {
      return anterior.id > actual.id ? anterior.id : actual.id;
    });

    aTemp.push({
      ...form,
      id: maxId1 + 1,
    });

    setUsers(aTemp);
    resetForm();
  };

  const handleDelete = id => {
    setUsers(aUsers.filter(obj => obj.id !== id));
  };

  const resetForm = () => {
    // Creo que no es la forma ideal pero de momento es lo que se me ocurre
    document.getElementById('formulario').reset();
  };

  const handleEdit = id => {
    // TODO Validar que haya datos en el formulario
    const index = aUsers.findIndex(obj => obj.id === id);
    const aTemp = [...aUsers];
    aTemp[index] = {
      id,
      ...form,
    };
    setUsers(aTemp);
    resetForm();
  };

  const handleInputChange = event => {
    const { target } = event;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        {screen}
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div>
            <table border={1}>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Edad</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>{renderUsers()}</tbody>
            </table>
          </div>
          <div>
            <form id="formulario">
              <div className="margin-5">
                <label>Nombre</label>
                <input name="name" onChange={handleInputChange} type="text" />
              </div>
              <div className="margin-5">
                <label>Apellido</label>
                <input
                  name="lastName"
                  onChange={handleInputChange}
                  type="text"
                />
              </div>
              <div className="margin-5">
                <label>Edad</label>
                <input name="age" onChange={handleInputChange} type="text" />
              </div>
              <button onClick={handleAdd} type="button">
                Agregar
              </button>
            </form>
          </div>
        </div>
        <Login user={user} setUser={setUser} />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

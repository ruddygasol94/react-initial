import PropTypes from 'prop-types';

const Login = ({ user, setUser }) => {
  const handleInputChange = event => {
    const { target } = event;
    const { name, value } = target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <input
        type="email"
        name="email"
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        onChange={handleInputChange}
      />
      <button onClick={() => console.log(user)}>Save</button>
    </div>
  );
};

Login.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default Login;

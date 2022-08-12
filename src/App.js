import { useState } from 'react';
import { Button, Form, Input, Layout, Modal, Table } from 'antd';

const { Content, Header, Sider } = Layout;

const initialUsers = [
  {
    id: 1,
    name: "Ruddy",
    lastName: "García",
    age: 27,
  },
  {
    id: 2,
    name: "Alex",
    lastName: "González",
    age: 20,
  },
  {
    id: 3,
    name: "Jhon",
    lastName: "Doe",
    age: 20,
  },
];

function App() {
  const [aUsers, setUsers] = useState(initialUsers);
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({
    name: '',
    lastName: '',
    age: null,
  });
  const [formRef] = Form.useForm();

  const aColumns = [
    {
      dataIndex: 'id',
      key: 'id',
      title: 'ID',
    },
    {
      dataIndex: 'name',
      key: 'name',
      title: 'Nombre',
    },
    {
      dataIndex: 'lastName',
      key: 'lastName',
      title: 'Apellidos',
    },
    {
      dataIndex: 'age',
      key: 'age',
      title: 'Edad',
    },
    {
      dataIndex: 'id',
      key: 'actions',
      title: 'Acciones',
      render: sId => (
        <div>
          <Button onClick={() => handleEdit(sId)}>Editar</Button>
          <Button onClick={() => handleDelete(sId)}>Eliminar</Button>
        </div>
      ),
    }
  ];

  const handleDelete = (id) => {
    setUsers(aUsers.filter((obj) => obj.id !== id));
  };

  const handleEdit = (id) => {
    // TODO ajustar edición con formulario en modal
    const index = aUsers.findIndex((obj) => obj.id === id);
    const aTemp = [...aUsers];
    let edit = { ...aTemp[index] };

    // Solo remplazar los valores que tengan algo en el form
    const keys = Object.keys(form);
    keys.forEach((key) => {
      if (form[key] !== '' && form[key] !== null) {
        edit[key] = form[key];
      }
    });
    aTemp[index] = {
      ...edit,
    };

    setUsers(aTemp);
    formRef.resetFields();
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const onFinish = values => {
    let aTemp = [...aUsers];

    // validar si el registro tiene id
    // En caso de que tenga, buscar su posición en aTemp y reemplazar valor
    // Caso contrario, lógica actual para inserta
    const maxId1 = aTemp.reduce((anterior, actual) => {
      return anterior.id > actual.id ? anterior.id : actual.id;
    });
    aTemp.push({
      ...values,
      id: maxId1 + 1,
    });

    setUsers(aTemp);
    setModalVisible(false);
  };

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Modal
              onCancel={handleCloseModal}
              onOk={() => formRef?.submit()}
              title="Nuevo usuario"
              visible={modalVisible}
            >
              <Form
                name="user-form"
                initialValues={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                autoComplete="off"
                form={formRef}
              >
                <Form.Item
                  label="Nombre"
                  name="name"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input type="text" />
                </Form.Item>
                <Form.Item
                  label="Apellido"
                  name="lastName"
                  rules={[{ required: true, message: 'Please input your last name!' }]}
                >
                  <Input type="text" placeholder="Escribe tu apellido" />
                </Form.Item>
                <Form.Item
                  label="Edad"
                  name="age"
                  rules={[{ required: true, message: 'Please input your last name!' }]}
                  placeholder="Escribe tu apellido"
                >
                  <Input type="number" min={18} max={99} />
                </Form.Item>
              </Form>
            </Modal>
            <div>
              <Button onClick={() => setModalVisible(true)}>Nuevo</Button>
            </div>
            <Table dataSource={aUsers} columns={aColumns} rowKey={oItem => oItem.id} />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;

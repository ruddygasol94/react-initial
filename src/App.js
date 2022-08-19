import { useState } from 'react';
import { Button, Form, Input, Layout, Modal, Table } from 'antd';

const { Content, Header, Sider } = Layout;

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
    },
  ];

  const handleDelete = id => {
    setUsers(aUsers.filter(obj => obj.id !== id));
  };

  const handleEdit = id => {
    setModalVisible(true);

    const index = aUsers.findIndex(obj => obj.id === id);
    let edit = { ...aUsers[index] };
    formRef.setFieldsValue(edit);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    formRef.resetFields();
    setForm({
      name: '',
      lastName: '',
      age: null,
    });
  };

  const onFinish = values => {
    let aTemp = [...aUsers];

    if (values.id === undefined) {
      // Añadir
      const maxId = aTemp.reduce((anterior, actual) => {
        return anterior.id > actual.id ? anterior.id : actual.id;
      });
      aTemp.push({
        ...values,
        id: maxId + 1,
      });
    } else {
      // Editar
      const idx = aTemp.findIndex(obj => obj.id === values.id);
      aTemp[idx] = values;
    }

    setUsers(aTemp);
    setModalVisible(false);
  };

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background"></Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
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
                <Form.Item name="id" hidden="true">
                  <Input type="hidden" />
                </Form.Item>
                <Form.Item
                  label="Nombre"
                  name="name"
                  rules={[
                    { required: true, message: 'Please input your username!' },
                  ]}
                >
                  <Input type="text" />
                </Form.Item>
                <Form.Item
                  label="Apellido"
                  name="lastName"
                  rules={[
                    { required: true, message: 'Please input your last name!' },
                  ]}
                  placeholder="Escribe tu nombre"
                >
                  <Input type="text" placeholder="Escribe tu apellido" />
                </Form.Item>
                <Form.Item
                  label="Edad"
                  name="age"
                  rules={[
                    { required: true, message: 'Please input your last name!' },
                  ]}
                  placeholder="Escribe tu apellido"
                >
                  <Input type="number" min={18} max={99} />
                </Form.Item>
              </Form>
            </Modal>
            <div>
              <Button onClick={() => setModalVisible(true)}>Nuevo</Button>
            </div>
            <Table
              dataSource={aUsers}
              columns={aColumns}
              rowKey={oItem => oItem.id}
            />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;

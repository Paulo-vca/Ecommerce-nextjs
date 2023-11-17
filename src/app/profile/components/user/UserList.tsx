import { Button, Table, message } from 'antd';
import { useEffect, useState } from 'react';
import UserForm from './UserForm';
import axios from 'axios';
import moment from 'moment';

function UserList() {
  const [showUserForm, setShowUserForm] = useState(false);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:3000/product');
      setUser(res.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) => moment(createdAt).format('DD MMM YYYY'),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  return (
    <div>
      <div className="flex justify-end">
        <Button
          type="primary"
          onClick={() => {
            setShowUserForm(true);
          }}
        >
          Add User
        </Button>
      </div>

      <div className="mt-5">
        <Table
          dataSource={user}
          columns={columns}
          loading={loading}
          pagination={false}
        />
      </div>

      {showUserForm && (
        <UserForm
          showUserForm={showUserForm}
          setShowUserForm={setShowUserForm}
          reloadData={() => {}}
        ></UserForm>
      )}
    </div>
  );
}

export default UserList;
import { Button, Table, message } from 'antd';
import { useEffect, useState } from 'react';
import ProductsForm from './ProductsForm';
import axios from 'axios';
import moment from 'moment';

function ProductsList() {
  const [showProductsForm, setShowProductsForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:3000/product');
      setProducts(res.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
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
            setShowProductsForm(true);
          }}
        >
          Add Products
        </Button>
      </div>

      <div className="mt-5">
        <Table
          dataSource={products}
          columns={columns}
          loading={loading}
          pagination={false}
        />
      </div>

      {showProductsForm && (
        <ProductsForm
          showProductsForm={showProductsForm}
          setShowProductsForm={setShowProductsForm}
          reloadData={() => {}}
        ></ProductsForm>
      )}
    </div>
  );
}

export default ProductsList;
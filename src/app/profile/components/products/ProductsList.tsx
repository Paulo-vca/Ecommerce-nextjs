'use client'

import { Button, Table, message } from 'antd';
import { useEffect, useState } from 'react';
import ProductsForm from './ProductsForm';
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router';//next/navigation

function ProductsList() {
  const router = useRouter();
  const [showProductsForm, setShowProductsForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<any>(null)
  const [loadingDelete, setLoadingDelete] = useState(false)


  const getProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:3000/product`);
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

  const onDelete = async (id: string) => {
    try {
      setLoadingDelete(true)
      await axios.delete(`http://localhost:3000/product/${id}`);
      message.success("Products deleted successfully");
      setSelectedProducts(null);
      getProducts();
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoadingDelete(false)
    }
  }

  const columns = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
        <img
          src={record.images[0].url || ""}
          alt={record.name}
          className="w-20 h-20 object-cover rounded-full"
        />
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description: string) => <span>{description}</span>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => <span>{price}</span>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => <span>{price}</span>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => (
        <span>{moment(createdAt).format("DD MMM YYYY hh:mm A")}</span>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (action: any, params: any) => {
        return (
          <div className="flex gap-3 items-center">
            <Button
              type="primary"
              className="mr-2a btn-small"
              onClick={() => {}}
            >
              Edit
            </Button>
            <Button
              type="primary"
              danger
              className="btn-small"
              onClick={() => {}}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ]

  return (
    <div>
      <div className="flex justify-end">
        <Button
          type="primary"
          onClick={() => {
            router.push('/profile/add_product');
          }}
        >
          Add Product
        </Button>
      </div>
        <Table
          dataSource={products}
          columns={columns}
          loading={loading}
          rowKey="_id"
        />
    </div>
  );
}

export default ProductsList;
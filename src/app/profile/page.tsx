'use client';
import React, { useState } from 'react';
import { Tabs, TabsProps } from 'antd';
import CategoriesList from './components/categories/CategoriesList';
import ProductsList from './components/products/ProductsList';
import UserList from './components/user/UserList';
import { useRouter, useSearchParams } from 'next/navigation';

function Profile() {

  const searchParams = useSearchParams()
  const id = searchParams.get("id")

  const [ selectedTab, setSelectedTab] = useState<string>(id || "1")

  const router = useRouter

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Products',
      children: <ProductsList/>,
    },
    {
      key: '2',
      label: 'Categories',
      children: <CategoriesList/>,
    },
    {
      key: '3',
      label: 'Orders',
      children: 'Content of Tab Pane 3',
    },
    {
      key: '4',
      label: 'Users',
      children: <UserList/>,
    },
  ];


  return (
    <div className="p-5">
      <Tabs
      defaultActiveKey="1"
      items={items}
      onChange={(key) => {
        router.push(`/profile?id=${key}`);
        setSelectedTab(key);
      }}
      activeKey={selectedTab}
      ></Tabs>
    </div>
  );
}

export default Profile;
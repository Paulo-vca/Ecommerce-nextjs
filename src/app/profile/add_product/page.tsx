
import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router'; // Corrigindo a importação para useRouter
import { message } from 'antd';
import axios from 'axios';


function AddProduct() {
  const [selectedFiles, setSelectedFiles] = useState([]); // Corrigindo a inicialização do state
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // interface AddFormProps para o formulário de adição de produto
  interface AddFormProps {
    name: string;
    description: string;
    price: number;
    categoryId: string; // Ou o tipo apropriado para o ID da categoria
    stock: number;
    // Adicione outros campos conforme necessário para o seu formulário
  }

  // Função para salvar o produto com imagens
  const onSave = async (values: AddFormProps) => {
    try {
      setLoading(true);
      const imgUrls = await uploadImageAndReturnUrls(selectedFiles);
      values.price = Number(values.price);
      values.stock = Number(values.stock);
      values.categoryId = Number(values.categoryId);


      //save product info
      const respProduct = await axios.post(`${process.env.DOMAIN}/product`,
      values
      );


      if(imgUrls && imgUrls.length > 0){
        imgUrls.forEach((img) => {
          const imgForm: ImgFormProps = {
            url: img,
            productId: respProduct.data.id
          };

          axios.post(`${process.env.DOMAIN}/image`, imgForm)
          //axios.post('http://localhost:3000/image', imgForm);

        });
      }

      message.success('Product saved successfully');
      //console.log(respProduct)

      // tendo o id do produto fazer um POST em images com as urls e id do produto

    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <div className="m-10">
      <h1 className="text-2xl font-bold text-gray-800">Add Product</h1>
      <hr />

      <ProductForm
        setSelectedFiles={setSelectedFiles} // Corrigindo a passagem da prop
        loading={loading}
        onSave={onSave}
      />
    </div>
  );
}

export default AddProduct;















// function AddProduct(){
//   const [selectedFiles = [], setSelectedFiles] = useState([]);


// }

// const onSave = async (values: AddFormProps) => {
//   try {
//     setLoading(true);
//     const imgUrls = await uploadImageAndReturnUrls(selectedFiles);
//     values.price = Number(values.price)
//     values.stock = Number(values.stock)
//     values.categoryId = Number(values.categoryId)

//     //save product info
//     const respProduct = await axios.post(
//       'http://localhost',values
//     );


//     console.log(respProduct)
//     //tendo o ID do product fazer um POST em images com as URLs e ID de produto


//   } catch (error: any) {

//   }
// }
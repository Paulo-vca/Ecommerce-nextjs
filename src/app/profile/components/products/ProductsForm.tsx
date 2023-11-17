import { getAntdFieldsRequireRule } from "@/helpers/validations";
import { Form, Modal, message } from "antd"
import axios from "axios";

type ProductsFormData = {
  name: string;
  picture: string;
  description: string;
}

function ProductsForm({
  showProductsForm,
  setShowProductsForm,
  reloadData,
}: ProductsFormProps) {

  const[form] = Form.useForm()

  const onFinish = async(values: ProductsFormData) => {
    try{
      const res = await axios.post("http://localhost:3000/category", values)
      message.success("Category added successfully")
      reloadData();
      setShowProductsForm(false)
    } catch(error: any){
      message.error(error.message)
    }
  }

  return(
    <Modal
      title = {<h1 className="text-2xl font-bold text-gray-800"> Add Product(s) </h1>}
      open = {showProductsForm}
      onCancel={() => {
        setShowProductsForm(false)
      }}
      centered
      closable={false}
      okText="Save"
      onOk={() => {
        form.submit();
      }}
    >

    <Form layout="vertical" className="flex flex-col gap-5" form={form} onFinish={onFinish}>
      <Form.Item
      label="Products Name"
      name="name"
      rules={getAntdFieldsRequireRule('Products name is required!')}
      >
        <input type="text" />
      </Form.Item>

      <Form.Item
      label="Description"
      name="description"
      rules={getAntdFieldsRequireRule('Category description is required!')}
      >
        <textarea />
      </Form.Item>

    </Form>

    </Modal>
  )
}
export default ProductsForm

interface ProductsFormProps{
  showProductsForm: boolean;
  setShowProductsForm: (show: boolean) => void;
  reloadData: () => void;

}
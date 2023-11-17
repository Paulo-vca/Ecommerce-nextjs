import { getAntdFieldsRequireRule } from "@/helpers/validations";
import { Form, Modal, message } from "antd"
import axios from "axios";

type UserFormData = {
  name: string;
  picture: string;
  description: string;
}

function UserForm({
  showUserForm,
  setShowUserForm,
  reloadData,
}: UserFormProps) {

  const[form] = Form.useForm()

  const onFinish = async(values: UserFormData) => {
    try{
      const res = await axios.post("http://localhost:3000/category", values)
      message.success("Category added successfully")
      reloadData();
      setShowUserForm(false)
    } catch(error: any){
      message.error(error.message)
    }
  }

  return(
    <Modal
      title = {<h1 className="text-2xl font-bold text-gray-800"> Add Product(s) </h1>}
      open = {showUserForm}
      onCancel={() => {
        setShowUserForm(false)
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
      label="User Name"
      name="name"
      rules={getAntdFieldsRequireRule('User name is required!')}
      >
        <input type="text" />
      </Form.Item>

      <Form.Item
      label="Description"
      name="description"
      rules={getAntdFieldsRequireRule('User description is required!')}
      >
        <textarea />
      </Form.Item>

    </Form>

    </Modal>
  )
}
export default UserForm

interface UserFormProps{
  showUserForm: boolean;
  setShowUserForm: (show: boolean) => void;
  reloadData: () => void;

}
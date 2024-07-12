import React, { useEffect, useState } from 'react';
import {
  Button,
  Form,
  Input,
  Select,
  Breadcrumb,
  Space, Table, Popconfirm
} from 'antd';
import { getBookListAPI, getResultAPI, deleteBookAPI} from '../../api/book';
import {useNavigate, Link} from 'react-router-dom'


const { Column } = Table;




const Book = () => {
  // const [req,setReq] = useState([])

  const [list,setlist] = useState([])
  const [count,setCount] = useState(0)

  useEffect(()=>{
    const getlist = async () => {
      const res = await getBookListAPI()
      setCount(res.data.data.length)
      setlist(res.data.data)
    }
    getlist()
  },[])

  //filter
  const onFinish = (values) => {
    console.log(values)
    const getResult =  async () => {
      const res = await getResultAPI(values)
      console.log(res)
      setlist(res.data.data)
    }
    getResult()
  };

  //delete
  const Delete = async (data) => {
    const res = await deleteBookAPI(list, data)
    console.log(res)
    setlist(res.data.data)
  }

  //navigateTo
  const navigate = useNavigate()
  

  return (
    
    <>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span:8,
        }}
        style={{
          margin: '0 auto'
        }}
        name="nest-messages"
        onFinish={onFinish}
        
      >
        <Breadcrumb items={[
      { title: <Link to={'/'}>Home</Link> },
      { title: 'BookList' },]}/>
       <div style={{height:'30px'}}></div>
        <Form.Item label="Publisher"
          name={['publisher']}
          >
          <Input />
        </Form.Item>
        <Form.Item label="Type" name={['type']}>
          <Select>
            <Select.Option value="文学">Literature</Select.Option>
            <Select.Option value="医学">Medical</Select.Option>
            <Select.Option value="哲学">Philosophy</Select.Option>
            <Select.Option value="计算机">Computer Science Book</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Bookname" name={['bookname']}>
          <Input />
        </Form.Item>
        <Form.Item   wrapperCol={{
            offset: 8, 
            span: 12,
          }}>
        <Button type="primary" htmlType="submit" >Submit</Button>
        </Form.Item>
      </Form>

        {/* 表单 */}
        
        <Table dataSource={list} rowKey="id" pagination = {{
          pageSize:4,
          total:list.length
        }}
        title={()=>`A total of ${count} results were found based on the filter criteria`}>
        <Column title="Bookname" dataIndex="bookname" key="bookname" />
        <Column title="Author" dataIndex="author" key="author" />
        <Column title="Publisher" dataIndex="publisher" key="publisher" />
        <Column title="Type" dataIndex="type" key="type" />
        <Column title="Total" dataIndex="total" key="total" />
        <Column
          title="Action"
          key="action"
          render={data => (
            <Space size="middle">
              <Button type="primary" onClick={()=>navigate(`/publish?id=${data.id}`)} danger>Edit</Button>
              <Popconfirm
              title="Are you sure you want to delete this article?"
              onConfirm={() => Delete(data)}
              okText="Confirm"
              cancelText="Cancel">
              <Button type="primary" htmlType='Delete'>Delete</Button>
            </Popconfirm>
           
              
            </Space>
          )}/>
        </Table>
        
        
    </>
  );
};
export default Book
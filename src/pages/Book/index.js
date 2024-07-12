import React, { useEffect, useState } from 'react';
import {
  Button,
  Form,
  Input,
  Select,
  Space, Table, Popconfirm
} from 'antd';
import { getBookListAPI, getResultAPI, deleteBookAPI} from '../../api/book';
import {useNavigate} from 'react-router-dom'


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

  //编辑页面跳转
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
        <Form.Item label="出版社"
          name={['publisher']}
          >
          <Input />
        </Form.Item>
        <Form.Item label="图书类型" name={['type']}>
          <Select>
            <Select.Option value="文学">文学</Select.Option>
            <Select.Option value="医学">医学</Select.Option>
            <Select.Option value="哲学">哲学</Select.Option>
            <Select.Option value="计算机">计算机</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="图书名称" name={['bookname']}>
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
        title={()=>`根据筛选条件共查询到 ${count} 条结果：`}>
        <Column title="bookname" dataIndex="bookname" key="bookname" />
        <Column title="author" dataIndex="author" key="author" />
        <Column title="publisher" dataIndex="publisher" key="publisher" />
        <Column title="type" dataIndex="type" key="type" />
        <Column title="total" dataIndex="total" key="total" />
        <Column
          title="Action"
          key="action"
          render={data => (
            <Space size="middle">
              <Button type="primary" onClick={()=>navigate(`/publish?id=${data.id}`)} danger>Edit</Button>
              <Popconfirm
              title="确认删除该条文章吗?"
              onConfirm={() => Delete(data)}
              okText="确认"
              cancelText="取消">
              <Button type="primary" htmlType='Delete'>Delete</Button>
            </Popconfirm>
           
              
            </Space>
          )}/>
        </Table>
        
        
    </>
  );
};
export default Book
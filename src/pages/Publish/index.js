import React from 'react';
import {
  Button,
  Form,
  Input,
  Select,
  InputNumber,
  Breadcrumb,
  message
} from 'antd';
import { creatBookAPI, getBookById, updateBook } from '../../api/book';
import {useSearchParams, Link} from 'react-router-dom'
import {useEffect} from 'react'

const validateMessages = {
  required: 'Need to fill ${label}!',
  types: {
    number: '${label} is invalid!',
  },
  number: {
    range: '${label} must between ${min} and ${max}!',
  },
};

const Publish = () => {

  const [searchParams] = useSearchParams()
  const articleId = searchParams.get('id')
  console.log(articleId)

  const onFinish = async (value) => {
    // console.log(value)
    if (articleId) {
      console.log(value)
      updateBook(value,articleId)
      message.success('Edit Success')
    } else {
       creatBookAPI(value)
       message.success('Add book successfully')
    }
    
  }
  
  //获取form实例
  const [form] = Form.useForm()

  useEffect(() => {
    // 1. 通过id获取数据
    async function getArticleDetail () {
      const res = await getBookById(articleId)
      // console.log(res)
      // console.log(res.data.data)
      form.setFieldsValue(res.data.data)
      }
      // if (articleId){
      //   getArticleDetail ()
      // }
      getArticleDetail ()
  }, [articleId,form])



  return (
    
    <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 8,
        }}
        style={{
          margin: '0 auto'
        }}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        form={form}
      >
        <Breadcrumb items={[
      { title: <Link to={'/'}>Home</Link> },
      { title: `${articleId ? 'Edit' : 'Publish'} article` },]}/>
        <div style={{height:'80px'}}></div>
        <Form.Item label="Bookname" name={['bookname']} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Author" name={['author']} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Publisher"
          name={['publisher']} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Type" name={['type']} rules={[{ required: true }]}>
          <Select>
            <Select.Option value="文学">Literature</Select.Option>
            <Select.Option value="医学">Medical</Select.Option>
            <Select.Option value="哲学">Philosophy</Select.Option>
            <Select.Option value="计算机">Computer Science Book</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Total" name={['total']}
        rules={[{ type: 'number', min: 1, max: 99 }]}>
          <InputNumber defaultValue={1}/>
        </Form.Item>
        <Form.Item   wrapperCol={{
            offset: 12, 
            span: 8,
          }}>
        <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
      
  )
}
export default Publish




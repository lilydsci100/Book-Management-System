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
  required: '需要填写 ${label}!',
  types: {
    number: '${label}无效!',
  },
  number: {
    range: '${label}必须为${min} - ${max}之间的数字!',
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
      message.success('编辑成功')
    } else {
       creatBookAPI(value)
       message.success('添加图书成功')
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
      { title: <Link to={'/'}>首页</Link> },
      { title: `${articleId ? '编辑' : '发布'}文章` },]}/>
        <div style={{height:'80px'}}></div>
        <Form.Item label="图书名称" name={['bookname']} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="作者" name={['author']} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="出版社"
          name={['publisher']} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="类型" name={['type']} rules={[{ required: true }]}>
          <Select>
            <Select.Option value="文学">文学</Select.Option>
            <Select.Option value="医学">医学</Select.Option>
            <Select.Option value="哲学">哲学</Select.Option>
            <Select.Option value="计算机">计算机</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="总数" name={['total']}
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




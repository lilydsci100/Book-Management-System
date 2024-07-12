import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import './index.scss'
import {Outlet, useNavigate, useLocation} from 'react-router-dom'


const GeekLayout = () => {
  //highlight the menu
  const navigate = useNavigate()
  const onMenuClick = (route) => {
    const path = route.key
    console.log(route)
    navigate(path)
  }
  //highlight menu reverse
  const location = useLocation()
  console.log(location.pathname)
  const selectedKeys = [location.pathname]

  const { Header, Sider, Content } = Layout
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className='.ant-layout'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          style={{ height: '100%', borderRight: 0 }}
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          onClick={onMenuClick}
          items={[
            {
              key: '/',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '/books',
              icon: <VideoCameraOutlined />,
              label: 'BookList',
            },
            {
              key: '/publish',
              icon: <UploadOutlined />,
              label: 'Publish',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG
           
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default GeekLayout;
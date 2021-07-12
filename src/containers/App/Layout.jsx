import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { DashboardOutlined, HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Avatar from 'antd/lib/avatar/avatar';

import AppRouter from './AppRouter';
import Logo from '../../assets/Logo';
import { getWindowDimension } from '../../utility/helpers/general';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const MyLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = collapse => setCollapsed(collapse);

  const handleResize = () => {
    if (getWindowDimension().width < 767) setCollapsed(true);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize, false);
    return () => {
      window.removeEventListener('resize', handleResize, false);
    };
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo">
          <Logo />
        </div>
        <Menu theme="dark" defaultActiveFirst mode="inline">
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>

          <Menu.Item key="2" icon={<HomeOutlined />}>
            <Link to="/campaigns">Campaigns</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header theme="dark" className="site-layout-background" style={{ padding: 0 }}>
          <Menu className="flex-end-center" theme="dark" mode="horizontal">
            <SubMenu key="100" title={<Avatar size="large" src="../images/team_01.jpg" />}>
              {/* <Menu.Item
                // onClick={() => dispatch({ type: 'LOGOUT' })}
                key="103"
                icon={<LogoutOutlined />}
              >
                <Link to="/signin">Log-out</Link>
              </Menu.Item> */}
            </SubMenu>
          </Menu>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <div className="site-layout-background" style={{ padding: '1.5rem' }}>
            <AppRouter />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Bhavya Design ©{new Date().getFullYear()} Created by bhavyabhut
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MyLayout;

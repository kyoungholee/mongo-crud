'use client'

import Link from "next/link"
import SideBar from "../sideBar/page"
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Bar } from '@ant-design/charts';


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function monthlyPriceData() {

    // const data = [
    //     { year: '100', value: 100 },
    //     { year: '200', value: 200 },
    //     { year: '300', value: 300 },
    //     { year: '400', value: 400 },
    //     { year: '500', value: 500 },
    //     { year: '600', value: 600 },
    //     { year: '700', value: 700 },
    //   ];
      
  return (
    <>
        <header className='flex justify-between px-40 py-4 bg-sky-50'>
            <div className='flex items-center gap-4'>
                <Link className="p-3" href={`/components/home`}>
                    ALIVE-MONEY
                </Link>
            </div>
                <SideBar/>
        </header>

        <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />} />
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {/* 막대 그래프 추가 */}
            <Bar data={data} xField="year" yField="value" />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design Dashboard Example</Footer>
      </Layout>
    </Layout>
    </>
  )
}

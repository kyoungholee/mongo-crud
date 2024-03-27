'use client'
import { SetStateAction, useState } from 'react';
import Link from "next/link"
import SideBar from "../sideBar/page"
import { Layout, Menu, Breadcrumb } from 'antd';
import { getCookie } from 'cookies-next';
import {
  DollarCircleOutlined,
  WalletOutlined,
  FundOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Bar, Pie, Line } from '@ant-design/charts'; // 추가된 차트 컴포넌트

const { Header, Content, Footer, Sider } = Layout;

export default function MonthlyPriceData() {
  const userIdCookie = getCookie('userId');

  const [selectedMenuKey, setSelectedMenuKey] = useState('2'); // 기본 선택 메뉴 지출(1)

  const dataMap : any= {
    '1': [ // 지출 데이터
      { year: '1', value: 100 },
      { year: '2', value: 200 },
      { year: '3', value: 300 },
      { year: '4', value: 400 },
      { year: '5', value: 500 },
      { year: '6', value: 600 },
      { year: '7', value: 700 },
      { year: '8', value: 800 },
    ],
    '2': [ // 수입 데이터
      { year: '1', value: 500 },
      { year: '2', value: 600 },
      { year: '3', value: 700 },
      { year: '4', value: 800 },
    ],
    '3': [ // 저축 데이터
      { year: '1', value: 900 },
      { year: '2', value: 1000 },
      { year: '3', value: 1100 },
      { year: '4', value: 1200 },
    ],
    '4': [ // 투자 데이터
      { year: '1', value: 1300 },
      { year: '2', value: 1400 },
      { year: '3', value: 1500 },
      { year: '4', value: 1600 },
    ],
  };

  const handleMenuClick = (e: { key: SetStateAction<string>; }) => {
    setSelectedMenuKey(e.key);
  };

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
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" selectedKeys={[selectedMenuKey]} onClick={handleMenuClick}>
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              지출
            </Menu.Item>
            <Menu.Item key="2" icon={<DollarCircleOutlined />}>
              수입
            </Menu.Item>
            <Menu.Item key="3" icon={<WalletOutlined />}>
              저축
            </Menu.Item>
            <Menu.Item key="4" icon={<FundOutlined />}>
              투자
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>3월 기록 데이터</Breadcrumb.Item>
              <Breadcrumb.Item>{userIdCookie}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              {/* 선택된 메뉴에 따라 다른 그래프 표시 */}
              {selectedMenuKey === '1' ? (
                <Line data={dataMap[selectedMenuKey]} xField="year" yField="value" />
              ) : (
                <Pie data={dataMap[selectedMenuKey]} angleField="value" colorField="type" />
              )}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>돈은 누군지도 묻지 않고, 그 소유자에게 권리를 준다.</Footer>
        </Layout>
      </Layout>
    </>
  )
}

'use client'
import { SetStateAction, useEffect, useState } from 'react';
import Link from "next/link"
import SideBar from "../../sideBar/page"
import { Layout } from 'antd';
import { getCookie } from 'cookies-next';
import {
  DollarCircleOutlined,
  WalletOutlined,
  FundOutlined,
  PieChartOutlined,
} from '@ant-design/icons';

import {Line ,Bar} from  '@ant-design/charts'
import axios from 'axios';
import { useParams } from 'next/navigation';
import Item from 'antd/es/list/Item';
import Menu, { MenuProps } from "antd/lib/menu";


const { Header, Content, Footer, Sider } = Layout;

export default function MonthlyPriceData() {
  const userIdCookie = getCookie('userId');
  
  const [selectedMenuKey, setSelectedMenuKey] = useState('1'); // 기본 선택 메뉴 지출(1)

  const dataMap: any = {
    '1': [ // 지출 데이터
      { year: '1', value: 100 },
      { year: '2', value: 200 },
      { year: '3', value: 300 },
      { year: '4', value: 400 },
      { year: '5', value: 500 },
      { year: '6', value: 600 },
      
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

  const handleMenuClick : MenuProps["onClick"] = (e: { key: SetStateAction<string>; }) => {
    setSelectedMenuKey(e.key);
  };


   useEffect(() => {
    const getDashboardDate = axios.get(`${process.env.NEXT_PUBLIC_API_URL}/getHouseKeeping/${userIdCookie}`);
    getDashboardDate.then((res) => {
      const resultDate = res.data;
      console.log(resultDate);
        })
  },[userIdCookie])

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
            {[
              { key: '1', icon: <PieChartOutlined />, title: '지출' },
              { key: '2', icon: <DollarCircleOutlined />, title: '수입' },
              { key: '3', icon: <WalletOutlined />, title: '저축' },
              { key: '4', icon: <FundOutlined />, title: '투자' }
            ].map(item => (
              <Menu.Item key={item.key} icon={item.icon}>
                {item.title}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
              <Item>3월 기록 데이터</Item>
              <Item>{userIdCookie}</Item>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              {/* {selectedMenuKey === '1' ? ( */}
                <Bar data={dataMap[selectedMenuKey]} xField="year" yField="value" />
              {/* } */}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>돈은 누군지도 묻지 않고, 그 소유자에게 권리를 준다.</Footer>
        </Layout>
      </Layout>
    </>
  )
}

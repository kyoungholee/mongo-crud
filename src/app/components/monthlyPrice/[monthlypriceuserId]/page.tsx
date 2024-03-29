'use client'

import { useEffect, useState } from 'react';
import Link from "next/link"
import SideBar from "../../sideBar/page"
import { Layout, Menu } from 'antd';
import {
  DollarCircleOutlined,
  WalletOutlined,
  FundOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { getCookie } from 'cookies-next';

import {Line ,Bar} from  '@ant-design/charts'
import Item from 'antd/es/descriptions/Item';

import Calendar from 'react-calendar';
import moment from 'moment';


interface CalendarPageProps {
  formattedSelectedDate: string; // 프롭으로 전달할 formattedSelectedDate의 타입 정의
}

const { Header, Content, Footer, Sider } = Layout;

interface HouseKeepingItem {
  category: string;
  amount: string;
  description: string;
  createDate: string;
}

interface DataItem {
  year: string;
  value: number;
}

export default function MonthlyPriceData() {
  const [selectedMenuKey, setSelectedMenuKey] = useState<string>('1');
  const [dataMap, setDataMap] = useState<{ [key: string]: DataItem[] }>({
    '1': [],
    '2': [],
    '3': [],
    '4': [],
  });
  const userIdCookie = getCookie('userId'); // 임시로 대체

const [showCalendar, setShowCalendar] = useState(false);
const [selectedDate, setSelectedDate] = useState<Date | Date[] | any>();

const [selectedRange, setSelectedRange] = useState<Date[]>([]);

const handleDateChange = (date: Date | any | Date[]) => {
  setSelectedDate(date);
  setShowCalendar(false);
};

const getTileClassName = ({ date }: { date: Date }) => {
    const dateMilliseconds = date.getTime();
    const selectedRangeMilliseconds = selectedRange.map((date) => date.getTime());
  
    // 선택한 기간 중 첫 날짜부터 마지막 날짜까지 파란색으로 칠해줌
    if (
      selectedRangeMilliseconds.length > 1 &&
      dateMilliseconds >= Math.min(...selectedRangeMilliseconds) &&
      dateMilliseconds <= Math.max(...selectedRangeMilliseconds)
    ) {
      return 'bg-blue-500 text-white';
    }
  
    // 단일 선택한 날짜는 파란색으로 표시
    if (selectedDate && dateMilliseconds === selectedDate.getTime()) {
      return 'bg-blue-500 text-white';
    }
  
    return '';
  };

const formattedSelectedDate = selectedDate instanceof Date ? moment(selectedDate).format('YYYY-MM') : '';


  const handleMenuClick = (e: { key: string }) => {
    setSelectedMenuKey(e.key);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<HouseKeepingItem[]>(`${process.env.NEXT_PUBLIC_API_URL}/getHouseKeeping/${userIdCookie}`);
        const resultData = response.data;
        console.log("resultData", resultData);
        const formattedData = formatData(resultData);
        setDataMap(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userIdCookie]);

  const formatData = (data: HouseKeepingItem[]): { [key: string]: DataItem[] } => {
    const formattedData: { [key: string]: DataItem[] } = {
      '1': [],
      '2': [],
      '3': [],
      '4': [],
    };

    data.forEach(item => {
      if (item.category === 'Incoming') {
        formattedData['2'].push({value: parseInt(item.amount),year: item.createDate });
      } else if (item.category === 'savings') {
        formattedData['3'].push({value: parseInt(item.amount), year: item.createDate,  });
      }  
      else if (item.category === 'Investment') {
        formattedData['4'].push({ year: item.createDate, value: parseInt(item.amount) });
      }else {
        formattedData['1'].push({ value: parseInt(item.amount), year: item.createDate});
      }
    });

    console.log("formatData", formatData);

    return formattedData;
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

      <Layout style={{ minHeight: '100vh'}}>
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
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <div className="relative">
       <button
         onClick={() => setShowCalendar(!showCalendar)}
         className="px-4 py-2 text-white bg-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
       >
         {selectedDate ? (Array.isArray(selectedDate) ? '날짜 선택됨' : formattedSelectedDate) : '날짜 선택'}
      </button>
      {showCalendar && (
        <div className="absolute w-64 mt-2 top-full">
         <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            className="p-4 my-4 text-center border border-gray-300 rounded-md shadow-md bg-slate-100"
            calendarType="US"
            formatDay={(locale, date) => moment(date).format('D')}
            formatYear={(locale, date) => moment(date).format('YYYY')}
            formatMonthYear={(locale, date) => moment(date).format('YYYY. MM')}
            showNeighboringMonth={false}
            next2Label={null}
            prev2Label={null}
            minDetail="month" // 월 단위로만 선택 가능하도록 설정
            tileClassName={({ date }) =>
              selectedRange.length > 1 &&
              date >= selectedRange[0] &&
              date <= selectedRange[selectedRange.length - 1]
                ? 'bg-blue-500 text-white'
                : ''
            }
          />
        </div>
      )}
</div>
            <Bar
                data={dataMap[selectedMenuKey]}
                xField="value"
                yField="year"
              />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>돈은 누군지도 묻지 않고, 그 소유자에게 권리를 준다.</Footer>
        </Layout>
      </Layout>
    </>
  )
}

'use client'

import { useEffect, useState } from 'react';
import Link from "next/link"
import SideBar from "../../../sideBar/page"
import { Layout, Menu } from 'antd';
import {
  DollarCircleOutlined,
  WalletOutlined,
  FundOutlined,
  PieChartOutlined,
  CheckSquareOutlined
} from '@ant-design/icons';
import axios from 'axios';
import { getCookie } from 'cookies-next';

import {Line ,Bar, Pie} from  '@ant-design/charts'
import Item from 'antd/es/descriptions/Item';

import Calendar from 'react-calendar';
import moment from 'moment';
import './monthlyPrice.css'; // CSS 파일 import

import { useSelectedDate } from '../../../../recoil/DateAtom';



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
  category :string;
}

export default function MonthlyPriceData() {
  const [selectedMenuKey, setSelectedMenuKey] = useState<string>('1');
  const [dataMap, setDataMap] = useState<{ [key: string]: DataItem[] }>({
    '1': [],
    '2': [],
    '3': [],
    '4': [],
    '5': [],
  });
  const userIdCookie = getCookie('userId'); // 임시로 대체

const [showCalendar, setShowCalendar] = useState(false);
const [selectedDate, setSelectedDate] = useState<Date | Date[] | any>();

const [selectedRange, setSelectedRange] = useState<Date[]>([]);

const [SelectedDaterr, setSelectedDaterr] = useSelectedDate();

const handleDateChange = (date: Date | any | Date[]) => {
  setSelectedDate(date);
  setSelectedDaterr(date);
  setShowCalendar(false);
};

const handleMonthChange = (value: Date) => {
  setSelectedDate(value);
  setShowCalendar(false);
};

const formattedSelectedDate = selectedDate instanceof Date ? moment(selectedDate).format('YYYY-MM') : '';


console.log("formattedSelectedDate", formattedSelectedDate);


const newDate = SelectedDaterr ? moment(selectedDate).format('YYYY-MM') : getCookie('month');


console.log("달력에서 가져온 newDate", newDate);

console.log("SelectedDaterr", SelectedDaterr);


  const handleMenuClick = (e: { key: string }) => {
    setSelectedMenuKey(e.key);
    console.log("selectedMenuKey", selectedMenuKey);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<HouseKeepingItem[]>(`${process.env.NEXT_PUBLIC_API_URL}/getHouseKeeping/${userIdCookie}/${newDate}`);
        const resultData = response.data;
        console.log("resultData", resultData);
        const formattedData = formatData(resultData);
        console.log("api 통신에 formattedData" ,formattedData);
        setDataMap(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  console.log("newDate, useEffect", newDate);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newDate]);

  const formatData = (data: HouseKeepingItem[]): { [key: string]: DataItem[] } => {
    const formattedData: { [key: string]: DataItem[] } = {
      '1': [],
      '2': [],
      '3': [],
      '4': [],
      '5': [],
    };


    data.forEach(item => {
      if (item.category === 'expenditure') { // '지출' 카테고리일 때 '1'에 매핑합니다.
        formattedData['1'].push({ value: parseInt(item.amount), year: item.createDate, category: item.category });
      } else if (item.category === 'Incoming') { // '수입' 카테고리일 때 '2'에 매핑합니다.
        formattedData['2'].push({ value: parseInt(item.amount), year: item.createDate , category: item.category });
      } else if (item.category === 'savings') { // '저축' 카테고리일 때 '3'에 매핑합니다.
        formattedData['3'].push({ value: parseInt(item.amount), year: item.createDate, category: item.category });
      } else if (item.category === 'Investment') { // '투자' 카테고리일 때 '4'에 매핑합니다.
        formattedData['4'].push({ value: parseInt(item.amount), year: item.createDate, category: item.category  });
      } else { // 그 외의 경우 '나의 씀씀이 결과' 카테고리로 간주하여 '5'에 매핑합니다.
        formattedData['5']
      }
    });


    console.log("해당 fommaData", formattedData['5']);

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
          <Menu theme="dark" defaultSelectedKeys={[]} mode="inline" selectedKeys={[selectedMenuKey]} onClick={handleMenuClick}>
            {[
              { key: '1', icon: <PieChartOutlined />, title: '지출' },
              { key: '2', icon: <DollarCircleOutlined />, title: '수입' },
              { key: '3', icon: <WalletOutlined />, title: '저축' },
              { key: '4', icon: <FundOutlined />, title: '투자' },
              { key: '5', icon: <CheckSquareOutlined />, title: '나의 씀씀이 결과' }
            ].map(item => (
              <Menu.Item key={item.key} icon={item.icon}>
                {item.title}
              </Menu.Item>
            ))}
          </Menu>
          <div className="relative text-center">
              <button
                onClick={() => setShowCalendar(!showCalendar)}
                className="px-2 py-2 text-white bg-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
              >
                {selectedDate ? (Array.isArray(selectedDate) ? '날짜 선택됨' : formattedSelectedDate) : '날짜 선택'}
              </button>
              {showCalendar && (
                <div className="absolute w-64 mt-2 top-full">
                  <Calendar
                      onChange={handleDateChange}
                      value={new Date()} 
                      onClickMonth={(value: Date) => handleMonthChange(value)}
                      className="p-4 my-4 text-center border border-gray-300 rounded-md shadow-md bg-slate-100"
                      calendarType="US"
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
        </Sider>
           <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              {selectedMenuKey === '1' && (
                <Bar
                data={[
                  ...dataMap['1'].map(item => ({ ...item, category: '지출' })),
                ]}
                  xField="value"
                  yField="year"
                  colorField="category"
                  horizontal={true} // 그래프 방향을 세로로 변경
                />
              )}
              {selectedMenuKey === '2' && (
                <Bar
                data={[
                  ...dataMap['2'].map(item => ({ ...item, category: '수입' })),
                ]}
                  xField="value"
                  yField="year"
                  colorField="category"
                  color="#52c41a" // green color
                />
              )}
              {selectedMenuKey === '3' && (
                <Pie
                data={[
                  ...dataMap['3'].map(item => ({ ...item, category: '저축' })),
                ]}
                angleField="value"
                colorField="category"
                  radius={0.8}
                />
              )}
              {selectedMenuKey === '4' && (
                <Bar
                  data={[
                    ...dataMap['4'].map(item => ({ ...item, category: '투자' })),
                  ]}
                  xField="value"
                  yField="year"
                  colorField="category"
                  color="#1890ff" // blue color
                />
              )}
                    {selectedMenuKey === '5' && (
              <Pie
                data={[
                  ...dataMap['1'].map(item => ({ ...item, category: '지출' })),
                  ...dataMap['2'].map(item => ({ ...item, category: '수입' })),
                  ...dataMap['3'].map(item => ({ ...item, category: '저축' })),
                  ...dataMap['4'].map(item => ({ ...item, category: '투자' })),
                ]}
                angleField="value"
                colorField="category"
                radius={0.8}
              />
            )}

            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>돈은 누군지도 묻지 않고, 그 소유자에게 권리를 준다.</Footer>
        </Layout>
      </Layout>
    </>
  )
}

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
import { useQuery, useQueryClient } from 'react-query';
import { useSelectedDate } from '../../../../recoil/DateAtom';

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

//실제 달력의 날짜
const formattedSelectedDate = selectedDate instanceof Date ? moment(selectedDate).format('YYYY-MM') : '';

//파라미터에 쓰이는 값
const newDate = SelectedDaterr ? moment(selectedDate).format('YYYY-MM') : getCookie('month');


console.log("달력에서 가져온 newDate", newDate);

console.log("SelectedDaterr", SelectedDaterr);


// 왼쪽 메뉴바 클릭
  const handleMenuClick = (e: { key: string }) => {
    setSelectedMenuKey(e.key);
    console.log("selectedMenuKey", selectedMenuKey);
  };

  // fetchData 함수를 따로 분리하여 재사용성을 높임
const fetchData = async (userIdCookie: string | undefined, newDate : any) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/getHouseKeeping/${userIdCookie}/${newDate}`);
  return response.data;
};

const { data: resultData, isLoading, isError } = useQuery(['houseKeepingData', userIdCookie, SelectedDaterr], () => fetchData(userIdCookie, newDate));

  useEffect(() => {
    // 에러 처리
    if (isError) {
      console.error('Error fetching data:', isError);
    }
  }, [isError]);

  useEffect(() => {
    // 데이터 로딩 시 로딩 상태 출력
    if (isLoading) {
      console.log('Loading data...');
    }

    // 데이터 로드 후 배열에 각 데이터 저장
    if (resultData) {
      const formattedData = formatData(resultData);
      console.log("api 통신에 formattedData=======" ,formattedData);
      setDataMap(formattedData);
    }
  }, [isLoading, resultData]);

  //기존에 axios
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get<HouseKeepingItem[]>(`${process.env.NEXT_PUBLIC_API_URL}/getHouseKeeping/${userIdCookie}/${newDate}`);
  //       const resultData = response.data;

  //       const formattedData = formatData(resultData);
  //       console.log("api 통신에 formattedData" ,formattedData);
  //       setDataMap(formattedData);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [newDate]);

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

  //나의 씀씀이 값의 결과 데이터
  const getTotalValue = (category: string) => {
    const sum = dataMap[category].reduce((acc, cur) => acc + cur.value, 0);
    return sum
  };

  const compareTotalValues = () => {
    // 각 항목의 총합을 가져옴
    const expenditureTotal = getTotalValue('1');
    const incomeTotal = getTotalValue('2');
    const savingTotal = getTotalValue('3');
    const investmentTotal = getTotalValue('4');

    // 각 항목을 비교하여 메시지 반환
    if (expenditureTotal > incomeTotal && expenditureTotal > savingTotal && expenditureTotal > investmentTotal) {
      return '이번달은 지출이 많습니다. 경제적 자유를 얻기 위해 지출은 줄이는 것이 최우선입니다.';
    } else if (incomeTotal > expenditureTotal && incomeTotal > savingTotal && incomeTotal > investmentTotal) {
      return '이번달은 수입이 많습니다. 더 많은 수입을 얻기 위해 고민해보세요.';
    } else if (savingTotal > expenditureTotal && savingTotal > incomeTotal && savingTotal > investmentTotal) {
      return '이번달은 저축이 많습니다. 저축 하는 것도 중요하지만, 투자에 대한 공부가 필요한 시기입닌다.';
    } else if (investmentTotal > expenditureTotal && investmentTotal > incomeTotal && investmentTotal > savingTotal) {
      return '이번달은 투자 요금이 많습니다. 투자를 전략적으로 하기 위해 꾸준히 공부하고, 눈덩이처럼 굴려보세요.';
    } else {
      return '이번달의 지출, 수입, 저축, 투자는 비슷한 수준입니다.';
    }
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
                      value={selectedDate}
                      onClickMonth={(value: Date) => handleMonthChange(value)}
                      className="p-4 my-4 text-center border border-gray-300 rounded-md shadow-md bg-slate-100"
                      calendarType="gregory"
                      formatMonthYear={(locale, date) => moment(date).format('YYYY. MM')}
                      showNeighboringMonth={false} // 이월된 월을 표시하지 않음
                      next2Label={null}
                      prev2Label={null}
                      minDetail="month" // 월 단위로만 선택 가능하도록 설정
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
                  ...dataMap['1'].map(item => ({ ...item, category: '지출' }))
                  .sort((a, b) => new Date(b.year).getTime() - new Date(a.year).getTime())
                ]}
                  xField="value"
                  yField="year"
                  colorField="category"
                />
              )}
              {selectedMenuKey === '2' && (
                <Bar
                data={[
                  ...dataMap['2'].map(item => ({ ...item, category: '수입' }))
                  .sort((a, b) => new Date(b.year).getTime() - new Date(a.year).getTime())
                ]}
                  xField="value"
                  yField="year"
                  colorField="category"
                />
              )}
                  {selectedMenuKey === '3' && (
                  <Line
                    data={[
                      ...dataMap['3'].map(item => ({ ...item, category: '저축' }))
                      // .sort((a, b) => new Date(b.year).getTime() - new Date(a.year).getTime())
                    ]}
                    xField="year"
                    yField="value"
                    seriesField="category"
                  />
                )}

              {selectedMenuKey === '4' && (
                <Bar
                  data={[
                    ...dataMap['4'].map(item => ({ ...item, category: '투자' }))
                    .sort((a, b) => new Date(b.year).getTime() - new Date(a.year).getTime())
                  ]}
                  xField="value"
                  yField="year"
                  colorField="category"
                />
              )}
              {selectedMenuKey === '5' && (
                <>
                <Pie
                  data={[
                    { category: '지출', value: getTotalValue('1') },
                    { category: '수입', value: getTotalValue('2') },
                    { category: '저축', value: getTotalValue('3') },
                    { category: '투자', value: getTotalValue('4') },
                  ]}
                  angleField="value"
                  colorField="category"
                  radius={0.8} />
                  <div className='text-xl'>{compareTotalValues()}</div>
                  </>
            )}

            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>돈은 누군지도 묻지 않고, 그 소유자에게 권리를 준다.</Footer>
        </Layout>
      </Layout>
    </>
  )
}

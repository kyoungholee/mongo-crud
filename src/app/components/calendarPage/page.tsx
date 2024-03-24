'use client'
import Calendar from 'react-calendar';
import styled from 'styled-components'; // styled-components 사용
import moment from 'moment';
import React, { useEffect, useState } from 'react';


// Styled-components를 이용하여 CSS 스타일링 적용
// const StyledCalendarWrapper = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   position: relative;
//   background-color: black; // 테일윈드 색상을 직접 사용
  
// `;
// const StyledDate = styled.div`
//   position: absolute;
//   right: 7%;
//   top: 6%;
//   background-color: #4299e1; // 테일윈드 색상을 직접 사용
//   color: #f7fafc; // 테일윈드 색상을 직접 사용
//   width: 18%;
//   min-width: fit-content;
//   height: 1.5rem;
//   text-align: center;
//   margin: 0 auto;
//   line-height: 1.6rem;
//   border-radius: 15px;
//   font-size: 0.8rem;
//   font-weight: 800;
// `;
// const StyledToday = styled.div`
//   font-size: x-small;
//   color: #cbd5e0; // 테일윈드 색상을 직접 사용
//   font-weight: 600;
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translateX(-50%);
// `;
// const StyledDot = styled.div`
//   background-color: #4a5568; // 테일윈드 색상을 직접 사용
//   border-radius: 50%;
//   width: 0.3rem;
//   height: 0.3rem;
//   position: absolute;
//   top: 60%;
//   left: 50%;
//   transform: translateX(-50%);
// `;
export default function CalendarPage() {


const [showCalendar, setShowCalendar] = useState(false);
const [selectedDate, setSelectedDate] = useState<Date | Date[] | any>();
const [selectedRange, setSelectedRange] = useState<Date[]>([]);

const handleDateChange = (date: Date | any | Date[]) => {
  setSelectedDate(date);
  if (Array.isArray(date)) {
    setSelectedRange(date);
  } else {
    setSelectedRange([date]);
  }
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

const formattedSelectedDate = selectedDate instanceof Date ? moment(selectedDate).format('YYYY-MM-DD') : '';


  return (
    <>

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
            className="bg-orange-300 border border-gray-300 rounded-md shadow-md"
            calendarType="US"
            formatDay={(locale, date) => moment(date).format('D')}
            formatYear={(locale, date) => moment(date).format('YYYY')}
            formatMonthYear={(locale, date) => moment(date).format('YYYY. MM')}
            showNeighboringMonth={false}
            next2Label={null}
            prev2Label={null}
            minDetail="year"
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
    </>
  )
}

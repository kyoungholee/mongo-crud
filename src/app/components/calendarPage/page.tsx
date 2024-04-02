// 'use client'
// import Calendar from 'react-calendar';
// import moment from 'moment';
// import React, { useEffect, useState } from 'react';


// // interface CalendarPageProps {
// //   formattedSelectedDate: string; // 프롭으로 전달할 formattedSelectedDate의 타입 정의
// // }

//  export  const CalendarPage = () => {



// const [showCalendar, setShowCalendar] = useState(false);
// const [selectedDate, setSelectedDate] = useState<Date | Date[] | any>();

// const [selectedRange, setSelectedRange] = useState<Date[]>([]);

// const handleDateChange = (date: Date | any | Date[]) => {
//   setSelectedDate(date);
//   setShowCalendar(false);
// };

// const getTileClassName = ({ date }: { date: Date }) => {
//     const dateMilliseconds = date.getTime();
//     const selectedRangeMilliseconds = selectedRange.map((date) => date.getTime());
  
//     // 선택한 기간 중 첫 날짜부터 마지막 날짜까지 파란색으로 칠해줌
//     if (
//       selectedRangeMilliseconds.length > 1 &&
//       dateMilliseconds >= Math.min(...selectedRangeMilliseconds) &&
//       dateMilliseconds <= Math.max(...selectedRangeMilliseconds)
//     ) {
//       return 'bg-blue-500 text-white';
//     }
  
//     // 단일 선택한 날짜는 파란색으로 표시
//     if (selectedDate && dateMilliseconds === selectedDate.getTime()) {
//       return 'bg-blue-500 text-white';
//     }
  
//     return '';
//   };

// const formattedSelectedDate = selectedDate instanceof Date ? moment(selectedDate).format('YYYY-MM-DD') : '';


//   return (
//     <>

// <div className="relative">
//       <button
//         onClick={() => setShowCalendar(!showCalendar)}
//         className="px-4 py-2 text-white bg-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
//       >
//         {selectedDate ? (Array.isArray(selectedDate) ? '날짜 선택됨' : formattedSelectedDate) : '날짜 선택'}
//       </button>
//       {showCalendar && (
//         <div className="absolute w-64 mt-2 top-full">
//           <Calendar
//             onChange={handleDateChange}
//             value={selectedDate}
//             className="p-4 my-4 text-center border border-gray-300 rounded-md shadow-md bg-slate-100"
//             calendarType="US"
//             formatDay={(locale, date) => moment(date).format('D')}
//             formatYear={(locale, date) => moment(date).format('YYYY')}
//             formatMonthYear={(locale, date) => moment(date).format('YYYY. MM')}
//             showNeighboringMonth={false}
//             next2Label={null}
//             prev2Label={null}
//             minDetail="year"
//             tileClassName={({ date }) =>
//               selectedRange.length > 1 &&
//               date >= selectedRange[0] &&
//               date <= selectedRange[selectedRange.length - 1]
//                 ? 'bg-blue-500 text-white'
//                 : ''
//             }
//           />
//         </div>
//       )}
// </div>
//     </>
//   )
// }

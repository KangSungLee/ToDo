import DateHolidays from 'date-holidays';
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko';
import listPlugin from '@fullcalendar/list';

const Calendar = ({ events, dateClick, handleEdit }) => {
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    const getHolidays = () => {
      const hd = new DateHolidays('KR');
      const today = new Date();
      const year = today.getFullYear();
      const holidayList = hd.getHolidays(year); 

      // 공휴일을 기존 일정과 같은 날짜로 추가
      const holidayEvents = holidayList.map(holiday => ({
        title: holiday.name,  
        start: holiday.date,   
        color: '#FF5733',   
        allDay: true,         
        className: 'holiday'   
      }));

      setHolidays(holidayEvents); 
    };

    getHolidays();
  }, []);

  const allEvents = [...events, ...holidays];

  return (
    <FullCalendar
      locale={koLocale}
      plugins={[dayGridPlugin, interactionPlugin, listPlugin]} 
      initialView="dayGridMonth"
      events={allEvents}  
      dateClick={dateClick}
      eventClick={(info) => handleEdit(info.event)} 
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'listWeek,listMonth,dayGridMonth',
      }}
      eventClassNames={['holiday-event']}
    />
  );
};

export default Calendar;

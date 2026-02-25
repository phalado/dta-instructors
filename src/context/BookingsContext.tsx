import React, { createContext, useState, useContext } from 'react';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';

export interface Booking {
  id: string;
  instructorName: string;
  date: dayjs.Dayjs;
  time: string;
  bookedBy: string;
  studentName: string;
  studentId: string;
}

interface BookingsContextType {
  bookings: Booking[];
  bookClass: (instructorName: string, date: dayjs.Dayjs, time: string) => void;
  bookMultipleClasses: (
    instructorName: string,
    dateTimes: { date: dayjs.Dayjs; time: string }[],
  ) => void;
  cancelBooking: (id: string) => void;
}

const BookingsContext = createContext<BookingsContextType>({
  bookings: [],
  bookClass: () => {},
  bookMultipleClasses: () => {},
  cancelBooking: () => {},
});

export const BookingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = Cookies.get('bookings');
    if (!saved) return [];

    try {
      return JSON.parse(saved) as Booking[];
    } catch {
      Cookies.remove('bookings');
      return [];
    }
  });

  const saveToCookie = (newBookings: Booking[]) => {
    Cookies.set('bookings', JSON.stringify(newBookings), { expires: 30 });
    setBookings(newBookings);
  };

  const bookClass = (instructorName: string, date: dayjs.Dayjs, time: string) => {
    const user = Cookies.get('user');

    const newBooking: Booking = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2),
      instructorName,
      date,
      time,
      bookedBy: JSON.parse(user!).id,
      studentName: JSON.parse(user!).name,
      studentId: JSON.parse(user!).id,
    };

    saveToCookie([...bookings, newBooking]);
  };

  const bookMultipleClasses = (
    instructorName: string,
    dateTimes: { date: dayjs.Dayjs; time: string }[],
  ) => {
    const newBookings: Booking[] = [];

    dateTimes.forEach(({ date, time }) => {
      const randomId = Math.random().toString(36).substr(2, 9);
      const randomName = `RandomUser${randomId}`;

      const newBooking: Booking = {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2),
        instructorName,
        date,
        time,
        bookedBy: randomId,
        studentName: randomName,
        studentId: randomId,
      };

      newBookings.push(newBooking);
    });

    saveToCookie([...bookings, ...newBookings]);
  };

  const cancelBooking = (id: string) => {
    saveToCookie(bookings.filter((b) => b.id !== id));
  };

  return (
    <BookingsContext.Provider value={{ bookings, bookClass, bookMultipleClasses, cancelBooking }}>
      {children}
    </BookingsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useBookings = () => useContext(BookingsContext);

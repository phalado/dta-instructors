// src/pages/Instructors/SchedulePage.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';

import { useBookings } from '@/context/BookingsContext';

import InstructorData from '@/contents/InstructorData';
import { bookRandomClass } from './utils';

const hours = Array.from({ length: 10 }, (_, i) => `${(8 + i).toString().padStart(2, '0')}:00`);

const SchedulePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { bookings, bookClass, cancelBooking, bookMultipleClasses } = useBookings();
  const userCookie = Cookies.get('user');
  const user = userCookie ? JSON.parse(userCookie) : null;
  const [weekOffset, setWeekOffset] = useState(0);

  const instructor = InstructorData.find((inst) => inst.slug === slug);
  const [days, setDays] = useState([
    { name: 'Monday', date: dayjs().startOf('week').add(1, 'day').add(weekOffset, 'week') },
    { name: 'Tuesday', date: dayjs().startOf('week').add(2, 'day').add(weekOffset, 'week') },
    { name: 'Wednesday', date: dayjs().startOf('week').add(3, 'day').add(weekOffset, 'week') },
    { name: 'Thursday', date: dayjs().startOf('week').add(4, 'day').add(weekOffset, 'week') },
    { name: 'Friday', date: dayjs().startOf('week').add(5, 'day').add(weekOffset, 'week') },
  ]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDays([
      { name: 'Monday', date: dayjs().startOf('week').add(1, 'day').add(weekOffset, 'week') },
      { name: 'Tuesday', date: dayjs().startOf('week').add(2, 'day').add(weekOffset, 'week') },
      { name: 'Wednesday', date: dayjs().startOf('week').add(3, 'day').add(weekOffset, 'week') },
      { name: 'Thursday', date: dayjs().startOf('week').add(4, 'day').add(weekOffset, 'week') },
      { name: 'Friday', date: dayjs().startOf('week').add(5, 'day').add(weekOffset, 'week') },
    ]);
  }, [weekOffset, setDays]);

  const [weekBookings, setWeekBookings] = useState(() =>
    bookings.filter(
      (b) =>
        b.instructorName.toLowerCase() === instructor?.name.toLowerCase() &&
        days.some((day) => dayjs(b.date).isSame(day.date, 'day')),
    ),
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWeekBookings(
      bookings.filter(
        (b) =>
          b.instructorName.toLowerCase() === instructor?.name.toLowerCase() &&
          days.some((day) => dayjs(b.date).isSame(day.date, 'day')),
      ),
    );
  }, [weekOffset, bookings, instructor, days]);

  // Add random bookings for testing if there are none for this instructor
  useEffect(() => {
    if (weekBookings.length === 0 && instructor) {
      bookRandomClass({ instructorName: instructor.name, bookMultipleClasses });
    }
  }, [weekBookings, instructor, bookMultipleClasses, weekOffset]);

  if (!slug || !instructor) {
    return <div className="text-center text-gray-800">Instructor not found</div>;
  }

  const isBooked = (date: dayjs.Dayjs, time: string) =>
    weekBookings.find(
      (b) =>
        b.instructorName.toLowerCase() === instructor.name.toLowerCase() &&
        dayjs(b.date).isSame(date, 'day') &&
        b.time === time,
    );

  const handleBook = (date: dayjs.Dayjs, time: string) => {
    if (!user) {
      toast.error('You must be logged in to book a class');
      return;
    }

    bookClass(instructor.name, date, time);
    toast.success(`Class booked with ${instructor.name} • ${date.format('DD/MM')} ${time}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div className="w-full flex flex md:flex-row md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold">Book a class with {instructor.name}</h1>
            <p className="text-gray-600 mt-2">Choose day and time (08:00 – 17:00)</p>
          </div>
          <div className="w-2/5 flex align-end flex-col md:flex-row items-end gap-4">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-blue-500 text-xs text-white rounded hover:bg-blue-600 cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={() => setWeekOffset(weekOffset - 1)}
              className="px-4 py-2 bg-blue-500 text-xs text-white rounded hover:bg-blue-600 cursor-pointer"
            >
              Previous week
            </button>
            <button
              onClick={() => setWeekOffset(weekOffset + 1)}
              className="px-4 py-2 bg-blue-500 text-xs text-white rounded hover:bg-blue-600 cursor-pointer"
            >
              Next week
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-5 text-left font-medium">Time</th>
              {days.map((day) => (
                <th key={day.name} className="p-5 text-center font-medium">
                  <p>{day.name}</p>
                  <p className="text-gray-200">{day.date.format('DD/MM')}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {hours.map((time) => (
              <tr key={time} className="hover:bg-gray-50">
                <td className="p-5 font-semibold border-r bg-gray-50 w-32">{time}</td>
                {days.map((day) => {
                  const booked = isBooked(day.date, time);
                  const byMe = booked && booked.bookedBy === user?.id;

                  return (
                    <td key={JSON.stringify(day)} className="p-4 text-center h-25">
                      {booked ? (
                        <div className="flex flex-col items-center gap-2">
                          <div
                            className={`w-1/2 min-w-20 mx-auto items-center gap-2 px-5 py-2 rounded-2xl text-sm ${byMe ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-600'}`}
                          >
                            Booked
                          </div>
                          {byMe && (
                            <button
                              onClick={() => cancelBooking(booked.id)}
                              className="text-red-600 hover:underline text-xs cursor-pointer"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      ) : (
                        <button
                          onClick={() => handleBook(day.date, time)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl text-sm font-medium transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={
                            !user ||
                            day.date.isBefore(dayjs(), 'day') ||
                            (day.date.isSame(dayjs(), 'day') && time <= dayjs().format('HH:mm'))
                          }
                        >
                          Book
                        </button>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SchedulePage;

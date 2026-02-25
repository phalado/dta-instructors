import dayjs from 'dayjs';

interface BookRandomClassProps {
  instructorName: string;
  bookMultipleClasses: (
    instructorName: string,
    dateTimes: { date: dayjs.Dayjs; time: string }[],
  ) => void;
}

const bookRandomClass = ({ instructorName, bookMultipleClasses }: BookRandomClassProps) => {
  const randomDatesNTimes = Array.from({ length: 20 }, () => {
    const randomDate = dayjs()
      .startOf('week')
      .add(Math.floor(Math.random() * 5), 'day');
    const randomTime = `${9 + Math.floor(Math.random() * 8)}:00`;
    return { date: randomDate, time: randomTime };
  });

  bookMultipleClasses(instructorName, randomDatesNTimes);
};

export { bookRandomClass };

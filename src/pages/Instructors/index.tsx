import { useNavigate } from 'react-router-dom';

import InstructorData from '@/contents/InstructorData';

import '@/index.css';

const Instructors = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl h-full mx-auto text-gray-800 text-center shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold">Check our Instructors</h2>
      <h3 className="text-xl font-bold">They are the best in the field</h3>
      <p className="text-base font-bold line-through ">Actually, the only ones</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {InstructorData.map((inst) => (
          <div
            key={inst.name}
            className="h-90 bg-white p-4 rounded shadow bg-gradient-to-tr from-gray-200 to-white flex flex-col justify-between"
          >
            <h3 className="h-1/8 text-lg font-bold content-center">{inst.name}</h3>
            <div className="h-7/8 flex flex-col justify-end items-center">
              <img src={new URL(inst.instImage, import.meta.url).href} alt={inst.name} className="h-7/10" />
              <div className="mt-2 flex gap-2 h-10">
                <button
                  className="mt-2 px-4 py-2 bg-blue-500 text-xs text-white rounded hover:bg-blue-600 cursor-pointer"
                  onClick={() => navigate(inst.slug)}
                >
                  View Profile
                </button>
                <button
                  className="mt-2 px-4 py-2 bg-blue-500 text-xs text-white rounded hover:bg-blue-600 cursor-pointer"
                  onClick={() => navigate(`${inst.slug}/schedule`)}
                >
                  Schedule a Class
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructors;

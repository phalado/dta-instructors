import { useParams, useNavigate } from 'react-router-dom';

import InstructorData from '@/contents/InstructorData';

import '@/index.css';

const InstructorProfile = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const instructor = InstructorData.find((inst) => inst.slug === slug);

  if (!instructor) {
    return <div className="text-center text-gray-800">Instructor not found</div>;
  }

  return (
    <div className="max-w-4xl h-full mx-auto text-gray-800 text-center shadow-md rounded-lg p-6">
      <h2 className="text-4xl font-bold">{instructor.name}</h2>
      <p className="w-1/2 text-xl font-bold my-4 mx-auto">{instructor.bio}</p>
      <div className="flex">
        <img
          src={new URL(instructor.instImage, import.meta.url).href}
          alt={instructor.name}
          className="mx-auto mt-4 mb-6 w-1/3 rounded-sm"
        />
        <div className="w-2/3 text-center pl-6 flex flex-col justify-center">
          <h3 className="text-2xl font-bold">Dragon Name: {instructor.dragonName}</h3>
          <p className="text-lg font-bold">Dragon Type: {instructor.dragonType}</p>
          <img
            src={new URL(instructor.dragonImage, import.meta.url).href}
            alt={instructor.dragonName}
            className="mx-auto mt-4 mb-6 w-full rounded-sm"
          />
        </div>
      </div>
      <div className="mt-6 gap-4 flex justify-center">
        <button
          className="px-4 py-2 bg-blue-500 text-xs text-white rounded hover:bg-blue-600 cursor-pointer"
          onClick={() => navigate(`schedule`)}
        >
          Schedule a Class
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-xs text-white rounded hover:bg-blue-600 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default InstructorProfile;

import React from 'react';
import { Link } from 'react-router-dom';

const Syllabus = () => {
  const schemes = [
    { title: 'B.TECH FULL TIME 2015', subtitle: 'Full Time Started Year: 2015 - 2016' },
    { title: 'B.Tech FULL TIME  2019', subtitle: 'Full Time Started Year: 2016 - 2017' },
    // Add more schemes as needed
  ];

  return (
    <div className="scheme-container w-full p-10 rounded-lg shadow-md bg-blue-100 ">
      <h2 className="text-2xl font-bold">Scheme - B.Tech</h2>
      <ul className="list-disc pl-6">
        {schemes.map((scheme, index) => (
          <li key={index} className="text-gray-700">
            <div className='flex justify-between p-[25px]'>
              <div>
                <p className="text-lg">{scheme.title}</p>
                <small className="text-sm text-gray-500">{scheme.subtitle}</small>
              </div>  
              <div className='rounded-lg py-2 px-4 flex bg-red-200 justify-center align-item-center hover:bg-green-300'>
                <i class="fa-regular fa-eye py-2 px-1"></i>
                <Link to={`/staffdashboard/Branch/Syllabus`}>
                  <button className='py-1'>Branch</button>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Syllabus;

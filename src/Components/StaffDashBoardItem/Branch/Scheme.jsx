import React from 'react';

const Scheme = () => {
  const schemes = [
    { title: 'ELECTRICAL AND ELECTRONICS ENGINEERING', subtitle: 'Full Time Started Year: 2019 - 2024' },
    { title: 'MECHANICAL ENGINEERING', subtitle: 'Full Time Started Year: 2019 - 2024' },
    { title: 'CIVIL ENGINEERING', subtitle: 'Full Time Started Year: 2019 - 2024' },
    { title: 'ELECTRONICS AND COMMUNICATION ENGINEERING', subtitle: 'Full Time Started Year: 2019 - 2024' },
    { title: 'COMPUTER SCIENCE AND   ENGINEERING', subtitle: 'Full Time Started Year: 2019 - 2024' },
    
  ];

  // Object containing download links for each department
  const departmentDownloadLinks = {
    'ELECTRICAL AND ELECTRONICS ENGINEERING': ['link1', 'link2', 'link3', 'https://docs.google.com/uc?export=download&id=1gjb3WvNDScizqJsQ72eIFkU62zYvySmG'],
    'MECHANICAL ENGINEERING': ['link5', 'link6', 'link7', 'https://docs.google.com/uc?export=download&id=1Xjf1kAPan2qC85kSpGvc_Vg7RZyBJYun'],
    'CIVIL ENGINEERING': ['link9', 'link10', 'link11', 'https://docs.google.com/uc?export=download&id=1Y7a6tkdxEgoFZ-QQMGVGRM1tb4NTzTRu'],
    'ELECTRONICS AND COMMUNICATION ENGINEERING': ['link13', 'link14', 'link15', 'https://docs.google.com/uc?export=download&id=1sIo4Pf11mr-PCN0XZs7MM1HIETzNFz3K'],
    'COMPUTER SCIENCE AND   ENGINEERING': ['link17', 'link18', 'link19', 'https://docs.google.com/uc?export=download&id=1ach8YwQZbBpRPuPwt2vFEKh4QhGvKVPD'],
  };

  return (
    <div className="scheme-container w-full p-10 rounded-lg shadow-md bg-blue-100 ">
      <h2 className="text-2xl font-bold flex justify-between">
        Scheme - B.Tech
        <div className="flex text-[22px]">
          <div className='rounded-lg py-2 px-4 flex justify-center align-item-center hover:bg-green-300'>
            <i className="fa-regular fa-eye py-3 px-1"></i>
            <button>1st Year</button>
          </div>
          <div className='rounded-lg py-2 px-4 flex justify-center align-item-center hover:bg-green-300'>
          <i className="fa-regular fa-eye py-3 px-1"></i>
            <button>2nd Year</button>
          </div>
          <div className='rounded-lg py-2 px-4 flex  justify-center align-item-center hover:bg-green-300'>
            <i className="fa-regular fa-eye py-3 px-1"></i>
            <button>3rd Year</button>
          </div>
          <div className='rounded-lg py-2 px-4 flex  justify-center align-item-center hover:bg-green-300'>
            <i className="fa-regular fa-eye py-3 px-1"></i>
            <button>4th Year</button>
          </div>
        </div>
      </h2> 
      
      <ul className="list-disc pl-6">
        {schemes.map((scheme, index) => (
          <li key={index} className="text-gray-700">
            <div className='flex justify-between p-[25px]'>
              <div>
                <p className="text-lg">{scheme.title}</p>
                <small className="text-sm text-gray-500">{scheme.subtitle}</small>
              </div>  
              <div className='flex space-x-4'>
                {departmentDownloadLinks[scheme.title].map((link, linkIndex) => (
                  <div key={linkIndex} className='rounded-lg py-2 px-4 flex bg-red-200 justify-center align-item-center hover:bg-green-300'>
                    <i class="fa-solid fa-download py-3 px-1"></i>
                    <a className='py-2'href={link} download>
                      <button>Download</button>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Scheme;

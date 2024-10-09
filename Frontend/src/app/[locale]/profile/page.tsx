export default async function Home({ params }: { params: { locale: string } }) {

  
  return (
    <div className="flex flex-col items-center min-h-screen  ">
      {/* Header */}


      {/* Main Content */}
      <div className="container mx-auto flex flex-col lg:flex-row mt-8 gap-8 px-4">
      <div className="absolute  left-[212px] top-[212px] shadow-[0px_0px_300px_135px_#2563eb] bg-transparent z-0"></div>
        {/* <div className="absolute  right-[212px] top-[412px] shadow-[0px_0px_230px_120px_#eb25a6] bg-transparent z-0"></div> */}
        {/* <div className="absolute  left-[0] top-[0] shadow-[0px_143px_12810px_297px_#2563eb7d] bg-transparent z-0"></div> */}
        <div className="absolute  right-[0] bottom-[0] shadow-[0px_143px_12810px_297px_#eb25a67d] bg-transparent z-0"></div>

        {/* Mobile Mockup Section */}
        <div className="flex justify-center w-full lg:w-1/3  shadow-lg rounded-lg p-6">
          <div className="relative w-[300px] h-[550px] bg-gray-50 border-2 border-gray-300 rounded-lg">
            {/* Profile Image Placeholder */}
            <div className="flex justify-center items-center h-16 w-16 bg-gray-200 rounded-full absolute top-10 left-1/2 transform -translate-x-1/2"></div>
            {/* Name and Links */}
            <div className="mt-32 space-y-4">
              {/* Link Buttons */}
              <button className="block w-11/12 mx-auto bg-black text-white py-2 px-4 rounded-md">GitHub</button>
              <button className="block w-11/12 mx-auto bg-red-600 text-white py-2 px-4 rounded-md">YouTube</button>
              <button className="block w-11/12 mx-auto bg-blue-600 text-white py-2 px-4 rounded-md">LinkedIn</button>
              <div className="block w-11/12 mx-auto h-12 bg-gray-200 rounded-md"></div>
              <div className="block w-11/12 mx-auto h-12 bg-gray-200 rounded-md"></div>
            </div>
          </div>
        </div>
 
      </div>
    </div>
  );
}

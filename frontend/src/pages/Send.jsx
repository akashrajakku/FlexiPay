export default function Send() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="bg-white shadow-md rounded-lg p-6 sm:p-10 w-full max-w-sm">
      
        <h2 className="text-2xl font-bold text-center mb-6">Send Money</h2>
        
        <div className="flex items-center mb-4">
          <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
            AK
          </div>
          <div className="ml-4">
            <p className="font-semibold text-lg">Akash Raj</p>
            <p className="text-gray-500 text-sm">Amount (in Rs)</p>
          </div>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter amount"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-green-500 shadow-sm"
          />
        </div>

        <button className="bg-green-500 hover:bg-green-600 text-white w-full py-2 rounded font-semibold">
          Initiate Transfer
        </button>
      </div>
    </div>
  );
}

export default function Balance({ balance }) {
    return (
      <div className="inline-flex sm:ml-14 ml-4 mt-6 border-2 border-gray-500 p-2 bg-blue-50 shadow-lg">
        <div className="font-bold text-lg">Your Balance</div>
        <div className="font-semibold text-lg ml-4">Rs. {balance}</div>
      </div>
    );
  }
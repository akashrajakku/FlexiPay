export default function Balance({ balance, balanceText, flag, onClick }) {
  return (
    <div 
      className="inline-flex sm:ml-14 ml-4 mt-6 border-2 border-gray-500 p-2 bg-blue-50 shadow-lg cursor-pointer" 
      onClick={onClick} 
    >
      <div className="font-bold text-lg">{balanceText}</div>
      {flag && <div className="font-semibold text-lg ml-4">Rs. {balance}</div>}
    </div>
  );
}

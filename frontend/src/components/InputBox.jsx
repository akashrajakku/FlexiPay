const InputBox = ({label, value, onChange, placeholder}) => {
  return (
    <label className="w-full block">
      <span className="block font-medium text-left text-sm pt-2 pb-1">{label}</span>
      <input type="text" value={value} onChange={onChange} className="border border-gray-300 rounded-md w-full px-4 py-2 bg-blue-50" placeholder={placeholder} />
    </label>
  )
}

export default InputBox;
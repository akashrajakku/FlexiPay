const InputBox = ({label, value, name, onChange, placeholder, autoComplete, type="text"}) => {
  return (
    <label className="w-full block">
      <span className="block font-medium text-left text-sm pt-2 pb-1">{label}</span>
      <input 
        type={type}
        value={value} 
        onChange={onChange} 
        name={name} 
        autoComplete={autoComplete}
        className="border border-gray-300 rounded-md w-full px-4 py-2 bg-blue-50" placeholder={placeholder} />
    </label>
  )
}

export default InputBox;
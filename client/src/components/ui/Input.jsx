export default function Input({ type, className, placeholder, value, onChange, name }) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`rounded-lg bg-gray-800 placeholder:gray-500 px-3 py-0.5 outline-1 outline-indigo-300 ${className}`}
    />
  );
}

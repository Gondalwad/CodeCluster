export default function Button({ value, className}) {

  return (
    <button
      className={`
        bg-indigo-600 text-white
        px-5 py-2 rounded-xl
        transition-all duration-200
    hover:bg-indigo-500 
        ${className}
      `}
    >
      {value}
    </button>
  );
}
export default function Button({ value, className, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        bg-indigo-600 text-white
        px-5 py-2 rounded-xl
        transition-all duration-200
        hover:bg-indigo-500 
        cursor-pointer
        border-2
        border-indigo-600
        ${className}
      `}
    >
      {value}
    </button>
  );
}

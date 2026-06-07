
export default function Input({type, className, placeholder}){
    return(
        <input type={type} placeholder={placeholder} className={"rounded-lg bg-gray-800 placeholder:gray-500 px-3 py-0.5 outline-1 outline-indigo-300"}/>
    )
}
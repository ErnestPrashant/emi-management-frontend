export function Button({label,onpress}){
    return <div className="content-between">
        <button onClick={onpress} className="text-white bg-gray-900 hover:bg-gray-700 
     font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 
     text-center w-80 ">
        {label}
        </button>
    </div>
}
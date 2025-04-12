export function InputBox({label, onChange}){
    return <div className="my-1">
        <div className="font-medium">{label}</div>
        <input 
        onChange={onChange}
        type="text" 
        className="w-80 h-10 border-2 rounded-lg border-gray-300 my-1.5 py-1"
        placeholder="Enter text here "/>
    </div>
}
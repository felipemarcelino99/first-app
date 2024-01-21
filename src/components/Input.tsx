type InputProps = {
    value: number,
    placeholder: string,
    setValue: (v: number) => void,
}

export default function Input({value, placeholder, setValue} : InputProps) {

    return (
        <input 
            type="number"
            min={20} 
            max={975} 
            value={value} 
            placeholder={placeholder}
            className={`p-2 w-full text-white bg-transparent border-2 border-pink-400 rounded-md placeholder:text-pink-400`} 
            onChange={(event) => setValue(+event.target.value)}
        />
    )
}
type ButtonProps = {
    title: string,
    value: string,
    type: string,
    setType: (v: string) => void,
}

export default function ButtonType({title, value, type, setType} : ButtonProps) {
    return (
        <button className={`w-full ${type === value ? 'bg-pink-400 text-white' : 'bg-white text-pink-700'} p-3 uppercase rounded-md active:scale-95 shadow-black-500/50`} value={value} onClick={(e) => setType(value)}>
            {title}
        </button>
    )
}
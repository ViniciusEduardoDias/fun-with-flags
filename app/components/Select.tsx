//import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

type SelectProps = {
    options: string [];
    selected: string;
    setSelected: (search: string) => void;
}

const Select = ({options, selected, setSelected}: SelectProps) => {
    const selectOptions = ["All", ...options];
    return (
        <div className="w-1/3">
           <select
                value={selected}
                className="w-full py-2 px-4 shadow focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300 rounded-lg"
                onChange={({ target }) => setSelected(target.value)} 
            >
                {selectOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
           </select>
        </div>
    )
}

export default Select;


/*<span className="absolute inset-y-0 right-2 flex items-center z-10">
                <MagnifyingGlassIcon className="size-4 text-gray-500" />
            </span>*/
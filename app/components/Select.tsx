'use client'

import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useEffect, useRef, useState } from 'react';

type SelectProps = {
    options: string[];
    selected: string;
    setSelected: (search: string) => void;
}

const Select = ({ options, selected, setSelected }: SelectProps) => {
    const listRef = useRef<HTMLUListElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);

    const handleButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setIsOpen(true);
        }
    };

    useEffect(() => {
        if (isOpen) {
            listRef.current?.focus();
            setFocusedIndex(0);
        } else {
            setFocusedIndex(-1);
        }
    }, [isOpen]);

    const handleListKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
        event.preventDefault();

        switch (event.key) {
            case "ArrowUp":
                setFocusedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : options.length - 1));
                break;

            case "ArrowDown":
                setFocusedIndex((prevIndex) => (prevIndex < options.length - 1 ? prevIndex + 1 : 0));
                break;

            case "Enter":
                if (focusedIndex >= 0) {
                    setSelected(options[focusedIndex]);
                    setIsOpen(false);
                }
                break;

            case "Escape":
                setIsOpen(false);
                break;

            case "Tab":
                setIsOpen(false);
                break;
        }
    };

    return (
        <div className="w-full md:w-1/3 relative">
            <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-labelledby="Listbox"
                onKeyDown={handleButtonKeyDown}
                className="w-full flex justify-between items-center py-2 text-left px-4 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300 rounded-lg"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selected}
                <ChevronDownIcon className={`w-4 h-4 ${isOpen ? "transform rotate-180" : ""}`} />
            </button>
            {isOpen && (
                <ul
                    ref={listRef}
                    role="listbox"
                    id="Listbox"
                    tabIndex={0}
                    aria-activedescendant={`option-${focusedIndex}`}
                    onKeyDown={handleListKeyDown}
                    className="absolute w-full rounded-lg bg-white mt-1 shadow-md overflow-hidden border-gray-300 focus:ring-blue-500 focus:outline-none z-10"
                >
                    {options.map((option, index) => (
                        <li
                            id={`option-${index}`}
                            className={`px-4 py-2 text-left cursor-pointer ${
                                focusedIndex === index ? "bg-blue-100" : "hover:bg-gray-100"
                            }`}
                            key={index}
                            role="option"
                            aria-selected={selected === option}
                            onMouseEnter={() => setFocusedIndex(index)}
                            onClick={() => {
                                setSelected(option);
                                setIsOpen(false);
                            }}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Select;


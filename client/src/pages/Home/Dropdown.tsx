import { useState } from "react";
import Select from "react-select";

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];

interface Props {
    isMulti: boolean,
    scrollPos: number
}

const Dropdown = ({ isMulti, scrollPos }: Props) => {
    const [selectedOption, setSelectedOption] = useState<any>(null);
console.log(selectedOption)
    return (
        <Select
            isMulti={isMulti}
            options={options}
            menuPlacement={scrollPos < 700 ? "bottom" : "top"}
            onChange={o => setSelectedOption(o)}
            styles={{
                control: (baseStyles, state) => ({
                    ...baseStyles,
                    maxWidth: "100%",
                    border: '1px solid #ccc',
                    borderRadius: "10px",
                    boxShadow: 'none',
                    outline: state.isFocused ? "5px solid rgba(255, 255, 0, .75)" : "none",
                }),
            }} />
    );
};

export default Dropdown;
import Select from "react-select";

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];

interface Props {
    handleChange: any,
    isMulti: boolean,
    scrollPos: number
}

const Dropdown = ({ handleChange, isMulti, scrollPos }: Props) => {
    return (
        <Select
            isMulti={isMulti}
            options={options}
            menuPlacement={scrollPos < 700 ? "bottom" : "top"}
            onChange={val => handleChange(val)}
            menuPortalTarget={document.body}
            styles={{
                control: (baseStyles, state) => ({
                    ...baseStyles,
                    maxWidth: "100%",
                    border: '1px solid #ccc',
                    borderRadius: "10px",
                    boxShadow: 'none',
                    outline: state.isFocused ? "5px solid rgba(255, 255, 0, .75)" : "none",
                }),
                menuPortal: styles => ({ ...styles, fontFamily: "Roboto", zIndex: "99999" })
            }} />
    );
};

export default Dropdown;
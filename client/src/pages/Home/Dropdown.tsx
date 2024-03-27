import Select from "react-select";

interface Props {
    handleChange: any,
    isMulti: boolean,
    scrollPos: number,
    options?: any[]
}

const Dropdown = ({ handleChange, isMulti, scrollPos, options }: Props) => {  
    return (
        <Select
            isMulti={isMulti}
            options={options || [{ value: 0, label: "Loading..." }]}
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
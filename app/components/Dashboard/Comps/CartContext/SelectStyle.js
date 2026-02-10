import Select from "react-select";

export const customStyles = {
  control: (base, state) => ({
    ...base,
    borderRadius: "12px",
    borderColor: state.isFocused ? "#D4AF37" : "#d1d5db",
    boxShadow: "none",
    padding: "3px",
    "&:hover": {
      borderColor: "#D4AF37",
    },
  }),

  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#D4AF37" // selected
      : state.isFocused
      ? "#FAF3D1" // hover (light gold)
      : "#fff",
    color: state.isSelected ? "#111" : "#111",
    cursor: "pointer",
  }),

  menu: (base) => ({
    ...base,
    borderRadius: "12px",
    overflow: "hidden",
  }),

  menuList: (base) => ({
    ...base,
    maxHeight: "200px",
    padding: 0,
  }),

  singleValue: (base) => ({
    ...base,
    color: "#111",
    fontWeight: 500,
  }),
};

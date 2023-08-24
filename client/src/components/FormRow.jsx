const FormRow = ({ type, name, labelText, defaultValue, onChange }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      {/* input id needs to match htmlFor in label; must have name attribute; (optional:) add a defaultValue to speed up development */}
      <input
        type={type}
        id={name}
        name={name}
        className="form-input"
        defaultValue={defaultValue || ""}
        onChange={onChange}
        autoComplete={type === "password" ? "current-password" : ""}
        required
      />
    </div>
  );
};
export default FormRow;

function LocaleNumberInput({ value, onChange, ...props }) {
  let newValue = value.toString().trim().replace(/,/g, "");
  if (!newValue) {
    newValue = 0;
  }
  newValue = parseInt(newValue).toLocaleString();

  let newOnChange = (e) => {
    let rawValue = e.target.value.trim();
    if (!rawValue) {
      rawValue = "0";
    }
    let rawNumber = parseInt(rawValue.replace(/,/g, ""));
    if (isNaN(rawNumber)) return;
    onChange(rawNumber);
  };

  return (
    <input type="text" value={newValue} onChange={newOnChange} {...props} />
  );
}

export default LocaleNumberInput;

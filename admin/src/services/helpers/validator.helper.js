const checkIsString = (text) => {
  console.log("********************************************");
  console.log(text);
  console.log("********************************************");

  if (typeof text !== "string")
    throw new Error("From checkIsString validator: input must be string");
};

export const mediumTextValidator = (text, allowEmpty = false) => {
  checkIsString(text);
  let t = text.trim();
  if (t.length === 0 && !allowEmpty) return "không được để trống";
  if (t.length > 255) return "không được quá 255 ký tự";
  return "";
};

export const longTextValidator = (text, allowEmpty = false) => {
  checkIsString(text);
  let t = text.trim();

  if (t.length === 0 && !allowEmpty) return "không được để trống";
  if (t.length > 1000) return "không được quá 1000 ký tự";
  return "";
};

export const slugValidator = (text) => {
  checkIsString(text);
  let t = text.trim();

  if (!/^([a-z0-9]+-?)+$/g.test(t) || t.length > 255)
    return "1 - 255 ký tự, chỉ được chứa chữ cá latin không dấu viết thường, chữ số và dấu gạch ngang không liên tiếp";

  return "";
};

export const hasAccent = (s) => {
  this.validateInput(s);
  return (
    /[áàảãạâấầẩẫậăắằẳẵặđéèẻẽẹêếềểễệóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵíìỉĩị]/gi.test(
      s
    ) || ""
  );
};

export const accentsRemover = (s) => {
  var r = s.toLowerCase();
  r = r.replace(new RegExp("[àáảãạãäåâấầậẩẫăắặẳẫẩ]", "g"), "a");
  r = r.replace(new RegExp("æ", "g"), "ae");
  r = r.replace(new RegExp("ç", "g"), "c");
  r = r.replace(new RegExp("[èéẻẹẽêëêếềểễệ]", "g"), "e");
  r = r.replace(new RegExp("[ìíîïỉĩị]", "g"), "i");
  r = r.replace(new RegExp("ñ", "g"), "n");
  r = r.replace(new RegExp("[òóỏõọöơớờởỡợôồốổỗộ]", "g"), "o");
  r = r.replace(new RegExp("œ", "g"), "oe");
  r = r.replace(new RegExp("[ùúụủũûüưứừửữự]", "g"), "u");
  r = r.replace(new RegExp("[ýÿỳỵỷỹ]", "g"), "y");
  r = r.replace(new RegExp("đ", "g"), "d");
  return r;
};

export const getFileExt = (s) => {
  return s.slice(s.lastIndexOf("."));
};

export const slugify = (str) => {
  function accentsRemover() {
    var r = str.toLowerCase();
    r = r.replace(new RegExp("[àáảãạãäåâấầậẩẫăắặẳẫẩ]", "g"), "a");
    r = r.replace(new RegExp("æ", "g"), "ae");
    r = r.replace(new RegExp("ç", "g"), "c");
    r = r.replace(new RegExp("[èéẻẹẽêëêếềểễệ]", "g"), "e");
    r = r.replace(new RegExp("[ìíîïỉĩị]", "g"), "i");
    r = r.replace(new RegExp("ñ", "g"), "n");
    r = r.replace(new RegExp("[òóỏõọöơớờởỡợôồốổỗộ]", "g"), "o");
    r = r.replace(new RegExp("œ", "g"), "oe");
    r = r.replace(new RegExp("[ùúụủũûüưứừửữự]", "g"), "u");
    r = r.replace(new RegExp("[ýÿỳỵỷỹ]", "g"), "y");
    r = r.replace(new RegExp("đ", "g"), "d");
    return r;
  }

  let t = str.trim();
  t = accentsRemover(t);
  t = t.replace(/[\/\\'":()^\*%$#@\!]/gi, "-");
  t = t.replace(/ /gi, "-");
  t = t.replace(/--*/gi, "-");
  t = t.replace(/^--*/gi, "");
  t = t.replace(/-*-$/gi, "");
  return t;
};

export const createUniqueSuffix = () => {
  let uniqueSuffix = "";
  uniqueSuffix += Math.round(Math.random() * 10000);
  uniqueSuffix += "-";
  uniqueSuffix += Math.round(Math.random() * 10000);
  uniqueSuffix += "-";
  uniqueSuffix += Date.now() / 1000;
  return uniqueSuffix;
};

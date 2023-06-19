const accentsRemover = (s) => {
  var r = s.toLowerCase();
  r = r.replace(new RegExp("\\s", "g"), "");
  r = r.replace(new RegExp("[àáảãạãäåâấầậẩẫăắặẳẫẩ]", "g"), "a");
  r = r.replace(new RegExp("æ", "g"), "ae");
  r = r.replace(new RegExp("ç", "g"), "c");
  r = r.replace(new RegExp("[èéẻẹẽêëêếềểễệ]", "g"), "e");
  r = r.replace(new RegExp("[ìíîïỉĩị]", "g"), "i");
  r = r.replace(new RegExp("ñ", "g"), "n");
  r = r.replace(new RegExp("[òóôõöơớờởỡợôồốổỗộ]", "g"), "o");
  r = r.replace(new RegExp("œ", "g"), "oe");
  r = r.replace(new RegExp("[ùúụủũûüưứừửữự]", "g"), "u");
  r = r.replace(new RegExp("[ýÿỳỵỷỹ]", "g"), "y");
  r = r.replace(new RegExp("\\W", "g"), "");
  return r;
};

export default accentsRemover;

module.exports = (req, res, next) => {
  const availableLanguages = ["vi", "en"];

  let lang = req.query.lang;
  if (!lang || !availableLanguages.includes(lang)) {
    lang = "vi";
  }

  req.lang = lang;
  return next();
};

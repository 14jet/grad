const Guide = require("../../models/guide.model");
const GuidesCategory = require("../../models/guides-category.model");

module.exports.getGuides = async (lang) => {
  let guides = await Guide.fetchAll();

  guides = guides.map((guide) => {
    // fields phụ thuộc ngôn ngữ
    let title;
    let content;

    if (lang === "en") {
      title = guide.en.title;
      content = guide.en.content;
    } else {
      title = guide.title;
      content = guide.content;
    }

    return {
      title: title,
      content: content,

      id: guide.id,
      slug: guide.slug,
      author: guide.author,
      origin: guide.origin,
      thumb: guide.thumb,
      banner: guide.banner,
      category: guide.category,
      createdAt: guide.createdAt,
    };
  });

  return guides;
};

module.exports.getGuidesCategory = async (lang) => {
  let guidesCategory = await GuidesCategory.fetchAll();
  guidesCategory = guidesCategory.map((item) => {
    const name = lang === "en" ? item.en.name : item.name;

    return {
      name,
      id: item.id,
      slug: item.slug,
    };
  });

  return guidesCategory;
};

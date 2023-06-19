const getUrl = require("./urlFromPath");

const transformGuide = (guide) => {
  const content = {
    ops: guide.content.ops.map((item) => {
      if (item.insert.image?.src) {
        const a = structuredClone(item);
        a.insert.image.src = getUrl(a.insert.image.src);
        return a;
      }

      return item;
    }),
  };

  const enContent = {
    ops: guide.en.content.ops.map((item) => {
      if (item.insert.image?.src) {
        const a = structuredClone(item);
        a.insert.image.src = getUrl(a.insert.image.src);
        return a;
      }

      return item;
    }),
  };

  

  
};

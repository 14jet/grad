import { imageDimensions } from "../../services/constants";

function setMetaTags(tour) {
  const ogTitle =
    document.querySelector("meta[property='og:title']") ||
    document.createElement("meta");

  ogTitle.setAttribute("property", "og:title");
  ogTitle.content = tour.name + " " + tour.code;

  const ogDescription =
    document.querySelector("meta[property='og:description']") ||
    document.createElement("meta");

  ogDescription.property = "og:description";
  ogDescription.setAttribute("property", "og:description");
  ogDescription.content = tour.name;

  const ogImageContent =
    document.querySelector("meta[property='og:image']") ||
    document.createElement("meta");
  ogImageContent.setAttribute("property", "og:image");
  ogImageContent.content = tour.thumb + "?" + imageDimensions.md;

  const ogImageType =
    document.querySelector("meta[property='og:image:type']") ||
    document.createElement("meta");
  ogImageType.setAttribute("property", "og:image:type");
  ogImageType.content = "image/jpeg";

  const ogImageWidth =
    document.querySelector("meta[property='og:image:width']") ||
    document.createElement("meta");
  ogImageWidth.setAttribute("property", "og:image:width");
  ogImageWidth.content = "800";

  const ogImageHeight =
    document.querySelector("meta[property='og:image:height']") ||
    document.createElement("meta");
  ogImageHeight.setAttribute("property", "og:image:height");
  ogImageHeight.content = "530";

  const ogImageAlt =
    document.querySelector("meta[property='og:image:alt']") ||
    document.createElement("meta");
  ogImageAlt.setAttribute("property", "og:image:alt");
  ogImageAlt.content = tour.name;

  const metaCharsetTag = document.querySelector("meta[charset]");

  insertTag(ogTitle);
  insertTag(ogImageContent);
  insertTag(ogImageType);
  insertTag(ogImageWidth);
  insertTag(ogImageHeight);
  insertTag(ogImageAlt);
  insertTag(ogDescription);

  function insertTag(elementTag) {
    document.head.insertBefore(elementTag, metaCharsetTag);
  }
}

export default setMetaTags;

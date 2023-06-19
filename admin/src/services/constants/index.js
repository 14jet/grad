export const PAGE_SIZE = 6;
export const PHONE_REGEXP =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
export const EMAIL_REGEXP = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
export const URL_REGEXP = /([^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;
export const PRODUCT_NAME_REGEXP =
  /^[a-zA-Z0-9áàảãạâấầẩẫậăắằẳẵạóòỏõọơớờởỡợôốồổỗộúùủũụưứừửữựíìỉĩịýỳỷỹỵéèẻẽẹêếềểễệđ\-\:\[\] ]{10,500}$/i;

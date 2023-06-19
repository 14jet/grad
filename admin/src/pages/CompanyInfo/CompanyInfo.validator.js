import * as Yup from "yup";
import { PHONE_REGEXP } from "../../services/constants";

export default Yup.object().shape({
  name: Yup.string().required("Bắt buộc").max(255),
  address: Yup.string().required("Bắt buộc").max(255),
  email: Yup.string().email("Email không hợp lệ").required("Bắt buộc").max(255),
  phone: Yup.string()
    .matches(PHONE_REGEXP, "Số điện thoại không hợp lệ")
    .required("Bắt buộc")
    .max(255),
  hotline: Yup.string()
    .matches(PHONE_REGEXP, "Hotline không hợp lệ")
    .required("Bắt buộc")
    .max(255),
  website: Yup.string().url("Url không hợp lệ").required("Bắt buộc").max(255),
  license_name: Yup.string().required("Bắt buộc").max(255),
  license_agency: Yup.string().required("Bắt buộc").max(255),
  license_number: Yup.string().required("Bắt buộc").max(255),
  license_date: Yup.string().required("Bắt buộc").max(255),
  facebook: Yup.string().url("Url không hợp lệ").required("Bắt buộc").max(255),
  instagram: Yup.string().url("Url không hợp lệ").max(255),
  youtube: Yup.string().url("Url không hợp lệ").max(255),
  en: Yup.object().shape({
    name: Yup.string().required("Bắt buộc").max(255),
    address: Yup.string().required("Bắt buộc").max(255),
    license_name: Yup.string().required("Bắt buộc").max(255),
    license_agency: Yup.string().required("Bắt buộc").max(255),
  }),
});

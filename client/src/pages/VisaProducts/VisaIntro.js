import { useTranslation } from "react-i18next";
import styles from "./VisaProducts.module.css";

function VisaIntro({ countryName }) {
  const lang = useTranslation().i18n.language;

  if (lang === "en")
    return (
      <ul className={styles.intro}>
        <li>
          Visa service to helps to advise and give the most effective solution
          for your profile;
        </li>
        <li>
          Support translation, notarization of documents to complete the
          application;
        </li>
        <li>Instructions to fill out the complete visa application form;</li>
        <li>Visa service to process documents quickly;</li>
        <li>Make an appointment with the governing body;</li>
        <li>Share your visa interview experience;</li>
        <li>
          Advise on buying airline tickets and booking hotels with many
          incentives;
        </li>
        <li>Following up documents and receiving visas for customers;</li>
      </ul>
    );

  return (
    <ul className={styles.intro}>
      <li>
        Dịch vụ làm visa giúp tư vấn và đưa ra giải pháp hiệu quả nhất cho hồ sơ
        của bạn;
      </li>
      <li>Hỗ trợ dịch thuật, công chứng giấy tờ hoàn thiện hồ sơ;</li>
      <li>Hướng dẫn điền tờ khai xin visa hoàn chỉnh;</li>
      <li>Dịch vụ làm visa xử lý hồ sơ nhanh chóng;</li>
      <li>Đặt lịch hẹn với cơ quan lãnh sự;</li>
      <li>Chia sẻ kinh nghiệm phỏng vấn visa;</li>
      <li>Tư vấn mua vé máy bay và đặt khách sạn với nhiều ưu đãi;</li>
      <li>Theo dõi hồ sơ và nhận visa giúp khách hàng;</li>
    </ul>
  );
}

export default VisaIntro;

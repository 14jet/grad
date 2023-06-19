import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import QuillReader from "../../components/QuillReader";
import ErrorPage from "../../components/ErrorPage";
import Placeholder from "../../components/placeholders/Placeholder";
import useAxios from "../../hooks/useAxios";
import { fetchSingleTerm } from "../../services/apis";
import styles from "./Term.module.css";

function Term() {
  // luu-y | dieu-kien-dang-ky | phuong-thuc-thanh-toan | chinh-sach-bao-mat | dieu-kien-dang-ky
  const { slug } = useParams();
  const [sendRequest, isLoading, data, error] = useAxios();
  const lang = useTranslation().i18n.language;

  const TERM_ITEMS = new Map([
    [
      "thong-tin-can-luu-y",
      {
        code: "notes",
        title: {
          en: "Notes",
          vi: "Thông tin cần lưu ý",
        },
      },
    ],
    [
      "dieu-kien-dang-ky",
      {
        code: "registration",
        title: {
          en: "Registration policy",
          vi: "Điều kiện đăng ký",
        },
      },
    ],
    [
      "phuong-thuc-thanh-toan",
      {
        code: "payment",
        title: {
          en: "Payment methods",
          vi: "Phương thức thanh toán",
        },
      },
    ],
    [
      "chinh-sach-bao-mat",
      {
        code: "privacy",
        title: {
          en: "Privacy policies",
          vi: "Chính sách bảo mật",
        },
      },
    ],
    [
      "dieu-kien-huy-doi",
      {
        code: "cancellation",
        title: {
          en: "Cancellation policies",
          vi: "Điều kiện hủy đổi",
        },
      },
    ],
  ]);

  const delta = useMemo(() => (data ? data.data : [{ insert: "/n" }]), [data]);

  const termItem = useMemo(() => TERM_ITEMS.get(slug), [slug]);

  useEffect(() => {
    if (termItem) {
      sendRequest(fetchSingleTerm(termItem.code));
    }
  }, [termItem]);

  if (!termItem) {
    return <ErrorPage code={404} message={"Page Not Found"} />;
  }

  return (
    <>
      {!error && data && !isLoading && (
        <div className="container-lg py-5">
          <h1 className="text-center fs-3 mb-4">
            {TERM_ITEMS.get(slug).title[lang]}
          </h1>

          <div className={styles.content + " bg-light border p-4"}>
            <QuillReader delta={delta} />
          </div>
        </div>
      )}

      {isLoading && (
        <div className="container-lg py-5">
          <h1 className="text-center fs-3 mb-4">
            <Placeholder col={6} height="20px" />
          </h1>

          <div className={styles.content + " bg-light border p-4"}>
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-secondary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && <ErrorPage code={error.httpCode} message={error.message} />}
    </>
  );
}

export default Term;

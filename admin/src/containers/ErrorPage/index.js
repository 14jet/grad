import { Link, useNavigate } from "react-router-dom";

import styles from "./ErrorPage.module.css";

function ErrorPage({ code, message }) {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      {code === 404 && (
        <div>
          <h2>404</h2>
          <h3>Not Found</h3>

          <p>Trang bạn yêu cầu không tồn tại</p>

          <button onClick={() => navigate("/")}>Về trang chủ</button>
          <button onClick={() => navigate(-1)}>Quay lại</button>
        </div>
      )}

      {code !== 404 && (
        <div>
          {code && <h2>{code}</h2>}

          <h3>Đã có lỗi xảy ra</h3>

          <p>{message}</p>

          <button onClick={() => navigate("/")}>Về trang chủ</button>
          <button onClick={() => navigate(-1)}>Quay lại</button>
        </div>
      )}
    </div>
  );
}

export default ErrorPage;

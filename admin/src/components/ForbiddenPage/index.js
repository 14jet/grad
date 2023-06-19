import { useNavigate } from "react-router-dom";

function ForbiddenPage() {
  const navigate = useNavigate();

  const goBackHandler = () => {
    navigate(-1);
  };

  const goHome = () => {
    navigate("/");
  };
  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex align-items-center bg-secondary justify-content-center "
    >
      <div className="bg-light rounded px-5 py-3 shadow  border">
        <h1 className="text-center">403</h1>
        <p className="text-center">Bạn không có quyền xem nội dung này</p>
        <div className="d-flex align-items-center justify-content-between">
          <button onClick={goHome} className="btn btn-primary">
            Trang chủ
          </button>

          <button onClick={goBackHandler} className="btn btn-danger">
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForbiddenPage;

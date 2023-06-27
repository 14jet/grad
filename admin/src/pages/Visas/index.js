// main
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

// components
import TopBar from "../../components/TopBar";
import NotifyModal from "../../components/NotifyModal";
import Pagination from "../../containers/Pagination";
import VisasFilter from "./VisasFilter";
import { Table, TBody, TCell, THead } from "../../components/table";
import SpinnerModal from "../../components/SpinnerModal";
import VisaItem from "./VisaItem";

// other
import usePageTitle from "../../hooks/usePageTitle";
import { deleteVisa, resetVisasState } from "../../store/visas.slice";
import { selectIsAdmin } from "../../store/user.slice";
import * as pageHelper from "../../services/helpers/pageHelpers";
import searchHelper from "../../services/helpers/searchHelper";

function Visas() {
  const [confirmDelete, setConfirmDelete] = useState(null);
  const navigate = useNavigate();
  const params = new URL(document.location).searchParams;
  const search = params.get("search") || "";
  const isAdmin = useSelector(selectIsAdmin);

  let { page, country } = useParams();
  page = pageHelper.getPage(page);

  const deleteHandler = (visaProduct) => {
    setConfirmDelete(visaProduct);
  };

  const dispatch = useDispatch();
  let { status, error, visas } = useSelector((state) => state.visas);

  const paginationHandler = (pageNumber) => {
    let path = `/visas`;

    if (pageNumber > 1) {
      path += `/${pageNumber}`;
    }

    if (search) {
      path += `?search=${search}`;
    }

    navigate(path);
  };

  const availableCountries = Array.from(
    new Set(visas.map((item) => JSON.stringify(item.country)))
  ).map((item) => JSON.parse(item));

  let filteredVisas = visas;

  if (search) {
    filteredVisas = searchHelper(search, filteredVisas)
  }

  const paginatedVisas = pageHelper.getItems(filteredVisas, page);

  let notify = {};
  if (status.deleteVisa === "succeeded") {
    notify = {
      type: "success",
      message: "Đã xóa",
      btn: {
        text: "OK",
        cb: () => {
          dispatch(resetVisasState("deleteVisa"));
        },
        component: "button",
      },
      show: status.deleteVisa === "succeeded",
    };
  }

  if (error.deleteVisa) {
    notify = {
      type: "error",
      message: error.deleteVisa.message,
      btn: {
        text: "OK",
        cb: () => {
          dispatch(resetVisasState("deleteVisa"));
        },
        component: "button",
      },
      onHide: () => {
        dispatch(resetVisasState("deleteVisa"));
      },
      show: Boolean(error.deleteVisa),
    };
  }

  if (confirmDelete) {
    notify = {
      type: "normal",
      message: `Bạn có chắc muốn xóa visa: "${confirmDelete.name}" không?`,
      leftBtn: {
        text: "Có",
        cb: () => {
          dispatch(deleteVisa(confirmDelete._id));
          setConfirmDelete(null);
        },
        component: "button",
      },
      rightBtn: {
        text: "Không",
        cb: () => {
          setConfirmDelete(null);
        },
        component: "button",
      },
      onHide: () => {
        setConfirmDelete(null);
      },
      show: confirmDelete,
    };
  }

  usePageTitle("Visas");
  return (
    <>
      <SpinnerModal
        show={
          status.fetchVisas === "pending" || status.deleteVisa === "pending"
        }
      />
      <NotifyModal {...notify} />

      <TopBar title="Dịch vụ visa">
        {status.fetchVisas === "succeeded" && (
          <>
            <Link className="btn btn-primary" to="/visas/them-moi">
              Tạo visa mới
            </Link>

            <Link className="btn btn-primary" to="/visas/thanh-toan">
              Payments
            </Link>
          </>
        )}
      </TopBar>

      <div className="p-2">
        <div className="p-2 shadow rounded bg-light">
          {status.fetchVisas === "succeeded" && visas.length > 0 && (
            <div className="pb-2 border-bottom mb-3">
              <VisasFilter availableCountries={availableCountries} />
            </div>
          )}
          {status.fetchVisas === "succeeded" && filteredVisas.length > 0 && (
            <Table>
              <THead>
                <tr>
                  <TCell w="70px">STT</TCell>
                  <TCell>Tên</TCell>
                  <TCell w="160px">Nước</TCell>
                  <TCell w="100px">Công cụ</TCell>
                </tr>
              </THead>

              <TBody>
                {paginatedVisas.map((visa, index) => (
                  <VisaItem
                    key={visa._id}
                    order={index + 1}
                    visa={visa}
                    onDelete={deleteHandler}
                  />
                ))}
              </TBody>
            </Table>
          )}

          {status.fetchVisas === "succeeded" &&
            !search &&
            filteredVisas.length === 0 && <p>Không có sản phẩm visa nào</p>}

          {status.fetchVisas === "succeeded" &&
            filteredVisas.length === 0 &&
            search && <p>Không tìm thấy kết quả phù hợp</p>}

          {status.fetchVisas === "succeeded" && filteredVisas.length > 0 && (
            <Pagination
              totalPage={pageHelper.getTotalPage(filteredVisas)}
              currentPage={page}
              callback={paginationHandler}
            />
          )}

          {error.fetchVisas && (
            <p className="text-danger m-0">{error.fetchVisas.message}</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Visas;

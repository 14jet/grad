// main
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// components
import TopBar from "../../components/TopBar";
import NotifyModal from "../../components/NotifyModal";
import Pagination from "../../containers/Pagination";
import { Table, THead, TBody, TCell } from "../../components/table";
import DetailsModal from "./DetailsModal";

// css
import SpinnerModal from "../../components/SpinnerModal";
import usePageTitle from "../../hooks/usePageTitle";
import * as pageHelper from "../../services/helpers/pageHelpers";
import OrderItem from "./OrderItem";
import useAxios from "../../hooks/useAxios";
import { fetchOrders, deleteOrder } from "../../services/apis";
import socket from "../../services/socket.io";


function Orders() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const [goDelete, deleting, deleted, deletingError, resetDelete] = useAxios();
  const [modalDetails, setModalDetails] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [orders, setOrders] = useState(null)

  const navigate = useNavigate();
  let { page } = useParams();
  page = pageHelper.getPage(page);


  const onShowModal = (order) => {
    setModalDetails(order);
  };

  const deleteHandler = (order) => {
    setConfirmDelete(order);
  };

  const paginationHandler = (pageNumber) => {
    let path = `/don-hang`;

    if (pageNumber > 1) {
      path += `/${pageNumber}`;
    }

    navigate(path);
  };

  let notify = {};
  if (deleted) {
    notify = {
      type: "success",
      message: "Đã xóa",
      btn: {
        text: "OK",
        cb: () => {
          setOrders(prev => prev.filter(item => item._id != deleted.data._id))
          resetDelete();
        },
        component: "button",
      },
      show: deleted,
    };
  }

  if (deletingError) {
    notify = {
      type: "error",
      message: deletingError.message,
      btn: {
        text: "OK",
        cb: () => {
          resetDelete();
        },
        component: "button",
      },
      onHide: () => {
        resetDelete();
      },
      show: deletingError,
    };
  }

  if (confirmDelete) {
    notify = {
      type: "normal",
      message: `Bạn có chắc muốn xóa item: "${confirmDelete._id}" không?`,
      leftBtn: {
        text: "Có",
        cb: () => {
          goDelete(deleteOrder(confirmDelete._id));
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

  useEffect(() => {
    sendRequest(fetchOrders(page));
  }, [page]);

  useEffect(() => {
    if (data) {
      setOrders(data.data)
    }
  }, [data])

  useEffect(() => {
    const listener = (data) => {
      if (page == 1) {
        setOrders(prev => [data,...prev]);
      }
    }

    socket.on("NEW_ORDER", listener);

    return () => {
      socket.off('NEW_ORDER', listener)
    }
  }, [page])

  usePageTitle("Đơn hàng");
  return (
    <>
      <SpinnerModal show={isLoading || deleting} />
      <NotifyModal {...notify} />

      <TopBar title="Đơn hàng"></TopBar>
      {modalDetails && (
        <DetailsModal
          order={modalDetails}
          show={Boolean(modalDetails)}
          onHide={() => {
            setModalDetails(null);
          }}
        />
      )}

      <div className="p-2">
        <div className="p-2 shadow rounded bg-light">
          {orders?.length > 0 && (
            <>
              <Table>
                <THead>
                  <tr>
                    <TCell w="70px">STT</TCell>
                    <TCell w="80px">Loại</TCell>
                    <TCell w="280px">Họ tên</TCell>
                    <TCell w="160px">SĐT</TCell>
                    <TCell w="300px">Thời gian cập nhật</TCell>
                    <TCell w="150px">Trạng thái</TCell>
                    <TCell w="100px">Công cụ {page}</TCell>
                  </tr>
                </THead>

                <TBody>
                  {orders.map((order, index) => (
                    <OrderItem
                      key={order._id}
                      orderNumber={pageHelper.getOrder(page, index)}
                      order={order}
                      onDelete={deleteHandler}
                      onShowModal={onShowModal}
                    />
                  ))}
                </TBody>
              </Table>
            </>
          )}

          {orders && orders.length === 0 && <p>Không có đơn hàng nào</p>}

          {orders && orders.length > 0 && (
            <Pagination
              totalPage={data?.metadata.totalPage}
              currentPage={page}
              callback={paginationHandler}
            />
          )}

          {error && <p className="text-danger m-0">{error.message}</p>}
        </div>
      </div>
    </>
  );
}

export default Orders;

import { useState } from "react";
import { Link, useNavigate, useParams, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// components
import Pagination from "../../containers/Pagination";
import SpinnerModal from "../../components/SpinnerModal";
import GuidesFilter from "./GuidesFilter";
import NotifyModal from "../../components/NotifyModal";
import TopBar from "../../components/TopBar";
import { Table, TBody, THead, TCell } from "../../components/table";
import GuideItem from "./GuideItem";

// other
import usePageTitle from "../../hooks/usePageTitle";
import { deleteGuide, resetGuidesState } from "../../store/guides.slice";
import searchHelper from "../../services/helpers/searchHelper";
import { selectIsAdmin } from "../../store/user.slice";
import * as pageHelper from '../../services/helpers/pageHelpers'

// css
import "./Guides.override.css";

function Guides() {
  const [confirmDelete, setConfirmDelete] = useState(null); // null | guide
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdmin = useSelector(selectIsAdmin);

  const params = new URL(document.location).searchParams;
  const search = params.get("search") || "";
  let { category, page } = useParams();
  page = pageHelper.getPage(page)

  const {
    error,
    status,
    guides,
    category: guidesCategory,
  } = useSelector((state) => state.guides);

  const changePageHandler = (pageNum) => {
    let path = `/guides`;

    if (category) {
      path += `/phan-loai/${category}`;
    }

    if (pageNum > 1) {
      path += `/${pageNum}`;
    }

    if (search) {
      path += `?search=${search}`;
    }
    navigate(path);
  };

  const onDelete = (guide) => {
    setConfirmDelete(guide);
  };

  let filteredGuides = guides;

  if (category) {
    filteredGuides = filteredGuides.filter(
      (guide) => guide.category.slug === category
    );
  }

  if (search) {
    filteredGuides = searchHelper(search, filteredGuides);
  }

  const totalPage = pageHelper.getTotalPage(filteredGuides);
  const paginatedGuides = pageHelper.getItems(filteredGuides, page);

  // notification
  let notify = {};
  if (confirmDelete) {
    notify = {
      show: confirmDelete,
      type: "normal",
      message: `Bạn có chắc muốn xóa bài viết ${confirmDelete.title} không?`,
      leftBtn: {
        text: "Có",
        component: "button",
        cb: () => {
          dispatch(deleteGuide(confirmDelete._id));
          setConfirmDelete(null);
        },
      },
      rightBtn: {
        text: "Không",
        component: "button",
        cb: () => {
          setConfirmDelete(null);
        },
      },
    };
  }

  if (status.deleteGuide === "succeeded") {
    notify = {
      show: status.deleteGuide === "succeeded",
      type: "success",
      message: `Đã xóa`,
      btn: {
        text: "OK",
        cb: () => {
          dispatch(resetGuidesState("deleteGuide"));
        },
        component: "button",
      },
      onHide: () => {
        dispatch(resetGuidesState("deleteGuide"));
      },
      time: 2000,
    };
  }

  if (error.deleteGuide) {
    notify = {
      show: error.deleteGuide,
      type: "error",
      message: error.deleteGuide.message,
      btn: {
        text: "OK",
        cb: () => {
          dispatch(resetGuidesState("deleteGuide"));
        },
        component: "button",
      },
      onHide: () => {
        dispatch(resetGuidesState("deleteGuide"));
      },
    };
  }

  usePageTitle("Guides");

  const isInvalidPage = isNaN(page) || !Number.isInteger(page) || page < 1;
  if (isInvalidPage) return <Navigate to="/guides" />;

  return (
    <>
      <NotifyModal {...notify} />

      <SpinnerModal
        show={
          status.fetchGuides === "pending" || status.deleteGuide === "pending"
        }
      />

      <TopBar title="Guides">
        {status.fetchGuides === "succeeded" && (
          <>
            {isAdmin && (
              <Link to="/guides/them-moi" className="btn btn-primary">
                Tạo bài viết mới
              </Link>
            )}
            <Link to="/guides/quan-ly-danh-muc" className="btn btn-primary">
              Danh mục
            </Link>
          </>
        )}
      </TopBar>

      <div className="p-2">
        <div className="p-2 rounded shadow bg-light">
          {guidesCategory.length > 0 && (
            <div className="pb-2 border-bottom mb-3">
              <GuidesFilter categories={guidesCategory} />
            </div>
          )}
          {filteredGuides.length > 0 && status.fetchGuides === "succeeded" && (
            <>
              <Table>
                <THead>
                  <tr>
                    <TCell w="80px">STT</TCell>
                    <TCell>Tiêu đề</TCell>
                    <TCell w="200px">Danh mục</TCell>
                    {isAdmin && <TCell w="120px">Hành động</TCell>}
                  </tr>
                </THead>

                <TBody>
                  {paginatedGuides.map((item, index) => (
                    <GuideItem
                      order={pageHelper.getOrder(page, index)}
                      guide={item}
                      onDelete={onDelete}
                      key={item._id}
                    />
                  ))}
                </TBody>
              </Table>

              {filteredGuides && (
                <Pagination
                  totalPage={totalPage}
                  currentPage={page}
                  callback={changePageHandler}
                />
              )}
            </>
          )}

          {filteredGuides.length === 0 &&
            status.fetchGuides === "succeeded" &&
            !search && <p>Không có bài viết nào</p>}

          {filteredGuides.length === 0 &&
            status.fetchGuides === "succeeded" &&
            search && <p>Không tìm thấy kết quả phù hợp</p>}

          {error.fetchGuides && (
            <p className="text-danger m-0">{error.fetchGuides.message}</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Guides;

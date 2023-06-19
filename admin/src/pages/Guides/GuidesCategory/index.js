// main
import { useState } from "react";

// components
import GuidesCategoryModal from "./GuidesCategoryModal";
import NotifyModal from "../../../components/NotifyModal";
import TopBar from "../../../components/TopBar";
import { Table, TBody, TCell, THead } from "../../../components/table";

// other
import usePageTitle from "../../../hooks/usePageTitle";
import { useDispatch, useSelector } from "react-redux";
import { resetGuidesState, deleteCategory } from "../../../store/guides.slice";
import { selectIsAdmin } from "../../../store/user.slice";
import GuideCategoryItem from "./GuideCategoryItem";

function GuidesCategory() {
  const [confirmDelete, setConfirmDelete] = useState(null); // categoryItem
  const { category, status, error } = useSelector((state) => state.guides);
  const [modal, setModal] = useState({
    show: false,
    mode: "",
    item: null,
  });
  const isAdmin = useSelector(selectIsAdmin);

  const dispatch = useDispatch();

  // notification
  let notify = {};
  if (confirmDelete) {
    notify = {
      show: Boolean(confirmDelete),
      type: "normal",
      message: `Bạn có chắc muốn xóa danh mục "${confirmDelete.name}" không?`,
      leftBtn: {
        component: "button",
        text: "Xóa",
        cb: () => {
          dispatch(deleteCategory(confirmDelete._id));
          setConfirmDelete(null);
        },
      },
      rightBtn: {
        component: "button",
        text: "Hủy",
        cb: () => {
          setConfirmDelete(null);
        },
      },
    };
  }

  if (status.deleteCategory === "succeeded") {
    notify = {
      show: status.deleteCategory === "succeeded",
      type: "success",
      message: "Đã xóa",
      btn: {
        component: "button",
        text: "OK",
        cb: () => {
          dispatch(resetGuidesState("deleteCategory"));
        },
      },
    };
  }

  if (error.deleteCategory) {
    notify = {
      show: Boolean(error.deleteCategory),
      type: "error",
      message: error.deleteCategory.message,
      btn: {
        component: "button",
        text: "OK",
        cb: () => {
          dispatch(resetGuidesState("deleteCategory"));
        },
      },
    };
  }

  usePageTitle("Danh mục Guides");

  const onUpdate = (categoryItem) => {
    setModal({ show: true, mode: "edit", item: categoryItem });
  };

  const onDelete = (categoryItem) => {
    setConfirmDelete(categoryItem);
  };

  const onClickAddCategory = () => {
    setModal({ show: true, mode: "add", item: null });
  };

  const onHideModal = () => {
    setModal((prev) => ({ ...prev, show: false }));
  };

  return (
    <>
      <NotifyModal {...notify} />
      <TopBar title="Quản lý danh mục guides">
        {status.fetchGuides === "succeeded" && isAdmin && (
          <button className="btn btn-primary" onClick={onClickAddCategory}>
            Thêm danh mục
          </button>
        )}
      </TopBar>

      <div className="p-2">
        <div className="p-2 rounded shadow bg-light">
          {status.fetchGuides === "succeeded" && category.length > 0 && (
            <Table>
              <THead>
                <tr>
                  <TCell>STT</TCell>
                  <TCell>Tiếng Việt</TCell>
                  <TCell>Tiếng Anh</TCell>
                  {isAdmin && <TCell>Công cụ</TCell>}
                </tr>
              </THead>

              <TBody>
                {category.map((item, index) => (
                  <GuideCategoryItem
                    key={item._id}
                    order={index + 1}
                    categoryItem={item}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                  />
                ))}
              </TBody>
            </Table>
          )}

          {status.fetchGuides === "succeeded" && category.length === 0 && (
            <h6>Không có item nào</h6>
          )}

          {error.fetchGuides && (
            <p className="text-danger m-0">{error.fetchGuides.message}</p>
          )}
        </div>
      </div>

      <GuidesCategoryModal {...modal} onHide={onHideModal} />
    </>
  );
}

export default GuidesCategory;

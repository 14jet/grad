import { resetToursState, deleteTour } from "../../store/tours.slice";
import { useDispatch } from "react-redux";
import NotifyModal from "../../components/NotifyModal";

function ToursNotificationModal({
  wasDeleted,
  deletingError,
  tourConfirmToDelete,
  finishConfirmToDelete,
}) {
  const dispatch = useDispatch();

  let notify = {};
  if (wasDeleted) {
    notify = {
      type: "success",
      message: "Xóa thành công",
      btn: {
        text: "OK",
        cb: () => {
          dispatch(resetToursState("deleteTour"));
        },
        component: "button",
      },
      show: wasDeleted,
    };
  }

  if (deletingError) {
    notify = {
      type: "error",
      message: deletingError.message,
      btn: {
        text: "OK",
        cb: () => {
          dispatch(resetToursState("deleteTour"));
        },
        component: "button",
      },
      onHide: () => {
        dispatch(resetToursState("deleteTour"));
      },
      show: Boolean(deletingError),
    };
  }

  if (tourConfirmToDelete) {
    notify = {
      type: "normal",
      message: `Bạn có chắc muốn xóa tour [${tourConfirmToDelete.name}] không?`,
      leftBtn: {
        text: "Có",
        cb: () => {
          dispatch(deleteTour(tourConfirmToDelete._id));
          finishConfirmToDelete();
        },
        component: "button",
      },
      rightBtn: {
        text: "Không",
        cb: () => {
          finishConfirmToDelete();
        },
        component: "button",
      },
      onHide: () => {
        finishConfirmToDelete();
      },
      show: tourConfirmToDelete,
    };
  }

  return <NotifyModal {...notify} />;
}

export default ToursNotificationModal;

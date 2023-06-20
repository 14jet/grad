import { Formik, Form } from "formik";
import { useTranslation } from "react-i18next";
import { useRef, useEffect } from "react";
import { format } from "date-fns";
import CustomModal, {
  DateFormGroup,
  FormGroup,
} from "../../../../components/CustomModal";
import * as Yup from "yup";
import { bookTour } from "../../../../services/apis";
import useAxios from "../../../../hooks/useAxios";
import { PHONE_REGEXP } from "../../../../services/constants";

const initialValues = {
  fullname: "",
  email: "",
  phone: "",
  gender: "",
  adult: "1",
  children: "0",
  date: "",
};

function BookingModal({ selectedDate, setSelectedDate, onHide, ...props }) {
  const [sendRequest, isLoading, data, error, resetStates] = useAxios();
  const numbers = Object.keys(new Array(31).fill(1)).slice(1);

  const { t } = useTranslation();

  const submitHandler = async (values) => {
    const tour = props.tour;
    resetStates();
    sendRequest(
      bookTour({
        tourCode: tour.code,
        fullname: values.fullname,
        phone: values.phone,
        gender: values.gender,
        adult: Number(values.adult),
        children: Number(values.children),
        departureDate: values.date,
      })
    );
  };

  const required = t("form.required");
  const bookingTourSchema = Yup.object().shape({
    fullname: Yup.string().required(required),
    phone: Yup.string()
      .matches(PHONE_REGEXP, t("form.errors.invalidPhoneNumber"))
      .required(required),
    gender: Yup.string().required(required),
    adult: Yup.number().min(1).required(required),
    children: Yup.number().min(0).required(required),
    date: Yup.string().required(required),
  });

  useEffect(() => {
    if (data) {
      onHide();
    }
  }, [data]);

  const submitRef = useRef();
  return (
    <CustomModal
      title={`${props.tour.name} [${props.tour.code}]`}
      submitRef={submitRef}
      isLoading={isLoading}
      error={
        error ? { ...error, message: t("messages.bookTour.failed") } : error
      }
      success={{
        isSuccess: Boolean(data),
        message: t("messages.bookTour.success"),
        cb: () => {
          resetStates();
          onHide();
        },
      }}
      onHide={onHide}
      submitButtonText={t("form.bookTour")}
      {...props}
    >
      <Formik
        validationSchema={bookingTourSchema}
        initialValues={{ ...initialValues, date: selectedDate || "" }}
        onSubmit={submitHandler}
      >
        {(formik) => (
          <Form>
            <FormGroup isRequired label={t("form.fullname")} name="fullname" />
            <FormGroup
              isRequired
              label={t("form.gender")}
              name="gender"
              as="select"
            >
              <option value="">{t("form.selectGender")}</option>
              <option value="male">{t("form.male")}</option>
              <option value="female">{t("form.female")}</option>
            </FormGroup>
            <FormGroup isRequired label={t("form.phoneNumber")} name="phone" />

            <FormGroup
              isRequired
              label={t("form.adults")}
              as="select"
              name="adult"
            >
              {numbers.map((number) => (
                <option value={number} key={number}>
                  {number}
                </option>
              ))}
            </FormGroup>

            <FormGroup label={t("form.children")} as="select" name="children">
              {[0, ...numbers].map((number) => (
                <option value={number} key={number}>
                  {number}
                </option>
              ))}
            </FormGroup>

            <DateFormGroup
              isRequired
              name="date"
              label={t("form.departureDates")}
              onSelect={(d) => {
                formik.setFieldValue("date", d);
                setSelectedDate(d);
              }}
              availableDates={props.tour.departureDates.map(
                (item) => new Date(item)
              )}
              placeholder={
                formik.values.date
                  ? format(formik.values.date, "dd/MM/yyyy")
                  : t("form.selectDate")
              }
              selectedDate={formik.values.date}
              flexible={false}
            />
            <button type="submit" hidden ref={submitRef}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </CustomModal>
  );
}

export default BookingModal;

import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import useAxios from "../../../../hooks/useAxios";
import { orderVisa } from "../../../../services/apis";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import CustomModal, { FormGroup } from "../../../../components/CustomModal";

function VisaBookingModal({ product, passengers, date, ...other }) {
  const [sendRequest, isLoading, data, error, resetStates] = useAxios();

  const { t } = useTranslation();
  const navigate = useNavigate();

  const initialValues = {
    visaId: product._id,
    price: product.price,

    fullname: "",
    phone: "",
    email: "",
    passengers: passengers,
    date: date,
    address: "",
  };

  const submitHandler = (values) => {
    resetStates();
    sendRequest(orderVisa(values));
  };

  const validator = (values) => {
    const REQUIRED = t("form.required");
    const errors = {};
    if (!values.fullname) {
      errors.fullname = REQUIRED;
    }

    if (!values.phone) {
      errors.phone = REQUIRED;
    }
    if (!values.email) {
      errors.email = REQUIRED;
    }
    if (!values.passengers) {
      errors.passengers = REQUIRED;
    }
    if (!values.date) {
      errors.date = REQUIRED;
    }

    if (!values.address) {
      errors.address = REQUIRED;
    }

    return errors;
  };

  const submitRef = useRef();

  useEffect(() => {
    if (data) {
      navigate(`/dich-vu-visa/thanh-toan/${data.data._id}`);
    }
  }, [data]);

  return (
    <CustomModal
      title={product.name}
      submitRef={submitRef}
      isLoading={false}
      error={error}
      success={{
        isSuccess: false,
        message: "Success",
        cb: () => {
          resetStates();
        },
      }}
      submitButtonText={t("form.bookVisa")}
      {...other}
    >
      <Formik
        validate={validator}
        initialValues={initialValues}
        onSubmit={submitHandler}
      >
        {(formik) => (
          <Form>
            <FormGroup isRequired label={t("form.fullname")} name="fullname" />
            <FormGroup isRequired label={t("form.phoneNumber")} name="phone" />
            <FormGroup isRequired label="Email" name="email" />
            <FormGroup isRequired label={t("form.address")} name="address" />
            <FormGroup
              isRequired
              label={t("form.entryDate")}
              name="date"
              type="date"
            />
            <FormGroup
              isRequired
              label={t("form.passengers")}
              as="select"
              name="passengers"
            >
              {Array.from(new Array(21).keys())
                .slice(1)
                .map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
            </FormGroup>

            <p className="fs-6 mb-2 fw-bold">
              {t("form.total")}:{" "}
              <span
                style={{
                  color: "#bd0000",
                }}
              >
                {(product.price * formik.values.passengers).toLocaleString()}{" "}
                USD
              </span>
            </p>

            <button type="submit" hidden ref={submitRef}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </CustomModal>
  );
}

export default VisaBookingModal;

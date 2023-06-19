// main
import { useEffect, useRef } from "react";
import { Formik, Form } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

// components
import CustomModal, { FormGroup } from "../../../../components/CustomModal";

// other
import useAxios from "../../../../hooks/useAxios";
import { callMe } from "../../../../services/apis";
import { PHONE_REGEXP } from "../../../../services/constants";

function ContactModal({ onHide, tour, ...props }) {
  const [sendRequest, isLoading, data, error, resetStates] = useAxios();
  const { t } = useTranslation();
  const submitRef = useRef();

  const initialValues = {
    fullname: "",
    phone: "",
    gender: "",
  };

  const submitHandler = async (values) => {
    resetStates();
    sendRequest(
      callMe({
        fullname: values.fullname,
        phone: values.phone,
        gender: values.gender,
      })
    );
  };

  const required = t("form.required");

  const contactFormSchema = Yup.object().shape({
    fullname: Yup.string().required(required),
    phone: Yup.string()
      .matches(PHONE_REGEXP, t("form.errors.invalidPhoneNumber"))
      .required(required),
    gender: Yup.string().required(required),
  });

  useEffect(() => {
    if (data) {
      onHide();
    }
  }, [data]);

  return (
    <CustomModal
      title={`Yêu cầu tư vấn tour: ${tour.name} [${tour.code}]`}
      submitRef={submitRef}
      isLoading={isLoading}
      error={
        error ? { ...error, message: t("messages.callMeBack.failed") } : error
      }
      success={{
        isSuccess: Boolean(data),
        message: t("messages.callMeBack.success"),
        cb: () => {
          resetStates();
          onHide();
        },
      }}
      onHide={onHide}
      submitButtonText={t("form.callMe")}
      {...props}
    >
      <Formik
        validationSchema={contactFormSchema}
        initialValues={initialValues}
        onSubmit={submitHandler}
      >
        <Form>
          <FormGroup isRequired label={t("form.fullname")} name="fullname" />
          <FormGroup isRequired label={t("form.phoneNumber")} name="phone" />
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
          <button type="submit" hidden ref={submitRef}>
            Submit
          </button>
        </Form>
      </Formik>
    </CustomModal>
  );
}

export default ContactModal;

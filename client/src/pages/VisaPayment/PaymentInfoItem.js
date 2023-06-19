function PaymentInfoItem({ name, value }) {
  return (
    <p className="d-flex justify-content-between">
      <strong>{name}</strong>
      <span>{value}</span>
    </p>
  );
}

export default PaymentInfoItem;

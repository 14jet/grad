export function Table({ children }) {
  return <table className="table table-bordered">{children}</table>;
}

export function TBody({ children }) {
  return <tbody className="bg-white">{children}</tbody>;
}

export function TCell({ children, w = "auto" }) {
  return (
    <td
      style={{
        width: w,
      }}
    >
      <div className="d-flex align-items-center justify-content-center">
        {children}
      </div>
    </td>
  );
}

export function THead({ children }) {
  return <thead className="bg-secondary text-light">{children}</thead>;
}

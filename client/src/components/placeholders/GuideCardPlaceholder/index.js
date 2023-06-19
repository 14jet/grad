import CardPlaceholder from "../CardPlaceholder";

function GuideCardPlaceholder() {
  return (
    <CardPlaceholder>
      <h5 className="card-title placeholder-glow">
        <span className="placeholder  bg-secondary col-10"></span>
      </h5>
      <p className="card-text placeholder-glow">
        <span className="placeholder bg-secondary col-8"></span>
      </p>
    </CardPlaceholder>
  );
}

export default GuideCardPlaceholder;

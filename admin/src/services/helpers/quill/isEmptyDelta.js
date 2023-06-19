const isEmptyDelta = (delta) => {
  if (!delta) return true;
  const ops = delta.ops;
  if (!ops) return true;
  return ops.length === 1 && !Boolean(ops[0].insert.trim());
};

export default isEmptyDelta;

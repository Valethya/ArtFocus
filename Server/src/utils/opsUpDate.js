async function optionsUpDate(obj) {
  const ops = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key != "_id" || key != "code") {
      ops[key] = value;
    }
  }
  return ops;
}

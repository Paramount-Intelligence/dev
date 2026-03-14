const allowedFields = ["name", "email", "role", "status", "score"];

const pickInternFields = (source) => {
  const payload = {};

  for (const field of allowedFields) {
    if (source[field] !== undefined) {
      payload[field] = source[field];
    }
  }

  return payload;
};

module.exports = pickInternFields;

const handleValidationError = (err, res) => {
  let errors = err.errors.map((el) => el.message);
  if (errors.length > 1) {
    const msgErr = errors.join(" || ");
    res.status(400).send({ messages: msgErr });
  } else {
    res.status(400).send({ messages: errors });
  }
};

const handleDuplicateError = (err, res) => {
  const duplicateKey = Object.getOwnPropertyNames(err.keyPattern)[0];
  const duplicateValue = err.keyValue[duplicateKey];
  const msgErr = `${duplicateKey} ${duplicateValue} is already in use`;
  res.status(400).send({ messages: msgErr });
};

const typeError = (err, req, res, next) => {
  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    handleValidationError(err, res);
  }

  if (err.code === 11000) {
    handleDuplicateError(err, res);
  }

  res.status(500).send({ msg: "There was a problem", err });
};

module.exports = { typeError };

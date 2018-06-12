
export default (error) => {
  const errors = error.errors;
  let objErrors = [];

  if (errors) {
    Object.entries(errors).map(error => {
      const { path, message } = error[1];
      objErrors.push({ path, message });
    });

    return objErrors;
  }

  const uknownError = {};
  switch (error.code) {
    default:
      uknownError.path = "Desconocido";
      uknownError.message = error.message;
  }
  return [uknownError];
};

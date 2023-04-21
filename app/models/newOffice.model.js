const Yup = require("yup");

const newOfficeValidators = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      institutionId: Yup.number().required(),
      responsible: Yup.string().required(),
      document: Yup.number().required(),
      startDate: Yup.date().required(),
      zipCode: Yup.number().required(), 
      adress: Yup.string().required(),
      telephone: Yup.number().required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(400).json({
      error: err.errors,
    });
  }
};


module.exports = newOfficeValidators;

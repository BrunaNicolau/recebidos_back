const Yup = require("yup");

const updateOfficeValidators = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      responsible: Yup.string().required(),
      document: Yup.number().required(),
      institutionId: Yup.number(),
      officeId: Yup.number().required(),
      zipCode: Yup.number().required, 
      address: Yup.string().required(),
      telephone: Yup.number(),
      status: Yup.string().required(),
      endDate: Yup.date(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(400).json({
      error: err.errors,
    });
  }
};


module.exports = updateOfficeValidators;

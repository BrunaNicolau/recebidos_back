const Yup = require("yup");

const updateOfficeValidators = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      responsible: Yup.string().required(),
      document: Yup.number().required(),
      address: Yup.string().required(),
      zipCode: Yup.number().required(), 
      telephone: Yup.number(),
      endDate: Yup.date(),
      status: Yup.string().required(),
      officeId: Yup.number().required(),
      institutionId: Yup.number()
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

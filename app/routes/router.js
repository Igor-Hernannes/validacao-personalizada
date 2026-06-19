var express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");
var {validarCPF } = require("../helpers/validacoes");

router.get("/", function (req, res) {
  res.render("pages/index", { resultado: null, "listaErros": null, "campos": { "nome": "", email: "", "cpf": "" } });
});

router.post(
  "/index",
  body("nome")
    .isLength({ min: 10, max: 50 }).withMessage('O nome deve ter de 10 a 50 caracteres!'),
  body("email")
    .isEmail().withMessage('O e-mail deve ser válido!'),
  body("cpf")
    .isLength({ min: 11}).withMessage('O CPF tem 11 caracteres!')
    .custom((value) => {
      if (validarCPF(value)) {
        return true;
      } else {
        throw new Error('CPF inválido!');
      }
    }),

  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.render("pages/index", { resultado: null, "listaErros": errors, "campos": req.body });
    }
    return res.render("pages/index", { resultado: req.body, "listaErros": errors, "campos": req.body });
  }
);

module.exports = router;
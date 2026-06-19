$(document).ready(function () {
  $("#btn").click(function () {
    $.ajax({
      type: "POST",
      url: "/jquery",
      data: {
        'nome': $("#nome").val(),
        'email': $("#email").val(),
        'cpf': $("#cpf").val(),
      },
      success: alert("sucesso"),
    });
  });
});

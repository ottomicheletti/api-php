<?php
// https://laragon.org/download/
// https://github.com/sys4soft/PHP-APIs-Course/tree/main
// https://youtu.be/gsPp71nRMQk

// date_default_timezone_set("America/Sao_Paulo");

// $path = array_slice(explode('/', $_SERVER['REQUEST_URI']), 3); // conteudo da barra após api.php/[0]/[1]
// $req_method = explode('/', $_SERVER['REQUEST_METHOD']); // qual método HTTP a página foi chamada
// $req_body = file_get_contents('php://input'); // body da requisição HTTP

$data = [];

// request
if (isset($_GET['option'])) {

  switch ($_GET['option']) {
    case 'status':
      $data['status'] = 'SUCCESS';
      $data['data'] = 'API running OK!';
      break;

    default:
      $data['status'] = 'ERROR';
      break;
  }
} else {
  $data['status'] = 'ERROR';
}

// emitir a resposta da API
response($data);

// ====================================================================
// construção da response
function response($data_response)
{
  header("Content-Type:application/json");
  echo json_encode($data_response);
}

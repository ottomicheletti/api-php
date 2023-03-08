<?php
// https://github.com/sys4soft/PHP-APIs-Course/tree/main
// https://youtu.be/gsPp71nRMQk

date_default_timezone_set("America/Sao_Paulo");
$path = array_slice(explode('/', $_SERVER['REQUEST_URI']), 3); // conteudo da barra após api-php/[0]/[1] onde [0] é o endpoint e o [1] argumento
$req_method = $_SERVER['REQUEST_METHOD']; // qual método HTTP a página foi chamada
$req_body = json_decode(file_get_contents('php://input')); // objeto do body da requisição HTTP, acessar as chaves do body com: $req_body->exemplo


// dependencias
require_once(dirname(__FILE__) . '/inc/config.php');
require_once(dirname(__FILE__) . '/inc/api_response.php');
require_once(dirname(__FILE__) . '/inc/api_request.php');
require_once(dirname(__FILE__) . '/inc/database.php');

// instanciação da classe Response
$api = new Response();

// checa se o método da requisição é válido, se for, seta o Método HTTP e o Endpoint
if (!$api->check_method($req_method)) {
  $api->api_request_error('Invalid request method.');
  die();
} else {
  $api->set_method($req_method);
  $api->set_endpoint($path[0]);
}


// prepara a requisição conforme o verbo HTTP
switch ($req_method) {
  case 'GET':
    //echo "entrou no GET"
    $api_req = new Request($api->get_endpoint());
    break;
  case 'POST':
    //echo "entrou no POST"
    $api_req = new Request($api->get_endpoint(), null, $req_body);
    break;
  case 'PUT':
    //echo "entrou no PUT"
    if ($path[1]) {
      //echo "entrou no if"
      $api_req = new Request($api->get_endpoint(), $path[1], $req_body);
    } else {
      //echo "entrou no else"
      $api->api_request_error("'PUT' and 'DELETE' HTTP methods require a parameter after the endpoint.");
    }
    break;
  case 'DELETE':
    //echo "entrou no DELETE"
    if ($path[1]) {
      //echo "entrou no if"
      $api_req = new Request($api->get_endpoint(), $path[1]);
    } else {
      //echo "entrou no else"
      $api->api_request_error("'PUT' and 'DELETE' HTTP methods require a parameter after the endpoint.");
    }
    break;
}

// checa se o endpoint existe, se não existir retorna a mensagem de erro, se existir, procede para gerar uma Response das informações
if (!$api_req->endpoint_exists($api->get_method())) {
  $api->api_request_error('No endpoint such as ' . $api->get_method() . '/' . $api->get_endpoint());
} else {
  $result = $api_req->{$api->get_method() . '_' . $api->get_endpoint()}();
  $api->add_to_data('data', $result);
  $api->send_response();
}

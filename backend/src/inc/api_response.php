<?php
class Response
{
  private $data;
  private $available_methods = ['GET', 'POST', 'PUT', 'DELETE'];

  public function __construct()
  {
    $this->data = [];
  }

  public function check_method($method)
  {
    return in_array($method, $this->available_methods);
  }

  //---------------------
  // GETTERS & SETTERS
  //---------------------
  public function set_method($method)
  {
    $this->data['method'] = $method;
  }

  public function get_method()
  {
    return $this->data['method'];
  }

  public function set_endpoint($endpoint)
  {
    $this->data['endpoint'] = $endpoint;
  }

  public function get_endpoint()
  {
    return $this->data['endpoint'];
  }

  //---------------------
  // Métodos genéricos
  //---------------------
  public function api_request_error($message = '')
  {
    $data_error = [
      'status' => 'ERROR',
      'message' => $message,
    ];
    $this->data['data'] = $data_error;
    $this->send_response();
  }

  public function add_to_data($key, $value)
  {
    $this->data[$key] = $value;
  }

  public function send_response()
  {
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($this->data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK | JSON_PRETTY_PRINT);
    die();
  }
}

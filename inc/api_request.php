<?php

class Request
{
  private $endpoint;
  private $req_param;
  private $req_body;

  public function __construct($endpoint, $req_param = null, $req_body = null)
  {
    $this->endpoint = $endpoint;
    $this->req_param = $req_param;
    $this->req_body = $req_body;
  }

  public function endpoint_exists($method)
  {
    return method_exists($this, $method . '_' . $this->endpoint);
  }

  // --------------------
  // ENDPOINTS
  // --------------------
  public function GET_status()
  {
    return [
      'status' => 'SUCCESS',
      'message' => 'API is running OK!',
    ];
  }

  public function GET_products()
  {
    return [
      'data' => ['nome' => 'coca-cola', 'preco' => 3]
    ];
  }

  public function POST_products()
  {
    return [
      'data' => ['message' => 'Produto adicionado no id XYZ', 'req_body' => $this->req_body]
    ];
  }

  public function PUT_products()
  {
    return [
      'data' => ['message' => 'Produto com id ' . $this->req_param . ' atualizado', 'req_body' => $this->req_body]
    ];
  }

  public function DELETE_products()
  {
    return [
      'data' => 'Produto com id ' . $this->req_param . ' deletado'
    ];
  }
}
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

  public function GET_produtos()
  {
    $db = new Database();
    $results = $db->EXE_QUERY("SELECT * FROM " . $this->endpoint);
    return [
      'status' => 'SUCCESS',
      'message' => '',
      'results' => $results,
    ];
  }

  public function GET_pedidos()
  {
    $db = new Database();
    $results = $db->EXE_QUERY("SELECT * FROM " . $this->endpoint);
    return [
      'status' => 'SUCCESS',
      'message' => '',
      'results' => $results,
    ];
  }

  public function GET_tipo_produto()
  {
    $db = new Database();
    $results = $db->EXE_QUERY("SELECT * FROM " . $this->endpoint);
    return [
      'status' => 'SUCCESS',
      'message' => '',
      'results' => $results,
    ];
  }

  public function GET_produto_pedido()
  {
    $db = new Database();
    $results = $db->EXE_QUERY("SELECT * FROM " . $this->endpoint);
    return [
      'status' => 'SUCCESS',
      'message' => '',
      'results' => $results,
    ];
  }



  /* public function POST_produtos()
  {
    return [
      ['message' => 'Produto adicionado no id XYZ', 'req_body' => $this->req_body]
    ];
  }

  public function PUT_produtos()
  {
    return [
      ['message' => 'Produto com id ' . $this->req_param . ' atualizado', 'req_body' => $this->req_body]
    ];
  }

  public function DELETE_produtos()
  {
    return [
      ['message' => 'Produto com id ' . $this->req_param . ' deletado']
    ];
  } */
}
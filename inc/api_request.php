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

  //--------------------
  // Métodos HTTP/GET
  //--------------------
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

  public function GET_produtos_pedido()
  {
    $db = new Database();
    $results = $db->EXE_QUERY("SELECT * FROM " . $this->endpoint);
    return [
      'status' => 'SUCCESS',
      'message' => '',
      'results' => $results,
    ];
  }

  public function GET_tipos_produto()
  {
    $db = new Database();
    $results = $db->EXE_QUERY("SELECT * FROM " . $this->endpoint);
    return [
      'status' => 'SUCCESS',
      'message' => '',
      'results' => $results,
    ];
  }

  //--------------------
  // Métodos HTTP/POST
  //--------------------
  public function POST_pedidos()
  {
    $query = "INSERT INTO pedidos (total) VALUES(?)";
    $db = new Database();
    $results = $db->EXE_NON_QUERY($query, [$this->req_body->total]);
    return [
      'status' => 'SUCCESS',
      'message' => '',
      'results' => $results,
    ];
  }

  public function POST_produtos()
  {
    $query = "INSERT INTO produtos (nome, valor, tipo) VALUES(?, ?, ?)";
    $db = new Database();
    $results = $db->EXE_NON_QUERY($query, [$this->req_body->nome, $this->req_body->valor, $this->req_body->tipo]);
    return [
      'status' => 'SUCCESS',
      'message' => '',
      'results' => $results,
    ];
  }

  public function POST_produtos_pedido()
  {
    $query = "INSERT INTO produtos_pedido (pedido, produto, quantidade, total) VALUES(?, ?, ?, ?)";
    $db = new Database();
    $results = $db->EXE_NON_QUERY($query, [$this->req_body->pedido, $this->req_body->produto, $this->req_body->quantidade, $this->req_body->total]);
    return [
      'status' => 'SUCCESS',
      'message' => '',
      'results' => $results,
    ];
  }

  public function POST_tipos_produto()
  {
    $query = "INSERT INTO tipos_produto (nome, percentual_imposto) VALUES(?, ?)";
    $db = new Database();
    $results = $db->EXE_NON_QUERY($query, [$this->req_body->nome, $this->req_body->percentual_imposto]);
    return [
      'status' => 'SUCCESS',
      'message' => '',
      'results' => $results,
    ];
  }

  //--------------------
  // Métodos HTTP/PUT
  //--------------------
  public function PUT_produtos()
  {
    return [
      ['message' => 'Produto com id ' . $this->req_param . ' atualizado', 'req_body' => $this->req_body]
    ];
  }

  //--------------------
  // Métodos HTTP/DELETE
  //--------------------
  public function DELETE_produtos()
  {
    return [
      ['message' => 'Produto com id ' . $this->req_param . ' deletado']
    ];
  }
}
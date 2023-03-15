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
    if (!isset($this->req_param)) {
      $results = $db->EXE_QUERY("SELECT pedidos.codigo AS pedido, pedidos.data, produtos.nome, produtos.codigo AS codigo, produtos.valor , produtos_pedido.quantidade ,produtos_pedido.total, produtos_pedido.total * (tipos_produto.percentual_imposto / 100) AS imposto, produtos_pedido.total FROM pedidos INNER JOIN produtos_pedido ON pedidos.codigo =  produtos_pedido.pedido INNER JOIN produtos ON  produtos_pedido.produto = produtos.codigo INNER JOIN tipos_produto ON produtos.tipo = tipos_produto.codigo");
    } else {
      $query = "SELECT pedidos.codigo AS pedido, pedidos.data, produtos.nome, produtos.codigo AS codigo, produtos.valor , produtos_pedido.quantidade ,produtos_pedido.total, produtos_pedido.total * (tipos_produto.percentual_imposto / 100) AS imposto, produtos_pedido.total FROM pedidos INNER JOIN produtos_pedido ON pedidos.codigo =  produtos_pedido.pedido INNER JOIN produtos ON  produtos_pedido.produto = produtos.codigo INNER JOIN tipos_produto ON produtos.tipo = tipos_produto.codigo WHERE pedidos.codigo=?";
      $results = $db->EXE_QUERY($query, [intval($this->req_param)]);
    }

    return [
      'status' => 'SUCCESS',
      'message' => '',
      'results' => $results,
    ];
  }

  public function GET_produtos()
  {
    $db = new Database();
    $results = $db->EXE_QUERY("SELECT
    produtos.*,
    tipos_produto.*,
    produtos.nome AS nome,
    produtos.codigo AS codigo,
    tipos_produto.nome AS categoria
    FROM produtos INNER JOIN tipos_produto ON produtos.tipo = tipos_produto.codigo");
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
    $query = "INSERT INTO pedidos (total, imposto) VALUES(?, ?)";
    $db = new Database();
    $results = $db->EXE_NON_QUERY($query, [$this->req_body->total, $this->req_body->imposto]);
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
  public function PUT_pedidos()
  {
    $query = "UPDATE pedidos SET total=? WHERE codigo=?";
    $db = new Database();
    $results = $db->EXE_NON_QUERY($query, [$this->req_body->total, intval($this->req_param)]);
    return [
      'status' => 'SUCCESS',
      'message' => '',
      'results' => $results,
    ];
  }

  public function PUT_produtos()
  {
    $query = "UPDATE produtos SET nome=?, valor=?, tipo=? WHERE codigo=?";
    $db = new Database();
    $results = $db->EXE_NON_QUERY($query, [$this->req_body->nome, $this->req_body->valor, $this->req_body->tipo, intval($this->req_param)]);
    return [
      'status' => 'SUCCESS',
      'message' => '',
      'results' => $results,
    ];
  }

  public function PUT_produtos_pedido()
  {
    $query = "UPDATE produtos_pedido SET pedido=?, produto=?, quantidade=?, total=? WHERE codigo=?";
    $db = new Database();
    $results = $db->EXE_NON_QUERY($query, [$this->req_body->pedido, $this->req_body->produto, $this->req_body->quantidade, $this->req_body->total, intval($this->req_param)]);
    return [
      'status' => 'SUCCESS',
      'message' => '',
      'results' => $results,
    ];
  }

  public function PUT_tipos_produto()
  {
    $query = "UPDATE tipos_produto SET nome=?, percentual_imposto=? WHERE codigo=?";
    $db = new Database();
    $results = $db->EXE_NON_QUERY($query, [$this->req_body->nome, $this->req_body->percentual_imposto, intval($this->req_param)]);
    return [
      'status' => 'SUCCESS',
      'message' => '',
      'results' => $results,
    ];
  }

  //--------------------
  // Métodos HTTP/DELETE
  //--------------------
  public function DELETE_pedidos()
  {
    $query = "DELETE FROM pedidos WHERE codigo=?";
    $db = new Database();
    $results = $db->EXE_NON_QUERY($query, [intval($this->req_param)]);
    return [
      'status' => 'SUCCESS',
      'message' => '',
      'results' => $results,
    ];
  }

  public function DELETE_produtos()
  {
    $query = "DELETE FROM produtos WHERE codigo=?";
    $db = new Database();
    $results = $db->EXE_NON_QUERY($query, [intval($this->req_param)]);
    return [
      'status' => 'SUCCESS',
      'message' => '',
      'results' => $results,
    ];
  }

  public function DELETE_produtos_pedido()
  {
    $query = "DELETE FROM produtos_pedido WHERE pedido=?";
    $db = new Database();
    $results = $db->EXE_NON_QUERY($query, [intval($this->req_param)]);
    return [
      'status' => 'SUCCESS',
      'message' => '',
      'results' => $results,
    ];
  }

  public function DELETE_tipos_produto()
  {
    $query = "DELETE FROM tipos_produto WHERE codigo=?";
    $db = new Database();
    $results = $db->EXE_NON_QUERY($query, [intval($this->req_param)]);
    return [
      'status' => 'SUCCESS',
      'message' => '',
      'results' => $results,
    ];
  }
}

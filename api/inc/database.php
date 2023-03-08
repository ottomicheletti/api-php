<?php

class Database
{
  public function EXE_QUERY($query, $parameters = null, $debug = true, $close_connection = true)
  {
    $results = null;

    // conexão com o DB
    $connection = new PDO(
      'mysql:host=' . DB_HOST .
        ';dbname=' . DB_NAME .
        ';charset=' . DB_CHARSET,
      DB_USER,
      DB_PASS,
      array(PDO::ATTR_PERSISTENT => true)
    );

    if ($debug) {
      $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
    }

    // execução da query do tipo SELECT
    try {
      if ($parameters != null) {
        $stmt = $connection->prepare($query);
        $stmt->execute($parameters);
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
      } else {
        $stmt = $connection->prepare($query);
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
      }
    } catch (PDOException $e) {
      return false;
    }

    // encerra a conexão com o DB
    if ($close_connection) {
      $connection = null;
    }

    // retorna os resultados
    return $results;
  }

  public function EXE_NON_QUERY($query, $parameters = null, $debug = true, $close_connection = true)
  {
    // conexão com o DB
    $connection = new PDO(
      'mysql:host=' . DB_HOST .
        ';dbname=' . DB_NAME .
        ';charset=' . DB_CHARSET,
      DB_USER,
      DB_PASS,
      array(PDO::ATTR_PERSISTENT => true)
    );

    if ($debug) {
      $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
    }

    // execução das queries dos tipos INSERT, UPDATE e DELETE
    $connection->beginTransaction();
    try {
      if ($parameters != null) {
        $stmt = $connection->prepare($query);
        $stmt->execute($parameters);
      } else {
        $stmt = $connection->prepare($query);
        $stmt->execute();
      }
      $lastId = $connection->lastInsertId(); // retorna o código do item que sofreu INSERT, UPDATE ou DELETE.
      $connection->commit();
      return $lastId;
    } catch (PDOException $e) {
      $connection->rollBack();
      return false;
    }

    // encerra a conexão com o DB
    if ($close_connection) {
      $connection = null;
    }

    return true;
  }
}
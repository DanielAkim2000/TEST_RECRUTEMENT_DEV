<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ProductControllerTest extends WebTestCase
{
  public function testGetAllProducts()
  {
    $client = static::createClient();
    $client->request('GET', '/api/products');

    $this->assertResponseIsSuccessful();
    $this->assertResponseHeaderSame('content-type', 'application/json; charset=utf-8');

    $responseData = json_decode($client->getResponse()->getContent(), true);
    $this->assertIsArray($responseData);
    $this->assertNotEmpty($responseData);
  }

  public function testAddProductSuccess()
  {
    $client = static::createClient();
    $data = [
      'name' => 'Test Product',
      'description' => 'This is a test product',
      'price' => 100.0,
      'category' => ['id' => 1],
    ];

    $client->request(
      'POST',
      '/api/product',
      [],
      [],
      ['CONTENT_TYPE' => 'application/json'],
      json_encode($data)
    );

    $this->assertResponseIsSuccessful();

    $responseData = json_decode($client->getResponse()->getContent(), true);
    $this->assertArrayHasKey('message', $responseData);
    $this->assertEquals('Produit ajouté avec succès', $responseData['message']);
    $this->assertEquals('success', $responseData['severity']);
  }

  public function testAddProductValidationError()
  {
    $client = static::createClient();
    $data = [
      'name' => '',
      'description' => 'Invalid product',
      'price' => -10.0,
      'category' => ['id' => 999],
    ];

    $client->request(
      'POST',
      '/api/product',
      [],
      [],
      ['CONTENT_TYPE' => 'application/json'],
      json_encode($data)
    );

    $this->assertResponseStatusCodeSame(400);

    $responseData = json_decode($client->getResponse()->getContent(), true);
    $this->assertArrayHasKey('violations', $responseData);
    $this->assertIsArray($responseData['violations']);
  }

  public function testUpdateProductNotFound()
  {
    $client = static::createClient();
    $data = [
      'name' => 'Updated Product',
      'description' => 'Updated description',
      'price' => 120.0,
    ];

    $client->request(
      'PUT',
      '/api/product/999',
      [],
      [],
      ['CONTENT_TYPE' => 'application/json'],
      json_encode($data)
    );

    $this->assertResponseStatusCodeSame(200);

    $responseData = json_decode($client->getResponse()->getContent(), true);
    $this->assertArrayHasKey('message', $responseData);
    $this->assertEquals("Ce produit n'existe pas ou a été supprimé", $responseData['message']);
  }

  public function testDeleteProductSuccess()
  {
    $client = static::createClient();
    $client->request('DELETE', '/api/product/1');

    $this->assertResponseIsSuccessful();

    $responseData = json_decode($client->getResponse()->getContent(), true);
    $this->assertArrayHasKey('message', $responseData);
    $this->assertEquals('Produit supprimé', $responseData['message']);
  }

  public function testGetProductsBySearchSuccess()
  {
    $client = static::createClient();
    $client->request('GET', '/api/products/search?search=test&category=1&priceMin=10&priceMax=200&page=1&limit=5');

    $this->assertResponseIsSuccessful();
    $this->assertResponseHeaderSame('content-type', 'application/json; charset=utf-8');

    $responseData = json_decode($client->getResponse()->getContent(), true);
    $this->assertArrayHasKey('currentPage', $responseData);
    $this->assertEquals(1, $responseData['currentPage']);
  }

  public function testDeleteAllProductsSelected()
  {
    $client = static::createClient();
    $data = [1, 2, 3];

    $client->request(
      'DELETE',
      '/api/products',
      [],
      [],
      ['CONTENT_TYPE' => 'application/json'],
      json_encode($data)
    );

    $this->assertResponseIsSuccessful();

    $responseData = json_decode($client->getResponse()->getContent(), true);
    $this->assertArrayHasKey('message', $responseData);
    $this->assertEquals('Les produits ont été supprimés', $responseData['message']);
  }

  public function testGetMaxPriceSuccess()
  {
    $client = static::createClient();
    $client->request('GET', '/api/products/prixMax');

    $this->assertResponseIsSuccessful();

    $responseData = json_decode($client->getResponse()->getContent(), true);
    $this->assertArrayHasKey('maxPrice', $responseData);
    $this->assertIsNumeric($responseData['maxPrice']);
  }
}

<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use App\Entity\Category;

class CategoryControllerTest extends WebTestCase
{
  public function testGetAllCategories()
  {
    $client = static::createClient();
    $client->request('GET', '/api/categories');

    $this->assertResponseIsSuccessful();
    $this->assertResponseHeaderSame('Content-Type', 'application/json');
    $responseData = json_decode($client->getResponse()->getContent(), true);
    $this->assertIsArray($responseData);
  }

  public function testCreateCategory()
  {
    $client = static::createClient();
    $client->request('POST', '/api/category', [], [], ['CONTENT_TYPE' => 'application/json'], json_encode([
      'name' => 'Test Category',
    ]));

    $this->assertResponseStatusCodeSame(201);
    $responseData = json_decode($client->getResponse()->getContent(), true);
    $this->assertEquals('Categorie créée', $responseData['message']);
  }

  public function testGetCategory()
  {
    $client = static::createClient();

    // Créer une catégorie en base de données
    $category = new Category();
    $category->setName('Existing Category');
    $entityManager = $client->getContainer()->get('doctrine')->getManager();
    $entityManager->persist($category);
    $entityManager->flush();

    $client->request('GET', '/api/category/' . $category->getId());

    $this->assertResponseIsSuccessful();
    $responseData = json_decode($client->getResponse()->getContent(), true);
    $this->assertEquals('Existing Category', $responseData['name']);
  }

  public function testUpdateCategory()
  {
    $client = static::createClient();

    // Créer une catégorie en base de données
    $category = new Category();
    $category->setName('Old Category');
    $entityManager = $client->getContainer()->get('doctrine')->getManager();
    $entityManager->persist($category);
    $entityManager->flush();

    $client->request('PUT', '/api/category/' . $category->getId(), [], [], ['CONTENT_TYPE' => 'application/json'], json_encode([
      'name' => 'Updated Category',
    ]));

    $this->assertResponseStatusCodeSame(200);
    $responseData = json_decode($client->getResponse()->getContent(), true);
    $this->assertEquals('La catégorie a été modifiée avec succès', $responseData['message']);
  }

  public function testDeleteCategory()
  {
    $client = static::createClient();

    // Créer une catégorie en base de données
    $category = new Category();
    $category->setName('Category to Delete');
    $entityManager = $client->getContainer()->get('doctrine')->getManager();
    $entityManager->persist($category);
    $entityManager->flush();

    $client->request('DELETE', '/api/category/' . $category->getId());

    $this->assertResponseStatusCodeSame(200);
    $responseData = json_decode($client->getResponse()->getContent(), true);
    $this->assertEquals('La catégorie a été supprimée avec succès', $responseData['message']);
  }
}

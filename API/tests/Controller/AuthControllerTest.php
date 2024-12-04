<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class AuthControllerTest extends WebTestCase
{
  public function testRegisterSuccess()
  {
    $client = static::createClient();
    $client->request('POST', '/auth/register', [], [], [
      'CONTENT_TYPE' => 'application/json'
    ], json_encode([
      'name' => 'John',
      'firstname' => 'Doe',
      'email' => 'johndoe@example.com',
      'password' => 'password123'
    ]));

    $this->assertResponseStatusCodeSame(201);
    $this->assertJson($client->getResponse()->getContent());
  }

  public function testRegisterDuplicateEmail()
  {
    $client = static::createClient();
    $client->request('POST', '/auth/register', [], [], [
      'CONTENT_TYPE' => 'application/json'
    ], json_encode([
      'name' => 'John',
      'firstname' => 'Doe',
      'email' => 'existingemail@example.com',
      'password' => 'password123'
    ]));

    $this->assertResponseStatusCodeSame(404);
    $this->assertStringContainsString('Cet email est déjà utilisé', $client->getResponse()->getContent());
  }

  public function testMeSuccess()
  {
    $client = static::createClient();
    $client->request('GET', '/auth/me', [], [], [
      'HTTP_Authorization' => 'Bearer valid_jwt_token'
    ]);

    $this->assertResponseStatusCodeSame(200);
    $this->assertJson($client->getResponse()->getContent());
  }

  public function testUpdateUserSuccess()
  {
    $client = static::createClient();
    $client->request('PUT', '/auth/me', [], [], [
      'CONTENT_TYPE' => 'application/json',
      'HTTP_Authorization' => 'Bearer valid_jwt_token'
    ], json_encode([
      'name' => 'Jane',
      'firstname' => 'Smith',
      'email' => 'janesmith@example.com',
      'password' => 'currentPassword',
      'newPassword' => 'newPassword123'
    ]));

    $this->assertResponseStatusCodeSame(200);
    $this->assertStringContainsString('Votre compte a été mis à jour avec succès', $client->getResponse()->getContent());
  }

  public function testLoginCheckSuccess()
  {
    $client = static::createClient();
    $client->request('POST', '/api/login_check', [], [], [
      'CONTENT_TYPE' => 'application/json'
    ], json_encode([
      'username' => 'johndoe@example.com',
      'password' => 'password123'
    ]));

    $this->assertResponseStatusCodeSame(200);
    $this->assertJson($client->getResponse()->getContent());
  }
}

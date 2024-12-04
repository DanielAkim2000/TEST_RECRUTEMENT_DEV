<?php

namespace App\Tests\Entity;

use App\Entity\User;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Validator\Validation;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class UserTest extends TestCase
{
  private ValidatorInterface $validator;

  protected function setUp(): void
  {
    // Crée le validateur Symfony
    $this->validator = Validation::createValidator();
  }

  // Test pour vérifier que l'entité User est valide avec des données correctes
  public function testUserValidation()
  {
    // Crée une nouvelle instance de User avec des données valides
    $user = new User();
    $user->setEmail('test@example.com')
      ->setNom('John Doe')
      ->setPrenom('John')
      ->setPassword('Password123');  // Mot de passe valide

    // Valide l'entité User
    $violations = $this->validator->validate($user);

    // Vérifie qu'il n'y a aucune violation de validation
    $this->assertCount(0, $violations);
  }

  // Test pour vérifier que l'entité User échoue avec un email invalide
  public function testInvalidEmail()
  {
    $user = new User();
    $user->setEmail('invalid-email')  // Email invalide
      ->setNom('John Doe')
      ->setPrenom('John')
      ->setPassword('Password123');  // Mot de passe valide

    // Valide l'entité User
    $violations = $this->validator->validate($user);

    // Vérifie qu'il y a une violation pour l'email
    $this->assertGreaterThan(0, count($violations));
  }

  // Test pour vérifier que l'entité User échoue avec un mot de passe trop court
  public function testShortPassword()
  {
    $user = new User();
    $user->setEmail('test@example.com')
      ->setNom('John Doe')
      ->setPrenom('John')
      ->setPassword('short');  // Mot de passe trop court

    // Valide l'entité User
    $violations = $this->validator->validate($user);

    // Vérifie qu'il y a une violation pour le mot de passe
    $this->assertGreaterThan(0, count($violations));
  }

  // Test pour vérifier que l'entité User échoue si le nom est trop court
  public function testShortNom()
  {
    $user = new User();
    $user->setEmail('test@example.com')
      ->setNom('Jo')  // Nom trop court
      ->setPrenom('John')
      ->setPassword('Password123');

    // Valide l'entité User
    $violations = $this->validator->validate($user);

    // Vérifie qu'il y a une violation pour le nom
    $this->assertGreaterThan(0, count($violations));
  }

  // Test pour vérifier que l'entité User échoue si le prénom est trop court
  public function testShortPrenom()
  {
    $user = new User();
    $user->setEmail('test@example.com')
      ->setNom('John Doe')
      ->setPrenom('J')  // Prénom trop court
      ->setPassword('Password123');

    // Valide l'entité User
    $violations = $this->validator->validate($user);

    // Vérifie qu'il y a une violation pour le prénom
    $this->assertGreaterThan(0, count($violations));
  }

  // Test pour vérifier que l'entité User échoue si le prénom contient des caractères invalides
  public function testInvalidPrenom()
  {
    $user = new User();
    $user->setEmail('test@example.com')
      ->setNom('John Doe')
      ->setPrenom('John123')  // Prénom invalide (contient des chiffres)
      ->setPassword('Password123');

    // Valide l'entité User
    $violations = $this->validator->validate($user);

    // Vérifie qu'il y a une violation pour le prénom
    $this->assertGreaterThan(0, count($violations));
  }

  // Test pour vérifier que l'entité User échoue si l'email est vide
  public function testEmptyEmail()
  {
    $user = new User();
    $user->setEmail('')  // Email vide
      ->setNom('John Doe')
      ->setPrenom('John')
      ->setPassword('Password123');

    // Valide l'entité User
    $violations = $this->validator->validate($user);

    // Vérifie qu'il y a une violation pour l'email
    $this->assertGreaterThan(0, count($violations));
  }

  // Test pour vérifier que l'entité User échoue si le nom est vide
  public function testEmptyNom()
  {
    $user = new User();
    $user->setEmail('test@example.com')
      ->setNom('')  // Nom vide
      ->setPrenom('John')
      ->setPassword('Password123');

    // Valide l'entité User
    $violations = $this->validator->validate($user);

    // Vérifie qu'il y a une violation pour le nom
    $this->assertGreaterThan(0, count($violations));
  }

  // Test pour vérifier que l'entité User échoue si le mot de passe est vide
  public function testEmptyPassword()
  {
    $user = new User();
    $user->setEmail('test@example.com')
      ->setNom('John Doe')
      ->setPrenom('John')
      ->setPassword('');  // Mot de passe vide

    // Valide l'entité User
    $violations = $this->validator->validate($user);

    // Vérifie qu'il y a une violation pour le mot de passe
    $this->assertGreaterThan(0, count($violations));
  }
}

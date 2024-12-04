<?php

namespace App\Tests\Entity;

use App\Entity\Product;
use App\Entity\Category;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Symfony\Component\Validator\Validation;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\Type;
use Symfony\Component\Validator\Constraints\Regex;
use Symfony\Component\Validator\Constraints\Positive;
use Symfony\Component\Validator\Constraints\DateTimeImmutable;
use Symfony\Component\Validator\Context\ExecutionContextInterface;

class ProductTest extends KernelTestCase
{
  private $validator;

  protected function setUp(): void
  {
    self::bootKernel();
    $this->validator = Validation::createValidator();
  }

  public function testProductValidation(): void
  {
    // Création d'un objet Product
    $category = new Category();
    $category->setName('Category Test');

    $product = new Product();
    $product->setName('Test Product')
      ->setDescription('Test description')
      ->setPrice(100.50)
      ->setCategory($category)
      ->setCreatedAt(new \DateTimeImmutable());

    // Validation de l'entité Product
    $violations = $this->validator->validate($product);

    // Assertions pour s'assurer qu'il n'y a pas de violations
    $this->assertCount(0, $violations, 'Il y a des violations de validation.');

    // Test d'un nom invalide
    $product->setName('');  // Un nom vide est invalide
    $violations = $this->validator->validate($product);
    $this->assertCount(1, $violations);
    $this->assertEquals('Le nom ne doit pas être vide', $violations[0]->getMessage());

    // Test d'une description invalide
    $product->setDescription('');  // Description vide
    $violations = $this->validator->validate($product);
    $this->assertCount(1, $violations);
    $this->assertEquals('La description ne doit pas être vide', $violations[0]->getMessage());

    // Test d'un prix invalide
    $product->setPrice(-10);  // Prix négatif
    $violations = $this->validator->validate($product);
    $this->assertCount(1, $violations);
    $this->assertEquals('Le prix doit être un nombre positif', $violations[0]->getMessage());

    // Test de la catégorie invalide
    $product->setCategory(null);  // Catégorie null
    $violations = $this->validator->validate($product);
    $this->assertCount(1, $violations);
    $this->assertEquals('Cette catégorie n\'existe pas', $violations[0]->getMessage());

    // Test de la date invalide
    $product->setCreatedAt(null);  // Date de création nulle
    $violations = $this->validator->validate($product);
    $this->assertCount(1, $violations);
    $this->assertEquals('La date de création ne doit pas être vide', $violations[0]->getMessage());
  }
}

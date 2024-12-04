<?php

namespace App\Tests\Entity;

use App\Entity\Category;
use App\Entity\Product;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Symfony\Component\Validator\Validation;
use Symfony\Component\Validator\Constraints\NotBlank;

class CategoryTest extends KernelTestCase
{
  public function testValidCategory(): void
  {
    // Création d'une catégorie valide
    $category = new Category();
    $category->setName('Electronics');

    // Vérification des validations
    $validator = Validation::createValidator();
    $violations = $validator->validate($category);

    // Il ne doit pas y avoir de violations
    $this->assertCount(0, $violations);
  }

  public function testInvalidCategoryName(): void
  {
    // Création d'une catégorie avec un nom vide
    $category = new Category();
    $category->setName('');

    // Vérification des validations
    $validator = Validation::createValidator();
    $violations = $validator->validate($category);

    // Il doit y avoir une violation pour le champ 'name'
    $this->assertCount(1, $violations);
    $this->assertEquals('Le nom ne doit pas être vide', $violations[0]->getMessage());
  }

  public function testAddRemoveProduct(): void
  {
    // Création de la catégorie et d'un produit
    $category = new Category();
    $category->setName('Electronics');

    $product = new Product();
    $product->setName('Smartphone');

    // Ajout du produit à la catégorie
    $category->addProduct($product);

    // Vérification que le produit a bien été ajouté
    $this->assertCount(1, $category->getProducts());

    // Retrait du produit
    $category->removeProduct($product);

    // Vérification que la catégorie est vide après retrait
    $this->assertCount(0, $category->getProducts());
  }
}

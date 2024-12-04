<?php

namespace App\DataFixtures;

use App\Entity\Category;
use App\Entity\Product;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class ProductFixture extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        for ($i = 0; $i < 500; $i++) {
            $product = new Product();
            $product->setName($faker->word())
                ->setDescription($faker->sentence(10))
                ->setPrice($faker->randomFloat(2, 10, 500))
                ->setCreatedAt(new \DateTimeImmutable())
                ->setCategory($this->getReference(
                    CategoryFixture::CATEGORY_REFERENCE . $faker->numberBetween(0, 4),
                    Category::class
                ));

            $manager->persist($product);
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            CategoryFixture::class,
        ];
    }
}

<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api')]
class ProductController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    private const PRODUCT_ROUTE = '/product/{id}';
    private const MESSAGE_PRODUCT_NOT_FOUND = 'Produit non trouvé';
    private const MESSAGE_PRODUCT_ERROR = 'Une erreur est survenue';
    private const GROUP_PRODUCT_READ = 'product:read';



    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }


    #[Route('/products', name: 'get_all_products', methods: ['GET'])]
    public function get_all_products(): JsonResponse
    {
        try {
            $repository = $this->entityManager->getRepository(Product::class);
            $products = $repository->findAll();

            return $this->json($products, 200, [], ['groups' => self::GROUP_PRODUCT_READ]);
        } catch (\Exception $e) {
            return $this->json(['message' => $e->getMessage()], 500);
        }
    }

    #[Route(self::PRODUCT_ROUTE, name: 'get_product', methods: ['GET'])]
    public function get_product(int $id): JsonResponse
    {
        try {
            $product = $this->entityManager->getRepository(Product::class)->find($id);

            if (!$product) {
                return $this->json([
                    'message' => self::MESSAGE_PRODUCT_NOT_FOUND
                ], 404);
            }

            return $this->json($product, 200, [], ['groups' => self::GROUP_PRODUCT_READ]);
        } catch (\Exception $e) {
            return $this->json(['message' => $e->getMessage()], 500);
        }
    }

    #[Route('/product', name: 'add_product', methods: ['POST'])]
    public function add_product(Request $request): JsonResponse
    {
        try {
            $content = $request->getContent();
            // true pour avoir un tableau associatif
            $data = json_decode($content, true);

            $product = new Product();
            $product->setName($data['name']);
            $product->setDescription($data['description']);
            $product->setPrice($data['price']);
            $product->setCreatedAt(new \DateTimeImmutable());

            //on verifie si la categorie existe
            if (isset($data['category_id'])) {
                $category = $this->entityManager->getRepository(Category::class)->find($data['category_id']);
                if (!$category) {
                    return $this->json([
                        'message' => "La catégorie n'existe pas"
                    ], 404);
                }
                $product->setCategory($category);
            }

            // on persiste et on flush
            $this->entityManager->persist($product);
            $this->entityManager->flush();

            return $this->json($product, 201, [], ['groups' => self::GROUP_PRODUCT_READ]);
        } catch (\Exception $e) {
            return $this->json(['message' => $e->getMessage()], 500);
        }
    }

    #[Route(self::PRODUCT_ROUTE, name: 'update_product', methods: ['PUT'])]
    public function update_product(int $id, Request $request): JsonResponse
    {
        try {
            $product = $this->entityManager->getRepository(Product::class)->find($id);

            if (!$product) {
                return $this->json([
                    'message' => self::MESSAGE_PRODUCT_NOT_FOUND
                ], 404);
            }

            $content = $request->getContent();
            $data =  json_decode($content, true);

            $product->setName($data['name']);
            $product->setDescription($data['description']);
            $product->setPrice($data['price']);

            $this->entityManager->persist($product);
            $this->entityManager->flush();

            return $this->json($product, 200, [], ['groups' => self::GROUP_PRODUCT_READ]);
        } catch (\Exception $e) {
            return $this->json(['message' => $e->getMessage()], 500);
        }
    }

    #[Route(self::PRODUCT_ROUTE, name: 'delete_product', methods: ['DELETE'])]
    public function delete_product(int $id): JsonResponse
    {
        try {
            $product = $this->entityManager->getRepository(Product::class)->find($id);

            if (!$product) {
                return $this->json([
                    'message' => self::MESSAGE_PRODUCT_NOT_FOUND
                ], 404);
            }

            $this->entityManager->remove($product);
            $this->entityManager->flush();

            return $this->json(['message' => 'Produit supprimé'], 200);
        } catch (\Exception $e) {
            return $this->json(['message' => $e->getMessage()], 500);
        }
    }
}

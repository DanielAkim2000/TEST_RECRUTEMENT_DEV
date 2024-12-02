<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\Product;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api')]
class ProductController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private ValidatorInterface $validator;
    private LoggerInterface $logger;

    private const PRODUCT_ROUTE = '/product/{id}';
    private const MESSAGE_PRODUCT_NOT_FOUND = 'Produit non trouvé';
    private const MESSAGE_PRODUCT_ERROR = 'Une erreur est survenue';
    private const GROUP_PRODUCT_READ = 'product:read';



    public function __construct(EntityManagerInterface $entityManager, ValidatorInterface $validator, LoggerInterface $logger)
    {
        $this->entityManager = $entityManager;
        $this->validator = $validator;
        $this->logger = $logger;
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
            // definition de la date de creation
            $newDate = new DateTimeImmutable();
            $product->setCreatedAt($newDate);

            //on verifie si la categorie existe
            if (isset($data['category']['id'])) {
                $category = $this->entityManager->getRepository(Category::class)->find($data['category']['id']);
                if ($category) {
                    $product->setCategory($category);
                }
            }
            // on verifie les erreurs
            $errors = $this->validator->validate($product);
            // si il y a des erreurs on les retourne
            if (count($errors) > 0) {
                return $this->json($errors, 400);
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

            if (isset($data['category_id'])) {
                $category = $this->entityManager->getRepository(Category::class)->find($data['category_id']);
                if ($category) {
                    $product->setCategory($category);
                }
            }

            $errors = $this->validator->validate($product);
            if (count($errors) > 0) {
                return $this->json($errors, 400);
            }

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

    #[Route('/products/search', name: 'get_products_by_category', methods: ['GET'])]
    public function get_products_by_category(Request $request): JsonResponse
    {
        try {
            $search = trim($request->query->get('search', ''));
            $page = $request->query->getInt('page') ?? 1;
            $limit = $request->query->getInt('limit') ?? 10;

            $products = $this->entityManager->getRepository(Product::class)->findPaginatedProductsBySearch($page, $limit, $search);
            $totalItems = $this->entityManager->getRepository(Product::class)->countProductsBySearch($search);
            $totalPages = ceil($totalItems / $limit);
            return $this->json([
                'products' => $products,
                "currentPage" => $page,
                "totalItems" => $totalItems,
                "totalPages" => $totalPages,
            ], 200, [], ['groups' => self::GROUP_PRODUCT_READ]);
        } catch (\Exception $e) {
            return $this->json(['message' => $e->getMessage()], 500);
        }
    }
}

<?php

namespace App\Controller;

use App\Entity\Category;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\Request;

#[Route('/api')]
class CategoryController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private LoggerInterface $logger;

    private const CATEGORY_ROUTE = '/category/{id}';

    private const MESSAGE_CATEGORY_NOT_FOUND = 'Categorie non trouvée';

    private const MESSAGE_CATEGORY_ERROR = 'Une erreur est survenue';

    public function __construct(EntityManagerInterface $entityManager, LoggerInterface $logger)
    {
        $this->entityManager = $entityManager;
        $this->logger = $logger;
    }

    #[Route('/categories', name: 'get_all_categories', methods: ['GET'])]
    public function get_all_categories(): JsonResponse
    {
        try {
            $repository = $this->entityManager->getRepository(Category::class);
            $categories = $repository->findAll();

            return $this->json($categories, 200, [], ['groups' => 'category:read']);
        } catch (\Exception $e) {
            return $this->json(['message' => $e->getMessage()], 500);
        }
    }

    #[Route(self::CATEGORY_ROUTE, name: 'get_category', methods: ['GET'])]
    public function get_category(int $id): JsonResponse
    {
        try {
            $category = $this->entityManager->getRepository(Category::class)->find($id);

            if (!$category) {
                return $this->json([
                    'message' =>
                    self::MESSAGE_CATEGORY_NOT_FOUND
                ], 404);
            }

            return $this->json($category, 200, [], ['groups' => 'category:read']);
        } catch (\Exception $e) {
            return $this->json(['message' => self::MESSAGE_CATEGORY_ERROR], 500);
        }
    }

    #[Route('/category', name: 'create_category', methods: ['POST'])]
    public function create_category(Request $request): JsonResponse
    {
        try {
            $content = json_decode($request->getContent(), true);

            $category = new Category();
            $category->setName($content['name']);

            $this->entityManager->persist($category);
            $this->entityManager->flush();

            return $this->json(['message' => 'Categorie créée'], 201);
        } catch (\Exception $e) {
            return $this->json(['message' => self::MESSAGE_CATEGORY_ERROR], 500);
        }
    }

    #[Route(self::CATEGORY_ROUTE, name: 'update_category', methods: ['PUT'])]
    public function update_category(int $id, Request $request): JsonResponse
    {
        try {
            $content = json_decode($request->getContent(), true);

            $category = $this->entityManager->getRepository(Category::class)->find($id);

            if (!$category) {
                return $this->json(['message' => self::MESSAGE_CATEGORY_NOT_FOUND], 404);
            }

            $category->setName($content['name']);

            $this->entityManager->persist($category);
            $this->entityManager->flush();

            return $this->json(['status' => 'Categorie mise à jour'], 200);
        } catch (\Exception $e) {
            return $this->json(['message' => self::MESSAGE_CATEGORY_ERROR], 500);
        }
    }

    #[Route(self::CATEGORY_ROUTE, name: 'delete_category', methods: ['DELETE'])]
    public function delete_category(int $id): JsonResponse
    {
        try {
            $category = $this->entityManager->getRepository(Category::class)->find($id);

            if (!$category) {
                return $this->json(['message' => self::MESSAGE_CATEGORY_NOT_FOUND], 404);
            }

            $this->entityManager->remove($category);
            $this->entityManager->flush();

            return $this->json(['status' => 'Categorie supprimée'], 200);
        } catch (\Exception $e) {
            return $this->json(['message' => self::MESSAGE_CATEGORY_ERROR], 500);
        }
    }
}

<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class AuthController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private ValidatorInterface $validator;

    public function __construct(EntityManagerInterface $entityManager, ValidatorInterface $validator)
    {
        $this->entityManager = $entityManager;
        $this->validator = $validator;
    }

    #[Route('/auth/register', name: 'register', methods: ['POST'])]
    public function indexAction(Request $request): JsonResponse
    {
        try {
            $content = json_decode($request->getContent(), true);
            $nom = $content['nom'] ?? "";
            $prenom = $content['prenom'] ?? "";
            $email = $content['email'] ?? "";
            $password = $content['password'] ?? "";
            $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $email]);
            if ($user) {
                return new JsonResponse(['message' => 'Cet email est déjà utilisé', "severity" => "info"], 200);
            }
            $user = new User();
            $user->setNom($nom);
            $user->setPrenom($prenom);
            $user->setEmail($email);
            $user->setPassword(password_hash($password, PASSWORD_BCRYPT));
            $errors = $this->validator->validate($user);
            if (count($errors) > 0) {
                return $this->json($errors, 400);
            }
            $this->entityManager->persist($user);
            $this->entityManager->flush();
            return new JsonResponse(['message' => 'Votre compte a été créé avec succès', "severity" => "success"], 201);
        } catch (\Exception $e) {
            return new JsonResponse(['message' => $e->getMessage(), "severity" => "error"], 500);
        }
    }
}

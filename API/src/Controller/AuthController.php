<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;

class AuthController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private ValidatorInterface $validator;
    private $jwtManager;

    public function __construct(EntityManagerInterface $entityManager, ValidatorInterface $validator, JWTTokenManagerInterface $jwtManager)
    {
        $this->entityManager = $entityManager;
        $this->validator = $validator;
        $this->jwtManager = $jwtManager;
    }

    #[Route('/auth/register', name: 'register', methods: ['POST'])]
    public function register(Request $request): JsonResponse
    {
        try {
            $content = json_decode($request->getContent(), true);
            $nom = $content['name'] ?? "";
            $prenom = $content['firstname'] ?? "";
            $email = $content['email'] ?? "";
            $password = $content['password'] ?? "";
            $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $email]);
            if ($user) {
                return new JsonResponse(['message' => 'Cet email est déjà utilisé', "severity" => "info"], 404);
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
            return $this->json(['message' => 'Vous n\'êtes pas connecte', "severity" => "info"], 401);
        }
    }

    #[Route('/auth/me', name: 'me', methods: ['GET'])]
    public function me(Request $request): JsonResponse
    {
        $authorization = $request->headers->get('Authorization');
        try {
            $token = explode(' ', $authorization)[1];
            $token = $this->jwtManager->parse($token);
            if (!$token) {
                return $this->json(null, 200);
            }
            $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $token['username']]);

            return $this->json($user, 200, [], ['groups' => 'user:read']);
        } catch (\Exception $e) {
            return $this->json(['message' => 'Vous n\'êtes pas connecte', "severity" => "info"], 401);
        }
    }

    #[Route('/auth/me', name: 'update', methods: ['PUT'])]
    public function updateUser(Request $request): JsonResponse
    {
        $authorization = $request->headers->get('Authorization');
        try {
            $content = json_decode($request->getContent(), true);
            $nom = $content['name'] ?? "";
            $prenom = $content['firstname'] ?? "";
            $email = $content['email'] ?? "";
            $newPassword = $content['newPassword'] ?? "";
            $password = $content['password'] ?? "";
            $token = explode(' ', $authorization)[1];
            $token = $this->jwtManager->parse($token);
            if (!$token) {
                return $this->json(['message' => 'Vous n\'êtes pas connecte', "severity" => "info"], 401);
            }
            $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $token['username']]);
            //compare password with hash

            if (!password_verify($password, $user->getPassword())) {
                $violations = [
                    "violations" => [
                        [
                            "propertyPath" => "password",
                            "title" => "Mot de passe incorrect"
                        ]
                    ]
                ];
                return $this->json($violations, 404);
            }

            $usercheck = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $email]);
            if ($usercheck  && $user->getEmail() !== $email) {
                $violations = [
                    "violations" => [
                        [
                            "propertyPath" => "email",
                            "title" => "Cet email est déjà utilisé"
                        ]
                    ]
                ];
                return $this->json($violations, 404);
            }

            if ($nom != "") {
                $user->setNom($nom);
            }

            if ($prenom != "") {
                $user->setPrenom($prenom);
            }
            if ($email != "") {
                $user->setEmail($email);
            }
            if ($newPassword != "") {
                $user->setPassword(password_hash($newPassword, PASSWORD_BCRYPT));
            }
            $errors = $this->validator->validate($user);
            if (count($errors) > 0) {
                return $this->json($errors, 400);
            }



            $this->entityManager->persist($user);
            $this->entityManager->flush();

            return $this->json(['message' => 'Votre compte a été mis à jour avec succès', "severity" => "success"], 200);
        } catch (\Exception $e) {
            return $this->json(['message' => 'Vous n\'êtes pas connecte', "severity" => "info"], 401);
        }
    }
}

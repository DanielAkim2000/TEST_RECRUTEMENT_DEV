<?php

namespace App\Entity;

use App\Repository\ProductRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
class Product
{
    private const GROUP_PRODUCT_READ = 'product:read';

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups([self::GROUP_PRODUCT_READ])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups([self::GROUP_PRODUCT_READ])]
    #[Assert\NotBlank(message: 'Le nom ne doit pas être vide')]
    #[Assert\Length(min: 3, max: 255, minMessage: 'Le nom doit contenir au moins 3 caractères', maxMessage: 'Le nom doit contenir au maximum 255 caractères')]
    #[Assert\Type(type: 'string', message: 'Le nom doit être une chaîne de caractères')]
    #[Assert\Regex(pattern: '/^[a-zA-Z0-9_]+$/', message: 'Le nom ne doit contenir que des lettres, des chiffres et des tirets')]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups([self::GROUP_PRODUCT_READ])]
    #[Assert\NotBlank(message: 'La description ne doit pas être vide')]
    #[Assert\Length(min: 3, max: 1024, minMessage: 'La description doit contenir au moins 3 caractères', maxMessage: 'La description doit contenir au maximum 1024 caractères')]
    #[Assert\Type(type: 'string', message: 'La description doit être une chaîne de caractères')]
    #[Assert\Regex(pattern: '/^[a-zA-Z0-9_]+$/', message: 'La description ne doit contenir que des lettres, des chiffres et des tirets')]
    private ?string $description = null;

    #[ORM\Column]
    #[Groups([self::GROUP_PRODUCT_READ])]
    #[Assert\NotBlank(message: 'Le prix ne doit pas être vide')]
    #[Assert\Type(type: 'float', message: 'Le prix doit être un nombre décimal')]
    #[Assert\Positive(message: 'Le prix doit être un nombre positif')]
    #[Assert\Regex(pattern: '/^[0-9]+(\.[0-9]{1,2})?$/', message: 'Le prix doit être un nombre décimal avec au maximum 2 chiffres après la virgule')]
    private ?float $price = null;

    #[ORM\ManyToOne(inversedBy: 'createdAt')]
    #[Assert\NotBlank(message: 'Cette catégorie n\'existe pas')]
    #[Assert\Type(type: Category::class, message: 'La catégorie doit être une instance de Category')]
    #[Groups([self::GROUP_PRODUCT_READ])]
    private ?Category $category = null;

    #[ORM\Column]
    #[Groups([self::GROUP_PRODUCT_READ])]
    #[Assert\NotBlank(message: 'La date de création ne doit pas être vide')]
    #[Assert\Type(type: "\DateTimeImmutable", message: 'La date de création doit être une instance de DateTimeImmutable')]
    private ?\DateTimeImmutable $createdAt = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): static
    {
        $this->category = $category;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }
}

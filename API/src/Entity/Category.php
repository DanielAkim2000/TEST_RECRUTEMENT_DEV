<?php

namespace App\Entity;

use App\Repository\CategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CategoryRepository::class)]
class Category
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    /**
     * @var Collection<int, Products>
     */
    #[ORM\OneToMany(targetEntity: Products::class, mappedBy: 'category')]
    private Collection $products;

    public function __construct()
    {
        $this->products = new ArrayCollection();
    }

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

    /**
     * @return Collection<int, Products>
     */
    public function getProdutcs(): Collection
    {
        return $this->products;
    }

    public function addProdutcs(Products $products): static
    {
        if (!$this->products->contains($products)) {
            $this->products->add($products);
            $products->setCategory($this);
        }

        return $this;
    }

    public function removeProdutcs(Products $products): static
    {
        if ($this->products->removeElement($products) && $products->getCategory() === $this) {
            // set the owning side to null (unless already changed)
            $products->setCategory(null);
        }

        return $this;
    }
}

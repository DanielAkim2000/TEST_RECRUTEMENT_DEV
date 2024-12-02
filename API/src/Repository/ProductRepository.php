<?php

namespace App\Repository;

use App\Entity\Product;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Product>
 */
class ProductRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Product::class);
    }
    /**
     * @return Product[] Returns an array of Products objects
     */
    public function findPaginatedProductsBySearch($page, $limit, $search, $priceMin, $priceMax, $category_id): array
    {
        if ($page < 1) {
            $page = 1;
        }
        if ($limit < 1) {
            $limit = 1;
        }
        if ($priceMin < 0) {
            $priceMin = null;
        }
        if ($priceMax < $priceMin || $priceMax < 0) {
            $priceMax = null;
        }
        if ($category_id <= 0) {
            $category_id = null;
        }

        $offset = ($page - 1) * $limit;

        $qb = $this->createQueryBuilder("p")
            ->andWhere("LOWER(p.name) LIKE LOWER(:search)")
            ->setParameter("search", "%" . $search . "%")
            ->setFirstResult($offset)
            ->setMaxResults($limit);

        if ($category_id !== null) {
            $qb->andWhere("p.category = :category_id")
                ->setParameter("category_id", $category_id);
        }

        if ($priceMin !== null) {
            $qb->andWhere("p.price >= :priceMin")
                ->setParameter("priceMin", $priceMin);
        }

        if ($priceMax !== null) {
            $qb->andWhere("p.price <= :priceMax")
                ->setParameter("priceMax", $priceMax);
        }

        return $qb->getQuery()
            ->getResult();
    }
    /**
     * @return int Returns the number of products
     */
    public function countProductsBySearch($search, $priceMin, $priceMax, $category_id): int
    {
        if ($priceMin < 0) {
            $priceMin = null;
        }
        if ($priceMax < $priceMin || $priceMax < 0) {
            $priceMax = null;
        }
        if ($category_id <= 0) {
            $category_id = null;
        }
        $qb = $this->createQueryBuilder("p")
            ->select("COUNT(p.id)")
            ->andWhere("LOWER(p.name) LIKE LOWER(:search)")
            ->setParameter("search", "%" . $search . "%");

        if ($category_id !== null) {
            $qb->andWhere("p.category = :category_id")
                ->setParameter("category_id", $category_id);
        }

        if ($priceMin !== null) {
            $qb->andWhere("p.price >= :priceMin")
                ->setParameter("priceMin", $priceMin);
        }

        if ($priceMax !== null) {
            $qb->andWhere("p.price <= :priceMax")
                ->setParameter("priceMax", $priceMax);
        }

        return $qb->getQuery()
            ->getSingleScalarResult();
    }

    //    public function findOneBySomeField($value): ?Products
    //    {
    //        return $this->createQueryBuilder('p')
    //            ->andWhere('p.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}

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
    public function findPaginatedProductsBySearch($page, $limit, $search, $price, $category_id): array
    {
        if ($page < 1) {
            $page = 1;
        }
        if ($limit < 1) {
            $limit = 1;
        }
        if ($price < 0) {
            $price = null;
        }
        if ($category_id < 1) {
            $category_id = null;
        }

        $offset = ($page - 1) * $limit;

        $qb = $this->createQueryBuilder("p")
            ->andWhere("LOWER(p.name) LIKE LOWER(:search)")
            ->setParameter("search", "%" . $search . "%")
            ->setFirstResult($offset)
            ->setMaxResults($limit);

        if ($category_id !== null) {
            $qb->andWhere("p.category_id = :category_id")
                ->setParameter("category_id", $category_id);
        }

        if ($price !== null) {
            $qb->orderBy("p.price", $price > 0 ? 'ASC' : 'DESC');
        }

        return $qb->getQuery()
            ->getResult();
    }
    /**
     * @return int Returns the number of products
     */
    public function countProductsBySearch($search, $price, $category_id): int
    {
        if ($price < 0) {
            $price = null;
        }
        if ($category_id < 1) {
            $category_id = null;
        }
        $qb = $this->createQueryBuilder("p")
            ->select("COUNT(p.id)")
            ->andWhere("LOWER(p.name) LIKE LOWER(:search)")
            ->setParameter("search", "%" . $search . "%");

        // Filtrer par category_id seulement si il est défini
        if ($category_id !== null) {
            $qb->andWhere("p.category_id = :category_id")
                ->setParameter("category_id", $category_id);
        }

        // Filtrer par prix seulement si il est défini
        if ($price !== null) {
            $qb->orderBy("p.price", $price > 0 ? 'ASC' : 'DESC');
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

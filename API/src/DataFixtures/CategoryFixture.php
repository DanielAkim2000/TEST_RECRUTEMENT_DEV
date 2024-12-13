<?php

namespace App\DataFixtures;

use App\Entity\Category;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class CategoryFixture extends Fixture
{
    public const CATEGORY_REFERENCE = 'category_';

    public function load(ObjectManager $manager): void
    {
        // Tableau de catégories avec 150 noms différents
        $categories = [
            'Électronique',
            'Livres',
            'Vêtements',
            'Jouets',
            'Meubles',
            'Cuisine',
            'Maison',
            'Bricolage',
            'Beauté',
            'Sport',
            'Informatique',
            'Téléphonie',
            'Audio',
            'Vidéo',
            'Jeux Vidéo',
            'Santé',
            'Alimentation',
            'Accessoires',
            'Animalerie',
            'Photographie',
            'Mode',
            'Chaussures',
            'Accessoires Mode',
            'Montres',
            'Bijoux',
            'Musique',
            'Instruments de musique',
            'Décoration',
            'Bureau',
            'Enfants',
            'Fleurs et plantes',
            'Automobile',
            'Vélo',
            'Motos',
            'Camping',
            'Voyages',
            'Sacs',
            'Bagages',
            'Mobilier extérieur',
            'Literie',
            'Parfumerie',
            'High-tech',
            'Jardin',
            'Outillage',
            'Peinture',
            'Rangement',
            'Cuisine et Maison',
            'Luminaires',
            'Bricolage et Construction',
            'Maquillage',
            'Produits bio',
            'Cosmétiques',
            'Vins et Spiritueux',
            'Herboristerie',
            'Accessoires informatiques',
            'Gastronomie',
            'Poissonnerie',
            'Viande',
            'Épicerie',
            'Pâtisserie',
            'Fromage',
            'Boucherie',
            'Mode enfant',
            'Vêtements de sport',
            'Sous-vêtements',
            'Pyjamas',
            'Lingerie',
            'Accessoires pour animaux',
            'Alimentation pour animaux',
            'Bricolage et Jardin',
            'Articles de pêche',
            'Décoration intérieure',
            'Meubles de jardin',
            'Matières premières',
            'Papeterie',
            'Outils de jardinage',
            'Accessoires sportifs',
            'Ressources humaines',
            'Emploi',
            'Services à la personne',
            'Événements',
            'Vacances',
            'Plantes d’intérieur',
            'Saisonniers',
            'Abonnement',
            'Recettes',
            'Photographies',
            'Accessoires bébé',
            'Électronique maison',
            'Petits électroménagers',
            'Meubles de maison',
            'Accessoires d’intérieur',
            'Vêtements hommes',
            'Vêtements femmes',
            'Mode pour enfants',
            'Cuisine à emporter',
            'Produits d’entretien',
            'Voiture',
            'Livres numériques',
            'Livres papier',
            'Bibliothèque',
            'Jeux de société',
            'Accessoires informatiques',
            'Technologies vertes',
            'Plantes exotiques',
            'Vêtements de nuit',
            'Linge de maison',
            'Technologies portables',
            'Cameras',
            'Lunettes de soleil',
            'Vêtements de sport',
            'Vêtements pour bébés',
            'Produits ménagers',
            'Informatique et bureau',
            'Travail à domicile',
            'Jeux éducatifs',
            'Jouets en bois',
            'Technologie mobile',
            'Accessoires électroniques',
            'Jouets d’intérieur',
            'Accessoires de jeux vidéo',
            'Articles en plastique',
            'Mode éthique',
            'Vêtements de yoga',
            'Sports nautiques',
            'Accessoires de cuisine',
            'Meubles anciens',
            'Outils manuels',
            'Vêtements vintage',
            'Vêtements pour le travail',
            'Costumes',
            'Vêtements de cérémonie',
            'Robes de soirée',
            'Accessoires d’automobile',
            'Objets de collection',
            'Électronique grand public',
            'Composants électroniques',
            'Instruments de mesure',
            'Meubles de chambre',
            'Literie haut de gamme',
            'Système audio',
            'Casques audio',
            'Appareils photo',
            'Accessoires photo',
            'Maquillage naturel',
            'Technologie de la maison',
            'Médias',
            'Climatisation',
            'Produits de nettoyage',
            'Produits électroniques',
            'Montres intelligentes',
            'Lampes',
            'Vêtements durables',
            'Mode recyclée',
            'Sac à dos',
            'Chapeaux',
            'Accessoires de bureau',
            'Puzzles',
            'Équipements sportifs',
            'Vêtements d’hiver',
            'Chapeaux et casquettes',
            'Vêtements pour la maison',
            'Objets décoratifs',
            'Équipements de camping',
            'Sacs à main',
            'Jupes',
            'Pantalons',
            'Pantalons de sport',
            'Vestes',
            'Gants',
            'Équipement de sport',
            'Accessoires cuisine',
            'Casseroles',
            'Accessoires bureau',
            'Appareils ménagers',
            'Accessoires électriques',
            'Électroménager',
            'Luminaires et ampoules',
            'Peinture et décoration',
            'Cuisine moderne',
            'Espace extérieur',
            'Coussins',
            'Planchers',
            'Linge de bain',
            'Sacs et accessoires',
            'Objets utiles',
            'Produits de soins',
            'Affaires pour enfants',
            'Accessoires de plage'
        ];

        // Création de 150 catégories
        foreach ($categories as $key => $name) {
            $category = new Category();
            $category->setName($name);

            $manager->persist($category);

            // Ajout de référence pour chaque catégorie
            $this->addReference(self::CATEGORY_REFERENCE . $key, $category);
        }

        $manager->flush();
    }
}
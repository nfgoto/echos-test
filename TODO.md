# TODO

## Sécurité

1. **Protection CSRF**: Mettre en place des mécanismes de protection contre les attaques CSRF (Cross-Site Request Forgery).
2. **Gestion des Rôles et Permissions**: Implémenter une gestion fine des rôles et permissions pour limiter l'accès aux routes sensibles.
3. **Journalisation des Activités**: Enregistrer les tentatives de connexion et les modifications des données critiques.
4. **Taux Limit et Protection contre les Attaques par Force Brute**: Utiliser des taux limit pour les points d'entrée critiques comme les endpoints d'authentification.
5. **Sécurisation des entête HTTP**: Utiliser `helmet` pour sécuriser les entête HTTP.
6. **Validation des Jetons JWT**: Implémenter des vérifications robustes des jetons JWT pour éviter les attaques de type JWT forgery.
7. **Accèa sécurisée à la documentation d'API** sécuriser l'accès au la documention swagger aux utilisateurs authorisés
8. **Gestion des jetons JWT à la déconnexion** rendre un invalides les jetons JWT (décider si gestion stateless ou stateful de la connexion de l'utilisateur)

## Testabilité

1. **Tests Unitaires**: Écrire des tests unitaires pour toutes les fonctions et méthodes critiques.
2. **Mocking des Dépendances**: Utiliser des mocks pour isoler les tests des dépendances externes (comme les bases de données).
3. **Couverture de Code**: Assurer une couverture de code élevée pour identifier les zones non testées.
4. **Tests de Performance**: Implémenter des tests de charge pour évaluer la performance sous des conditions de trafic élevé.
5. **Tests de Sécurité**: Utiliser des outils de test de sécurité automatisés pour détecter les vulnérabilités courantes.
6. **Intégration Continue**: Configurer une pipeline CI/CD pour exécuter les tests automatiquement à chaque commit.

## BDD (Behavior-Driven Development)

1. **Définir les Scénarios**: Écrire des scénarios BDD utilisant Gherkin pour décrire le comportement attendu de l'application.
2. **Implémenter les Tests BDD**: Utiliser des frameworks comme Cucumber pour implémenter et exécuter les tests BDD.
3. **Documentation Vivante**: Utiliser les scénarios BDD comme documentation vivante du comportement de l'application.

## Observabilité

1. **Logs Structurés**: Utiliser une bibliothèque de logging comme `winston` ou `pino` pour produire des logs structurés.
2. **Monitoring**: Intégrer des outils de monitoring comme Prometheus et Grafana pour surveiller les métriques de performance et d'utilisation.
3. **Alertes**: Configurer des alertes pour détecter automatiquement les anomalies et les problèmes de performance.
4. **Tracing Distribué**: Implémenter OpenTelemetry pour tracer les requêtes à travers différents services et comprendre le cheminement des données.
5. **Health Check** implémenter un health afin de savoir si l'API est disponible (au niveau code ou au niveau d'un reverse proxy ou API manager)

## Traçabilité

1. **ID de Corrélation**: Ajouter des IDs de corrélation aux requêtes pour faciliter le suivi des transactions à travers le système.
2. **Journalisation des Requêtes**: Logger toutes les requêtes entrantes et sortantes avec leurs IDs de corrélation.
3. **Audit des Actions Utilisateur**: Enregistrer toutes les actions importantes des utilisateurs (modifications, suppressions) pour un audit trail complet.
4. **Conservation des Logs**: Définir une politique de rétention des logs pour garantir que les informations d'audit sont disponibles sur une période suffisante.

## Améliorations d'Architecture et de Conception

1. **Utilisation des DTOs (Data Transfer Objects)**: Assurer une séparation claire entre les entités de base de données et les objets de transfert de données.
2. **Patterns de Conception**: Implémenter des patterns de conception comme le Repository Pattern pour une meilleure gestion des accès aux données.
3. **Découpage en Microservices**: Considérer la découpe de l'application en microservices pour une meilleure scalabilité.
4. **Utilisation de Docker**: Dockeriser l'application pour un déploiement facile et une isolation des environnements.
5. **Documentation de l'API**: Utiliser Swagger pour documenter l'API de manière claire et concise.
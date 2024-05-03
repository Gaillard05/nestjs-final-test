export interface Task {
    id?: string; // Identifiant de la tâche (optionnel)
    name: string; // nom de la tâche
    userId: string; // Identifiant de l'id de l'utilisateur
    priority: number; // priorité de la tâche
}
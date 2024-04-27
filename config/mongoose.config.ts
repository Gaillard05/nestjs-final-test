import { MongooseModuleOptions } from '@nestjs/mongoose';

export const mongooseConfig: MongooseModuleOptions = {
    uri: 'mongodb://localhost:24000/task', // Assurez-vous de remplacer 'votre_base_de_donnees' par le nom de votre base de données MongoDB
};
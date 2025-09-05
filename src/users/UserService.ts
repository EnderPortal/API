import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./User";
import { Repository } from "typeorm";

@Injectable()
export class UserService{

    constructor(
        @InjectRepository(User) private userRepo : Repository<User>,
    ){}

    /**
     * Create a user in the database
     * 
     * @param username player name
     * @param password player password
     * @returns user entity
     */
    async create(username: string, password: string) : Promise<User>{
        const user = this.userRepo.create({username, password});
        return this.userRepo.save(user);
    }

    /**
     * Retrieves a User based on their name
     * 
     * @param username name of the player or we want to recover his user object
     * @returns the player's object or nothing if the nickname is not found
     */
    async findByUsername(username: string): Promise<User | null>{
        return this.userRepo.findOne({where: {username}});
    }
}
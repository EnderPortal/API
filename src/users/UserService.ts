import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./User";
import { Repository } from "typeorm";
import { Profile } from "./profile/Profile";
import { UserProfileDTO } from "./dtos/UserProfileDTO";
import { Rank } from "src/servers/ranks/Rank";

@Injectable()
export class UserService{

    constructor(
        @InjectRepository(User) private userRepo : Repository<User>,
        @InjectRepository(Rank) private rankRepo : Repository<Rank>,
    ){}

    /**
     * Create a user in the database
     * 
     * @param username player name
     * @param password player password
     * @returns user entity
     */
    async create(mail:string, username: string, password: string) : Promise<User>{
        const profile = new Profile();
        
        /**
         * retrieving the named player grade from the database, this is the default grade
         */
        const rank = await this.rankRepo.findOne({where : {name: "Joueur"}});
        const user = this.userRepo.create({username, mail, password, profile});
        
        //Apply rank
        if(rank){
            user.rank = rank;
        }

        return this.userRepo.save(user);
    }

    /**
     * Retrieves a User based on their name
     * 
     * @param username name of the player or we want to recover his user object
     * @returns the player's object or nothing if the nickname is not found
     */
    async findByUsername(username: string): Promise<User | null>{
        return this.userRepo.findOne({where: {username}, relations: ["rank"]});
    }

    /**
     * Retrieves a User based on their mail
     * 
     * @param mail mail of the player or we want to recover his user object
     * @returns the player's object or nothing if the mail is not found
     */
    async findByMail(mail: string): Promise<User | null>{
        return this.userRepo.findOne({where: {mail}});
    }

    /**
     * Retrieve a player's profile
     * @param id user ID
     * @returns UserProfileDTO (without password) or null
     */
    async findById(id: number): Promise<UserProfileDTO | null>{
        const user = await this.userRepo.findOne({where : {id}, relations: ["profile", "rank"]});

        if(!user){
            return null;
        }

        //Create DTO
        const userDTO: UserProfileDTO = {
            id: user.id,
            username: user.username,
            mail: user.mail,
            rankId: user.rank.id,
            profile: user.profile,
        };

        return userDTO;
    }
}
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/users/UserService";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService{
    
    constructor(
        private userService : UserService,
        private jwtService: JwtService,
    ){}

    /**
     * register a player through the auth system
     * 
     * @param username player name
     * @param password player password
     * @returns user object (id, username)
     */
    async register(username: string, password: string){
        //Checked if user already exist
        const userChecked = await this.userService.findByUsername(username);
        if(userChecked){
            throw new BadRequestException("Username already exists");
        }

        //checked if password >=5
        if(password.length < 5){
            throw new BadRequestException("Password too short");
        }

        //password encryption
        const pwdHashed = await bcrypt.hash(password, 10);

        //Create an user
        const user = await this.userService.create(username, pwdHashed);
        
        //Create a new login session
        const login = await this.login(username, password);

        //TODO : créer un DTO ?
        return {
            user : {id: user.id, username: user.username},
            access_token: login.access_token,
        }
    }

    /**
     * Authenticates a player and returns a JWT
     * @param username player name
     * @param password password player
     * @returns Player data object with access_token
     */
    async login(username: string, password: string){
        //Check name, if exist
        const user = await this.userService.findByUsername(username);

        if(!user){
            throw new UnauthorizedException("Invalide credentials");
        }

        //Check password, if exist
        const pwdCheched = await bcrypt.compare(password, user.password);

        if(!pwdCheched){
            throw new UnauthorizedException("Invalide credentials");
        }

        //TODO : créer un DTO ?
        const data = {id: user.id, username : user.username};
        return {
            access_token : this.jwtService.sign(data)
        };
    }
}
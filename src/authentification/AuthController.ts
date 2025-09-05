import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./AuthService";
import { JwtAuthGuard } from "./jwt/JwtGuard";

@Controller("auth")
export class AuthController {

    constructor(private authService : AuthService){}

    /**
     * Endpoint POST /register
     * 
     * @param body Object:
     * - username: player name
     * - password: player password
     * 
     * @returns new User Object with the JWT access token + data
     */
    @Post("register")
    async register(@Body() body : {username: string, password : string}){
        return this.authService.register(body.username, body.password);
    }

    /**
     * Endpoint POST /login
     * 
     * @param body Object:
     * - username: player name
     * - password: player password
     * 
     * @returns Object with the JWT access token + data
     */
    @Post("login")
    async login(@Body() body : {username: string, password :string}){
        return this.authService.login(body.username, body.password);
    }

    /**
     * GET /profile
     * returns the logged in user's information from the JWT
     * 
     * @param request HTTP request
     * @returns User object
     */
    @UseGuards(JwtAuthGuard)
    @Get("profile")
    getProfile(@Request() request){
        return request.user;
    }
}
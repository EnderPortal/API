import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../authentification/jwt/JwtGuard';
import { UserService } from './UserService';

@Controller("users")
export class UserController{

    constructor(private userService : UserService){}

    /**
     * GET /profile
     * returns the logged in user's information from the JWT
     * 
     * @param request HTTP request
     * @returns User object
     */
    @UseGuards(JwtAuthGuard)
    @Get("user")
    getUser(@Request() request){
        const userId = request.user.id;
        return this.userService.findById(userId);
    }
}
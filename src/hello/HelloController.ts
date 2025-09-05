import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../authentification/jwt/JwtGuard';

@Controller('hello')
export class HelloController {

    /**
     * Test, create a Get protected by authentification system
     */
    @UseGuards(JwtAuthGuard)
    @Get()
    sayHello(@Request() request){
        return {
            message: `Hello ! Ur user id: ${request.user.id}`,
            id: request.user.id
        };
    }
}

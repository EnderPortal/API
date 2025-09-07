import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../authentification/jwt/JwtGuard';
import { APIKeyGuard } from 'src/authentification/api-key/APIKeyGuard';

@Controller('hello')
export class HelloController {

    /**
     * Test, create a Get protected by API KEY
     */
    @UseGuards(APIKeyGuard)
    @Get()
    sayHello(@Request() request){
        return "Hello World !";
    }
}

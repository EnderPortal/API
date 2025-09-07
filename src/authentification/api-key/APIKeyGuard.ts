import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class APIKeyGuard implements CanActivate{

    constructor(private config : ConfigService){}

    /**
     * Checks if the request contains a valid API Key 
     * to access the route
     * 
     * @param context ExecutionContext
     * @returns true if the API Key is present and valid
     */
    canActivate(context : ExecutionContext) : boolean{
        const request = context.switchToHttp().getRequest();
        const apiKey = request.headers['authorization'];

        if(!apiKey){
            throw new UnauthorizedException("Missing API key");
        }
        
        const key = `Bearer ${this.config.get<string>('API_KEY')}`;
        if(apiKey !== key){
            throw new UnauthorizedException('Invalid API key');
        }

        return true;
    }
}
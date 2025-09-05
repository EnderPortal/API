import { Inject, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
* Used in controllers to check access. 
* I created a class like this later I could 
* make a system of rank, permissions etc..
*/
@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt"){}
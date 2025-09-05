import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "src/users/UserModule";
import { AuthService } from "./AuthService";
import { JwtStrategy } from "./jwt/JwtStrategy";
import { AuthController } from "./AuthController";

@Module({
    imports: [
        UserModule,
        PassportModule, 

        //JWT configuration
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config : ConfigService) => ({
                secret: config.get<string>("JWT_SECRET"),
                signOptions: 
                {
                    expiresIn: config.get<string>("JWT_EXPIRES_IN")
                },
            }),
        })
    ],

    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
})

export class AuthModule{}
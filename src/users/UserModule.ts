import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./User";
import { UserService } from "./UserService";
import { Profile } from "./profile/Profile";
import { UserController } from "./UserController";

@Module({
    imports: [TypeOrmModule.forFeature([User, Profile])],
    providers: [UserService],
    exports: [UserService],
    controllers: [UserController],
})

export class UserModule{};
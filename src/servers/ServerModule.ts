import { Module } from "@nestjs/common";
import { ServerController } from "./ServerController";

/**
 * Allows you to manage the entire server part: grades, maintenance, etc.
 */
@Module({
    imports: [/*TypeOrmModule.forFeature([User, Profile])*/],
    providers: [],
    exports: [],
    controllers: [ServerController],
})

export class ServerModule{};
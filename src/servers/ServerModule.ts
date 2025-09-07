import { Module } from "@nestjs/common";
import { ServerController } from "./ServerController";
import { Rank } from "./ranks/Rank";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RankService } from "./ranks/RankService";

/**
 * Allows you to manage the entire server part: grades, maintenance, etc.
 */
@Module({
    imports: [TypeOrmModule.forFeature([Rank])],
    providers: [RankService],
    exports: [RankService],
    controllers: [ServerController],
})

export class ServerModule{};
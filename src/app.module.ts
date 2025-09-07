import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/UserModule';
import { AuthModule } from './authentification/AuthModule';
import { HelloController } from './hello/HelloController';
import { HelloModule } from './hello/HelloModule';
import { ServerModule } from './servers/ServerModule';

@Module({
  imports: [

    //Make the .env file available everywhere in the code
    ConfigModule.forRoot({
      isGlobal: true, 
    }),

    //Database connection
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: "mysql",
        host: config.get<string>("DB_HOST"),
        port: config.get<number>("DB_PORT"),
        username: config.get<string>("DB_USER"),
        password: config.get<string>("DB_PASSWORD"),
        database: config.get<string>("DB_NAME"),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

    //Applications modules
    UserModule,
    AuthModule,
    HelloModule,
    ServerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

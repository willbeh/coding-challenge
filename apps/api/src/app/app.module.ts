import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { createTable1650004487316 } from './migrations/1650004487316-createTable';
import { Event, User } from '@coding-challenge/entities';

@Module({
  imports: [
    EventsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './data/myDb.db',
      logging: false,
      synchronize: false,
      name: 'default',
      entities: [User, Event],
      migrationsTableName: 'migrations',
      migrations: [createTable1650004487316],
      migrationsRun: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {
    console.log('__dirname', __dirname);
  }
}

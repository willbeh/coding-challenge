import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [EventsController],
  providers: [EventsService, UsersService],
})
export class EventsModule {}

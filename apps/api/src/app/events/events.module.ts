import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { UsersService } from '../users/users.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [EventsController],
  imports: [HttpModule],
  providers: [EventsService, UsersService],
})
export class EventsModule {}

import { CreateEventDto, UpdateEventDto } from '@coding-challenge/entities';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

@Controller('events')
@ApiTags('Events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService
      .create(createEventDto)
      .then(() => true)
      .catch((e) => e.message);
  }

  @ApiQuery({
    name: 'skip',
    type: Number,
    description: 'Number of rows to skip',
    required: false,
  })
  @ApiQuery({
    name: 'take',
    type: Number,
    description: 'Number of rows to show',
    required: false,
  })
  @ApiQuery({
    name: 'from',
    type: Number,
    description: 'From date in number',
    required: false,
  })
  @ApiQuery({
    name: 'until',
    type: Number,
    description: 'until date in number',
    required: false,
  })
  @Get()
  findAll(
    @Query('skip') skip = 0,
    @Query('take') take = 3,
    @Query('from') from?: number,
    @Query('until') until?: number
  ) {
    return this.eventsService.findAll(
      skip,
      take,
      from ? +from : undefined,
      until ? +until : undefined
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService
      .update(id, updateEventDto)
      .then(() => true)
      .catch((e) => e);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}

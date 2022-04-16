import { Event } from './event.entity';
import { Weather } from './weather';

export interface EventData extends Event {
  weather?: Weather;
  visaRequirements?: string;
  proofOfVaccineRequired?: boolean;
}

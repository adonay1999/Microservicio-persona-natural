import { Controller } from '@nestjs/common';
import { PersonaNaturalService } from './persona-natural.service';
import { PersonaNaturalMSG } from 'src/common/constantes';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class PersonaNaturalController {
  constructor(private readonly personaNaturalService: PersonaNaturalService) {}

  @MessagePattern(PersonaNaturalMSG.CREATE)
  async create(@Payload() payload: any) {
    return await this.personaNaturalService.create(payload);
  }

  @MessagePattern(PersonaNaturalMSG.FIND_ALL)
  async findAll(@Payload() filters: any) {
    return this.personaNaturalService.findAll(filters);
  }

  @MessagePattern(PersonaNaturalMSG.FIND_ONE)
  async findOne(@Payload() id: number) {
    return this.personaNaturalService.findOne(id);
  }

  @MessagePattern(PersonaNaturalMSG.FIND_BY_DUI)
  async findByDui(@Payload() dui: string) {
    return this.personaNaturalService.findByDui(dui);
  }
}

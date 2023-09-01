import { Controller } from '@nestjs/common';
import { PersonaNaturalService } from './persona-natural.service';
import { PersonaNaturalMSG } from 'src/common/constantes';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('persona-natural')
export class PersonaNaturalController {
    constructor(private readonly perosonaNaturalService: PersonaNaturalService) {}

  @MessagePattern(PersonaNaturalMSG.CREATE)
  async create(@Payload() payload: any) {
    return await this.perosonaNaturalService.create(payload);
  }

  @MessagePattern(PersonaNaturalMSG.FIND_ALL)
  async findAll() {
    return this.perosonaNaturalService.findAll();
  }

  @MessagePattern(PersonaNaturalMSG.FIND_ONE)
  async findOne(@Payload() id: number) {
    return this.perosonaNaturalService.findOne(id);
  }
}

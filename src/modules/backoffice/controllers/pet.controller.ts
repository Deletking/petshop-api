/* eslint-disable prettier/prettier */
import { Body, Controller, HttpException, HttpStatus, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreatePetContract } from '../contracts/pet/create-pet.contract';;
import { Pet } from '../models/pet.model';
import { Result } from '../models/result.model';
import { PetService } from '../services/pet.service';

// localhost:3000/customers
@Controller('v1/pets')
export class PetController {

  constructor(
    private readonly service: PetService,
  ) { }

  
  @Post(':document')
  @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
  async createPet(@Param('document') document, @Body() model: Pet) {
    try {
      await this.service.create(document, model); 

      return new Result('Pet cadastrado com sucesso!.', true, model, null);
    } catch (error) {
      throw new HttpException(new Result('Não foi possível criar seu pet.', false, null, error), HttpStatus.BAD_REQUEST)
    }
  }
  
  @Put(':document/:id')
  @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
  async updatePet(@Param('document') document, @Param('id') id, @Body() model: Pet) {
    try {
      await this.service.update(document, id, model);
      
      return new Result('Pet atualizado com sucesso!', true, model, null);
    } catch (error) {
      throw new HttpException(new Result('Não foi possível atualizar seu pet.', false, null, error), HttpStatus.BAD_REQUEST)
    }
  }
}
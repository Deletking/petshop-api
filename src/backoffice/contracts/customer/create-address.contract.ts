/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/utils/flunt';
import { Contract } from '../contract';
import { Address } from 'src/backoffice/models/address.model';

@Injectable()
export class CreateaAddressContract implements Contract {
    errors: any[];

    validate(model: Address): boolean {
        const flunt = new Flunt();
        
        flunt.isFixedLen(model.zipCode, 8,'CEP inválido');
        flunt.hasMinLen(model.street, 3, 'Rua inválido');
        flunt.hasMinLen(model.neighborhood, 3, 'Bairro inválido');
        flunt.hasMinLen(model.city, 3, 'Cidade inválido');
        flunt.isFixedLen(model.state, 2,'Estado inválido');
        

        this.errors = flunt.errors;
        return flunt.isValid();
    }
}
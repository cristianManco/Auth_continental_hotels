import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHotelDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsString()
  readonly city: string;

  @IsNotEmpty()
  @IsString()
  readonly country: string;
<<<<<<< HEAD
=======

  // agregar mas campos si son necesarios para la creación o registro  de  nuevos hoteles
>>>>>>> b58b4b7cbdd15ab20ac3c474369cd615aa02d82b
}

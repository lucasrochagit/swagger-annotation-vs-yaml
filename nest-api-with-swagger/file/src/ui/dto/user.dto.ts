import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
} from 'class-validator';

export class UserDTO {
  @IsOptional()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z\s]*$/, {
    message: 'name must contain only letters and space',
  })
  name: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive({ message: 'age should be bigger than zero' })
  age: number;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z\s]*$/, {
    message: 'job must contain only letters and space',
  })
  job: string;
}

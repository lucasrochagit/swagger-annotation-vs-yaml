import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
} from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiResponseProperty,
} from '@nestjs/swagger';

export class UserDTO {
  @ApiPropertyOptional()
  @ApiResponseProperty()
  @IsOptional()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z\s]*$/, {
    message: 'name must contain only letters and space',
  })
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @IsPositive({ message: 'age should be bigger than zero' })
  age: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z\s]*$/, {
    message: 'job must contain only letters and space',
  })
  job: string;
}

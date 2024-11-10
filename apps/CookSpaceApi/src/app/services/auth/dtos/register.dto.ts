import { IsEmail, IsString } from 'class-validator';
import { RegisterInput } from '@apps/CookSpaceApi/src/graphql';
import { IsSecurePassword } from '@apps/CookSpaceApi/src/app/common/decorators/isSecurePassword.decorator';

export class RegisterDTO extends RegisterInput {
  @IsEmail()
  email: string;

  @IsSecurePassword()
  password: string;

  @IsString()
  name: string;
}

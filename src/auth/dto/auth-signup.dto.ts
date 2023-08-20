import { IsNotEmpty, IsString } from 'class-validator';

export class AuthSignupDto {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

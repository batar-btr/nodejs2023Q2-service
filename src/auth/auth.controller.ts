import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignupDto } from './dto/auth-signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() authSignupDto: AuthSignupDto) {
    return this.authService.signup(authSignupDto);
  }

  @Post('login')
  login(@Body() authSignupDto: AuthSignupDto) {
    return this.authService.login(authSignupDto);
  }

  @Post('refresh')
  refresh() {
    return this.authService.refresh();
  }
}

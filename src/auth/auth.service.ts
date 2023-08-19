import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthSignupDto } from './dto/auth-signup.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(authSignupDto: AuthSignupDto) {
    const { password, login } = authSignupDto;
    const hashedPass = await bcrypt.hash(password, 10);
    return this.userService.create({ login, password: hashedPass });
  }

  async login(authSignupDto: AuthSignupDto) {
    const { login, password } = authSignupDto;

    const user = await this.prismaService.user.findFirst({
      where: {
        login,
      },
    });

    if (!user) {
      throw new ForbiddenException();
    }

    const isValidPass = await bcrypt.compare(password, user.password);

    if (isValidPass) {
      const payload = { sub: user.id, username: user.login };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new ForbiddenException();
    }
  }

  refresh() {
    return 'refresh';
  }
}

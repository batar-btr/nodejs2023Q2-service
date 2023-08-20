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
import { jwtConstants } from './constants';

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

      const accessToken = await this.jwtService.signAsync(payload, {
        expiresIn: '12h',
        secret: jwtConstants.secret,
      });
      const refreshToken = await this.jwtService.signAsync(payload, {
        expiresIn: '24h',
        secret: jwtConstants.secret,
      });

      return {
        accessToken,
        refreshToken,
      };
    } else {
      throw new ForbiddenException();
    }
  }

  async refresh({ refreshToken }) {
    const { sub } = await this.jwtService.verifyAsync(refreshToken);

    const user = await this.userService.findOne(sub);

    if (!user) throw new UnauthorizedException();

    const payload = { sub: user.id, username: user.login };

    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '12h',
      secret: jwtConstants.secret,
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: '24h',
      secret: jwtConstants.secret,
    });

    return {
      access_token,
      refresh_token,
    };
  }
}

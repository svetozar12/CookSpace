import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LocalGqlGuard } from '@apps/CookSpaceApi/src/app/guards/local.guard';
import { AuthService } from '@apps/CookSpaceApi/src/app/services/auth/auth.service';
import { User, JWT, Message } from '@apps/CookSpaceApi/src/graphql';
import { Public } from '@apps/CookSpaceApi/src/app/decorators/isPublic';
import { RegisterDTO } from '@apps/CookSpaceApi/src/app/services/auth/dtos/register.dto';
import { LoginDTO } from '@apps/CookSpaceApi/src/app/services/auth/dtos/login.dto';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation(() => JWT)
  @Public()
  @UseGuards(LocalGqlGuard)
  login(
    @Args('input') input: LoginDTO,
    @Context() context
  ): Promise<JWT | User> {
    if (input?.refreshToken)
      return this.authService.loginWithRefreshToken(
        input.refreshToken,
        context
      );
    return this.authService.login(context.req.user);
  }

  @Mutation(() => Message)
  @Public()
  register(@Args('input') input: RegisterDTO): Promise<JWT> {
    return this.authService.register(input);
  }

  @Mutation(() => User)
  async deleteProfile(@Context() context): Promise<Message> {
    return this.authService.deleteProfile(context);
  }

  @Query(() => User)
  profile(@Context() context): User {
    return this.authService.getProfile(context);
  }
}

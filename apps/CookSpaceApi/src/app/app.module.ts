import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './services/auth/auth.module';
import { User } from './entities/user.entity';
import { Recipe } from './entities/recipe.entity';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User, Recipe, Comment],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      introspection: true,
      typePaths: ['./**/*.graphql'],
      playground: false,
      formatError: (error) => {
        const originalError = error.extensions?.originalError as {
          message: string;
        };

        if (!originalError) {
          return {
            message: error.message,
            code: error.extensions?.code,
          };
        }
        return {
          message: originalError?.message,
          code: error.extensions?.code,
        };
      },
      definitions: {
        path: 'apps/CookSpaceApi/src/graphql.ts',
        outputAs: 'class',
        emitTypenameField: true,
        // skipResolverArgs: true,
      },
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    AuthModule,
  ],
})
export class AppModule {}

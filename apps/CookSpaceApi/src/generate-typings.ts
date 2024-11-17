import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['**/*.graphql'],
  path: join('graphql.ts'),
  outputAs: 'class',
  emitTypenameField: true,
});

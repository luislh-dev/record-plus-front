export const commitlintExtends = ['@commitlint/config-conventional'];
export const rules = {
  'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore']],
  'type-case': [2, 'always', 'lower-case'],
  'subject-case': [0],
  'subject-empty': [0],
};

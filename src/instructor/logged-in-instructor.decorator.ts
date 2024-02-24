import { createParamDecorator } from '@nestjs/common';

export const LoggedInInstructor = createParamDecorator((data, req): object => {
  return {
    id: req.args[0].id,
    role: req.args[0].role,
  };
});

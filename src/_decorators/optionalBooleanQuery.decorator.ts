import { applyDecorators } from '@nestjs/common';
import { IsBoolean, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export function OptionalBooleanQuery() {
  return applyDecorators(
    IsOptional(),
    Transform(({ value }) => {
      switch (value) {
        case 'true':
          return true;
        case 'false':
          return false;
        default:
          return undefined;
      }
    }),
    IsBoolean()
  );
}

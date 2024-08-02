import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class CapitalizePipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata)
  {
    if (!value) {
      return value;
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
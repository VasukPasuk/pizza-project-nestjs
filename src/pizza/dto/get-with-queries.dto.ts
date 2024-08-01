import {Transform} from 'class-transformer';
import {OptionalBooleanQuery} from "../../_decorators/optionalBooleanQuery.decorator";

export class GetWithQueriesDto {
  @OptionalBooleanQuery()
  category?: boolean = false;

  @OptionalBooleanQuery()
  Review?: boolean = false;
}

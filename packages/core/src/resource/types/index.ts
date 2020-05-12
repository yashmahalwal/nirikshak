import { FakerType } from "./fakerTypes";
import { Literal } from "./primitive";

type FieldType = FakerType | Literal;

type WithModifiers<T extends FieldType> = {
  type: T;
  plural?: boolean;
  nullable?: boolean;
  optional?: boolean;
};

type Field = FieldType | WithModifiers<FieldType>;

type WithOneOf<F extends Field> = {
  oneOf: true;
  fields: F[];
};

interface Resource {
  [key: string]: Field | WithOneOf<Field>;
}

import _ from "lodash";
import faker from "faker";

type FakerString = string;

function isValidFakerString(input: any): input is FakerString {
  if (typeof input !== "string") return false;

  const i = input.indexOf("faker:");
  if (i != 0) return false;

  return _.get(faker, input.slice(i + 6)) instanceof Function;
}

type FakerObject = {
  function: FakerString;
  args?: any[];
};

function isValidFakerObject(input: any): input is FakerObject {
  if (!input || typeof input !== "object") return false;

  if ("function" in input && isValidFakerString(input["function"])) {
    if ("args" in input) {
      return Array.isArray(input["args"]);
    }
    return true;
  }

  return false;
}

export type FakerType = FakerString | FakerObject;

function isValidFaker(input: any): input is FakerType {
  return isValidFakerString(input) || isValidFakerObject(input);
}

function normalizeFaker(input: FakerType): FakerObject {
  if (isValidFakerObject(input)) return input;
  return {
    function: input,
    args: [],
  };
}

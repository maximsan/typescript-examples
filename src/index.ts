/* eslint-disable @typescript-eslint/no-unused-vars */
// The Utility Types which ship with TypeScript are built using the same
// features that we've already discussed. In fact, we used these utility
// types as examples as we discussed Mapped Types and Conditional Types.

// Your task is recreate each of these Utility Types from scratch. Try to
// figure out how to represent a particular utility type using what you've
// learned. If you aren't able to figure out how a type works, that's fine.
// Watch the solution video where I'll explain how each Utility Type works.

// Since we'll be replicating types that already exist in TypeScript, we'll
// run this with the `noLib` tsconfig.json option turned on. This disables
// all of the types which ship with TypeScript so we don't have any name
// collisions.

// Partial
// Create a mapped type which marks all of the properties of the passed
// in generic `T` as optional.

type Propreties<T> = keyof T;

type Partial<T> = {
  [P in Propreties<T>]?: T[P];
};

type OptionalFruit = Partial<{ name: string; color: string }>;
// type OptionalFruit = {
//   name?: string,
//   color?: string
// }

// Required
// Create a mapped type which marks all of the properties of the passed in
// generic `T` as required.

// (Hint: This is the same as removing the optional modifier from
//  every property)

type Required<T> = {
  [P in Propreties<T>]-?: T[P];
};

type RequiredFruit = Required<{ name?: string; color?: string }>;
// type RequiredFruit = {
//   name: string,
//   color: string
// }

// Readonly
// Create a mapped type which marks all of the properties of the passed
// in generic `T` as readonly.

type Readonly<T> = {
  readonly [P in Propreties<T>]: T[P];
};

type ReadonlyFruit = Readonly<{ name: string; color: string }>;
// type ReadonlyFruit = {
//   readonly name: string,
//   readonly color: string
// }

// Record
// Create a mapped type which takes in two generics: `K` is a union type
// of property names and `T` is the value of those properties.

type Record<G extends string | number | symbol, T> = {
  [K in G]: T;
};

type FruitRecord = Record<"name" | "color", string>;
// type FruitRecord = {
//   name: string,
//   color: string
// }

// Exclude
// Create a conditional type which takes in two generics: `T` is a Union,
// and `U` is a Union. Exclude from `T` types that are assignable to `U`.

type Exclude<T, U> = T extends U ? never : T;

type ExcludedValues = Exclude<"a" | "b" | "c", "c">;
// type ExcludedValues = "a" | "b"

// Extract
// Create a conditional type which takes in two generics: `T` is a Union,
// and `U` is a Union. Extract from `T` types that are assignable to `U`.
// (Hint: This is opposite of Exclude)

type Extract<T, U> = T extends U ? T : never;

type ExtractedValues = Extract<"a" | "b" | "c", "c">;
// type ExtractedValues = "c"

// Pick
// Create a mapped type which takes in two generics: `T` is an interface,
// and `K` is a Union of literal types that represent some of the keys
// of `T`. This mapped type constructs a type which only has the properties
// that are in the Union `K`, removing the other properties.

type Values<T> = T[keyof T];

type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type PickedValues = Pick<
  { name: string; color: string; sweetness: number },
  "name" | "color"
>;
// type PickedValues = {
//   name: string,
//   color: string
// }

// Omit
// Create a type which takes in two generics: `T` is an interface and `K`
// is a Union of literal types that represent keys. This type constructs
// a type which has all of the properties of `T` except those listed in `K`.
// (Hint: This can be done by combining `Pick` and `Exclude`)

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// type Omit<T,K> = {
//   Pick<T, K>: Exclude<T,K>
// }

type Fruit = { name: string; color: string; sweetness: number };
type OmittedValues = Omit<Fruit, "name" | "color">;
// type OmittedValues = {
//   sweetness: number,
// }

// NonNullable
// Create a conditional type which excludes null and undefined from the
// passed in generic `T`.
type NonNullable<T> = T extends null | undefined ? never : T;

type NonNullValue = NonNullable<string | null | undefined>;
// type NonNullValue = string

// This function is here for the examples, you don't need to do anything with it.
declare function parseFloat(string: string, radix?: number): number;

// Parameters
// Create a conditional type that uses the `infer` keyword to return the
// inferred parameters of the passed in generic `T`. `T` should have a type
// constraint that ensures it is a function.

type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer R
) => any
  ? R
  : T;

type FunctionParameters = Parameters<typeof parseFloat>;
// type FunctionParameters = [string: string]

// ReturnType
// Create a conditional type that uses the `infer` keyword to return the
// inferred return type of the passed in generic `T`. `T` should have a type
// constraint that ensures it is a function.

type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : T;

type FunctionReturn = ReturnType<typeof parseFloat>;
// type FunctionReturn = number

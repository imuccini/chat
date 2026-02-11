
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Tenant
 * 
 */
export type Tenant = $Result.DefaultSelection<Prisma.$TenantPayload>
/**
 * Model NasDevice
 * 
 */
export type NasDevice = $Result.DefaultSelection<Prisma.$NasDevicePayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Verification
 * 
 */
export type Verification = $Result.DefaultSelection<Prisma.$VerificationPayload>
/**
 * Model TenantMember
 * 
 */
export type TenantMember = $Result.DefaultSelection<Prisma.$TenantMemberPayload>
/**
 * Model Room
 * 
 */
export type Room = $Result.DefaultSelection<Prisma.$RoomPayload>
/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>
/**
 * Model SystemLog
 * 
 */
export type SystemLog = $Result.DefaultSelection<Prisma.$SystemLogPayload>
/**
 * Model Passkey
 * 
 */
export type Passkey = $Result.DefaultSelection<Prisma.$PasskeyPayload>
/**
 * Model Feedback
 * 
 */
export type Feedback = $Result.DefaultSelection<Prisma.$FeedbackPayload>
/**
 * Model BiometricToken
 * 
 */
export type BiometricToken = $Result.DefaultSelection<Prisma.$BiometricTokenPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const GlobalRole: {
  SUPERADMIN: 'SUPERADMIN',
  USER: 'USER'
};

export type GlobalRole = (typeof GlobalRole)[keyof typeof GlobalRole]


export const TenantRole: {
  ADMIN: 'ADMIN',
  MODERATOR: 'MODERATOR',
  STAFF: 'STAFF'
};

export type TenantRole = (typeof TenantRole)[keyof typeof TenantRole]


export const RoomType: {
  ANNOUNCEMENT: 'ANNOUNCEMENT',
  GENERAL: 'GENERAL'
};

export type RoomType = (typeof RoomType)[keyof typeof RoomType]

}

export type GlobalRole = $Enums.GlobalRole

export const GlobalRole: typeof $Enums.GlobalRole

export type TenantRole = $Enums.TenantRole

export const TenantRole: typeof $Enums.TenantRole

export type RoomType = $Enums.RoomType

export const RoomType: typeof $Enums.RoomType

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Tenants
 * const tenants = await prisma.tenant.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Tenants
   * const tenants = await prisma.tenant.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.tenant`: Exposes CRUD operations for the **Tenant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tenants
    * const tenants = await prisma.tenant.findMany()
    * ```
    */
  get tenant(): Prisma.TenantDelegate<ExtArgs>;

  /**
   * `prisma.nasDevice`: Exposes CRUD operations for the **NasDevice** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NasDevices
    * const nasDevices = await prisma.nasDevice.findMany()
    * ```
    */
  get nasDevice(): Prisma.NasDeviceDelegate<ExtArgs>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs>;

  /**
   * `prisma.verification`: Exposes CRUD operations for the **Verification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Verifications
    * const verifications = await prisma.verification.findMany()
    * ```
    */
  get verification(): Prisma.VerificationDelegate<ExtArgs>;

  /**
   * `prisma.tenantMember`: Exposes CRUD operations for the **TenantMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TenantMembers
    * const tenantMembers = await prisma.tenantMember.findMany()
    * ```
    */
  get tenantMember(): Prisma.TenantMemberDelegate<ExtArgs>;

  /**
   * `prisma.room`: Exposes CRUD operations for the **Room** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rooms
    * const rooms = await prisma.room.findMany()
    * ```
    */
  get room(): Prisma.RoomDelegate<ExtArgs>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs>;

  /**
   * `prisma.systemLog`: Exposes CRUD operations for the **SystemLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SystemLogs
    * const systemLogs = await prisma.systemLog.findMany()
    * ```
    */
  get systemLog(): Prisma.SystemLogDelegate<ExtArgs>;

  /**
   * `prisma.passkey`: Exposes CRUD operations for the **Passkey** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Passkeys
    * const passkeys = await prisma.passkey.findMany()
    * ```
    */
  get passkey(): Prisma.PasskeyDelegate<ExtArgs>;

  /**
   * `prisma.feedback`: Exposes CRUD operations for the **Feedback** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Feedbacks
    * const feedbacks = await prisma.feedback.findMany()
    * ```
    */
  get feedback(): Prisma.FeedbackDelegate<ExtArgs>;

  /**
   * `prisma.biometricToken`: Exposes CRUD operations for the **BiometricToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BiometricTokens
    * const biometricTokens = await prisma.biometricToken.findMany()
    * ```
    */
  get biometricToken(): Prisma.BiometricTokenDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Tenant: 'Tenant',
    NasDevice: 'NasDevice',
    User: 'User',
    Session: 'Session',
    Account: 'Account',
    Verification: 'Verification',
    TenantMember: 'TenantMember',
    Room: 'Room',
    Message: 'Message',
    SystemLog: 'SystemLog',
    Passkey: 'Passkey',
    Feedback: 'Feedback',
    BiometricToken: 'BiometricToken'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "tenant" | "nasDevice" | "user" | "session" | "account" | "verification" | "tenantMember" | "room" | "message" | "systemLog" | "passkey" | "feedback" | "biometricToken"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Tenant: {
        payload: Prisma.$TenantPayload<ExtArgs>
        fields: Prisma.TenantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TenantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TenantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          findFirst: {
            args: Prisma.TenantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TenantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          findMany: {
            args: Prisma.TenantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[]
          }
          create: {
            args: Prisma.TenantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          createMany: {
            args: Prisma.TenantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TenantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[]
          }
          delete: {
            args: Prisma.TenantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          update: {
            args: Prisma.TenantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          deleteMany: {
            args: Prisma.TenantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TenantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TenantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          aggregate: {
            args: Prisma.TenantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTenant>
          }
          groupBy: {
            args: Prisma.TenantGroupByArgs<ExtArgs>
            result: $Utils.Optional<TenantGroupByOutputType>[]
          }
          count: {
            args: Prisma.TenantCountArgs<ExtArgs>
            result: $Utils.Optional<TenantCountAggregateOutputType> | number
          }
        }
      }
      NasDevice: {
        payload: Prisma.$NasDevicePayload<ExtArgs>
        fields: Prisma.NasDeviceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NasDeviceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NasDevicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NasDeviceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NasDevicePayload>
          }
          findFirst: {
            args: Prisma.NasDeviceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NasDevicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NasDeviceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NasDevicePayload>
          }
          findMany: {
            args: Prisma.NasDeviceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NasDevicePayload>[]
          }
          create: {
            args: Prisma.NasDeviceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NasDevicePayload>
          }
          createMany: {
            args: Prisma.NasDeviceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NasDeviceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NasDevicePayload>[]
          }
          delete: {
            args: Prisma.NasDeviceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NasDevicePayload>
          }
          update: {
            args: Prisma.NasDeviceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NasDevicePayload>
          }
          deleteMany: {
            args: Prisma.NasDeviceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NasDeviceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NasDeviceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NasDevicePayload>
          }
          aggregate: {
            args: Prisma.NasDeviceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNasDevice>
          }
          groupBy: {
            args: Prisma.NasDeviceGroupByArgs<ExtArgs>
            result: $Utils.Optional<NasDeviceGroupByOutputType>[]
          }
          count: {
            args: Prisma.NasDeviceCountArgs<ExtArgs>
            result: $Utils.Optional<NasDeviceCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Verification: {
        payload: Prisma.$VerificationPayload<ExtArgs>
        fields: Prisma.VerificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findFirst: {
            args: Prisma.VerificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findMany: {
            args: Prisma.VerificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          create: {
            args: Prisma.VerificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          createMany: {
            args: Prisma.VerificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          delete: {
            args: Prisma.VerificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          update: {
            args: Prisma.VerificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          deleteMany: {
            args: Prisma.VerificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VerificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          aggregate: {
            args: Prisma.VerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerification>
          }
          groupBy: {
            args: Prisma.VerificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationCountAggregateOutputType> | number
          }
        }
      }
      TenantMember: {
        payload: Prisma.$TenantMemberPayload<ExtArgs>
        fields: Prisma.TenantMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TenantMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TenantMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantMemberPayload>
          }
          findFirst: {
            args: Prisma.TenantMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TenantMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantMemberPayload>
          }
          findMany: {
            args: Prisma.TenantMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantMemberPayload>[]
          }
          create: {
            args: Prisma.TenantMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantMemberPayload>
          }
          createMany: {
            args: Prisma.TenantMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TenantMemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantMemberPayload>[]
          }
          delete: {
            args: Prisma.TenantMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantMemberPayload>
          }
          update: {
            args: Prisma.TenantMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantMemberPayload>
          }
          deleteMany: {
            args: Prisma.TenantMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TenantMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TenantMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantMemberPayload>
          }
          aggregate: {
            args: Prisma.TenantMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTenantMember>
          }
          groupBy: {
            args: Prisma.TenantMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<TenantMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.TenantMemberCountArgs<ExtArgs>
            result: $Utils.Optional<TenantMemberCountAggregateOutputType> | number
          }
        }
      }
      Room: {
        payload: Prisma.$RoomPayload<ExtArgs>
        fields: Prisma.RoomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          findFirst: {
            args: Prisma.RoomFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          findMany: {
            args: Prisma.RoomFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          create: {
            args: Prisma.RoomCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          createMany: {
            args: Prisma.RoomCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          delete: {
            args: Prisma.RoomDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          update: {
            args: Prisma.RoomUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          deleteMany: {
            args: Prisma.RoomDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RoomUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          aggregate: {
            args: Prisma.RoomAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoom>
          }
          groupBy: {
            args: Prisma.RoomGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomCountArgs<ExtArgs>
            result: $Utils.Optional<RoomCountAggregateOutputType> | number
          }
        }
      }
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
      SystemLog: {
        payload: Prisma.$SystemLogPayload<ExtArgs>
        fields: Prisma.SystemLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SystemLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SystemLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload>
          }
          findFirst: {
            args: Prisma.SystemLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SystemLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload>
          }
          findMany: {
            args: Prisma.SystemLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload>[]
          }
          create: {
            args: Prisma.SystemLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload>
          }
          createMany: {
            args: Prisma.SystemLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SystemLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload>[]
          }
          delete: {
            args: Prisma.SystemLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload>
          }
          update: {
            args: Prisma.SystemLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload>
          }
          deleteMany: {
            args: Prisma.SystemLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SystemLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SystemLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload>
          }
          aggregate: {
            args: Prisma.SystemLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSystemLog>
          }
          groupBy: {
            args: Prisma.SystemLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<SystemLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.SystemLogCountArgs<ExtArgs>
            result: $Utils.Optional<SystemLogCountAggregateOutputType> | number
          }
        }
      }
      Passkey: {
        payload: Prisma.$PasskeyPayload<ExtArgs>
        fields: Prisma.PasskeyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PasskeyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasskeyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PasskeyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasskeyPayload>
          }
          findFirst: {
            args: Prisma.PasskeyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasskeyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PasskeyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasskeyPayload>
          }
          findMany: {
            args: Prisma.PasskeyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasskeyPayload>[]
          }
          create: {
            args: Prisma.PasskeyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasskeyPayload>
          }
          createMany: {
            args: Prisma.PasskeyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PasskeyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasskeyPayload>[]
          }
          delete: {
            args: Prisma.PasskeyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasskeyPayload>
          }
          update: {
            args: Prisma.PasskeyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasskeyPayload>
          }
          deleteMany: {
            args: Prisma.PasskeyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PasskeyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PasskeyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasskeyPayload>
          }
          aggregate: {
            args: Prisma.PasskeyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePasskey>
          }
          groupBy: {
            args: Prisma.PasskeyGroupByArgs<ExtArgs>
            result: $Utils.Optional<PasskeyGroupByOutputType>[]
          }
          count: {
            args: Prisma.PasskeyCountArgs<ExtArgs>
            result: $Utils.Optional<PasskeyCountAggregateOutputType> | number
          }
        }
      }
      Feedback: {
        payload: Prisma.$FeedbackPayload<ExtArgs>
        fields: Prisma.FeedbackFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FeedbackFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FeedbackFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          findFirst: {
            args: Prisma.FeedbackFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FeedbackFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          findMany: {
            args: Prisma.FeedbackFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>[]
          }
          create: {
            args: Prisma.FeedbackCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          createMany: {
            args: Prisma.FeedbackCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FeedbackCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>[]
          }
          delete: {
            args: Prisma.FeedbackDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          update: {
            args: Prisma.FeedbackUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          deleteMany: {
            args: Prisma.FeedbackDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FeedbackUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FeedbackUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          aggregate: {
            args: Prisma.FeedbackAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFeedback>
          }
          groupBy: {
            args: Prisma.FeedbackGroupByArgs<ExtArgs>
            result: $Utils.Optional<FeedbackGroupByOutputType>[]
          }
          count: {
            args: Prisma.FeedbackCountArgs<ExtArgs>
            result: $Utils.Optional<FeedbackCountAggregateOutputType> | number
          }
        }
      }
      BiometricToken: {
        payload: Prisma.$BiometricTokenPayload<ExtArgs>
        fields: Prisma.BiometricTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BiometricTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BiometricTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BiometricTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BiometricTokenPayload>
          }
          findFirst: {
            args: Prisma.BiometricTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BiometricTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BiometricTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BiometricTokenPayload>
          }
          findMany: {
            args: Prisma.BiometricTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BiometricTokenPayload>[]
          }
          create: {
            args: Prisma.BiometricTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BiometricTokenPayload>
          }
          createMany: {
            args: Prisma.BiometricTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BiometricTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BiometricTokenPayload>[]
          }
          delete: {
            args: Prisma.BiometricTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BiometricTokenPayload>
          }
          update: {
            args: Prisma.BiometricTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BiometricTokenPayload>
          }
          deleteMany: {
            args: Prisma.BiometricTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BiometricTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BiometricTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BiometricTokenPayload>
          }
          aggregate: {
            args: Prisma.BiometricTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBiometricToken>
          }
          groupBy: {
            args: Prisma.BiometricTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<BiometricTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.BiometricTokenCountArgs<ExtArgs>
            result: $Utils.Optional<BiometricTokenCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type TenantCountOutputType
   */

  export type TenantCountOutputType = {
    members: number
    messages: number
    rooms: number
    logs: number
    devices: number
    feedbacks: number
  }

  export type TenantCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | TenantCountOutputTypeCountMembersArgs
    messages?: boolean | TenantCountOutputTypeCountMessagesArgs
    rooms?: boolean | TenantCountOutputTypeCountRoomsArgs
    logs?: boolean | TenantCountOutputTypeCountLogsArgs
    devices?: boolean | TenantCountOutputTypeCountDevicesArgs
    feedbacks?: boolean | TenantCountOutputTypeCountFeedbacksArgs
  }

  // Custom InputTypes
  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantCountOutputType
     */
    select?: TenantCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenantMemberWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountRoomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SystemLogWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountDevicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NasDeviceWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountFeedbacksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedbackWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    memberships: number
    sessions: number
    accounts: number
    messages: number
    passkeys: number
    feedbacks: number
    biometricTokens: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memberships?: boolean | UserCountOutputTypeCountMembershipsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    messages?: boolean | UserCountOutputTypeCountMessagesArgs
    passkeys?: boolean | UserCountOutputTypeCountPasskeysArgs
    feedbacks?: boolean | UserCountOutputTypeCountFeedbacksArgs
    biometricTokens?: boolean | UserCountOutputTypeCountBiometricTokensArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenantMemberWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPasskeysArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasskeyWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFeedbacksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedbackWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBiometricTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BiometricTokenWhereInput
  }


  /**
   * Count Type RoomCountOutputType
   */

  export type RoomCountOutputType = {
    messages: number
  }

  export type RoomCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | RoomCountOutputTypeCountMessagesArgs
  }

  // Custom InputTypes
  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomCountOutputType
     */
    select?: RoomCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Tenant
   */

  export type AggregateTenant = {
    _count: TenantCountAggregateOutputType | null
    _avg: TenantAvgAggregateOutputType | null
    _sum: TenantSumAggregateOutputType | null
    _min: TenantMinAggregateOutputType | null
    _max: TenantMaxAggregateOutputType | null
  }

  export type TenantAvgAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type TenantSumAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type TenantMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    logoUrl: string | null
    address: string | null
    createdAt: Date | null
    updatedAt: Date | null
    bssid: string | null
    staticIp: string | null
    latitude: number | null
    longitude: number | null
    menuEnabled: boolean | null
    feedbackEnabled: boolean | null
    staffEnabled: boolean | null
    menuUrl: string | null
  }

  export type TenantMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    logoUrl: string | null
    address: string | null
    createdAt: Date | null
    updatedAt: Date | null
    bssid: string | null
    staticIp: string | null
    latitude: number | null
    longitude: number | null
    menuEnabled: boolean | null
    feedbackEnabled: boolean | null
    staffEnabled: boolean | null
    menuUrl: string | null
  }

  export type TenantCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    metadata: number
    logoUrl: number
    address: number
    createdAt: number
    updatedAt: number
    bssid: number
    staticIp: number
    latitude: number
    longitude: number
    menuEnabled: number
    feedbackEnabled: number
    staffEnabled: number
    menuUrl: number
    _all: number
  }


  export type TenantAvgAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type TenantSumAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type TenantMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    logoUrl?: true
    address?: true
    createdAt?: true
    updatedAt?: true
    bssid?: true
    staticIp?: true
    latitude?: true
    longitude?: true
    menuEnabled?: true
    feedbackEnabled?: true
    staffEnabled?: true
    menuUrl?: true
  }

  export type TenantMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    logoUrl?: true
    address?: true
    createdAt?: true
    updatedAt?: true
    bssid?: true
    staticIp?: true
    latitude?: true
    longitude?: true
    menuEnabled?: true
    feedbackEnabled?: true
    staffEnabled?: true
    menuUrl?: true
  }

  export type TenantCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    metadata?: true
    logoUrl?: true
    address?: true
    createdAt?: true
    updatedAt?: true
    bssid?: true
    staticIp?: true
    latitude?: true
    longitude?: true
    menuEnabled?: true
    feedbackEnabled?: true
    staffEnabled?: true
    menuUrl?: true
    _all?: true
  }

  export type TenantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tenant to aggregate.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tenants
    **/
    _count?: true | TenantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TenantAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TenantSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TenantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TenantMaxAggregateInputType
  }

  export type GetTenantAggregateType<T extends TenantAggregateArgs> = {
        [P in keyof T & keyof AggregateTenant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTenant[P]>
      : GetScalarType<T[P], AggregateTenant[P]>
  }




  export type TenantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenantWhereInput
    orderBy?: TenantOrderByWithAggregationInput | TenantOrderByWithAggregationInput[]
    by: TenantScalarFieldEnum[] | TenantScalarFieldEnum
    having?: TenantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TenantCountAggregateInputType | true
    _avg?: TenantAvgAggregateInputType
    _sum?: TenantSumAggregateInputType
    _min?: TenantMinAggregateInputType
    _max?: TenantMaxAggregateInputType
  }

  export type TenantGroupByOutputType = {
    id: string
    name: string
    slug: string
    metadata: JsonValue | null
    logoUrl: string | null
    address: string | null
    createdAt: Date
    updatedAt: Date
    bssid: string | null
    staticIp: string | null
    latitude: number | null
    longitude: number | null
    menuEnabled: boolean
    feedbackEnabled: boolean
    staffEnabled: boolean
    menuUrl: string | null
    _count: TenantCountAggregateOutputType | null
    _avg: TenantAvgAggregateOutputType | null
    _sum: TenantSumAggregateOutputType | null
    _min: TenantMinAggregateOutputType | null
    _max: TenantMaxAggregateOutputType | null
  }

  type GetTenantGroupByPayload<T extends TenantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TenantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TenantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TenantGroupByOutputType[P]>
            : GetScalarType<T[P], TenantGroupByOutputType[P]>
        }
      >
    >


  export type TenantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    metadata?: boolean
    logoUrl?: boolean
    address?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bssid?: boolean
    staticIp?: boolean
    latitude?: boolean
    longitude?: boolean
    menuEnabled?: boolean
    feedbackEnabled?: boolean
    staffEnabled?: boolean
    menuUrl?: boolean
    members?: boolean | Tenant$membersArgs<ExtArgs>
    messages?: boolean | Tenant$messagesArgs<ExtArgs>
    rooms?: boolean | Tenant$roomsArgs<ExtArgs>
    logs?: boolean | Tenant$logsArgs<ExtArgs>
    devices?: boolean | Tenant$devicesArgs<ExtArgs>
    feedbacks?: boolean | Tenant$feedbacksArgs<ExtArgs>
    _count?: boolean | TenantCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tenant"]>

  export type TenantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    metadata?: boolean
    logoUrl?: boolean
    address?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bssid?: boolean
    staticIp?: boolean
    latitude?: boolean
    longitude?: boolean
    menuEnabled?: boolean
    feedbackEnabled?: boolean
    staffEnabled?: boolean
    menuUrl?: boolean
  }, ExtArgs["result"]["tenant"]>

  export type TenantSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    metadata?: boolean
    logoUrl?: boolean
    address?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bssid?: boolean
    staticIp?: boolean
    latitude?: boolean
    longitude?: boolean
    menuEnabled?: boolean
    feedbackEnabled?: boolean
    staffEnabled?: boolean
    menuUrl?: boolean
  }

  export type TenantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | Tenant$membersArgs<ExtArgs>
    messages?: boolean | Tenant$messagesArgs<ExtArgs>
    rooms?: boolean | Tenant$roomsArgs<ExtArgs>
    logs?: boolean | Tenant$logsArgs<ExtArgs>
    devices?: boolean | Tenant$devicesArgs<ExtArgs>
    feedbacks?: boolean | Tenant$feedbacksArgs<ExtArgs>
    _count?: boolean | TenantCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TenantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TenantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tenant"
    objects: {
      members: Prisma.$TenantMemberPayload<ExtArgs>[]
      messages: Prisma.$MessagePayload<ExtArgs>[]
      rooms: Prisma.$RoomPayload<ExtArgs>[]
      logs: Prisma.$SystemLogPayload<ExtArgs>[]
      devices: Prisma.$NasDevicePayload<ExtArgs>[]
      feedbacks: Prisma.$FeedbackPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      metadata: Prisma.JsonValue | null
      logoUrl: string | null
      address: string | null
      createdAt: Date
      updatedAt: Date
      bssid: string | null
      staticIp: string | null
      latitude: number | null
      longitude: number | null
      menuEnabled: boolean
      feedbackEnabled: boolean
      staffEnabled: boolean
      menuUrl: string | null
    }, ExtArgs["result"]["tenant"]>
    composites: {}
  }

  type TenantGetPayload<S extends boolean | null | undefined | TenantDefaultArgs> = $Result.GetResult<Prisma.$TenantPayload, S>

  type TenantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TenantFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TenantCountAggregateInputType | true
    }

  export interface TenantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tenant'], meta: { name: 'Tenant' } }
    /**
     * Find zero or one Tenant that matches the filter.
     * @param {TenantFindUniqueArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TenantFindUniqueArgs>(args: SelectSubset<T, TenantFindUniqueArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Tenant that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TenantFindUniqueOrThrowArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TenantFindUniqueOrThrowArgs>(args: SelectSubset<T, TenantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Tenant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindFirstArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TenantFindFirstArgs>(args?: SelectSubset<T, TenantFindFirstArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Tenant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindFirstOrThrowArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TenantFindFirstOrThrowArgs>(args?: SelectSubset<T, TenantFindFirstOrThrowArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Tenants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tenants
     * const tenants = await prisma.tenant.findMany()
     * 
     * // Get first 10 Tenants
     * const tenants = await prisma.tenant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tenantWithIdOnly = await prisma.tenant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TenantFindManyArgs>(args?: SelectSubset<T, TenantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Tenant.
     * @param {TenantCreateArgs} args - Arguments to create a Tenant.
     * @example
     * // Create one Tenant
     * const Tenant = await prisma.tenant.create({
     *   data: {
     *     // ... data to create a Tenant
     *   }
     * })
     * 
     */
    create<T extends TenantCreateArgs>(args: SelectSubset<T, TenantCreateArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Tenants.
     * @param {TenantCreateManyArgs} args - Arguments to create many Tenants.
     * @example
     * // Create many Tenants
     * const tenant = await prisma.tenant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TenantCreateManyArgs>(args?: SelectSubset<T, TenantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tenants and returns the data saved in the database.
     * @param {TenantCreateManyAndReturnArgs} args - Arguments to create many Tenants.
     * @example
     * // Create many Tenants
     * const tenant = await prisma.tenant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tenants and only return the `id`
     * const tenantWithIdOnly = await prisma.tenant.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TenantCreateManyAndReturnArgs>(args?: SelectSubset<T, TenantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Tenant.
     * @param {TenantDeleteArgs} args - Arguments to delete one Tenant.
     * @example
     * // Delete one Tenant
     * const Tenant = await prisma.tenant.delete({
     *   where: {
     *     // ... filter to delete one Tenant
     *   }
     * })
     * 
     */
    delete<T extends TenantDeleteArgs>(args: SelectSubset<T, TenantDeleteArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Tenant.
     * @param {TenantUpdateArgs} args - Arguments to update one Tenant.
     * @example
     * // Update one Tenant
     * const tenant = await prisma.tenant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TenantUpdateArgs>(args: SelectSubset<T, TenantUpdateArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Tenants.
     * @param {TenantDeleteManyArgs} args - Arguments to filter Tenants to delete.
     * @example
     * // Delete a few Tenants
     * const { count } = await prisma.tenant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TenantDeleteManyArgs>(args?: SelectSubset<T, TenantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tenants
     * const tenant = await prisma.tenant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TenantUpdateManyArgs>(args: SelectSubset<T, TenantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tenant.
     * @param {TenantUpsertArgs} args - Arguments to update or create a Tenant.
     * @example
     * // Update or create a Tenant
     * const tenant = await prisma.tenant.upsert({
     *   create: {
     *     // ... data to create a Tenant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tenant we want to update
     *   }
     * })
     */
    upsert<T extends TenantUpsertArgs>(args: SelectSubset<T, TenantUpsertArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantCountArgs} args - Arguments to filter Tenants to count.
     * @example
     * // Count the number of Tenants
     * const count = await prisma.tenant.count({
     *   where: {
     *     // ... the filter for the Tenants we want to count
     *   }
     * })
    **/
    count<T extends TenantCountArgs>(
      args?: Subset<T, TenantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TenantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tenant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TenantAggregateArgs>(args: Subset<T, TenantAggregateArgs>): Prisma.PrismaPromise<GetTenantAggregateType<T>>

    /**
     * Group by Tenant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TenantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TenantGroupByArgs['orderBy'] }
        : { orderBy?: TenantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TenantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTenantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tenant model
   */
  readonly fields: TenantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tenant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TenantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    members<T extends Tenant$membersArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantMemberPayload<ExtArgs>, T, "findMany"> | Null>
    messages<T extends Tenant$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany"> | Null>
    rooms<T extends Tenant$roomsArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$roomsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findMany"> | Null>
    logs<T extends Tenant$logsArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "findMany"> | Null>
    devices<T extends Tenant$devicesArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$devicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NasDevicePayload<ExtArgs>, T, "findMany"> | Null>
    feedbacks<T extends Tenant$feedbacksArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$feedbacksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tenant model
   */ 
  interface TenantFieldRefs {
    readonly id: FieldRef<"Tenant", 'String'>
    readonly name: FieldRef<"Tenant", 'String'>
    readonly slug: FieldRef<"Tenant", 'String'>
    readonly metadata: FieldRef<"Tenant", 'Json'>
    readonly logoUrl: FieldRef<"Tenant", 'String'>
    readonly address: FieldRef<"Tenant", 'String'>
    readonly createdAt: FieldRef<"Tenant", 'DateTime'>
    readonly updatedAt: FieldRef<"Tenant", 'DateTime'>
    readonly bssid: FieldRef<"Tenant", 'String'>
    readonly staticIp: FieldRef<"Tenant", 'String'>
    readonly latitude: FieldRef<"Tenant", 'Float'>
    readonly longitude: FieldRef<"Tenant", 'Float'>
    readonly menuEnabled: FieldRef<"Tenant", 'Boolean'>
    readonly feedbackEnabled: FieldRef<"Tenant", 'Boolean'>
    readonly staffEnabled: FieldRef<"Tenant", 'Boolean'>
    readonly menuUrl: FieldRef<"Tenant", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Tenant findUnique
   */
  export type TenantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant findUniqueOrThrow
   */
  export type TenantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant findFirst
   */
  export type TenantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tenants.
     */
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant findFirstOrThrow
   */
  export type TenantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tenants.
     */
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant findMany
   */
  export type TenantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenants to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant create
   */
  export type TenantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The data needed to create a Tenant.
     */
    data: XOR<TenantCreateInput, TenantUncheckedCreateInput>
  }

  /**
   * Tenant createMany
   */
  export type TenantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tenants.
     */
    data: TenantCreateManyInput | TenantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tenant createManyAndReturn
   */
  export type TenantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Tenants.
     */
    data: TenantCreateManyInput | TenantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tenant update
   */
  export type TenantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The data needed to update a Tenant.
     */
    data: XOR<TenantUpdateInput, TenantUncheckedUpdateInput>
    /**
     * Choose, which Tenant to update.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant updateMany
   */
  export type TenantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tenants.
     */
    data: XOR<TenantUpdateManyMutationInput, TenantUncheckedUpdateManyInput>
    /**
     * Filter which Tenants to update
     */
    where?: TenantWhereInput
  }

  /**
   * Tenant upsert
   */
  export type TenantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The filter to search for the Tenant to update in case it exists.
     */
    where: TenantWhereUniqueInput
    /**
     * In case the Tenant found by the `where` argument doesn't exist, create a new Tenant with this data.
     */
    create: XOR<TenantCreateInput, TenantUncheckedCreateInput>
    /**
     * In case the Tenant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TenantUpdateInput, TenantUncheckedUpdateInput>
  }

  /**
   * Tenant delete
   */
  export type TenantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter which Tenant to delete.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant deleteMany
   */
  export type TenantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tenants to delete
     */
    where?: TenantWhereInput
  }

  /**
   * Tenant.members
   */
  export type Tenant$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantMember
     */
    select?: TenantMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantMemberInclude<ExtArgs> | null
    where?: TenantMemberWhereInput
    orderBy?: TenantMemberOrderByWithRelationInput | TenantMemberOrderByWithRelationInput[]
    cursor?: TenantMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TenantMemberScalarFieldEnum | TenantMemberScalarFieldEnum[]
  }

  /**
   * Tenant.messages
   */
  export type Tenant$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Tenant.rooms
   */
  export type Tenant$roomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    where?: RoomWhereInput
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    cursor?: RoomWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Tenant.logs
   */
  export type Tenant$logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SystemLogInclude<ExtArgs> | null
    where?: SystemLogWhereInput
    orderBy?: SystemLogOrderByWithRelationInput | SystemLogOrderByWithRelationInput[]
    cursor?: SystemLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SystemLogScalarFieldEnum | SystemLogScalarFieldEnum[]
  }

  /**
   * Tenant.devices
   */
  export type Tenant$devicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NasDevice
     */
    select?: NasDeviceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NasDeviceInclude<ExtArgs> | null
    where?: NasDeviceWhereInput
    orderBy?: NasDeviceOrderByWithRelationInput | NasDeviceOrderByWithRelationInput[]
    cursor?: NasDeviceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NasDeviceScalarFieldEnum | NasDeviceScalarFieldEnum[]
  }

  /**
   * Tenant.feedbacks
   */
  export type Tenant$feedbacksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    where?: FeedbackWhereInput
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    cursor?: FeedbackWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Tenant without action
   */
  export type TenantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
  }


  /**
   * Model NasDevice
   */

  export type AggregateNasDevice = {
    _count: NasDeviceCountAggregateOutputType | null
    _min: NasDeviceMinAggregateOutputType | null
    _max: NasDeviceMaxAggregateOutputType | null
  }

  export type NasDeviceMinAggregateOutputType = {
    id: string | null
    nasId: string | null
    vpnIp: string | null
    publicIp: string | null
    bssid: string | null
    name: string | null
    tenantId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NasDeviceMaxAggregateOutputType = {
    id: string | null
    nasId: string | null
    vpnIp: string | null
    publicIp: string | null
    bssid: string | null
    name: string | null
    tenantId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NasDeviceCountAggregateOutputType = {
    id: number
    nasId: number
    vpnIp: number
    publicIp: number
    bssid: number
    name: number
    tenantId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NasDeviceMinAggregateInputType = {
    id?: true
    nasId?: true
    vpnIp?: true
    publicIp?: true
    bssid?: true
    name?: true
    tenantId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NasDeviceMaxAggregateInputType = {
    id?: true
    nasId?: true
    vpnIp?: true
    publicIp?: true
    bssid?: true
    name?: true
    tenantId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NasDeviceCountAggregateInputType = {
    id?: true
    nasId?: true
    vpnIp?: true
    publicIp?: true
    bssid?: true
    name?: true
    tenantId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NasDeviceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NasDevice to aggregate.
     */
    where?: NasDeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NasDevices to fetch.
     */
    orderBy?: NasDeviceOrderByWithRelationInput | NasDeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NasDeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NasDevices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NasDevices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NasDevices
    **/
    _count?: true | NasDeviceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NasDeviceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NasDeviceMaxAggregateInputType
  }

  export type GetNasDeviceAggregateType<T extends NasDeviceAggregateArgs> = {
        [P in keyof T & keyof AggregateNasDevice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNasDevice[P]>
      : GetScalarType<T[P], AggregateNasDevice[P]>
  }




  export type NasDeviceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NasDeviceWhereInput
    orderBy?: NasDeviceOrderByWithAggregationInput | NasDeviceOrderByWithAggregationInput[]
    by: NasDeviceScalarFieldEnum[] | NasDeviceScalarFieldEnum
    having?: NasDeviceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NasDeviceCountAggregateInputType | true
    _min?: NasDeviceMinAggregateInputType
    _max?: NasDeviceMaxAggregateInputType
  }

  export type NasDeviceGroupByOutputType = {
    id: string
    nasId: string | null
    vpnIp: string | null
    publicIp: string | null
    bssid: string | null
    name: string | null
    tenantId: string
    createdAt: Date
    updatedAt: Date
    _count: NasDeviceCountAggregateOutputType | null
    _min: NasDeviceMinAggregateOutputType | null
    _max: NasDeviceMaxAggregateOutputType | null
  }

  type GetNasDeviceGroupByPayload<T extends NasDeviceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NasDeviceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NasDeviceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NasDeviceGroupByOutputType[P]>
            : GetScalarType<T[P], NasDeviceGroupByOutputType[P]>
        }
      >
    >


  export type NasDeviceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nasId?: boolean
    vpnIp?: boolean
    publicIp?: boolean
    bssid?: boolean
    name?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["nasDevice"]>

  export type NasDeviceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nasId?: boolean
    vpnIp?: boolean
    publicIp?: boolean
    bssid?: boolean
    name?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["nasDevice"]>

  export type NasDeviceSelectScalar = {
    id?: boolean
    nasId?: boolean
    vpnIp?: boolean
    publicIp?: boolean
    bssid?: boolean
    name?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NasDeviceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type NasDeviceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $NasDevicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NasDevice"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nasId: string | null
      vpnIp: string | null
      publicIp: string | null
      bssid: string | null
      name: string | null
      tenantId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["nasDevice"]>
    composites: {}
  }

  type NasDeviceGetPayload<S extends boolean | null | undefined | NasDeviceDefaultArgs> = $Result.GetResult<Prisma.$NasDevicePayload, S>

  type NasDeviceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<NasDeviceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: NasDeviceCountAggregateInputType | true
    }

  export interface NasDeviceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NasDevice'], meta: { name: 'NasDevice' } }
    /**
     * Find zero or one NasDevice that matches the filter.
     * @param {NasDeviceFindUniqueArgs} args - Arguments to find a NasDevice
     * @example
     * // Get one NasDevice
     * const nasDevice = await prisma.nasDevice.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NasDeviceFindUniqueArgs>(args: SelectSubset<T, NasDeviceFindUniqueArgs<ExtArgs>>): Prisma__NasDeviceClient<$Result.GetResult<Prisma.$NasDevicePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one NasDevice that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {NasDeviceFindUniqueOrThrowArgs} args - Arguments to find a NasDevice
     * @example
     * // Get one NasDevice
     * const nasDevice = await prisma.nasDevice.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NasDeviceFindUniqueOrThrowArgs>(args: SelectSubset<T, NasDeviceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NasDeviceClient<$Result.GetResult<Prisma.$NasDevicePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first NasDevice that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NasDeviceFindFirstArgs} args - Arguments to find a NasDevice
     * @example
     * // Get one NasDevice
     * const nasDevice = await prisma.nasDevice.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NasDeviceFindFirstArgs>(args?: SelectSubset<T, NasDeviceFindFirstArgs<ExtArgs>>): Prisma__NasDeviceClient<$Result.GetResult<Prisma.$NasDevicePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first NasDevice that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NasDeviceFindFirstOrThrowArgs} args - Arguments to find a NasDevice
     * @example
     * // Get one NasDevice
     * const nasDevice = await prisma.nasDevice.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NasDeviceFindFirstOrThrowArgs>(args?: SelectSubset<T, NasDeviceFindFirstOrThrowArgs<ExtArgs>>): Prisma__NasDeviceClient<$Result.GetResult<Prisma.$NasDevicePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more NasDevices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NasDeviceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NasDevices
     * const nasDevices = await prisma.nasDevice.findMany()
     * 
     * // Get first 10 NasDevices
     * const nasDevices = await prisma.nasDevice.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const nasDeviceWithIdOnly = await prisma.nasDevice.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NasDeviceFindManyArgs>(args?: SelectSubset<T, NasDeviceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NasDevicePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a NasDevice.
     * @param {NasDeviceCreateArgs} args - Arguments to create a NasDevice.
     * @example
     * // Create one NasDevice
     * const NasDevice = await prisma.nasDevice.create({
     *   data: {
     *     // ... data to create a NasDevice
     *   }
     * })
     * 
     */
    create<T extends NasDeviceCreateArgs>(args: SelectSubset<T, NasDeviceCreateArgs<ExtArgs>>): Prisma__NasDeviceClient<$Result.GetResult<Prisma.$NasDevicePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many NasDevices.
     * @param {NasDeviceCreateManyArgs} args - Arguments to create many NasDevices.
     * @example
     * // Create many NasDevices
     * const nasDevice = await prisma.nasDevice.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NasDeviceCreateManyArgs>(args?: SelectSubset<T, NasDeviceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NasDevices and returns the data saved in the database.
     * @param {NasDeviceCreateManyAndReturnArgs} args - Arguments to create many NasDevices.
     * @example
     * // Create many NasDevices
     * const nasDevice = await prisma.nasDevice.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NasDevices and only return the `id`
     * const nasDeviceWithIdOnly = await prisma.nasDevice.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NasDeviceCreateManyAndReturnArgs>(args?: SelectSubset<T, NasDeviceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NasDevicePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a NasDevice.
     * @param {NasDeviceDeleteArgs} args - Arguments to delete one NasDevice.
     * @example
     * // Delete one NasDevice
     * const NasDevice = await prisma.nasDevice.delete({
     *   where: {
     *     // ... filter to delete one NasDevice
     *   }
     * })
     * 
     */
    delete<T extends NasDeviceDeleteArgs>(args: SelectSubset<T, NasDeviceDeleteArgs<ExtArgs>>): Prisma__NasDeviceClient<$Result.GetResult<Prisma.$NasDevicePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one NasDevice.
     * @param {NasDeviceUpdateArgs} args - Arguments to update one NasDevice.
     * @example
     * // Update one NasDevice
     * const nasDevice = await prisma.nasDevice.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NasDeviceUpdateArgs>(args: SelectSubset<T, NasDeviceUpdateArgs<ExtArgs>>): Prisma__NasDeviceClient<$Result.GetResult<Prisma.$NasDevicePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more NasDevices.
     * @param {NasDeviceDeleteManyArgs} args - Arguments to filter NasDevices to delete.
     * @example
     * // Delete a few NasDevices
     * const { count } = await prisma.nasDevice.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NasDeviceDeleteManyArgs>(args?: SelectSubset<T, NasDeviceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NasDevices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NasDeviceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NasDevices
     * const nasDevice = await prisma.nasDevice.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NasDeviceUpdateManyArgs>(args: SelectSubset<T, NasDeviceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one NasDevice.
     * @param {NasDeviceUpsertArgs} args - Arguments to update or create a NasDevice.
     * @example
     * // Update or create a NasDevice
     * const nasDevice = await prisma.nasDevice.upsert({
     *   create: {
     *     // ... data to create a NasDevice
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NasDevice we want to update
     *   }
     * })
     */
    upsert<T extends NasDeviceUpsertArgs>(args: SelectSubset<T, NasDeviceUpsertArgs<ExtArgs>>): Prisma__NasDeviceClient<$Result.GetResult<Prisma.$NasDevicePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of NasDevices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NasDeviceCountArgs} args - Arguments to filter NasDevices to count.
     * @example
     * // Count the number of NasDevices
     * const count = await prisma.nasDevice.count({
     *   where: {
     *     // ... the filter for the NasDevices we want to count
     *   }
     * })
    **/
    count<T extends NasDeviceCountArgs>(
      args?: Subset<T, NasDeviceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NasDeviceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NasDevice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NasDeviceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NasDeviceAggregateArgs>(args: Subset<T, NasDeviceAggregateArgs>): Prisma.PrismaPromise<GetNasDeviceAggregateType<T>>

    /**
     * Group by NasDevice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NasDeviceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NasDeviceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NasDeviceGroupByArgs['orderBy'] }
        : { orderBy?: NasDeviceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NasDeviceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNasDeviceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NasDevice model
   */
  readonly fields: NasDeviceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NasDevice.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NasDeviceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NasDevice model
   */ 
  interface NasDeviceFieldRefs {
    readonly id: FieldRef<"NasDevice", 'String'>
    readonly nasId: FieldRef<"NasDevice", 'String'>
    readonly vpnIp: FieldRef<"NasDevice", 'String'>
    readonly publicIp: FieldRef<"NasDevice", 'String'>
    readonly bssid: FieldRef<"NasDevice", 'String'>
    readonly name: FieldRef<"NasDevice", 'String'>
    readonly tenantId: FieldRef<"NasDevice", 'String'>
    readonly createdAt: FieldRef<"NasDevice", 'DateTime'>
    readonly updatedAt: FieldRef<"NasDevice", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NasDevice findUnique
   */
  export type NasDeviceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NasDevice
     */
    select?: NasDeviceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NasDeviceInclude<ExtArgs> | null
    /**
     * Filter, which NasDevice to fetch.
     */
    where: NasDeviceWhereUniqueInput
  }

  /**
   * NasDevice findUniqueOrThrow
   */
  export type NasDeviceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NasDevice
     */
    select?: NasDeviceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NasDeviceInclude<ExtArgs> | null
    /**
     * Filter, which NasDevice to fetch.
     */
    where: NasDeviceWhereUniqueInput
  }

  /**
   * NasDevice findFirst
   */
  export type NasDeviceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NasDevice
     */
    select?: NasDeviceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NasDeviceInclude<ExtArgs> | null
    /**
     * Filter, which NasDevice to fetch.
     */
    where?: NasDeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NasDevices to fetch.
     */
    orderBy?: NasDeviceOrderByWithRelationInput | NasDeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NasDevices.
     */
    cursor?: NasDeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NasDevices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NasDevices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NasDevices.
     */
    distinct?: NasDeviceScalarFieldEnum | NasDeviceScalarFieldEnum[]
  }

  /**
   * NasDevice findFirstOrThrow
   */
  export type NasDeviceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NasDevice
     */
    select?: NasDeviceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NasDeviceInclude<ExtArgs> | null
    /**
     * Filter, which NasDevice to fetch.
     */
    where?: NasDeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NasDevices to fetch.
     */
    orderBy?: NasDeviceOrderByWithRelationInput | NasDeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NasDevices.
     */
    cursor?: NasDeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NasDevices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NasDevices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NasDevices.
     */
    distinct?: NasDeviceScalarFieldEnum | NasDeviceScalarFieldEnum[]
  }

  /**
   * NasDevice findMany
   */
  export type NasDeviceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NasDevice
     */
    select?: NasDeviceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NasDeviceInclude<ExtArgs> | null
    /**
     * Filter, which NasDevices to fetch.
     */
    where?: NasDeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NasDevices to fetch.
     */
    orderBy?: NasDeviceOrderByWithRelationInput | NasDeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NasDevices.
     */
    cursor?: NasDeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NasDevices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NasDevices.
     */
    skip?: number
    distinct?: NasDeviceScalarFieldEnum | NasDeviceScalarFieldEnum[]
  }

  /**
   * NasDevice create
   */
  export type NasDeviceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NasDevice
     */
    select?: NasDeviceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NasDeviceInclude<ExtArgs> | null
    /**
     * The data needed to create a NasDevice.
     */
    data: XOR<NasDeviceCreateInput, NasDeviceUncheckedCreateInput>
  }

  /**
   * NasDevice createMany
   */
  export type NasDeviceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NasDevices.
     */
    data: NasDeviceCreateManyInput | NasDeviceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NasDevice createManyAndReturn
   */
  export type NasDeviceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NasDevice
     */
    select?: NasDeviceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many NasDevices.
     */
    data: NasDeviceCreateManyInput | NasDeviceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NasDeviceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * NasDevice update
   */
  export type NasDeviceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NasDevice
     */
    select?: NasDeviceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NasDeviceInclude<ExtArgs> | null
    /**
     * The data needed to update a NasDevice.
     */
    data: XOR<NasDeviceUpdateInput, NasDeviceUncheckedUpdateInput>
    /**
     * Choose, which NasDevice to update.
     */
    where: NasDeviceWhereUniqueInput
  }

  /**
   * NasDevice updateMany
   */
  export type NasDeviceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NasDevices.
     */
    data: XOR<NasDeviceUpdateManyMutationInput, NasDeviceUncheckedUpdateManyInput>
    /**
     * Filter which NasDevices to update
     */
    where?: NasDeviceWhereInput
  }

  /**
   * NasDevice upsert
   */
  export type NasDeviceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NasDevice
     */
    select?: NasDeviceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NasDeviceInclude<ExtArgs> | null
    /**
     * The filter to search for the NasDevice to update in case it exists.
     */
    where: NasDeviceWhereUniqueInput
    /**
     * In case the NasDevice found by the `where` argument doesn't exist, create a new NasDevice with this data.
     */
    create: XOR<NasDeviceCreateInput, NasDeviceUncheckedCreateInput>
    /**
     * In case the NasDevice was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NasDeviceUpdateInput, NasDeviceUncheckedUpdateInput>
  }

  /**
   * NasDevice delete
   */
  export type NasDeviceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NasDevice
     */
    select?: NasDeviceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NasDeviceInclude<ExtArgs> | null
    /**
     * Filter which NasDevice to delete.
     */
    where: NasDeviceWhereUniqueInput
  }

  /**
   * NasDevice deleteMany
   */
  export type NasDeviceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NasDevices to delete
     */
    where?: NasDeviceWhereInput
  }

  /**
   * NasDevice without action
   */
  export type NasDeviceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NasDevice
     */
    select?: NasDeviceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NasDeviceInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: boolean | null
    image: string | null
    phoneNumber: string | null
    gender: string | null
    status: string | null
    isAnonymous: boolean | null
    role: $Enums.GlobalRole | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: boolean | null
    image: string | null
    phoneNumber: string | null
    gender: string | null
    status: string | null
    isAnonymous: boolean | null
    role: $Enums.GlobalRole | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    phoneNumber: number
    gender: number
    status: number
    isAnonymous: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    phoneNumber?: true
    gender?: true
    status?: true
    isAnonymous?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    phoneNumber?: true
    gender?: true
    status?: true
    isAnonymous?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    phoneNumber?: true
    gender?: true
    status?: true
    isAnonymous?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string | null
    email: string | null
    emailVerified: boolean | null
    image: string | null
    phoneNumber: string | null
    gender: string | null
    status: string | null
    isAnonymous: boolean
    role: $Enums.GlobalRole
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    phoneNumber?: boolean
    gender?: boolean
    status?: boolean
    isAnonymous?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    memberships?: boolean | User$membershipsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    messages?: boolean | User$messagesArgs<ExtArgs>
    passkeys?: boolean | User$passkeysArgs<ExtArgs>
    feedbacks?: boolean | User$feedbacksArgs<ExtArgs>
    biometricTokens?: boolean | User$biometricTokensArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    phoneNumber?: boolean
    gender?: boolean
    status?: boolean
    isAnonymous?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    phoneNumber?: boolean
    gender?: boolean
    status?: boolean
    isAnonymous?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memberships?: boolean | User$membershipsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    messages?: boolean | User$messagesArgs<ExtArgs>
    passkeys?: boolean | User$passkeysArgs<ExtArgs>
    feedbacks?: boolean | User$feedbacksArgs<ExtArgs>
    biometricTokens?: boolean | User$biometricTokensArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      memberships: Prisma.$TenantMemberPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      messages: Prisma.$MessagePayload<ExtArgs>[]
      passkeys: Prisma.$PasskeyPayload<ExtArgs>[]
      feedbacks: Prisma.$FeedbackPayload<ExtArgs>[]
      biometricTokens: Prisma.$BiometricTokenPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      email: string | null
      emailVerified: boolean | null
      image: string | null
      phoneNumber: string | null
      gender: string | null
      status: string | null
      isAnonymous: boolean
      role: $Enums.GlobalRole
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    memberships<T extends User$membershipsArgs<ExtArgs> = {}>(args?: Subset<T, User$membershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantMemberPayload<ExtArgs>, T, "findMany"> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany"> | Null>
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany"> | Null>
    messages<T extends User$messagesArgs<ExtArgs> = {}>(args?: Subset<T, User$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany"> | Null>
    passkeys<T extends User$passkeysArgs<ExtArgs> = {}>(args?: Subset<T, User$passkeysArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasskeyPayload<ExtArgs>, T, "findMany"> | Null>
    feedbacks<T extends User$feedbacksArgs<ExtArgs> = {}>(args?: Subset<T, User$feedbacksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findMany"> | Null>
    biometricTokens<T extends User$biometricTokensArgs<ExtArgs> = {}>(args?: Subset<T, User$biometricTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BiometricTokenPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'Boolean'>
    readonly image: FieldRef<"User", 'String'>
    readonly phoneNumber: FieldRef<"User", 'String'>
    readonly gender: FieldRef<"User", 'String'>
    readonly status: FieldRef<"User", 'String'>
    readonly isAnonymous: FieldRef<"User", 'Boolean'>
    readonly role: FieldRef<"User", 'GlobalRole'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.memberships
   */
  export type User$membershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantMember
     */
    select?: TenantMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantMemberInclude<ExtArgs> | null
    where?: TenantMemberWhereInput
    orderBy?: TenantMemberOrderByWithRelationInput | TenantMemberOrderByWithRelationInput[]
    cursor?: TenantMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TenantMemberScalarFieldEnum | TenantMemberScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.messages
   */
  export type User$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * User.passkeys
   */
  export type User$passkeysArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passkey
     */
    select?: PasskeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasskeyInclude<ExtArgs> | null
    where?: PasskeyWhereInput
    orderBy?: PasskeyOrderByWithRelationInput | PasskeyOrderByWithRelationInput[]
    cursor?: PasskeyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PasskeyScalarFieldEnum | PasskeyScalarFieldEnum[]
  }

  /**
   * User.feedbacks
   */
  export type User$feedbacksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    where?: FeedbackWhereInput
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    cursor?: FeedbackWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * User.biometricTokens
   */
  export type User$biometricTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BiometricToken
     */
    select?: BiometricTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BiometricTokenInclude<ExtArgs> | null
    where?: BiometricTokenWhereInput
    orderBy?: BiometricTokenOrderByWithRelationInput | BiometricTokenOrderByWithRelationInput[]
    cursor?: BiometricTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BiometricTokenScalarFieldEnum | BiometricTokenScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    token: string | null
    expiresAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    token: string | null
    expiresAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    userId: number
    token: number
    expiresAt: number
    ipAddress: number
    userAgent: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    expiresAt?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    expiresAt?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    expiresAt?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    userId: string
    token: string
    expiresAt: Date
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date
    updatedAt: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      token: string
      expiresAt: Date
      ipAddress: string | null
      userAgent: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */ 
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly token: FieldRef<"Session", 'String'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly ipAddress: FieldRef<"Session", 'String'>
    readonly userAgent: FieldRef<"Session", 'String'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly updatedAt: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    accountId: string | null
    providerId: string | null
    accessToken: string | null
    refreshToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    idToken: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    accountId: string | null
    providerId: string | null
    accessToken: string | null
    refreshToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    idToken: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    accountId: number
    providerId: number
    accessToken: number
    refreshToken: number
    accessTokenExpiresAt: number
    refreshTokenExpiresAt: number
    scope: number
    idToken: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    accountId?: true
    providerId?: true
    accessToken?: true
    refreshToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    idToken?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    accountId?: true
    providerId?: true
    accessToken?: true
    refreshToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    idToken?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    accountId?: true
    providerId?: true
    accessToken?: true
    refreshToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    idToken?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    userId: string
    accountId: string
    providerId: string
    accessToken: string | null
    refreshToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    idToken: string | null
    password: string | null
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    accountId?: boolean
    providerId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    idToken?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    accountId?: boolean
    providerId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    idToken?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    userId?: boolean
    accountId?: boolean
    providerId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    idToken?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      accountId: string
      providerId: string
      accessToken: string | null
      refreshToken: string | null
      accessTokenExpiresAt: Date | null
      refreshTokenExpiresAt: Date | null
      scope: string | null
      idToken: string | null
      password: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */ 
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly accountId: FieldRef<"Account", 'String'>
    readonly providerId: FieldRef<"Account", 'String'>
    readonly accessToken: FieldRef<"Account", 'String'>
    readonly refreshToken: FieldRef<"Account", 'String'>
    readonly accessTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly refreshTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly idToken: FieldRef<"Account", 'String'>
    readonly password: FieldRef<"Account", 'String'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Verification
   */

  export type AggregateVerification = {
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  export type VerificationMinAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationMaxAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationCountAggregateOutputType = {
    id: number
    identifier: number
    value: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VerificationMinAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationMaxAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationCountAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verification to aggregate.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Verifications
    **/
    _count?: true | VerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationMaxAggregateInputType
  }

  export type GetVerificationAggregateType<T extends VerificationAggregateArgs> = {
        [P in keyof T & keyof AggregateVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerification[P]>
      : GetScalarType<T[P], AggregateVerification[P]>
  }




  export type VerificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationWhereInput
    orderBy?: VerificationOrderByWithAggregationInput | VerificationOrderByWithAggregationInput[]
    by: VerificationScalarFieldEnum[] | VerificationScalarFieldEnum
    having?: VerificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationCountAggregateInputType | true
    _min?: VerificationMinAggregateInputType
    _max?: VerificationMaxAggregateInputType
  }

  export type VerificationGroupByOutputType = {
    id: string
    identifier: string
    value: string
    expiresAt: Date
    createdAt: Date
    updatedAt: Date
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  type GetVerificationGroupByPayload<T extends VerificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationGroupByOutputType[P]>
        }
      >
    >


  export type VerificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectScalar = {
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $VerificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Verification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      identifier: string
      value: string
      expiresAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["verification"]>
    composites: {}
  }

  type VerificationGetPayload<S extends boolean | null | undefined | VerificationDefaultArgs> = $Result.GetResult<Prisma.$VerificationPayload, S>

  type VerificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<VerificationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: VerificationCountAggregateInputType | true
    }

  export interface VerificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Verification'], meta: { name: 'Verification' } }
    /**
     * Find zero or one Verification that matches the filter.
     * @param {VerificationFindUniqueArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationFindUniqueArgs>(args: SelectSubset<T, VerificationFindUniqueArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Verification that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {VerificationFindUniqueOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Verification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationFindFirstArgs>(args?: SelectSubset<T, VerificationFindFirstArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Verification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Verifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Verifications
     * const verifications = await prisma.verification.findMany()
     * 
     * // Get first 10 Verifications
     * const verifications = await prisma.verification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verificationWithIdOnly = await prisma.verification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VerificationFindManyArgs>(args?: SelectSubset<T, VerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Verification.
     * @param {VerificationCreateArgs} args - Arguments to create a Verification.
     * @example
     * // Create one Verification
     * const Verification = await prisma.verification.create({
     *   data: {
     *     // ... data to create a Verification
     *   }
     * })
     * 
     */
    create<T extends VerificationCreateArgs>(args: SelectSubset<T, VerificationCreateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Verifications.
     * @param {VerificationCreateManyArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationCreateManyArgs>(args?: SelectSubset<T, VerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Verifications and returns the data saved in the database.
     * @param {VerificationCreateManyAndReturnArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Verification.
     * @param {VerificationDeleteArgs} args - Arguments to delete one Verification.
     * @example
     * // Delete one Verification
     * const Verification = await prisma.verification.delete({
     *   where: {
     *     // ... filter to delete one Verification
     *   }
     * })
     * 
     */
    delete<T extends VerificationDeleteArgs>(args: SelectSubset<T, VerificationDeleteArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Verification.
     * @param {VerificationUpdateArgs} args - Arguments to update one Verification.
     * @example
     * // Update one Verification
     * const verification = await prisma.verification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationUpdateArgs>(args: SelectSubset<T, VerificationUpdateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Verifications.
     * @param {VerificationDeleteManyArgs} args - Arguments to filter Verifications to delete.
     * @example
     * // Delete a few Verifications
     * const { count } = await prisma.verification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationDeleteManyArgs>(args?: SelectSubset<T, VerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationUpdateManyArgs>(args: SelectSubset<T, VerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Verification.
     * @param {VerificationUpsertArgs} args - Arguments to update or create a Verification.
     * @example
     * // Update or create a Verification
     * const verification = await prisma.verification.upsert({
     *   create: {
     *     // ... data to create a Verification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Verification we want to update
     *   }
     * })
     */
    upsert<T extends VerificationUpsertArgs>(args: SelectSubset<T, VerificationUpsertArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationCountArgs} args - Arguments to filter Verifications to count.
     * @example
     * // Count the number of Verifications
     * const count = await prisma.verification.count({
     *   where: {
     *     // ... the filter for the Verifications we want to count
     *   }
     * })
    **/
    count<T extends VerificationCountArgs>(
      args?: Subset<T, VerificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationAggregateArgs>(args: Subset<T, VerificationAggregateArgs>): Prisma.PrismaPromise<GetVerificationAggregateType<T>>

    /**
     * Group by Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationGroupByArgs['orderBy'] }
        : { orderBy?: VerificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Verification model
   */
  readonly fields: VerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Verification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Verification model
   */ 
  interface VerificationFieldRefs {
    readonly id: FieldRef<"Verification", 'String'>
    readonly identifier: FieldRef<"Verification", 'String'>
    readonly value: FieldRef<"Verification", 'String'>
    readonly expiresAt: FieldRef<"Verification", 'DateTime'>
    readonly createdAt: FieldRef<"Verification", 'DateTime'>
    readonly updatedAt: FieldRef<"Verification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Verification findUnique
   */
  export type VerificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findUniqueOrThrow
   */
  export type VerificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findFirst
   */
  export type VerificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findFirstOrThrow
   */
  export type VerificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findMany
   */
  export type VerificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Filter, which Verifications to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification create
   */
  export type VerificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * The data needed to create a Verification.
     */
    data: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
  }

  /**
   * Verification createMany
   */
  export type VerificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification createManyAndReturn
   */
  export type VerificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification update
   */
  export type VerificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * The data needed to update a Verification.
     */
    data: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
    /**
     * Choose, which Verification to update.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification updateMany
   */
  export type VerificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
  }

  /**
   * Verification upsert
   */
  export type VerificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * The filter to search for the Verification to update in case it exists.
     */
    where: VerificationWhereUniqueInput
    /**
     * In case the Verification found by the `where` argument doesn't exist, create a new Verification with this data.
     */
    create: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
    /**
     * In case the Verification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
  }

  /**
   * Verification delete
   */
  export type VerificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Filter which Verification to delete.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification deleteMany
   */
  export type VerificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verifications to delete
     */
    where?: VerificationWhereInput
  }

  /**
   * Verification without action
   */
  export type VerificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
  }


  /**
   * Model TenantMember
   */

  export type AggregateTenantMember = {
    _count: TenantMemberCountAggregateOutputType | null
    _min: TenantMemberMinAggregateOutputType | null
    _max: TenantMemberMaxAggregateOutputType | null
  }

  export type TenantMemberMinAggregateOutputType = {
    id: string | null
    userId: string | null
    tenantId: string | null
    role: $Enums.TenantRole | null
    canModerate: boolean | null
    canManageOrders: boolean | null
    canViewStats: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TenantMemberMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    tenantId: string | null
    role: $Enums.TenantRole | null
    canModerate: boolean | null
    canManageOrders: boolean | null
    canViewStats: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TenantMemberCountAggregateOutputType = {
    id: number
    userId: number
    tenantId: number
    role: number
    canModerate: number
    canManageOrders: number
    canViewStats: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TenantMemberMinAggregateInputType = {
    id?: true
    userId?: true
    tenantId?: true
    role?: true
    canModerate?: true
    canManageOrders?: true
    canViewStats?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TenantMemberMaxAggregateInputType = {
    id?: true
    userId?: true
    tenantId?: true
    role?: true
    canModerate?: true
    canManageOrders?: true
    canViewStats?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TenantMemberCountAggregateInputType = {
    id?: true
    userId?: true
    tenantId?: true
    role?: true
    canModerate?: true
    canManageOrders?: true
    canViewStats?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TenantMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TenantMember to aggregate.
     */
    where?: TenantMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantMembers to fetch.
     */
    orderBy?: TenantMemberOrderByWithRelationInput | TenantMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TenantMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TenantMembers
    **/
    _count?: true | TenantMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TenantMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TenantMemberMaxAggregateInputType
  }

  export type GetTenantMemberAggregateType<T extends TenantMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateTenantMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTenantMember[P]>
      : GetScalarType<T[P], AggregateTenantMember[P]>
  }




  export type TenantMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenantMemberWhereInput
    orderBy?: TenantMemberOrderByWithAggregationInput | TenantMemberOrderByWithAggregationInput[]
    by: TenantMemberScalarFieldEnum[] | TenantMemberScalarFieldEnum
    having?: TenantMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TenantMemberCountAggregateInputType | true
    _min?: TenantMemberMinAggregateInputType
    _max?: TenantMemberMaxAggregateInputType
  }

  export type TenantMemberGroupByOutputType = {
    id: string
    userId: string
    tenantId: string
    role: $Enums.TenantRole
    canModerate: boolean
    canManageOrders: boolean
    canViewStats: boolean
    createdAt: Date
    updatedAt: Date
    _count: TenantMemberCountAggregateOutputType | null
    _min: TenantMemberMinAggregateOutputType | null
    _max: TenantMemberMaxAggregateOutputType | null
  }

  type GetTenantMemberGroupByPayload<T extends TenantMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TenantMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TenantMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TenantMemberGroupByOutputType[P]>
            : GetScalarType<T[P], TenantMemberGroupByOutputType[P]>
        }
      >
    >


  export type TenantMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    tenantId?: boolean
    role?: boolean
    canModerate?: boolean
    canManageOrders?: boolean
    canViewStats?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tenantMember"]>

  export type TenantMemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    tenantId?: boolean
    role?: boolean
    canModerate?: boolean
    canManageOrders?: boolean
    canViewStats?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tenantMember"]>

  export type TenantMemberSelectScalar = {
    id?: boolean
    userId?: boolean
    tenantId?: boolean
    role?: boolean
    canModerate?: boolean
    canManageOrders?: boolean
    canViewStats?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TenantMemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type TenantMemberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $TenantMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TenantMember"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      tenant: Prisma.$TenantPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      tenantId: string
      role: $Enums.TenantRole
      canModerate: boolean
      canManageOrders: boolean
      canViewStats: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tenantMember"]>
    composites: {}
  }

  type TenantMemberGetPayload<S extends boolean | null | undefined | TenantMemberDefaultArgs> = $Result.GetResult<Prisma.$TenantMemberPayload, S>

  type TenantMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TenantMemberFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TenantMemberCountAggregateInputType | true
    }

  export interface TenantMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TenantMember'], meta: { name: 'TenantMember' } }
    /**
     * Find zero or one TenantMember that matches the filter.
     * @param {TenantMemberFindUniqueArgs} args - Arguments to find a TenantMember
     * @example
     * // Get one TenantMember
     * const tenantMember = await prisma.tenantMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TenantMemberFindUniqueArgs>(args: SelectSubset<T, TenantMemberFindUniqueArgs<ExtArgs>>): Prisma__TenantMemberClient<$Result.GetResult<Prisma.$TenantMemberPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TenantMember that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TenantMemberFindUniqueOrThrowArgs} args - Arguments to find a TenantMember
     * @example
     * // Get one TenantMember
     * const tenantMember = await prisma.tenantMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TenantMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, TenantMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TenantMemberClient<$Result.GetResult<Prisma.$TenantMemberPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TenantMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantMemberFindFirstArgs} args - Arguments to find a TenantMember
     * @example
     * // Get one TenantMember
     * const tenantMember = await prisma.tenantMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TenantMemberFindFirstArgs>(args?: SelectSubset<T, TenantMemberFindFirstArgs<ExtArgs>>): Prisma__TenantMemberClient<$Result.GetResult<Prisma.$TenantMemberPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TenantMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantMemberFindFirstOrThrowArgs} args - Arguments to find a TenantMember
     * @example
     * // Get one TenantMember
     * const tenantMember = await prisma.tenantMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TenantMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, TenantMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__TenantMemberClient<$Result.GetResult<Prisma.$TenantMemberPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TenantMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TenantMembers
     * const tenantMembers = await prisma.tenantMember.findMany()
     * 
     * // Get first 10 TenantMembers
     * const tenantMembers = await prisma.tenantMember.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tenantMemberWithIdOnly = await prisma.tenantMember.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TenantMemberFindManyArgs>(args?: SelectSubset<T, TenantMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantMemberPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TenantMember.
     * @param {TenantMemberCreateArgs} args - Arguments to create a TenantMember.
     * @example
     * // Create one TenantMember
     * const TenantMember = await prisma.tenantMember.create({
     *   data: {
     *     // ... data to create a TenantMember
     *   }
     * })
     * 
     */
    create<T extends TenantMemberCreateArgs>(args: SelectSubset<T, TenantMemberCreateArgs<ExtArgs>>): Prisma__TenantMemberClient<$Result.GetResult<Prisma.$TenantMemberPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TenantMembers.
     * @param {TenantMemberCreateManyArgs} args - Arguments to create many TenantMembers.
     * @example
     * // Create many TenantMembers
     * const tenantMember = await prisma.tenantMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TenantMemberCreateManyArgs>(args?: SelectSubset<T, TenantMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TenantMembers and returns the data saved in the database.
     * @param {TenantMemberCreateManyAndReturnArgs} args - Arguments to create many TenantMembers.
     * @example
     * // Create many TenantMembers
     * const tenantMember = await prisma.tenantMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TenantMembers and only return the `id`
     * const tenantMemberWithIdOnly = await prisma.tenantMember.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TenantMemberCreateManyAndReturnArgs>(args?: SelectSubset<T, TenantMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantMemberPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a TenantMember.
     * @param {TenantMemberDeleteArgs} args - Arguments to delete one TenantMember.
     * @example
     * // Delete one TenantMember
     * const TenantMember = await prisma.tenantMember.delete({
     *   where: {
     *     // ... filter to delete one TenantMember
     *   }
     * })
     * 
     */
    delete<T extends TenantMemberDeleteArgs>(args: SelectSubset<T, TenantMemberDeleteArgs<ExtArgs>>): Prisma__TenantMemberClient<$Result.GetResult<Prisma.$TenantMemberPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TenantMember.
     * @param {TenantMemberUpdateArgs} args - Arguments to update one TenantMember.
     * @example
     * // Update one TenantMember
     * const tenantMember = await prisma.tenantMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TenantMemberUpdateArgs>(args: SelectSubset<T, TenantMemberUpdateArgs<ExtArgs>>): Prisma__TenantMemberClient<$Result.GetResult<Prisma.$TenantMemberPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TenantMembers.
     * @param {TenantMemberDeleteManyArgs} args - Arguments to filter TenantMembers to delete.
     * @example
     * // Delete a few TenantMembers
     * const { count } = await prisma.tenantMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TenantMemberDeleteManyArgs>(args?: SelectSubset<T, TenantMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TenantMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TenantMembers
     * const tenantMember = await prisma.tenantMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TenantMemberUpdateManyArgs>(args: SelectSubset<T, TenantMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TenantMember.
     * @param {TenantMemberUpsertArgs} args - Arguments to update or create a TenantMember.
     * @example
     * // Update or create a TenantMember
     * const tenantMember = await prisma.tenantMember.upsert({
     *   create: {
     *     // ... data to create a TenantMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TenantMember we want to update
     *   }
     * })
     */
    upsert<T extends TenantMemberUpsertArgs>(args: SelectSubset<T, TenantMemberUpsertArgs<ExtArgs>>): Prisma__TenantMemberClient<$Result.GetResult<Prisma.$TenantMemberPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TenantMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantMemberCountArgs} args - Arguments to filter TenantMembers to count.
     * @example
     * // Count the number of TenantMembers
     * const count = await prisma.tenantMember.count({
     *   where: {
     *     // ... the filter for the TenantMembers we want to count
     *   }
     * })
    **/
    count<T extends TenantMemberCountArgs>(
      args?: Subset<T, TenantMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TenantMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TenantMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TenantMemberAggregateArgs>(args: Subset<T, TenantMemberAggregateArgs>): Prisma.PrismaPromise<GetTenantMemberAggregateType<T>>

    /**
     * Group by TenantMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantMemberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TenantMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TenantMemberGroupByArgs['orderBy'] }
        : { orderBy?: TenantMemberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TenantMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTenantMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TenantMember model
   */
  readonly fields: TenantMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TenantMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TenantMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TenantMember model
   */ 
  interface TenantMemberFieldRefs {
    readonly id: FieldRef<"TenantMember", 'String'>
    readonly userId: FieldRef<"TenantMember", 'String'>
    readonly tenantId: FieldRef<"TenantMember", 'String'>
    readonly role: FieldRef<"TenantMember", 'TenantRole'>
    readonly canModerate: FieldRef<"TenantMember", 'Boolean'>
    readonly canManageOrders: FieldRef<"TenantMember", 'Boolean'>
    readonly canViewStats: FieldRef<"TenantMember", 'Boolean'>
    readonly createdAt: FieldRef<"TenantMember", 'DateTime'>
    readonly updatedAt: FieldRef<"TenantMember", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TenantMember findUnique
   */
  export type TenantMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantMember
     */
    select?: TenantMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantMemberInclude<ExtArgs> | null
    /**
     * Filter, which TenantMember to fetch.
     */
    where: TenantMemberWhereUniqueInput
  }

  /**
   * TenantMember findUniqueOrThrow
   */
  export type TenantMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantMember
     */
    select?: TenantMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantMemberInclude<ExtArgs> | null
    /**
     * Filter, which TenantMember to fetch.
     */
    where: TenantMemberWhereUniqueInput
  }

  /**
   * TenantMember findFirst
   */
  export type TenantMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantMember
     */
    select?: TenantMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantMemberInclude<ExtArgs> | null
    /**
     * Filter, which TenantMember to fetch.
     */
    where?: TenantMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantMembers to fetch.
     */
    orderBy?: TenantMemberOrderByWithRelationInput | TenantMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TenantMembers.
     */
    cursor?: TenantMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TenantMembers.
     */
    distinct?: TenantMemberScalarFieldEnum | TenantMemberScalarFieldEnum[]
  }

  /**
   * TenantMember findFirstOrThrow
   */
  export type TenantMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantMember
     */
    select?: TenantMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantMemberInclude<ExtArgs> | null
    /**
     * Filter, which TenantMember to fetch.
     */
    where?: TenantMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantMembers to fetch.
     */
    orderBy?: TenantMemberOrderByWithRelationInput | TenantMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TenantMembers.
     */
    cursor?: TenantMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TenantMembers.
     */
    distinct?: TenantMemberScalarFieldEnum | TenantMemberScalarFieldEnum[]
  }

  /**
   * TenantMember findMany
   */
  export type TenantMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantMember
     */
    select?: TenantMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantMemberInclude<ExtArgs> | null
    /**
     * Filter, which TenantMembers to fetch.
     */
    where?: TenantMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantMembers to fetch.
     */
    orderBy?: TenantMemberOrderByWithRelationInput | TenantMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TenantMembers.
     */
    cursor?: TenantMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantMembers.
     */
    skip?: number
    distinct?: TenantMemberScalarFieldEnum | TenantMemberScalarFieldEnum[]
  }

  /**
   * TenantMember create
   */
  export type TenantMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantMember
     */
    select?: TenantMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantMemberInclude<ExtArgs> | null
    /**
     * The data needed to create a TenantMember.
     */
    data: XOR<TenantMemberCreateInput, TenantMemberUncheckedCreateInput>
  }

  /**
   * TenantMember createMany
   */
  export type TenantMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TenantMembers.
     */
    data: TenantMemberCreateManyInput | TenantMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TenantMember createManyAndReturn
   */
  export type TenantMemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantMember
     */
    select?: TenantMemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many TenantMembers.
     */
    data: TenantMemberCreateManyInput | TenantMemberCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantMemberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TenantMember update
   */
  export type TenantMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantMember
     */
    select?: TenantMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantMemberInclude<ExtArgs> | null
    /**
     * The data needed to update a TenantMember.
     */
    data: XOR<TenantMemberUpdateInput, TenantMemberUncheckedUpdateInput>
    /**
     * Choose, which TenantMember to update.
     */
    where: TenantMemberWhereUniqueInput
  }

  /**
   * TenantMember updateMany
   */
  export type TenantMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TenantMembers.
     */
    data: XOR<TenantMemberUpdateManyMutationInput, TenantMemberUncheckedUpdateManyInput>
    /**
     * Filter which TenantMembers to update
     */
    where?: TenantMemberWhereInput
  }

  /**
   * TenantMember upsert
   */
  export type TenantMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantMember
     */
    select?: TenantMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantMemberInclude<ExtArgs> | null
    /**
     * The filter to search for the TenantMember to update in case it exists.
     */
    where: TenantMemberWhereUniqueInput
    /**
     * In case the TenantMember found by the `where` argument doesn't exist, create a new TenantMember with this data.
     */
    create: XOR<TenantMemberCreateInput, TenantMemberUncheckedCreateInput>
    /**
     * In case the TenantMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TenantMemberUpdateInput, TenantMemberUncheckedUpdateInput>
  }

  /**
   * TenantMember delete
   */
  export type TenantMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantMember
     */
    select?: TenantMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantMemberInclude<ExtArgs> | null
    /**
     * Filter which TenantMember to delete.
     */
    where: TenantMemberWhereUniqueInput
  }

  /**
   * TenantMember deleteMany
   */
  export type TenantMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TenantMembers to delete
     */
    where?: TenantMemberWhereInput
  }

  /**
   * TenantMember without action
   */
  export type TenantMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantMember
     */
    select?: TenantMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantMemberInclude<ExtArgs> | null
  }


  /**
   * Model Room
   */

  export type AggregateRoom = {
    _count: RoomCountAggregateOutputType | null
    _min: RoomMinAggregateOutputType | null
    _max: RoomMaxAggregateOutputType | null
  }

  export type RoomMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    type: $Enums.RoomType | null
    tenantId: string | null
    createdAt: Date | null
  }

  export type RoomMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    type: $Enums.RoomType | null
    tenantId: string | null
    createdAt: Date | null
  }

  export type RoomCountAggregateOutputType = {
    id: number
    name: number
    description: number
    type: number
    tenantId: number
    createdAt: number
    _all: number
  }


  export type RoomMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    type?: true
    tenantId?: true
    createdAt?: true
  }

  export type RoomMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    type?: true
    tenantId?: true
    createdAt?: true
  }

  export type RoomCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    type?: true
    tenantId?: true
    createdAt?: true
    _all?: true
  }

  export type RoomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Room to aggregate.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Rooms
    **/
    _count?: true | RoomCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomMaxAggregateInputType
  }

  export type GetRoomAggregateType<T extends RoomAggregateArgs> = {
        [P in keyof T & keyof AggregateRoom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoom[P]>
      : GetScalarType<T[P], AggregateRoom[P]>
  }




  export type RoomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomWhereInput
    orderBy?: RoomOrderByWithAggregationInput | RoomOrderByWithAggregationInput[]
    by: RoomScalarFieldEnum[] | RoomScalarFieldEnum
    having?: RoomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomCountAggregateInputType | true
    _min?: RoomMinAggregateInputType
    _max?: RoomMaxAggregateInputType
  }

  export type RoomGroupByOutputType = {
    id: string
    name: string
    description: string | null
    type: $Enums.RoomType
    tenantId: string
    createdAt: Date
    _count: RoomCountAggregateOutputType | null
    _min: RoomMinAggregateOutputType | null
    _max: RoomMaxAggregateOutputType | null
  }

  type GetRoomGroupByPayload<T extends RoomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomGroupByOutputType[P]>
            : GetScalarType<T[P], RoomGroupByOutputType[P]>
        }
      >
    >


  export type RoomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    type?: boolean
    tenantId?: boolean
    createdAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    messages?: boolean | Room$messagesArgs<ExtArgs>
    _count?: boolean | RoomCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room"]>

  export type RoomSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    type?: boolean
    tenantId?: boolean
    createdAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room"]>

  export type RoomSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    type?: boolean
    tenantId?: boolean
    createdAt?: boolean
  }

  export type RoomInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    messages?: boolean | Room$messagesArgs<ExtArgs>
    _count?: boolean | RoomCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RoomIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $RoomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Room"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>
      messages: Prisma.$MessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      type: $Enums.RoomType
      tenantId: string
      createdAt: Date
    }, ExtArgs["result"]["room"]>
    composites: {}
  }

  type RoomGetPayload<S extends boolean | null | undefined | RoomDefaultArgs> = $Result.GetResult<Prisma.$RoomPayload, S>

  type RoomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RoomFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RoomCountAggregateInputType | true
    }

  export interface RoomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Room'], meta: { name: 'Room' } }
    /**
     * Find zero or one Room that matches the filter.
     * @param {RoomFindUniqueArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomFindUniqueArgs>(args: SelectSubset<T, RoomFindUniqueArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Room that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RoomFindUniqueOrThrowArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Room that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindFirstArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomFindFirstArgs>(args?: SelectSubset<T, RoomFindFirstArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Room that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindFirstOrThrowArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Rooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rooms
     * const rooms = await prisma.room.findMany()
     * 
     * // Get first 10 Rooms
     * const rooms = await prisma.room.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomWithIdOnly = await prisma.room.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomFindManyArgs>(args?: SelectSubset<T, RoomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Room.
     * @param {RoomCreateArgs} args - Arguments to create a Room.
     * @example
     * // Create one Room
     * const Room = await prisma.room.create({
     *   data: {
     *     // ... data to create a Room
     *   }
     * })
     * 
     */
    create<T extends RoomCreateArgs>(args: SelectSubset<T, RoomCreateArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Rooms.
     * @param {RoomCreateManyArgs} args - Arguments to create many Rooms.
     * @example
     * // Create many Rooms
     * const room = await prisma.room.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomCreateManyArgs>(args?: SelectSubset<T, RoomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Rooms and returns the data saved in the database.
     * @param {RoomCreateManyAndReturnArgs} args - Arguments to create many Rooms.
     * @example
     * // Create many Rooms
     * const room = await prisma.room.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Rooms and only return the `id`
     * const roomWithIdOnly = await prisma.room.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Room.
     * @param {RoomDeleteArgs} args - Arguments to delete one Room.
     * @example
     * // Delete one Room
     * const Room = await prisma.room.delete({
     *   where: {
     *     // ... filter to delete one Room
     *   }
     * })
     * 
     */
    delete<T extends RoomDeleteArgs>(args: SelectSubset<T, RoomDeleteArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Room.
     * @param {RoomUpdateArgs} args - Arguments to update one Room.
     * @example
     * // Update one Room
     * const room = await prisma.room.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomUpdateArgs>(args: SelectSubset<T, RoomUpdateArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Rooms.
     * @param {RoomDeleteManyArgs} args - Arguments to filter Rooms to delete.
     * @example
     * // Delete a few Rooms
     * const { count } = await prisma.room.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomDeleteManyArgs>(args?: SelectSubset<T, RoomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rooms
     * const room = await prisma.room.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomUpdateManyArgs>(args: SelectSubset<T, RoomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Room.
     * @param {RoomUpsertArgs} args - Arguments to update or create a Room.
     * @example
     * // Update or create a Room
     * const room = await prisma.room.upsert({
     *   create: {
     *     // ... data to create a Room
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Room we want to update
     *   }
     * })
     */
    upsert<T extends RoomUpsertArgs>(args: SelectSubset<T, RoomUpsertArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomCountArgs} args - Arguments to filter Rooms to count.
     * @example
     * // Count the number of Rooms
     * const count = await prisma.room.count({
     *   where: {
     *     // ... the filter for the Rooms we want to count
     *   }
     * })
    **/
    count<T extends RoomCountArgs>(
      args?: Subset<T, RoomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoomAggregateArgs>(args: Subset<T, RoomAggregateArgs>): Prisma.PrismaPromise<GetRoomAggregateType<T>>

    /**
     * Group by Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomGroupByArgs['orderBy'] }
        : { orderBy?: RoomGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Room model
   */
  readonly fields: RoomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Room.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    messages<T extends Room$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Room$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Room model
   */ 
  interface RoomFieldRefs {
    readonly id: FieldRef<"Room", 'String'>
    readonly name: FieldRef<"Room", 'String'>
    readonly description: FieldRef<"Room", 'String'>
    readonly type: FieldRef<"Room", 'RoomType'>
    readonly tenantId: FieldRef<"Room", 'String'>
    readonly createdAt: FieldRef<"Room", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Room findUnique
   */
  export type RoomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room findUniqueOrThrow
   */
  export type RoomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room findFirst
   */
  export type RoomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room findFirstOrThrow
   */
  export type RoomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room findMany
   */
  export type RoomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Rooms to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room create
   */
  export type RoomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The data needed to create a Room.
     */
    data: XOR<RoomCreateInput, RoomUncheckedCreateInput>
  }

  /**
   * Room createMany
   */
  export type RoomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Rooms.
     */
    data: RoomCreateManyInput | RoomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Room createManyAndReturn
   */
  export type RoomCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Rooms.
     */
    data: RoomCreateManyInput | RoomCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Room update
   */
  export type RoomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The data needed to update a Room.
     */
    data: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>
    /**
     * Choose, which Room to update.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room updateMany
   */
  export type RoomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Rooms.
     */
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyInput>
    /**
     * Filter which Rooms to update
     */
    where?: RoomWhereInput
  }

  /**
   * Room upsert
   */
  export type RoomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The filter to search for the Room to update in case it exists.
     */
    where: RoomWhereUniqueInput
    /**
     * In case the Room found by the `where` argument doesn't exist, create a new Room with this data.
     */
    create: XOR<RoomCreateInput, RoomUncheckedCreateInput>
    /**
     * In case the Room was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>
  }

  /**
   * Room delete
   */
  export type RoomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter which Room to delete.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room deleteMany
   */
  export type RoomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rooms to delete
     */
    where?: RoomWhereInput
  }

  /**
   * Room.messages
   */
  export type Room$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Room without action
   */
  export type RoomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
  }


  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageMinAggregateOutputType = {
    id: string | null
    text: string | null
    imageUrl: string | null
    createdAt: Date | null
    senderId: string | null
    senderAlias: string | null
    senderGender: string | null
    recipientId: string | null
    roomId: string | null
    userId: string | null
    tenantId: string | null
  }

  export type MessageMaxAggregateOutputType = {
    id: string | null
    text: string | null
    imageUrl: string | null
    createdAt: Date | null
    senderId: string | null
    senderAlias: string | null
    senderGender: string | null
    recipientId: string | null
    roomId: string | null
    userId: string | null
    tenantId: string | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    text: number
    imageUrl: number
    createdAt: number
    senderId: number
    senderAlias: number
    senderGender: number
    recipientId: number
    roomId: number
    userId: number
    tenantId: number
    _all: number
  }


  export type MessageMinAggregateInputType = {
    id?: true
    text?: true
    imageUrl?: true
    createdAt?: true
    senderId?: true
    senderAlias?: true
    senderGender?: true
    recipientId?: true
    roomId?: true
    userId?: true
    tenantId?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    text?: true
    imageUrl?: true
    createdAt?: true
    senderId?: true
    senderAlias?: true
    senderGender?: true
    recipientId?: true
    roomId?: true
    userId?: true
    tenantId?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    text?: true
    imageUrl?: true
    createdAt?: true
    senderId?: true
    senderAlias?: true
    senderGender?: true
    recipientId?: true
    roomId?: true
    userId?: true
    tenantId?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: string
    text: string
    imageUrl: string | null
    createdAt: Date
    senderId: string
    senderAlias: string
    senderGender: string
    recipientId: string | null
    roomId: string | null
    userId: string | null
    tenantId: string
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    senderId?: boolean
    senderAlias?: boolean
    senderGender?: boolean
    recipientId?: boolean
    roomId?: boolean
    userId?: boolean
    tenantId?: boolean
    room?: boolean | Message$roomArgs<ExtArgs>
    user?: boolean | Message$userArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    senderId?: boolean
    senderAlias?: boolean
    senderGender?: boolean
    recipientId?: boolean
    roomId?: boolean
    userId?: boolean
    tenantId?: boolean
    room?: boolean | Message$roomArgs<ExtArgs>
    user?: boolean | Message$userArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    text?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    senderId?: boolean
    senderAlias?: boolean
    senderGender?: boolean
    recipientId?: boolean
    roomId?: boolean
    userId?: boolean
    tenantId?: boolean
  }

  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | Message$roomArgs<ExtArgs>
    user?: boolean | Message$userArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type MessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | Message$roomArgs<ExtArgs>
    user?: boolean | Message$userArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      room: Prisma.$RoomPayload<ExtArgs> | null
      user: Prisma.$UserPayload<ExtArgs> | null
      tenant: Prisma.$TenantPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      text: string
      imageUrl: string | null
      createdAt: Date
      senderId: string
      senderAlias: string
      senderGender: string
      recipientId: string | null
      roomId: string | null
      userId: string | null
      tenantId: string
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    room<T extends Message$roomArgs<ExtArgs> = {}>(args?: Subset<T, Message$roomArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    user<T extends Message$userArgs<ExtArgs> = {}>(args?: Subset<T, Message$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Message model
   */ 
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'String'>
    readonly text: FieldRef<"Message", 'String'>
    readonly imageUrl: FieldRef<"Message", 'String'>
    readonly createdAt: FieldRef<"Message", 'DateTime'>
    readonly senderId: FieldRef<"Message", 'String'>
    readonly senderAlias: FieldRef<"Message", 'String'>
    readonly senderGender: FieldRef<"Message", 'String'>
    readonly recipientId: FieldRef<"Message", 'String'>
    readonly roomId: FieldRef<"Message", 'String'>
    readonly userId: FieldRef<"Message", 'String'>
    readonly tenantId: FieldRef<"Message", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
  }

  /**
   * Message.room
   */
  export type Message$roomArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    where?: RoomWhereInput
  }

  /**
   * Message.user
   */
  export type Message$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
  }


  /**
   * Model SystemLog
   */

  export type AggregateSystemLog = {
    _count: SystemLogCountAggregateOutputType | null
    _min: SystemLogMinAggregateOutputType | null
    _max: SystemLogMaxAggregateOutputType | null
  }

  export type SystemLogMinAggregateOutputType = {
    id: string | null
    event: string | null
    createdAt: Date | null
    tenantId: string | null
  }

  export type SystemLogMaxAggregateOutputType = {
    id: string | null
    event: string | null
    createdAt: Date | null
    tenantId: string | null
  }

  export type SystemLogCountAggregateOutputType = {
    id: number
    event: number
    details: number
    createdAt: number
    tenantId: number
    _all: number
  }


  export type SystemLogMinAggregateInputType = {
    id?: true
    event?: true
    createdAt?: true
    tenantId?: true
  }

  export type SystemLogMaxAggregateInputType = {
    id?: true
    event?: true
    createdAt?: true
    tenantId?: true
  }

  export type SystemLogCountAggregateInputType = {
    id?: true
    event?: true
    details?: true
    createdAt?: true
    tenantId?: true
    _all?: true
  }

  export type SystemLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemLog to aggregate.
     */
    where?: SystemLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemLogs to fetch.
     */
    orderBy?: SystemLogOrderByWithRelationInput | SystemLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SystemLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SystemLogs
    **/
    _count?: true | SystemLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SystemLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SystemLogMaxAggregateInputType
  }

  export type GetSystemLogAggregateType<T extends SystemLogAggregateArgs> = {
        [P in keyof T & keyof AggregateSystemLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSystemLog[P]>
      : GetScalarType<T[P], AggregateSystemLog[P]>
  }




  export type SystemLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SystemLogWhereInput
    orderBy?: SystemLogOrderByWithAggregationInput | SystemLogOrderByWithAggregationInput[]
    by: SystemLogScalarFieldEnum[] | SystemLogScalarFieldEnum
    having?: SystemLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SystemLogCountAggregateInputType | true
    _min?: SystemLogMinAggregateInputType
    _max?: SystemLogMaxAggregateInputType
  }

  export type SystemLogGroupByOutputType = {
    id: string
    event: string
    details: JsonValue | null
    createdAt: Date
    tenantId: string | null
    _count: SystemLogCountAggregateOutputType | null
    _min: SystemLogMinAggregateOutputType | null
    _max: SystemLogMaxAggregateOutputType | null
  }

  type GetSystemLogGroupByPayload<T extends SystemLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SystemLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SystemLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SystemLogGroupByOutputType[P]>
            : GetScalarType<T[P], SystemLogGroupByOutputType[P]>
        }
      >
    >


  export type SystemLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    event?: boolean
    details?: boolean
    createdAt?: boolean
    tenantId?: boolean
    tenant?: boolean | SystemLog$tenantArgs<ExtArgs>
  }, ExtArgs["result"]["systemLog"]>

  export type SystemLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    event?: boolean
    details?: boolean
    createdAt?: boolean
    tenantId?: boolean
    tenant?: boolean | SystemLog$tenantArgs<ExtArgs>
  }, ExtArgs["result"]["systemLog"]>

  export type SystemLogSelectScalar = {
    id?: boolean
    event?: boolean
    details?: boolean
    createdAt?: boolean
    tenantId?: boolean
  }

  export type SystemLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | SystemLog$tenantArgs<ExtArgs>
  }
  export type SystemLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | SystemLog$tenantArgs<ExtArgs>
  }

  export type $SystemLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SystemLog"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      event: string
      details: Prisma.JsonValue | null
      createdAt: Date
      tenantId: string | null
    }, ExtArgs["result"]["systemLog"]>
    composites: {}
  }

  type SystemLogGetPayload<S extends boolean | null | undefined | SystemLogDefaultArgs> = $Result.GetResult<Prisma.$SystemLogPayload, S>

  type SystemLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SystemLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SystemLogCountAggregateInputType | true
    }

  export interface SystemLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SystemLog'], meta: { name: 'SystemLog' } }
    /**
     * Find zero or one SystemLog that matches the filter.
     * @param {SystemLogFindUniqueArgs} args - Arguments to find a SystemLog
     * @example
     * // Get one SystemLog
     * const systemLog = await prisma.systemLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SystemLogFindUniqueArgs>(args: SelectSubset<T, SystemLogFindUniqueArgs<ExtArgs>>): Prisma__SystemLogClient<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SystemLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SystemLogFindUniqueOrThrowArgs} args - Arguments to find a SystemLog
     * @example
     * // Get one SystemLog
     * const systemLog = await prisma.systemLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SystemLogFindUniqueOrThrowArgs>(args: SelectSubset<T, SystemLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SystemLogClient<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SystemLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemLogFindFirstArgs} args - Arguments to find a SystemLog
     * @example
     * // Get one SystemLog
     * const systemLog = await prisma.systemLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SystemLogFindFirstArgs>(args?: SelectSubset<T, SystemLogFindFirstArgs<ExtArgs>>): Prisma__SystemLogClient<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SystemLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemLogFindFirstOrThrowArgs} args - Arguments to find a SystemLog
     * @example
     * // Get one SystemLog
     * const systemLog = await prisma.systemLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SystemLogFindFirstOrThrowArgs>(args?: SelectSubset<T, SystemLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__SystemLogClient<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SystemLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SystemLogs
     * const systemLogs = await prisma.systemLog.findMany()
     * 
     * // Get first 10 SystemLogs
     * const systemLogs = await prisma.systemLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const systemLogWithIdOnly = await prisma.systemLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SystemLogFindManyArgs>(args?: SelectSubset<T, SystemLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SystemLog.
     * @param {SystemLogCreateArgs} args - Arguments to create a SystemLog.
     * @example
     * // Create one SystemLog
     * const SystemLog = await prisma.systemLog.create({
     *   data: {
     *     // ... data to create a SystemLog
     *   }
     * })
     * 
     */
    create<T extends SystemLogCreateArgs>(args: SelectSubset<T, SystemLogCreateArgs<ExtArgs>>): Prisma__SystemLogClient<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SystemLogs.
     * @param {SystemLogCreateManyArgs} args - Arguments to create many SystemLogs.
     * @example
     * // Create many SystemLogs
     * const systemLog = await prisma.systemLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SystemLogCreateManyArgs>(args?: SelectSubset<T, SystemLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SystemLogs and returns the data saved in the database.
     * @param {SystemLogCreateManyAndReturnArgs} args - Arguments to create many SystemLogs.
     * @example
     * // Create many SystemLogs
     * const systemLog = await prisma.systemLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SystemLogs and only return the `id`
     * const systemLogWithIdOnly = await prisma.systemLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SystemLogCreateManyAndReturnArgs>(args?: SelectSubset<T, SystemLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SystemLog.
     * @param {SystemLogDeleteArgs} args - Arguments to delete one SystemLog.
     * @example
     * // Delete one SystemLog
     * const SystemLog = await prisma.systemLog.delete({
     *   where: {
     *     // ... filter to delete one SystemLog
     *   }
     * })
     * 
     */
    delete<T extends SystemLogDeleteArgs>(args: SelectSubset<T, SystemLogDeleteArgs<ExtArgs>>): Prisma__SystemLogClient<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SystemLog.
     * @param {SystemLogUpdateArgs} args - Arguments to update one SystemLog.
     * @example
     * // Update one SystemLog
     * const systemLog = await prisma.systemLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SystemLogUpdateArgs>(args: SelectSubset<T, SystemLogUpdateArgs<ExtArgs>>): Prisma__SystemLogClient<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SystemLogs.
     * @param {SystemLogDeleteManyArgs} args - Arguments to filter SystemLogs to delete.
     * @example
     * // Delete a few SystemLogs
     * const { count } = await prisma.systemLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SystemLogDeleteManyArgs>(args?: SelectSubset<T, SystemLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SystemLogs
     * const systemLog = await prisma.systemLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SystemLogUpdateManyArgs>(args: SelectSubset<T, SystemLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SystemLog.
     * @param {SystemLogUpsertArgs} args - Arguments to update or create a SystemLog.
     * @example
     * // Update or create a SystemLog
     * const systemLog = await prisma.systemLog.upsert({
     *   create: {
     *     // ... data to create a SystemLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SystemLog we want to update
     *   }
     * })
     */
    upsert<T extends SystemLogUpsertArgs>(args: SelectSubset<T, SystemLogUpsertArgs<ExtArgs>>): Prisma__SystemLogClient<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SystemLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemLogCountArgs} args - Arguments to filter SystemLogs to count.
     * @example
     * // Count the number of SystemLogs
     * const count = await prisma.systemLog.count({
     *   where: {
     *     // ... the filter for the SystemLogs we want to count
     *   }
     * })
    **/
    count<T extends SystemLogCountArgs>(
      args?: Subset<T, SystemLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SystemLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SystemLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SystemLogAggregateArgs>(args: Subset<T, SystemLogAggregateArgs>): Prisma.PrismaPromise<GetSystemLogAggregateType<T>>

    /**
     * Group by SystemLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SystemLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SystemLogGroupByArgs['orderBy'] }
        : { orderBy?: SystemLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SystemLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSystemLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SystemLog model
   */
  readonly fields: SystemLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SystemLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SystemLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends SystemLog$tenantArgs<ExtArgs> = {}>(args?: Subset<T, SystemLog$tenantArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SystemLog model
   */ 
  interface SystemLogFieldRefs {
    readonly id: FieldRef<"SystemLog", 'String'>
    readonly event: FieldRef<"SystemLog", 'String'>
    readonly details: FieldRef<"SystemLog", 'Json'>
    readonly createdAt: FieldRef<"SystemLog", 'DateTime'>
    readonly tenantId: FieldRef<"SystemLog", 'String'>
  }
    

  // Custom InputTypes
  /**
   * SystemLog findUnique
   */
  export type SystemLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SystemLogInclude<ExtArgs> | null
    /**
     * Filter, which SystemLog to fetch.
     */
    where: SystemLogWhereUniqueInput
  }

  /**
   * SystemLog findUniqueOrThrow
   */
  export type SystemLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SystemLogInclude<ExtArgs> | null
    /**
     * Filter, which SystemLog to fetch.
     */
    where: SystemLogWhereUniqueInput
  }

  /**
   * SystemLog findFirst
   */
  export type SystemLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SystemLogInclude<ExtArgs> | null
    /**
     * Filter, which SystemLog to fetch.
     */
    where?: SystemLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemLogs to fetch.
     */
    orderBy?: SystemLogOrderByWithRelationInput | SystemLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemLogs.
     */
    cursor?: SystemLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemLogs.
     */
    distinct?: SystemLogScalarFieldEnum | SystemLogScalarFieldEnum[]
  }

  /**
   * SystemLog findFirstOrThrow
   */
  export type SystemLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SystemLogInclude<ExtArgs> | null
    /**
     * Filter, which SystemLog to fetch.
     */
    where?: SystemLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemLogs to fetch.
     */
    orderBy?: SystemLogOrderByWithRelationInput | SystemLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemLogs.
     */
    cursor?: SystemLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemLogs.
     */
    distinct?: SystemLogScalarFieldEnum | SystemLogScalarFieldEnum[]
  }

  /**
   * SystemLog findMany
   */
  export type SystemLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SystemLogInclude<ExtArgs> | null
    /**
     * Filter, which SystemLogs to fetch.
     */
    where?: SystemLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemLogs to fetch.
     */
    orderBy?: SystemLogOrderByWithRelationInput | SystemLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SystemLogs.
     */
    cursor?: SystemLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemLogs.
     */
    skip?: number
    distinct?: SystemLogScalarFieldEnum | SystemLogScalarFieldEnum[]
  }

  /**
   * SystemLog create
   */
  export type SystemLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SystemLogInclude<ExtArgs> | null
    /**
     * The data needed to create a SystemLog.
     */
    data: XOR<SystemLogCreateInput, SystemLogUncheckedCreateInput>
  }

  /**
   * SystemLog createMany
   */
  export type SystemLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SystemLogs.
     */
    data: SystemLogCreateManyInput | SystemLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemLog createManyAndReturn
   */
  export type SystemLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SystemLogs.
     */
    data: SystemLogCreateManyInput | SystemLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SystemLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SystemLog update
   */
  export type SystemLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SystemLogInclude<ExtArgs> | null
    /**
     * The data needed to update a SystemLog.
     */
    data: XOR<SystemLogUpdateInput, SystemLogUncheckedUpdateInput>
    /**
     * Choose, which SystemLog to update.
     */
    where: SystemLogWhereUniqueInput
  }

  /**
   * SystemLog updateMany
   */
  export type SystemLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SystemLogs.
     */
    data: XOR<SystemLogUpdateManyMutationInput, SystemLogUncheckedUpdateManyInput>
    /**
     * Filter which SystemLogs to update
     */
    where?: SystemLogWhereInput
  }

  /**
   * SystemLog upsert
   */
  export type SystemLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SystemLogInclude<ExtArgs> | null
    /**
     * The filter to search for the SystemLog to update in case it exists.
     */
    where: SystemLogWhereUniqueInput
    /**
     * In case the SystemLog found by the `where` argument doesn't exist, create a new SystemLog with this data.
     */
    create: XOR<SystemLogCreateInput, SystemLogUncheckedCreateInput>
    /**
     * In case the SystemLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SystemLogUpdateInput, SystemLogUncheckedUpdateInput>
  }

  /**
   * SystemLog delete
   */
  export type SystemLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SystemLogInclude<ExtArgs> | null
    /**
     * Filter which SystemLog to delete.
     */
    where: SystemLogWhereUniqueInput
  }

  /**
   * SystemLog deleteMany
   */
  export type SystemLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemLogs to delete
     */
    where?: SystemLogWhereInput
  }

  /**
   * SystemLog.tenant
   */
  export type SystemLog$tenantArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    where?: TenantWhereInput
  }

  /**
   * SystemLog without action
   */
  export type SystemLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SystemLogInclude<ExtArgs> | null
  }


  /**
   * Model Passkey
   */

  export type AggregatePasskey = {
    _count: PasskeyCountAggregateOutputType | null
    _avg: PasskeyAvgAggregateOutputType | null
    _sum: PasskeySumAggregateOutputType | null
    _min: PasskeyMinAggregateOutputType | null
    _max: PasskeyMaxAggregateOutputType | null
  }

  export type PasskeyAvgAggregateOutputType = {
    counter: number | null
  }

  export type PasskeySumAggregateOutputType = {
    counter: number | null
  }

  export type PasskeyMinAggregateOutputType = {
    id: string | null
    name: string | null
    publicKey: string | null
    userId: string | null
    credentialID: string | null
    counter: number | null
    deviceType: string | null
    backedUp: boolean | null
    transports: string | null
    aaguid: string | null
    createdAt: Date | null
  }

  export type PasskeyMaxAggregateOutputType = {
    id: string | null
    name: string | null
    publicKey: string | null
    userId: string | null
    credentialID: string | null
    counter: number | null
    deviceType: string | null
    backedUp: boolean | null
    transports: string | null
    aaguid: string | null
    createdAt: Date | null
  }

  export type PasskeyCountAggregateOutputType = {
    id: number
    name: number
    publicKey: number
    userId: number
    credentialID: number
    counter: number
    deviceType: number
    backedUp: number
    transports: number
    aaguid: number
    createdAt: number
    _all: number
  }


  export type PasskeyAvgAggregateInputType = {
    counter?: true
  }

  export type PasskeySumAggregateInputType = {
    counter?: true
  }

  export type PasskeyMinAggregateInputType = {
    id?: true
    name?: true
    publicKey?: true
    userId?: true
    credentialID?: true
    counter?: true
    deviceType?: true
    backedUp?: true
    transports?: true
    aaguid?: true
    createdAt?: true
  }

  export type PasskeyMaxAggregateInputType = {
    id?: true
    name?: true
    publicKey?: true
    userId?: true
    credentialID?: true
    counter?: true
    deviceType?: true
    backedUp?: true
    transports?: true
    aaguid?: true
    createdAt?: true
  }

  export type PasskeyCountAggregateInputType = {
    id?: true
    name?: true
    publicKey?: true
    userId?: true
    credentialID?: true
    counter?: true
    deviceType?: true
    backedUp?: true
    transports?: true
    aaguid?: true
    createdAt?: true
    _all?: true
  }

  export type PasskeyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Passkey to aggregate.
     */
    where?: PasskeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Passkeys to fetch.
     */
    orderBy?: PasskeyOrderByWithRelationInput | PasskeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PasskeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Passkeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Passkeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Passkeys
    **/
    _count?: true | PasskeyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PasskeyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PasskeySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PasskeyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PasskeyMaxAggregateInputType
  }

  export type GetPasskeyAggregateType<T extends PasskeyAggregateArgs> = {
        [P in keyof T & keyof AggregatePasskey]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePasskey[P]>
      : GetScalarType<T[P], AggregatePasskey[P]>
  }




  export type PasskeyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasskeyWhereInput
    orderBy?: PasskeyOrderByWithAggregationInput | PasskeyOrderByWithAggregationInput[]
    by: PasskeyScalarFieldEnum[] | PasskeyScalarFieldEnum
    having?: PasskeyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PasskeyCountAggregateInputType | true
    _avg?: PasskeyAvgAggregateInputType
    _sum?: PasskeySumAggregateInputType
    _min?: PasskeyMinAggregateInputType
    _max?: PasskeyMaxAggregateInputType
  }

  export type PasskeyGroupByOutputType = {
    id: string
    name: string | null
    publicKey: string
    userId: string
    credentialID: string
    counter: number
    deviceType: string
    backedUp: boolean
    transports: string | null
    aaguid: string | null
    createdAt: Date | null
    _count: PasskeyCountAggregateOutputType | null
    _avg: PasskeyAvgAggregateOutputType | null
    _sum: PasskeySumAggregateOutputType | null
    _min: PasskeyMinAggregateOutputType | null
    _max: PasskeyMaxAggregateOutputType | null
  }

  type GetPasskeyGroupByPayload<T extends PasskeyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PasskeyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PasskeyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PasskeyGroupByOutputType[P]>
            : GetScalarType<T[P], PasskeyGroupByOutputType[P]>
        }
      >
    >


  export type PasskeySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    publicKey?: boolean
    userId?: boolean
    credentialID?: boolean
    counter?: boolean
    deviceType?: boolean
    backedUp?: boolean
    transports?: boolean
    aaguid?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passkey"]>

  export type PasskeySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    publicKey?: boolean
    userId?: boolean
    credentialID?: boolean
    counter?: boolean
    deviceType?: boolean
    backedUp?: boolean
    transports?: boolean
    aaguid?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passkey"]>

  export type PasskeySelectScalar = {
    id?: boolean
    name?: boolean
    publicKey?: boolean
    userId?: boolean
    credentialID?: boolean
    counter?: boolean
    deviceType?: boolean
    backedUp?: boolean
    transports?: boolean
    aaguid?: boolean
    createdAt?: boolean
  }

  export type PasskeyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PasskeyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PasskeyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Passkey"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      publicKey: string
      userId: string
      credentialID: string
      counter: number
      deviceType: string
      backedUp: boolean
      transports: string | null
      aaguid: string | null
      createdAt: Date | null
    }, ExtArgs["result"]["passkey"]>
    composites: {}
  }

  type PasskeyGetPayload<S extends boolean | null | undefined | PasskeyDefaultArgs> = $Result.GetResult<Prisma.$PasskeyPayload, S>

  type PasskeyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PasskeyFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PasskeyCountAggregateInputType | true
    }

  export interface PasskeyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Passkey'], meta: { name: 'Passkey' } }
    /**
     * Find zero or one Passkey that matches the filter.
     * @param {PasskeyFindUniqueArgs} args - Arguments to find a Passkey
     * @example
     * // Get one Passkey
     * const passkey = await prisma.passkey.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PasskeyFindUniqueArgs>(args: SelectSubset<T, PasskeyFindUniqueArgs<ExtArgs>>): Prisma__PasskeyClient<$Result.GetResult<Prisma.$PasskeyPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Passkey that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PasskeyFindUniqueOrThrowArgs} args - Arguments to find a Passkey
     * @example
     * // Get one Passkey
     * const passkey = await prisma.passkey.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PasskeyFindUniqueOrThrowArgs>(args: SelectSubset<T, PasskeyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PasskeyClient<$Result.GetResult<Prisma.$PasskeyPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Passkey that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasskeyFindFirstArgs} args - Arguments to find a Passkey
     * @example
     * // Get one Passkey
     * const passkey = await prisma.passkey.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PasskeyFindFirstArgs>(args?: SelectSubset<T, PasskeyFindFirstArgs<ExtArgs>>): Prisma__PasskeyClient<$Result.GetResult<Prisma.$PasskeyPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Passkey that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasskeyFindFirstOrThrowArgs} args - Arguments to find a Passkey
     * @example
     * // Get one Passkey
     * const passkey = await prisma.passkey.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PasskeyFindFirstOrThrowArgs>(args?: SelectSubset<T, PasskeyFindFirstOrThrowArgs<ExtArgs>>): Prisma__PasskeyClient<$Result.GetResult<Prisma.$PasskeyPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Passkeys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasskeyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Passkeys
     * const passkeys = await prisma.passkey.findMany()
     * 
     * // Get first 10 Passkeys
     * const passkeys = await prisma.passkey.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const passkeyWithIdOnly = await prisma.passkey.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PasskeyFindManyArgs>(args?: SelectSubset<T, PasskeyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasskeyPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Passkey.
     * @param {PasskeyCreateArgs} args - Arguments to create a Passkey.
     * @example
     * // Create one Passkey
     * const Passkey = await prisma.passkey.create({
     *   data: {
     *     // ... data to create a Passkey
     *   }
     * })
     * 
     */
    create<T extends PasskeyCreateArgs>(args: SelectSubset<T, PasskeyCreateArgs<ExtArgs>>): Prisma__PasskeyClient<$Result.GetResult<Prisma.$PasskeyPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Passkeys.
     * @param {PasskeyCreateManyArgs} args - Arguments to create many Passkeys.
     * @example
     * // Create many Passkeys
     * const passkey = await prisma.passkey.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PasskeyCreateManyArgs>(args?: SelectSubset<T, PasskeyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Passkeys and returns the data saved in the database.
     * @param {PasskeyCreateManyAndReturnArgs} args - Arguments to create many Passkeys.
     * @example
     * // Create many Passkeys
     * const passkey = await prisma.passkey.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Passkeys and only return the `id`
     * const passkeyWithIdOnly = await prisma.passkey.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PasskeyCreateManyAndReturnArgs>(args?: SelectSubset<T, PasskeyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasskeyPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Passkey.
     * @param {PasskeyDeleteArgs} args - Arguments to delete one Passkey.
     * @example
     * // Delete one Passkey
     * const Passkey = await prisma.passkey.delete({
     *   where: {
     *     // ... filter to delete one Passkey
     *   }
     * })
     * 
     */
    delete<T extends PasskeyDeleteArgs>(args: SelectSubset<T, PasskeyDeleteArgs<ExtArgs>>): Prisma__PasskeyClient<$Result.GetResult<Prisma.$PasskeyPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Passkey.
     * @param {PasskeyUpdateArgs} args - Arguments to update one Passkey.
     * @example
     * // Update one Passkey
     * const passkey = await prisma.passkey.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PasskeyUpdateArgs>(args: SelectSubset<T, PasskeyUpdateArgs<ExtArgs>>): Prisma__PasskeyClient<$Result.GetResult<Prisma.$PasskeyPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Passkeys.
     * @param {PasskeyDeleteManyArgs} args - Arguments to filter Passkeys to delete.
     * @example
     * // Delete a few Passkeys
     * const { count } = await prisma.passkey.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PasskeyDeleteManyArgs>(args?: SelectSubset<T, PasskeyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Passkeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasskeyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Passkeys
     * const passkey = await prisma.passkey.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PasskeyUpdateManyArgs>(args: SelectSubset<T, PasskeyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Passkey.
     * @param {PasskeyUpsertArgs} args - Arguments to update or create a Passkey.
     * @example
     * // Update or create a Passkey
     * const passkey = await prisma.passkey.upsert({
     *   create: {
     *     // ... data to create a Passkey
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Passkey we want to update
     *   }
     * })
     */
    upsert<T extends PasskeyUpsertArgs>(args: SelectSubset<T, PasskeyUpsertArgs<ExtArgs>>): Prisma__PasskeyClient<$Result.GetResult<Prisma.$PasskeyPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Passkeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasskeyCountArgs} args - Arguments to filter Passkeys to count.
     * @example
     * // Count the number of Passkeys
     * const count = await prisma.passkey.count({
     *   where: {
     *     // ... the filter for the Passkeys we want to count
     *   }
     * })
    **/
    count<T extends PasskeyCountArgs>(
      args?: Subset<T, PasskeyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PasskeyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Passkey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasskeyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PasskeyAggregateArgs>(args: Subset<T, PasskeyAggregateArgs>): Prisma.PrismaPromise<GetPasskeyAggregateType<T>>

    /**
     * Group by Passkey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasskeyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PasskeyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PasskeyGroupByArgs['orderBy'] }
        : { orderBy?: PasskeyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PasskeyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPasskeyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Passkey model
   */
  readonly fields: PasskeyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Passkey.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PasskeyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Passkey model
   */ 
  interface PasskeyFieldRefs {
    readonly id: FieldRef<"Passkey", 'String'>
    readonly name: FieldRef<"Passkey", 'String'>
    readonly publicKey: FieldRef<"Passkey", 'String'>
    readonly userId: FieldRef<"Passkey", 'String'>
    readonly credentialID: FieldRef<"Passkey", 'String'>
    readonly counter: FieldRef<"Passkey", 'Int'>
    readonly deviceType: FieldRef<"Passkey", 'String'>
    readonly backedUp: FieldRef<"Passkey", 'Boolean'>
    readonly transports: FieldRef<"Passkey", 'String'>
    readonly aaguid: FieldRef<"Passkey", 'String'>
    readonly createdAt: FieldRef<"Passkey", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Passkey findUnique
   */
  export type PasskeyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passkey
     */
    select?: PasskeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasskeyInclude<ExtArgs> | null
    /**
     * Filter, which Passkey to fetch.
     */
    where: PasskeyWhereUniqueInput
  }

  /**
   * Passkey findUniqueOrThrow
   */
  export type PasskeyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passkey
     */
    select?: PasskeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasskeyInclude<ExtArgs> | null
    /**
     * Filter, which Passkey to fetch.
     */
    where: PasskeyWhereUniqueInput
  }

  /**
   * Passkey findFirst
   */
  export type PasskeyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passkey
     */
    select?: PasskeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasskeyInclude<ExtArgs> | null
    /**
     * Filter, which Passkey to fetch.
     */
    where?: PasskeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Passkeys to fetch.
     */
    orderBy?: PasskeyOrderByWithRelationInput | PasskeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Passkeys.
     */
    cursor?: PasskeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Passkeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Passkeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Passkeys.
     */
    distinct?: PasskeyScalarFieldEnum | PasskeyScalarFieldEnum[]
  }

  /**
   * Passkey findFirstOrThrow
   */
  export type PasskeyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passkey
     */
    select?: PasskeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasskeyInclude<ExtArgs> | null
    /**
     * Filter, which Passkey to fetch.
     */
    where?: PasskeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Passkeys to fetch.
     */
    orderBy?: PasskeyOrderByWithRelationInput | PasskeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Passkeys.
     */
    cursor?: PasskeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Passkeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Passkeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Passkeys.
     */
    distinct?: PasskeyScalarFieldEnum | PasskeyScalarFieldEnum[]
  }

  /**
   * Passkey findMany
   */
  export type PasskeyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passkey
     */
    select?: PasskeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasskeyInclude<ExtArgs> | null
    /**
     * Filter, which Passkeys to fetch.
     */
    where?: PasskeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Passkeys to fetch.
     */
    orderBy?: PasskeyOrderByWithRelationInput | PasskeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Passkeys.
     */
    cursor?: PasskeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Passkeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Passkeys.
     */
    skip?: number
    distinct?: PasskeyScalarFieldEnum | PasskeyScalarFieldEnum[]
  }

  /**
   * Passkey create
   */
  export type PasskeyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passkey
     */
    select?: PasskeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasskeyInclude<ExtArgs> | null
    /**
     * The data needed to create a Passkey.
     */
    data: XOR<PasskeyCreateInput, PasskeyUncheckedCreateInput>
  }

  /**
   * Passkey createMany
   */
  export type PasskeyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Passkeys.
     */
    data: PasskeyCreateManyInput | PasskeyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Passkey createManyAndReturn
   */
  export type PasskeyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passkey
     */
    select?: PasskeySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Passkeys.
     */
    data: PasskeyCreateManyInput | PasskeyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasskeyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Passkey update
   */
  export type PasskeyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passkey
     */
    select?: PasskeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasskeyInclude<ExtArgs> | null
    /**
     * The data needed to update a Passkey.
     */
    data: XOR<PasskeyUpdateInput, PasskeyUncheckedUpdateInput>
    /**
     * Choose, which Passkey to update.
     */
    where: PasskeyWhereUniqueInput
  }

  /**
   * Passkey updateMany
   */
  export type PasskeyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Passkeys.
     */
    data: XOR<PasskeyUpdateManyMutationInput, PasskeyUncheckedUpdateManyInput>
    /**
     * Filter which Passkeys to update
     */
    where?: PasskeyWhereInput
  }

  /**
   * Passkey upsert
   */
  export type PasskeyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passkey
     */
    select?: PasskeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasskeyInclude<ExtArgs> | null
    /**
     * The filter to search for the Passkey to update in case it exists.
     */
    where: PasskeyWhereUniqueInput
    /**
     * In case the Passkey found by the `where` argument doesn't exist, create a new Passkey with this data.
     */
    create: XOR<PasskeyCreateInput, PasskeyUncheckedCreateInput>
    /**
     * In case the Passkey was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PasskeyUpdateInput, PasskeyUncheckedUpdateInput>
  }

  /**
   * Passkey delete
   */
  export type PasskeyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passkey
     */
    select?: PasskeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasskeyInclude<ExtArgs> | null
    /**
     * Filter which Passkey to delete.
     */
    where: PasskeyWhereUniqueInput
  }

  /**
   * Passkey deleteMany
   */
  export type PasskeyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Passkeys to delete
     */
    where?: PasskeyWhereInput
  }

  /**
   * Passkey without action
   */
  export type PasskeyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passkey
     */
    select?: PasskeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasskeyInclude<ExtArgs> | null
  }


  /**
   * Model Feedback
   */

  export type AggregateFeedback = {
    _count: FeedbackCountAggregateOutputType | null
    _avg: FeedbackAvgAggregateOutputType | null
    _sum: FeedbackSumAggregateOutputType | null
    _min: FeedbackMinAggregateOutputType | null
    _max: FeedbackMaxAggregateOutputType | null
  }

  export type FeedbackAvgAggregateOutputType = {
    score: number | null
  }

  export type FeedbackSumAggregateOutputType = {
    score: number | null
  }

  export type FeedbackMinAggregateOutputType = {
    id: string | null
    score: number | null
    comment: string | null
    userId: string | null
    tenantId: string | null
    createdAt: Date | null
  }

  export type FeedbackMaxAggregateOutputType = {
    id: string | null
    score: number | null
    comment: string | null
    userId: string | null
    tenantId: string | null
    createdAt: Date | null
  }

  export type FeedbackCountAggregateOutputType = {
    id: number
    score: number
    comment: number
    userId: number
    tenantId: number
    createdAt: number
    _all: number
  }


  export type FeedbackAvgAggregateInputType = {
    score?: true
  }

  export type FeedbackSumAggregateInputType = {
    score?: true
  }

  export type FeedbackMinAggregateInputType = {
    id?: true
    score?: true
    comment?: true
    userId?: true
    tenantId?: true
    createdAt?: true
  }

  export type FeedbackMaxAggregateInputType = {
    id?: true
    score?: true
    comment?: true
    userId?: true
    tenantId?: true
    createdAt?: true
  }

  export type FeedbackCountAggregateInputType = {
    id?: true
    score?: true
    comment?: true
    userId?: true
    tenantId?: true
    createdAt?: true
    _all?: true
  }

  export type FeedbackAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Feedback to aggregate.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Feedbacks
    **/
    _count?: true | FeedbackCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FeedbackAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FeedbackSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FeedbackMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FeedbackMaxAggregateInputType
  }

  export type GetFeedbackAggregateType<T extends FeedbackAggregateArgs> = {
        [P in keyof T & keyof AggregateFeedback]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFeedback[P]>
      : GetScalarType<T[P], AggregateFeedback[P]>
  }




  export type FeedbackGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedbackWhereInput
    orderBy?: FeedbackOrderByWithAggregationInput | FeedbackOrderByWithAggregationInput[]
    by: FeedbackScalarFieldEnum[] | FeedbackScalarFieldEnum
    having?: FeedbackScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FeedbackCountAggregateInputType | true
    _avg?: FeedbackAvgAggregateInputType
    _sum?: FeedbackSumAggregateInputType
    _min?: FeedbackMinAggregateInputType
    _max?: FeedbackMaxAggregateInputType
  }

  export type FeedbackGroupByOutputType = {
    id: string
    score: number
    comment: string | null
    userId: string
    tenantId: string
    createdAt: Date
    _count: FeedbackCountAggregateOutputType | null
    _avg: FeedbackAvgAggregateOutputType | null
    _sum: FeedbackSumAggregateOutputType | null
    _min: FeedbackMinAggregateOutputType | null
    _max: FeedbackMaxAggregateOutputType | null
  }

  type GetFeedbackGroupByPayload<T extends FeedbackGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FeedbackGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FeedbackGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FeedbackGroupByOutputType[P]>
            : GetScalarType<T[P], FeedbackGroupByOutputType[P]>
        }
      >
    >


  export type FeedbackSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    score?: boolean
    comment?: boolean
    userId?: boolean
    tenantId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["feedback"]>

  export type FeedbackSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    score?: boolean
    comment?: boolean
    userId?: boolean
    tenantId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["feedback"]>

  export type FeedbackSelectScalar = {
    id?: boolean
    score?: boolean
    comment?: boolean
    userId?: boolean
    tenantId?: boolean
    createdAt?: boolean
  }

  export type FeedbackInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type FeedbackIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $FeedbackPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Feedback"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      tenant: Prisma.$TenantPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      score: number
      comment: string | null
      userId: string
      tenantId: string
      createdAt: Date
    }, ExtArgs["result"]["feedback"]>
    composites: {}
  }

  type FeedbackGetPayload<S extends boolean | null | undefined | FeedbackDefaultArgs> = $Result.GetResult<Prisma.$FeedbackPayload, S>

  type FeedbackCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FeedbackFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FeedbackCountAggregateInputType | true
    }

  export interface FeedbackDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Feedback'], meta: { name: 'Feedback' } }
    /**
     * Find zero or one Feedback that matches the filter.
     * @param {FeedbackFindUniqueArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FeedbackFindUniqueArgs>(args: SelectSubset<T, FeedbackFindUniqueArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Feedback that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FeedbackFindUniqueOrThrowArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FeedbackFindUniqueOrThrowArgs>(args: SelectSubset<T, FeedbackFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Feedback that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackFindFirstArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FeedbackFindFirstArgs>(args?: SelectSubset<T, FeedbackFindFirstArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Feedback that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackFindFirstOrThrowArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FeedbackFindFirstOrThrowArgs>(args?: SelectSubset<T, FeedbackFindFirstOrThrowArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Feedbacks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Feedbacks
     * const feedbacks = await prisma.feedback.findMany()
     * 
     * // Get first 10 Feedbacks
     * const feedbacks = await prisma.feedback.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const feedbackWithIdOnly = await prisma.feedback.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FeedbackFindManyArgs>(args?: SelectSubset<T, FeedbackFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Feedback.
     * @param {FeedbackCreateArgs} args - Arguments to create a Feedback.
     * @example
     * // Create one Feedback
     * const Feedback = await prisma.feedback.create({
     *   data: {
     *     // ... data to create a Feedback
     *   }
     * })
     * 
     */
    create<T extends FeedbackCreateArgs>(args: SelectSubset<T, FeedbackCreateArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Feedbacks.
     * @param {FeedbackCreateManyArgs} args - Arguments to create many Feedbacks.
     * @example
     * // Create many Feedbacks
     * const feedback = await prisma.feedback.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FeedbackCreateManyArgs>(args?: SelectSubset<T, FeedbackCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Feedbacks and returns the data saved in the database.
     * @param {FeedbackCreateManyAndReturnArgs} args - Arguments to create many Feedbacks.
     * @example
     * // Create many Feedbacks
     * const feedback = await prisma.feedback.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Feedbacks and only return the `id`
     * const feedbackWithIdOnly = await prisma.feedback.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FeedbackCreateManyAndReturnArgs>(args?: SelectSubset<T, FeedbackCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Feedback.
     * @param {FeedbackDeleteArgs} args - Arguments to delete one Feedback.
     * @example
     * // Delete one Feedback
     * const Feedback = await prisma.feedback.delete({
     *   where: {
     *     // ... filter to delete one Feedback
     *   }
     * })
     * 
     */
    delete<T extends FeedbackDeleteArgs>(args: SelectSubset<T, FeedbackDeleteArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Feedback.
     * @param {FeedbackUpdateArgs} args - Arguments to update one Feedback.
     * @example
     * // Update one Feedback
     * const feedback = await prisma.feedback.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FeedbackUpdateArgs>(args: SelectSubset<T, FeedbackUpdateArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Feedbacks.
     * @param {FeedbackDeleteManyArgs} args - Arguments to filter Feedbacks to delete.
     * @example
     * // Delete a few Feedbacks
     * const { count } = await prisma.feedback.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FeedbackDeleteManyArgs>(args?: SelectSubset<T, FeedbackDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Feedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Feedbacks
     * const feedback = await prisma.feedback.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FeedbackUpdateManyArgs>(args: SelectSubset<T, FeedbackUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Feedback.
     * @param {FeedbackUpsertArgs} args - Arguments to update or create a Feedback.
     * @example
     * // Update or create a Feedback
     * const feedback = await prisma.feedback.upsert({
     *   create: {
     *     // ... data to create a Feedback
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Feedback we want to update
     *   }
     * })
     */
    upsert<T extends FeedbackUpsertArgs>(args: SelectSubset<T, FeedbackUpsertArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Feedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackCountArgs} args - Arguments to filter Feedbacks to count.
     * @example
     * // Count the number of Feedbacks
     * const count = await prisma.feedback.count({
     *   where: {
     *     // ... the filter for the Feedbacks we want to count
     *   }
     * })
    **/
    count<T extends FeedbackCountArgs>(
      args?: Subset<T, FeedbackCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FeedbackCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Feedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FeedbackAggregateArgs>(args: Subset<T, FeedbackAggregateArgs>): Prisma.PrismaPromise<GetFeedbackAggregateType<T>>

    /**
     * Group by Feedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FeedbackGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FeedbackGroupByArgs['orderBy'] }
        : { orderBy?: FeedbackGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FeedbackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFeedbackGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Feedback model
   */
  readonly fields: FeedbackFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Feedback.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FeedbackClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Feedback model
   */ 
  interface FeedbackFieldRefs {
    readonly id: FieldRef<"Feedback", 'String'>
    readonly score: FieldRef<"Feedback", 'Int'>
    readonly comment: FieldRef<"Feedback", 'String'>
    readonly userId: FieldRef<"Feedback", 'String'>
    readonly tenantId: FieldRef<"Feedback", 'String'>
    readonly createdAt: FieldRef<"Feedback", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Feedback findUnique
   */
  export type FeedbackFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback findUniqueOrThrow
   */
  export type FeedbackFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback findFirst
   */
  export type FeedbackFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Feedbacks.
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Feedbacks.
     */
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Feedback findFirstOrThrow
   */
  export type FeedbackFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Feedbacks.
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Feedbacks.
     */
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Feedback findMany
   */
  export type FeedbackFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedbacks to fetch.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Feedbacks.
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Feedback create
   */
  export type FeedbackCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * The data needed to create a Feedback.
     */
    data: XOR<FeedbackCreateInput, FeedbackUncheckedCreateInput>
  }

  /**
   * Feedback createMany
   */
  export type FeedbackCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Feedbacks.
     */
    data: FeedbackCreateManyInput | FeedbackCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Feedback createManyAndReturn
   */
  export type FeedbackCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Feedbacks.
     */
    data: FeedbackCreateManyInput | FeedbackCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Feedback update
   */
  export type FeedbackUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * The data needed to update a Feedback.
     */
    data: XOR<FeedbackUpdateInput, FeedbackUncheckedUpdateInput>
    /**
     * Choose, which Feedback to update.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback updateMany
   */
  export type FeedbackUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Feedbacks.
     */
    data: XOR<FeedbackUpdateManyMutationInput, FeedbackUncheckedUpdateManyInput>
    /**
     * Filter which Feedbacks to update
     */
    where?: FeedbackWhereInput
  }

  /**
   * Feedback upsert
   */
  export type FeedbackUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * The filter to search for the Feedback to update in case it exists.
     */
    where: FeedbackWhereUniqueInput
    /**
     * In case the Feedback found by the `where` argument doesn't exist, create a new Feedback with this data.
     */
    create: XOR<FeedbackCreateInput, FeedbackUncheckedCreateInput>
    /**
     * In case the Feedback was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FeedbackUpdateInput, FeedbackUncheckedUpdateInput>
  }

  /**
   * Feedback delete
   */
  export type FeedbackDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter which Feedback to delete.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback deleteMany
   */
  export type FeedbackDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Feedbacks to delete
     */
    where?: FeedbackWhereInput
  }

  /**
   * Feedback without action
   */
  export type FeedbackDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
  }


  /**
   * Model BiometricToken
   */

  export type AggregateBiometricToken = {
    _count: BiometricTokenCountAggregateOutputType | null
    _min: BiometricTokenMinAggregateOutputType | null
    _max: BiometricTokenMaxAggregateOutputType | null
  }

  export type BiometricTokenMinAggregateOutputType = {
    id: string | null
    token: string | null
    userId: string | null
    deviceId: string | null
    createdAt: Date | null
    expiresAt: Date | null
  }

  export type BiometricTokenMaxAggregateOutputType = {
    id: string | null
    token: string | null
    userId: string | null
    deviceId: string | null
    createdAt: Date | null
    expiresAt: Date | null
  }

  export type BiometricTokenCountAggregateOutputType = {
    id: number
    token: number
    userId: number
    deviceId: number
    createdAt: number
    expiresAt: number
    _all: number
  }


  export type BiometricTokenMinAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    deviceId?: true
    createdAt?: true
    expiresAt?: true
  }

  export type BiometricTokenMaxAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    deviceId?: true
    createdAt?: true
    expiresAt?: true
  }

  export type BiometricTokenCountAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    deviceId?: true
    createdAt?: true
    expiresAt?: true
    _all?: true
  }

  export type BiometricTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BiometricToken to aggregate.
     */
    where?: BiometricTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BiometricTokens to fetch.
     */
    orderBy?: BiometricTokenOrderByWithRelationInput | BiometricTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BiometricTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BiometricTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BiometricTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BiometricTokens
    **/
    _count?: true | BiometricTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BiometricTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BiometricTokenMaxAggregateInputType
  }

  export type GetBiometricTokenAggregateType<T extends BiometricTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateBiometricToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBiometricToken[P]>
      : GetScalarType<T[P], AggregateBiometricToken[P]>
  }




  export type BiometricTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BiometricTokenWhereInput
    orderBy?: BiometricTokenOrderByWithAggregationInput | BiometricTokenOrderByWithAggregationInput[]
    by: BiometricTokenScalarFieldEnum[] | BiometricTokenScalarFieldEnum
    having?: BiometricTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BiometricTokenCountAggregateInputType | true
    _min?: BiometricTokenMinAggregateInputType
    _max?: BiometricTokenMaxAggregateInputType
  }

  export type BiometricTokenGroupByOutputType = {
    id: string
    token: string
    userId: string
    deviceId: string
    createdAt: Date
    expiresAt: Date | null
    _count: BiometricTokenCountAggregateOutputType | null
    _min: BiometricTokenMinAggregateOutputType | null
    _max: BiometricTokenMaxAggregateOutputType | null
  }

  type GetBiometricTokenGroupByPayload<T extends BiometricTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BiometricTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BiometricTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BiometricTokenGroupByOutputType[P]>
            : GetScalarType<T[P], BiometricTokenGroupByOutputType[P]>
        }
      >
    >


  export type BiometricTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    userId?: boolean
    deviceId?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["biometricToken"]>

  export type BiometricTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    userId?: boolean
    deviceId?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["biometricToken"]>

  export type BiometricTokenSelectScalar = {
    id?: boolean
    token?: boolean
    userId?: boolean
    deviceId?: boolean
    createdAt?: boolean
    expiresAt?: boolean
  }

  export type BiometricTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BiometricTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $BiometricTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BiometricToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      token: string
      userId: string
      deviceId: string
      createdAt: Date
      expiresAt: Date | null
    }, ExtArgs["result"]["biometricToken"]>
    composites: {}
  }

  type BiometricTokenGetPayload<S extends boolean | null | undefined | BiometricTokenDefaultArgs> = $Result.GetResult<Prisma.$BiometricTokenPayload, S>

  type BiometricTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BiometricTokenFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BiometricTokenCountAggregateInputType | true
    }

  export interface BiometricTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BiometricToken'], meta: { name: 'BiometricToken' } }
    /**
     * Find zero or one BiometricToken that matches the filter.
     * @param {BiometricTokenFindUniqueArgs} args - Arguments to find a BiometricToken
     * @example
     * // Get one BiometricToken
     * const biometricToken = await prisma.biometricToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BiometricTokenFindUniqueArgs>(args: SelectSubset<T, BiometricTokenFindUniqueArgs<ExtArgs>>): Prisma__BiometricTokenClient<$Result.GetResult<Prisma.$BiometricTokenPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one BiometricToken that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BiometricTokenFindUniqueOrThrowArgs} args - Arguments to find a BiometricToken
     * @example
     * // Get one BiometricToken
     * const biometricToken = await prisma.biometricToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BiometricTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, BiometricTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BiometricTokenClient<$Result.GetResult<Prisma.$BiometricTokenPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first BiometricToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BiometricTokenFindFirstArgs} args - Arguments to find a BiometricToken
     * @example
     * // Get one BiometricToken
     * const biometricToken = await prisma.biometricToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BiometricTokenFindFirstArgs>(args?: SelectSubset<T, BiometricTokenFindFirstArgs<ExtArgs>>): Prisma__BiometricTokenClient<$Result.GetResult<Prisma.$BiometricTokenPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first BiometricToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BiometricTokenFindFirstOrThrowArgs} args - Arguments to find a BiometricToken
     * @example
     * // Get one BiometricToken
     * const biometricToken = await prisma.biometricToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BiometricTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, BiometricTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__BiometricTokenClient<$Result.GetResult<Prisma.$BiometricTokenPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more BiometricTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BiometricTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BiometricTokens
     * const biometricTokens = await prisma.biometricToken.findMany()
     * 
     * // Get first 10 BiometricTokens
     * const biometricTokens = await prisma.biometricToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const biometricTokenWithIdOnly = await prisma.biometricToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BiometricTokenFindManyArgs>(args?: SelectSubset<T, BiometricTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BiometricTokenPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a BiometricToken.
     * @param {BiometricTokenCreateArgs} args - Arguments to create a BiometricToken.
     * @example
     * // Create one BiometricToken
     * const BiometricToken = await prisma.biometricToken.create({
     *   data: {
     *     // ... data to create a BiometricToken
     *   }
     * })
     * 
     */
    create<T extends BiometricTokenCreateArgs>(args: SelectSubset<T, BiometricTokenCreateArgs<ExtArgs>>): Prisma__BiometricTokenClient<$Result.GetResult<Prisma.$BiometricTokenPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many BiometricTokens.
     * @param {BiometricTokenCreateManyArgs} args - Arguments to create many BiometricTokens.
     * @example
     * // Create many BiometricTokens
     * const biometricToken = await prisma.biometricToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BiometricTokenCreateManyArgs>(args?: SelectSubset<T, BiometricTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BiometricTokens and returns the data saved in the database.
     * @param {BiometricTokenCreateManyAndReturnArgs} args - Arguments to create many BiometricTokens.
     * @example
     * // Create many BiometricTokens
     * const biometricToken = await prisma.biometricToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BiometricTokens and only return the `id`
     * const biometricTokenWithIdOnly = await prisma.biometricToken.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BiometricTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, BiometricTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BiometricTokenPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a BiometricToken.
     * @param {BiometricTokenDeleteArgs} args - Arguments to delete one BiometricToken.
     * @example
     * // Delete one BiometricToken
     * const BiometricToken = await prisma.biometricToken.delete({
     *   where: {
     *     // ... filter to delete one BiometricToken
     *   }
     * })
     * 
     */
    delete<T extends BiometricTokenDeleteArgs>(args: SelectSubset<T, BiometricTokenDeleteArgs<ExtArgs>>): Prisma__BiometricTokenClient<$Result.GetResult<Prisma.$BiometricTokenPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one BiometricToken.
     * @param {BiometricTokenUpdateArgs} args - Arguments to update one BiometricToken.
     * @example
     * // Update one BiometricToken
     * const biometricToken = await prisma.biometricToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BiometricTokenUpdateArgs>(args: SelectSubset<T, BiometricTokenUpdateArgs<ExtArgs>>): Prisma__BiometricTokenClient<$Result.GetResult<Prisma.$BiometricTokenPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more BiometricTokens.
     * @param {BiometricTokenDeleteManyArgs} args - Arguments to filter BiometricTokens to delete.
     * @example
     * // Delete a few BiometricTokens
     * const { count } = await prisma.biometricToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BiometricTokenDeleteManyArgs>(args?: SelectSubset<T, BiometricTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BiometricTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BiometricTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BiometricTokens
     * const biometricToken = await prisma.biometricToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BiometricTokenUpdateManyArgs>(args: SelectSubset<T, BiometricTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BiometricToken.
     * @param {BiometricTokenUpsertArgs} args - Arguments to update or create a BiometricToken.
     * @example
     * // Update or create a BiometricToken
     * const biometricToken = await prisma.biometricToken.upsert({
     *   create: {
     *     // ... data to create a BiometricToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BiometricToken we want to update
     *   }
     * })
     */
    upsert<T extends BiometricTokenUpsertArgs>(args: SelectSubset<T, BiometricTokenUpsertArgs<ExtArgs>>): Prisma__BiometricTokenClient<$Result.GetResult<Prisma.$BiometricTokenPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of BiometricTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BiometricTokenCountArgs} args - Arguments to filter BiometricTokens to count.
     * @example
     * // Count the number of BiometricTokens
     * const count = await prisma.biometricToken.count({
     *   where: {
     *     // ... the filter for the BiometricTokens we want to count
     *   }
     * })
    **/
    count<T extends BiometricTokenCountArgs>(
      args?: Subset<T, BiometricTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BiometricTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BiometricToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BiometricTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BiometricTokenAggregateArgs>(args: Subset<T, BiometricTokenAggregateArgs>): Prisma.PrismaPromise<GetBiometricTokenAggregateType<T>>

    /**
     * Group by BiometricToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BiometricTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BiometricTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BiometricTokenGroupByArgs['orderBy'] }
        : { orderBy?: BiometricTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BiometricTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBiometricTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BiometricToken model
   */
  readonly fields: BiometricTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BiometricToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BiometricTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BiometricToken model
   */ 
  interface BiometricTokenFieldRefs {
    readonly id: FieldRef<"BiometricToken", 'String'>
    readonly token: FieldRef<"BiometricToken", 'String'>
    readonly userId: FieldRef<"BiometricToken", 'String'>
    readonly deviceId: FieldRef<"BiometricToken", 'String'>
    readonly createdAt: FieldRef<"BiometricToken", 'DateTime'>
    readonly expiresAt: FieldRef<"BiometricToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BiometricToken findUnique
   */
  export type BiometricTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BiometricToken
     */
    select?: BiometricTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BiometricTokenInclude<ExtArgs> | null
    /**
     * Filter, which BiometricToken to fetch.
     */
    where: BiometricTokenWhereUniqueInput
  }

  /**
   * BiometricToken findUniqueOrThrow
   */
  export type BiometricTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BiometricToken
     */
    select?: BiometricTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BiometricTokenInclude<ExtArgs> | null
    /**
     * Filter, which BiometricToken to fetch.
     */
    where: BiometricTokenWhereUniqueInput
  }

  /**
   * BiometricToken findFirst
   */
  export type BiometricTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BiometricToken
     */
    select?: BiometricTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BiometricTokenInclude<ExtArgs> | null
    /**
     * Filter, which BiometricToken to fetch.
     */
    where?: BiometricTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BiometricTokens to fetch.
     */
    orderBy?: BiometricTokenOrderByWithRelationInput | BiometricTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BiometricTokens.
     */
    cursor?: BiometricTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BiometricTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BiometricTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BiometricTokens.
     */
    distinct?: BiometricTokenScalarFieldEnum | BiometricTokenScalarFieldEnum[]
  }

  /**
   * BiometricToken findFirstOrThrow
   */
  export type BiometricTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BiometricToken
     */
    select?: BiometricTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BiometricTokenInclude<ExtArgs> | null
    /**
     * Filter, which BiometricToken to fetch.
     */
    where?: BiometricTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BiometricTokens to fetch.
     */
    orderBy?: BiometricTokenOrderByWithRelationInput | BiometricTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BiometricTokens.
     */
    cursor?: BiometricTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BiometricTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BiometricTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BiometricTokens.
     */
    distinct?: BiometricTokenScalarFieldEnum | BiometricTokenScalarFieldEnum[]
  }

  /**
   * BiometricToken findMany
   */
  export type BiometricTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BiometricToken
     */
    select?: BiometricTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BiometricTokenInclude<ExtArgs> | null
    /**
     * Filter, which BiometricTokens to fetch.
     */
    where?: BiometricTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BiometricTokens to fetch.
     */
    orderBy?: BiometricTokenOrderByWithRelationInput | BiometricTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BiometricTokens.
     */
    cursor?: BiometricTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BiometricTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BiometricTokens.
     */
    skip?: number
    distinct?: BiometricTokenScalarFieldEnum | BiometricTokenScalarFieldEnum[]
  }

  /**
   * BiometricToken create
   */
  export type BiometricTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BiometricToken
     */
    select?: BiometricTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BiometricTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a BiometricToken.
     */
    data: XOR<BiometricTokenCreateInput, BiometricTokenUncheckedCreateInput>
  }

  /**
   * BiometricToken createMany
   */
  export type BiometricTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BiometricTokens.
     */
    data: BiometricTokenCreateManyInput | BiometricTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BiometricToken createManyAndReturn
   */
  export type BiometricTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BiometricToken
     */
    select?: BiometricTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many BiometricTokens.
     */
    data: BiometricTokenCreateManyInput | BiometricTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BiometricTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BiometricToken update
   */
  export type BiometricTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BiometricToken
     */
    select?: BiometricTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BiometricTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a BiometricToken.
     */
    data: XOR<BiometricTokenUpdateInput, BiometricTokenUncheckedUpdateInput>
    /**
     * Choose, which BiometricToken to update.
     */
    where: BiometricTokenWhereUniqueInput
  }

  /**
   * BiometricToken updateMany
   */
  export type BiometricTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BiometricTokens.
     */
    data: XOR<BiometricTokenUpdateManyMutationInput, BiometricTokenUncheckedUpdateManyInput>
    /**
     * Filter which BiometricTokens to update
     */
    where?: BiometricTokenWhereInput
  }

  /**
   * BiometricToken upsert
   */
  export type BiometricTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BiometricToken
     */
    select?: BiometricTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BiometricTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the BiometricToken to update in case it exists.
     */
    where: BiometricTokenWhereUniqueInput
    /**
     * In case the BiometricToken found by the `where` argument doesn't exist, create a new BiometricToken with this data.
     */
    create: XOR<BiometricTokenCreateInput, BiometricTokenUncheckedCreateInput>
    /**
     * In case the BiometricToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BiometricTokenUpdateInput, BiometricTokenUncheckedUpdateInput>
  }

  /**
   * BiometricToken delete
   */
  export type BiometricTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BiometricToken
     */
    select?: BiometricTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BiometricTokenInclude<ExtArgs> | null
    /**
     * Filter which BiometricToken to delete.
     */
    where: BiometricTokenWhereUniqueInput
  }

  /**
   * BiometricToken deleteMany
   */
  export type BiometricTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BiometricTokens to delete
     */
    where?: BiometricTokenWhereInput
  }

  /**
   * BiometricToken without action
   */
  export type BiometricTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BiometricToken
     */
    select?: BiometricTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BiometricTokenInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const TenantScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    metadata: 'metadata',
    logoUrl: 'logoUrl',
    address: 'address',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    bssid: 'bssid',
    staticIp: 'staticIp',
    latitude: 'latitude',
    longitude: 'longitude',
    menuEnabled: 'menuEnabled',
    feedbackEnabled: 'feedbackEnabled',
    staffEnabled: 'staffEnabled',
    menuUrl: 'menuUrl'
  };

  export type TenantScalarFieldEnum = (typeof TenantScalarFieldEnum)[keyof typeof TenantScalarFieldEnum]


  export const NasDeviceScalarFieldEnum: {
    id: 'id',
    nasId: 'nasId',
    vpnIp: 'vpnIp',
    publicIp: 'publicIp',
    bssid: 'bssid',
    name: 'name',
    tenantId: 'tenantId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NasDeviceScalarFieldEnum = (typeof NasDeviceScalarFieldEnum)[keyof typeof NasDeviceScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    phoneNumber: 'phoneNumber',
    gender: 'gender',
    status: 'status',
    isAnonymous: 'isAnonymous',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    token: 'token',
    expiresAt: 'expiresAt',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    accountId: 'accountId',
    providerId: 'providerId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    accessTokenExpiresAt: 'accessTokenExpiresAt',
    refreshTokenExpiresAt: 'refreshTokenExpiresAt',
    scope: 'scope',
    idToken: 'idToken',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const VerificationScalarFieldEnum: {
    id: 'id',
    identifier: 'identifier',
    value: 'value',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VerificationScalarFieldEnum = (typeof VerificationScalarFieldEnum)[keyof typeof VerificationScalarFieldEnum]


  export const TenantMemberScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    tenantId: 'tenantId',
    role: 'role',
    canModerate: 'canModerate',
    canManageOrders: 'canManageOrders',
    canViewStats: 'canViewStats',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TenantMemberScalarFieldEnum = (typeof TenantMemberScalarFieldEnum)[keyof typeof TenantMemberScalarFieldEnum]


  export const RoomScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    type: 'type',
    tenantId: 'tenantId',
    createdAt: 'createdAt'
  };

  export type RoomScalarFieldEnum = (typeof RoomScalarFieldEnum)[keyof typeof RoomScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    text: 'text',
    imageUrl: 'imageUrl',
    createdAt: 'createdAt',
    senderId: 'senderId',
    senderAlias: 'senderAlias',
    senderGender: 'senderGender',
    recipientId: 'recipientId',
    roomId: 'roomId',
    userId: 'userId',
    tenantId: 'tenantId'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const SystemLogScalarFieldEnum: {
    id: 'id',
    event: 'event',
    details: 'details',
    createdAt: 'createdAt',
    tenantId: 'tenantId'
  };

  export type SystemLogScalarFieldEnum = (typeof SystemLogScalarFieldEnum)[keyof typeof SystemLogScalarFieldEnum]


  export const PasskeyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    publicKey: 'publicKey',
    userId: 'userId',
    credentialID: 'credentialID',
    counter: 'counter',
    deviceType: 'deviceType',
    backedUp: 'backedUp',
    transports: 'transports',
    aaguid: 'aaguid',
    createdAt: 'createdAt'
  };

  export type PasskeyScalarFieldEnum = (typeof PasskeyScalarFieldEnum)[keyof typeof PasskeyScalarFieldEnum]


  export const FeedbackScalarFieldEnum: {
    id: 'id',
    score: 'score',
    comment: 'comment',
    userId: 'userId',
    tenantId: 'tenantId',
    createdAt: 'createdAt'
  };

  export type FeedbackScalarFieldEnum = (typeof FeedbackScalarFieldEnum)[keyof typeof FeedbackScalarFieldEnum]


  export const BiometricTokenScalarFieldEnum: {
    id: 'id',
    token: 'token',
    userId: 'userId',
    deviceId: 'deviceId',
    createdAt: 'createdAt',
    expiresAt: 'expiresAt'
  };

  export type BiometricTokenScalarFieldEnum = (typeof BiometricTokenScalarFieldEnum)[keyof typeof BiometricTokenScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'GlobalRole'
   */
  export type EnumGlobalRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GlobalRole'>
    


  /**
   * Reference to a field of type 'GlobalRole[]'
   */
  export type ListEnumGlobalRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GlobalRole[]'>
    


  /**
   * Reference to a field of type 'TenantRole'
   */
  export type EnumTenantRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TenantRole'>
    


  /**
   * Reference to a field of type 'TenantRole[]'
   */
  export type ListEnumTenantRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TenantRole[]'>
    


  /**
   * Reference to a field of type 'RoomType'
   */
  export type EnumRoomTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RoomType'>
    


  /**
   * Reference to a field of type 'RoomType[]'
   */
  export type ListEnumRoomTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RoomType[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type TenantWhereInput = {
    AND?: TenantWhereInput | TenantWhereInput[]
    OR?: TenantWhereInput[]
    NOT?: TenantWhereInput | TenantWhereInput[]
    id?: StringFilter<"Tenant"> | string
    name?: StringFilter<"Tenant"> | string
    slug?: StringFilter<"Tenant"> | string
    metadata?: JsonNullableFilter<"Tenant">
    logoUrl?: StringNullableFilter<"Tenant"> | string | null
    address?: StringNullableFilter<"Tenant"> | string | null
    createdAt?: DateTimeFilter<"Tenant"> | Date | string
    updatedAt?: DateTimeFilter<"Tenant"> | Date | string
    bssid?: StringNullableFilter<"Tenant"> | string | null
    staticIp?: StringNullableFilter<"Tenant"> | string | null
    latitude?: FloatNullableFilter<"Tenant"> | number | null
    longitude?: FloatNullableFilter<"Tenant"> | number | null
    menuEnabled?: BoolFilter<"Tenant"> | boolean
    feedbackEnabled?: BoolFilter<"Tenant"> | boolean
    staffEnabled?: BoolFilter<"Tenant"> | boolean
    menuUrl?: StringNullableFilter<"Tenant"> | string | null
    members?: TenantMemberListRelationFilter
    messages?: MessageListRelationFilter
    rooms?: RoomListRelationFilter
    logs?: SystemLogListRelationFilter
    devices?: NasDeviceListRelationFilter
    feedbacks?: FeedbackListRelationFilter
  }

  export type TenantOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    metadata?: SortOrderInput | SortOrder
    logoUrl?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    bssid?: SortOrderInput | SortOrder
    staticIp?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    menuEnabled?: SortOrder
    feedbackEnabled?: SortOrder
    staffEnabled?: SortOrder
    menuUrl?: SortOrderInput | SortOrder
    members?: TenantMemberOrderByRelationAggregateInput
    messages?: MessageOrderByRelationAggregateInput
    rooms?: RoomOrderByRelationAggregateInput
    logs?: SystemLogOrderByRelationAggregateInput
    devices?: NasDeviceOrderByRelationAggregateInput
    feedbacks?: FeedbackOrderByRelationAggregateInput
  }

  export type TenantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: TenantWhereInput | TenantWhereInput[]
    OR?: TenantWhereInput[]
    NOT?: TenantWhereInput | TenantWhereInput[]
    name?: StringFilter<"Tenant"> | string
    metadata?: JsonNullableFilter<"Tenant">
    logoUrl?: StringNullableFilter<"Tenant"> | string | null
    address?: StringNullableFilter<"Tenant"> | string | null
    createdAt?: DateTimeFilter<"Tenant"> | Date | string
    updatedAt?: DateTimeFilter<"Tenant"> | Date | string
    bssid?: StringNullableFilter<"Tenant"> | string | null
    staticIp?: StringNullableFilter<"Tenant"> | string | null
    latitude?: FloatNullableFilter<"Tenant"> | number | null
    longitude?: FloatNullableFilter<"Tenant"> | number | null
    menuEnabled?: BoolFilter<"Tenant"> | boolean
    feedbackEnabled?: BoolFilter<"Tenant"> | boolean
    staffEnabled?: BoolFilter<"Tenant"> | boolean
    menuUrl?: StringNullableFilter<"Tenant"> | string | null
    members?: TenantMemberListRelationFilter
    messages?: MessageListRelationFilter
    rooms?: RoomListRelationFilter
    logs?: SystemLogListRelationFilter
    devices?: NasDeviceListRelationFilter
    feedbacks?: FeedbackListRelationFilter
  }, "id" | "slug">

  export type TenantOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    metadata?: SortOrderInput | SortOrder
    logoUrl?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    bssid?: SortOrderInput | SortOrder
    staticIp?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    menuEnabled?: SortOrder
    feedbackEnabled?: SortOrder
    staffEnabled?: SortOrder
    menuUrl?: SortOrderInput | SortOrder
    _count?: TenantCountOrderByAggregateInput
    _avg?: TenantAvgOrderByAggregateInput
    _max?: TenantMaxOrderByAggregateInput
    _min?: TenantMinOrderByAggregateInput
    _sum?: TenantSumOrderByAggregateInput
  }

  export type TenantScalarWhereWithAggregatesInput = {
    AND?: TenantScalarWhereWithAggregatesInput | TenantScalarWhereWithAggregatesInput[]
    OR?: TenantScalarWhereWithAggregatesInput[]
    NOT?: TenantScalarWhereWithAggregatesInput | TenantScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tenant"> | string
    name?: StringWithAggregatesFilter<"Tenant"> | string
    slug?: StringWithAggregatesFilter<"Tenant"> | string
    metadata?: JsonNullableWithAggregatesFilter<"Tenant">
    logoUrl?: StringNullableWithAggregatesFilter<"Tenant"> | string | null
    address?: StringNullableWithAggregatesFilter<"Tenant"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Tenant"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Tenant"> | Date | string
    bssid?: StringNullableWithAggregatesFilter<"Tenant"> | string | null
    staticIp?: StringNullableWithAggregatesFilter<"Tenant"> | string | null
    latitude?: FloatNullableWithAggregatesFilter<"Tenant"> | number | null
    longitude?: FloatNullableWithAggregatesFilter<"Tenant"> | number | null
    menuEnabled?: BoolWithAggregatesFilter<"Tenant"> | boolean
    feedbackEnabled?: BoolWithAggregatesFilter<"Tenant"> | boolean
    staffEnabled?: BoolWithAggregatesFilter<"Tenant"> | boolean
    menuUrl?: StringNullableWithAggregatesFilter<"Tenant"> | string | null
  }

  export type NasDeviceWhereInput = {
    AND?: NasDeviceWhereInput | NasDeviceWhereInput[]
    OR?: NasDeviceWhereInput[]
    NOT?: NasDeviceWhereInput | NasDeviceWhereInput[]
    id?: StringFilter<"NasDevice"> | string
    nasId?: StringNullableFilter<"NasDevice"> | string | null
    vpnIp?: StringNullableFilter<"NasDevice"> | string | null
    publicIp?: StringNullableFilter<"NasDevice"> | string | null
    bssid?: StringNullableFilter<"NasDevice"> | string | null
    name?: StringNullableFilter<"NasDevice"> | string | null
    tenantId?: StringFilter<"NasDevice"> | string
    createdAt?: DateTimeFilter<"NasDevice"> | Date | string
    updatedAt?: DateTimeFilter<"NasDevice"> | Date | string
    tenant?: XOR<TenantRelationFilter, TenantWhereInput>
  }

  export type NasDeviceOrderByWithRelationInput = {
    id?: SortOrder
    nasId?: SortOrderInput | SortOrder
    vpnIp?: SortOrderInput | SortOrder
    publicIp?: SortOrderInput | SortOrder
    bssid?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenant?: TenantOrderByWithRelationInput
  }

  export type NasDeviceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nasId?: string
    vpnIp?: string
    publicIp?: string
    bssid?: string
    AND?: NasDeviceWhereInput | NasDeviceWhereInput[]
    OR?: NasDeviceWhereInput[]
    NOT?: NasDeviceWhereInput | NasDeviceWhereInput[]
    name?: StringNullableFilter<"NasDevice"> | string | null
    tenantId?: StringFilter<"NasDevice"> | string
    createdAt?: DateTimeFilter<"NasDevice"> | Date | string
    updatedAt?: DateTimeFilter<"NasDevice"> | Date | string
    tenant?: XOR<TenantRelationFilter, TenantWhereInput>
  }, "id" | "nasId" | "vpnIp" | "publicIp" | "bssid">

  export type NasDeviceOrderByWithAggregationInput = {
    id?: SortOrder
    nasId?: SortOrderInput | SortOrder
    vpnIp?: SortOrderInput | SortOrder
    publicIp?: SortOrderInput | SortOrder
    bssid?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NasDeviceCountOrderByAggregateInput
    _max?: NasDeviceMaxOrderByAggregateInput
    _min?: NasDeviceMinOrderByAggregateInput
  }

  export type NasDeviceScalarWhereWithAggregatesInput = {
    AND?: NasDeviceScalarWhereWithAggregatesInput | NasDeviceScalarWhereWithAggregatesInput[]
    OR?: NasDeviceScalarWhereWithAggregatesInput[]
    NOT?: NasDeviceScalarWhereWithAggregatesInput | NasDeviceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NasDevice"> | string
    nasId?: StringNullableWithAggregatesFilter<"NasDevice"> | string | null
    vpnIp?: StringNullableWithAggregatesFilter<"NasDevice"> | string | null
    publicIp?: StringNullableWithAggregatesFilter<"NasDevice"> | string | null
    bssid?: StringNullableWithAggregatesFilter<"NasDevice"> | string | null
    name?: StringNullableWithAggregatesFilter<"NasDevice"> | string | null
    tenantId?: StringWithAggregatesFilter<"NasDevice"> | string
    createdAt?: DateTimeWithAggregatesFilter<"NasDevice"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"NasDevice"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    emailVerified?: BoolNullableFilter<"User"> | boolean | null
    image?: StringNullableFilter<"User"> | string | null
    phoneNumber?: StringNullableFilter<"User"> | string | null
    gender?: StringNullableFilter<"User"> | string | null
    status?: StringNullableFilter<"User"> | string | null
    isAnonymous?: BoolFilter<"User"> | boolean
    role?: EnumGlobalRoleFilter<"User"> | $Enums.GlobalRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    memberships?: TenantMemberListRelationFilter
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
    messages?: MessageListRelationFilter
    passkeys?: PasskeyListRelationFilter
    feedbacks?: FeedbackListRelationFilter
    biometricTokens?: BiometricTokenListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    isAnonymous?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    memberships?: TenantMemberOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    accounts?: AccountOrderByRelationAggregateInput
    messages?: MessageOrderByRelationAggregateInput
    passkeys?: PasskeyOrderByRelationAggregateInput
    feedbacks?: FeedbackOrderByRelationAggregateInput
    biometricTokens?: BiometricTokenOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    emailVerified?: BoolNullableFilter<"User"> | boolean | null
    image?: StringNullableFilter<"User"> | string | null
    phoneNumber?: StringNullableFilter<"User"> | string | null
    gender?: StringNullableFilter<"User"> | string | null
    status?: StringNullableFilter<"User"> | string | null
    isAnonymous?: BoolFilter<"User"> | boolean
    role?: EnumGlobalRoleFilter<"User"> | $Enums.GlobalRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    memberships?: TenantMemberListRelationFilter
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
    messages?: MessageListRelationFilter
    passkeys?: PasskeyListRelationFilter
    feedbacks?: FeedbackListRelationFilter
    biometricTokens?: BiometricTokenListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    isAnonymous?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    emailVerified?: BoolNullableWithAggregatesFilter<"User"> | boolean | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    phoneNumber?: StringNullableWithAggregatesFilter<"User"> | string | null
    gender?: StringNullableWithAggregatesFilter<"User"> | string | null
    status?: StringNullableWithAggregatesFilter<"User"> | string | null
    isAnonymous?: BoolWithAggregatesFilter<"User"> | boolean
    role?: EnumGlobalRoleWithAggregatesFilter<"User"> | $Enums.GlobalRole
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    token?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    token?: StringWithAggregatesFilter<"Session"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    ipAddress?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"Session"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    accountId?: StringWithAggregatesFilter<"Account"> | string
    providerId?: StringWithAggregatesFilter<"Account"> | string
    accessToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    refreshToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    idToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    password?: StringNullableWithAggregatesFilter<"Account"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
  }

  export type VerificationWhereInput = {
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    id?: StringFilter<"Verification"> | string
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeFilter<"Verification"> | Date | string
    updatedAt?: DateTimeFilter<"Verification"> | Date | string
  }

  export type VerificationOrderByWithRelationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeFilter<"Verification"> | Date | string
    updatedAt?: DateTimeFilter<"Verification"> | Date | string
  }, "id">

  export type VerificationOrderByWithAggregationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VerificationCountOrderByAggregateInput
    _max?: VerificationMaxOrderByAggregateInput
    _min?: VerificationMinOrderByAggregateInput
  }

  export type VerificationScalarWhereWithAggregatesInput = {
    AND?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    OR?: VerificationScalarWhereWithAggregatesInput[]
    NOT?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Verification"> | string
    identifier?: StringWithAggregatesFilter<"Verification"> | string
    value?: StringWithAggregatesFilter<"Verification"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
  }

  export type TenantMemberWhereInput = {
    AND?: TenantMemberWhereInput | TenantMemberWhereInput[]
    OR?: TenantMemberWhereInput[]
    NOT?: TenantMemberWhereInput | TenantMemberWhereInput[]
    id?: StringFilter<"TenantMember"> | string
    userId?: StringFilter<"TenantMember"> | string
    tenantId?: StringFilter<"TenantMember"> | string
    role?: EnumTenantRoleFilter<"TenantMember"> | $Enums.TenantRole
    canModerate?: BoolFilter<"TenantMember"> | boolean
    canManageOrders?: BoolFilter<"TenantMember"> | boolean
    canViewStats?: BoolFilter<"TenantMember"> | boolean
    createdAt?: DateTimeFilter<"TenantMember"> | Date | string
    updatedAt?: DateTimeFilter<"TenantMember"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    tenant?: XOR<TenantRelationFilter, TenantWhereInput>
  }

  export type TenantMemberOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    tenantId?: SortOrder
    role?: SortOrder
    canModerate?: SortOrder
    canManageOrders?: SortOrder
    canViewStats?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    tenant?: TenantOrderByWithRelationInput
  }

  export type TenantMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_tenantId?: TenantMemberUserIdTenantIdCompoundUniqueInput
    AND?: TenantMemberWhereInput | TenantMemberWhereInput[]
    OR?: TenantMemberWhereInput[]
    NOT?: TenantMemberWhereInput | TenantMemberWhereInput[]
    userId?: StringFilter<"TenantMember"> | string
    tenantId?: StringFilter<"TenantMember"> | string
    role?: EnumTenantRoleFilter<"TenantMember"> | $Enums.TenantRole
    canModerate?: BoolFilter<"TenantMember"> | boolean
    canManageOrders?: BoolFilter<"TenantMember"> | boolean
    canViewStats?: BoolFilter<"TenantMember"> | boolean
    createdAt?: DateTimeFilter<"TenantMember"> | Date | string
    updatedAt?: DateTimeFilter<"TenantMember"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    tenant?: XOR<TenantRelationFilter, TenantWhereInput>
  }, "id" | "userId_tenantId">

  export type TenantMemberOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    tenantId?: SortOrder
    role?: SortOrder
    canModerate?: SortOrder
    canManageOrders?: SortOrder
    canViewStats?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TenantMemberCountOrderByAggregateInput
    _max?: TenantMemberMaxOrderByAggregateInput
    _min?: TenantMemberMinOrderByAggregateInput
  }

  export type TenantMemberScalarWhereWithAggregatesInput = {
    AND?: TenantMemberScalarWhereWithAggregatesInput | TenantMemberScalarWhereWithAggregatesInput[]
    OR?: TenantMemberScalarWhereWithAggregatesInput[]
    NOT?: TenantMemberScalarWhereWithAggregatesInput | TenantMemberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TenantMember"> | string
    userId?: StringWithAggregatesFilter<"TenantMember"> | string
    tenantId?: StringWithAggregatesFilter<"TenantMember"> | string
    role?: EnumTenantRoleWithAggregatesFilter<"TenantMember"> | $Enums.TenantRole
    canModerate?: BoolWithAggregatesFilter<"TenantMember"> | boolean
    canManageOrders?: BoolWithAggregatesFilter<"TenantMember"> | boolean
    canViewStats?: BoolWithAggregatesFilter<"TenantMember"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"TenantMember"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TenantMember"> | Date | string
  }

  export type RoomWhereInput = {
    AND?: RoomWhereInput | RoomWhereInput[]
    OR?: RoomWhereInput[]
    NOT?: RoomWhereInput | RoomWhereInput[]
    id?: StringFilter<"Room"> | string
    name?: StringFilter<"Room"> | string
    description?: StringNullableFilter<"Room"> | string | null
    type?: EnumRoomTypeFilter<"Room"> | $Enums.RoomType
    tenantId?: StringFilter<"Room"> | string
    createdAt?: DateTimeFilter<"Room"> | Date | string
    tenant?: XOR<TenantRelationFilter, TenantWhereInput>
    messages?: MessageListRelationFilter
  }

  export type RoomOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    type?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    tenant?: TenantOrderByWithRelationInput
    messages?: MessageOrderByRelationAggregateInput
  }

  export type RoomWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RoomWhereInput | RoomWhereInput[]
    OR?: RoomWhereInput[]
    NOT?: RoomWhereInput | RoomWhereInput[]
    name?: StringFilter<"Room"> | string
    description?: StringNullableFilter<"Room"> | string | null
    type?: EnumRoomTypeFilter<"Room"> | $Enums.RoomType
    tenantId?: StringFilter<"Room"> | string
    createdAt?: DateTimeFilter<"Room"> | Date | string
    tenant?: XOR<TenantRelationFilter, TenantWhereInput>
    messages?: MessageListRelationFilter
  }, "id">

  export type RoomOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    type?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    _count?: RoomCountOrderByAggregateInput
    _max?: RoomMaxOrderByAggregateInput
    _min?: RoomMinOrderByAggregateInput
  }

  export type RoomScalarWhereWithAggregatesInput = {
    AND?: RoomScalarWhereWithAggregatesInput | RoomScalarWhereWithAggregatesInput[]
    OR?: RoomScalarWhereWithAggregatesInput[]
    NOT?: RoomScalarWhereWithAggregatesInput | RoomScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Room"> | string
    name?: StringWithAggregatesFilter<"Room"> | string
    description?: StringNullableWithAggregatesFilter<"Room"> | string | null
    type?: EnumRoomTypeWithAggregatesFilter<"Room"> | $Enums.RoomType
    tenantId?: StringWithAggregatesFilter<"Room"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Room"> | Date | string
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: StringFilter<"Message"> | string
    text?: StringFilter<"Message"> | string
    imageUrl?: StringNullableFilter<"Message"> | string | null
    createdAt?: DateTimeFilter<"Message"> | Date | string
    senderId?: StringFilter<"Message"> | string
    senderAlias?: StringFilter<"Message"> | string
    senderGender?: StringFilter<"Message"> | string
    recipientId?: StringNullableFilter<"Message"> | string | null
    roomId?: StringNullableFilter<"Message"> | string | null
    userId?: StringNullableFilter<"Message"> | string | null
    tenantId?: StringFilter<"Message"> | string
    room?: XOR<RoomNullableRelationFilter, RoomWhereInput> | null
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    tenant?: XOR<TenantRelationFilter, TenantWhereInput>
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    text?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    senderId?: SortOrder
    senderAlias?: SortOrder
    senderGender?: SortOrder
    recipientId?: SortOrderInput | SortOrder
    roomId?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    tenantId?: SortOrder
    room?: RoomOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    tenant?: TenantOrderByWithRelationInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    text?: StringFilter<"Message"> | string
    imageUrl?: StringNullableFilter<"Message"> | string | null
    createdAt?: DateTimeFilter<"Message"> | Date | string
    senderId?: StringFilter<"Message"> | string
    senderAlias?: StringFilter<"Message"> | string
    senderGender?: StringFilter<"Message"> | string
    recipientId?: StringNullableFilter<"Message"> | string | null
    roomId?: StringNullableFilter<"Message"> | string | null
    userId?: StringNullableFilter<"Message"> | string | null
    tenantId?: StringFilter<"Message"> | string
    room?: XOR<RoomNullableRelationFilter, RoomWhereInput> | null
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    tenant?: XOR<TenantRelationFilter, TenantWhereInput>
  }, "id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    text?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    senderId?: SortOrder
    senderAlias?: SortOrder
    senderGender?: SortOrder
    recipientId?: SortOrderInput | SortOrder
    roomId?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    tenantId?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Message"> | string
    text?: StringWithAggregatesFilter<"Message"> | string
    imageUrl?: StringNullableWithAggregatesFilter<"Message"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
    senderId?: StringWithAggregatesFilter<"Message"> | string
    senderAlias?: StringWithAggregatesFilter<"Message"> | string
    senderGender?: StringWithAggregatesFilter<"Message"> | string
    recipientId?: StringNullableWithAggregatesFilter<"Message"> | string | null
    roomId?: StringNullableWithAggregatesFilter<"Message"> | string | null
    userId?: StringNullableWithAggregatesFilter<"Message"> | string | null
    tenantId?: StringWithAggregatesFilter<"Message"> | string
  }

  export type SystemLogWhereInput = {
    AND?: SystemLogWhereInput | SystemLogWhereInput[]
    OR?: SystemLogWhereInput[]
    NOT?: SystemLogWhereInput | SystemLogWhereInput[]
    id?: StringFilter<"SystemLog"> | string
    event?: StringFilter<"SystemLog"> | string
    details?: JsonNullableFilter<"SystemLog">
    createdAt?: DateTimeFilter<"SystemLog"> | Date | string
    tenantId?: StringNullableFilter<"SystemLog"> | string | null
    tenant?: XOR<TenantNullableRelationFilter, TenantWhereInput> | null
  }

  export type SystemLogOrderByWithRelationInput = {
    id?: SortOrder
    event?: SortOrder
    details?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    tenantId?: SortOrderInput | SortOrder
    tenant?: TenantOrderByWithRelationInput
  }

  export type SystemLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SystemLogWhereInput | SystemLogWhereInput[]
    OR?: SystemLogWhereInput[]
    NOT?: SystemLogWhereInput | SystemLogWhereInput[]
    event?: StringFilter<"SystemLog"> | string
    details?: JsonNullableFilter<"SystemLog">
    createdAt?: DateTimeFilter<"SystemLog"> | Date | string
    tenantId?: StringNullableFilter<"SystemLog"> | string | null
    tenant?: XOR<TenantNullableRelationFilter, TenantWhereInput> | null
  }, "id">

  export type SystemLogOrderByWithAggregationInput = {
    id?: SortOrder
    event?: SortOrder
    details?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    tenantId?: SortOrderInput | SortOrder
    _count?: SystemLogCountOrderByAggregateInput
    _max?: SystemLogMaxOrderByAggregateInput
    _min?: SystemLogMinOrderByAggregateInput
  }

  export type SystemLogScalarWhereWithAggregatesInput = {
    AND?: SystemLogScalarWhereWithAggregatesInput | SystemLogScalarWhereWithAggregatesInput[]
    OR?: SystemLogScalarWhereWithAggregatesInput[]
    NOT?: SystemLogScalarWhereWithAggregatesInput | SystemLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SystemLog"> | string
    event?: StringWithAggregatesFilter<"SystemLog"> | string
    details?: JsonNullableWithAggregatesFilter<"SystemLog">
    createdAt?: DateTimeWithAggregatesFilter<"SystemLog"> | Date | string
    tenantId?: StringNullableWithAggregatesFilter<"SystemLog"> | string | null
  }

  export type PasskeyWhereInput = {
    AND?: PasskeyWhereInput | PasskeyWhereInput[]
    OR?: PasskeyWhereInput[]
    NOT?: PasskeyWhereInput | PasskeyWhereInput[]
    id?: StringFilter<"Passkey"> | string
    name?: StringNullableFilter<"Passkey"> | string | null
    publicKey?: StringFilter<"Passkey"> | string
    userId?: StringFilter<"Passkey"> | string
    credentialID?: StringFilter<"Passkey"> | string
    counter?: IntFilter<"Passkey"> | number
    deviceType?: StringFilter<"Passkey"> | string
    backedUp?: BoolFilter<"Passkey"> | boolean
    transports?: StringNullableFilter<"Passkey"> | string | null
    aaguid?: StringNullableFilter<"Passkey"> | string | null
    createdAt?: DateTimeNullableFilter<"Passkey"> | Date | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type PasskeyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    publicKey?: SortOrder
    userId?: SortOrder
    credentialID?: SortOrder
    counter?: SortOrder
    deviceType?: SortOrder
    backedUp?: SortOrder
    transports?: SortOrderInput | SortOrder
    aaguid?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type PasskeyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PasskeyWhereInput | PasskeyWhereInput[]
    OR?: PasskeyWhereInput[]
    NOT?: PasskeyWhereInput | PasskeyWhereInput[]
    name?: StringNullableFilter<"Passkey"> | string | null
    publicKey?: StringFilter<"Passkey"> | string
    userId?: StringFilter<"Passkey"> | string
    credentialID?: StringFilter<"Passkey"> | string
    counter?: IntFilter<"Passkey"> | number
    deviceType?: StringFilter<"Passkey"> | string
    backedUp?: BoolFilter<"Passkey"> | boolean
    transports?: StringNullableFilter<"Passkey"> | string | null
    aaguid?: StringNullableFilter<"Passkey"> | string | null
    createdAt?: DateTimeNullableFilter<"Passkey"> | Date | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type PasskeyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    publicKey?: SortOrder
    userId?: SortOrder
    credentialID?: SortOrder
    counter?: SortOrder
    deviceType?: SortOrder
    backedUp?: SortOrder
    transports?: SortOrderInput | SortOrder
    aaguid?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    _count?: PasskeyCountOrderByAggregateInput
    _avg?: PasskeyAvgOrderByAggregateInput
    _max?: PasskeyMaxOrderByAggregateInput
    _min?: PasskeyMinOrderByAggregateInput
    _sum?: PasskeySumOrderByAggregateInput
  }

  export type PasskeyScalarWhereWithAggregatesInput = {
    AND?: PasskeyScalarWhereWithAggregatesInput | PasskeyScalarWhereWithAggregatesInput[]
    OR?: PasskeyScalarWhereWithAggregatesInput[]
    NOT?: PasskeyScalarWhereWithAggregatesInput | PasskeyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Passkey"> | string
    name?: StringNullableWithAggregatesFilter<"Passkey"> | string | null
    publicKey?: StringWithAggregatesFilter<"Passkey"> | string
    userId?: StringWithAggregatesFilter<"Passkey"> | string
    credentialID?: StringWithAggregatesFilter<"Passkey"> | string
    counter?: IntWithAggregatesFilter<"Passkey"> | number
    deviceType?: StringWithAggregatesFilter<"Passkey"> | string
    backedUp?: BoolWithAggregatesFilter<"Passkey"> | boolean
    transports?: StringNullableWithAggregatesFilter<"Passkey"> | string | null
    aaguid?: StringNullableWithAggregatesFilter<"Passkey"> | string | null
    createdAt?: DateTimeNullableWithAggregatesFilter<"Passkey"> | Date | string | null
  }

  export type FeedbackWhereInput = {
    AND?: FeedbackWhereInput | FeedbackWhereInput[]
    OR?: FeedbackWhereInput[]
    NOT?: FeedbackWhereInput | FeedbackWhereInput[]
    id?: StringFilter<"Feedback"> | string
    score?: IntFilter<"Feedback"> | number
    comment?: StringNullableFilter<"Feedback"> | string | null
    userId?: StringFilter<"Feedback"> | string
    tenantId?: StringFilter<"Feedback"> | string
    createdAt?: DateTimeFilter<"Feedback"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    tenant?: XOR<TenantRelationFilter, TenantWhereInput>
  }

  export type FeedbackOrderByWithRelationInput = {
    id?: SortOrder
    score?: SortOrder
    comment?: SortOrderInput | SortOrder
    userId?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    tenant?: TenantOrderByWithRelationInput
  }

  export type FeedbackWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FeedbackWhereInput | FeedbackWhereInput[]
    OR?: FeedbackWhereInput[]
    NOT?: FeedbackWhereInput | FeedbackWhereInput[]
    score?: IntFilter<"Feedback"> | number
    comment?: StringNullableFilter<"Feedback"> | string | null
    userId?: StringFilter<"Feedback"> | string
    tenantId?: StringFilter<"Feedback"> | string
    createdAt?: DateTimeFilter<"Feedback"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    tenant?: XOR<TenantRelationFilter, TenantWhereInput>
  }, "id">

  export type FeedbackOrderByWithAggregationInput = {
    id?: SortOrder
    score?: SortOrder
    comment?: SortOrderInput | SortOrder
    userId?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    _count?: FeedbackCountOrderByAggregateInput
    _avg?: FeedbackAvgOrderByAggregateInput
    _max?: FeedbackMaxOrderByAggregateInput
    _min?: FeedbackMinOrderByAggregateInput
    _sum?: FeedbackSumOrderByAggregateInput
  }

  export type FeedbackScalarWhereWithAggregatesInput = {
    AND?: FeedbackScalarWhereWithAggregatesInput | FeedbackScalarWhereWithAggregatesInput[]
    OR?: FeedbackScalarWhereWithAggregatesInput[]
    NOT?: FeedbackScalarWhereWithAggregatesInput | FeedbackScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Feedback"> | string
    score?: IntWithAggregatesFilter<"Feedback"> | number
    comment?: StringNullableWithAggregatesFilter<"Feedback"> | string | null
    userId?: StringWithAggregatesFilter<"Feedback"> | string
    tenantId?: StringWithAggregatesFilter<"Feedback"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Feedback"> | Date | string
  }

  export type BiometricTokenWhereInput = {
    AND?: BiometricTokenWhereInput | BiometricTokenWhereInput[]
    OR?: BiometricTokenWhereInput[]
    NOT?: BiometricTokenWhereInput | BiometricTokenWhereInput[]
    id?: StringFilter<"BiometricToken"> | string
    token?: StringFilter<"BiometricToken"> | string
    userId?: StringFilter<"BiometricToken"> | string
    deviceId?: StringFilter<"BiometricToken"> | string
    createdAt?: DateTimeFilter<"BiometricToken"> | Date | string
    expiresAt?: DateTimeNullableFilter<"BiometricToken"> | Date | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type BiometricTokenOrderByWithRelationInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    deviceId?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type BiometricTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: BiometricTokenWhereInput | BiometricTokenWhereInput[]
    OR?: BiometricTokenWhereInput[]
    NOT?: BiometricTokenWhereInput | BiometricTokenWhereInput[]
    userId?: StringFilter<"BiometricToken"> | string
    deviceId?: StringFilter<"BiometricToken"> | string
    createdAt?: DateTimeFilter<"BiometricToken"> | Date | string
    expiresAt?: DateTimeNullableFilter<"BiometricToken"> | Date | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type BiometricTokenOrderByWithAggregationInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    deviceId?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    _count?: BiometricTokenCountOrderByAggregateInput
    _max?: BiometricTokenMaxOrderByAggregateInput
    _min?: BiometricTokenMinOrderByAggregateInput
  }

  export type BiometricTokenScalarWhereWithAggregatesInput = {
    AND?: BiometricTokenScalarWhereWithAggregatesInput | BiometricTokenScalarWhereWithAggregatesInput[]
    OR?: BiometricTokenScalarWhereWithAggregatesInput[]
    NOT?: BiometricTokenScalarWhereWithAggregatesInput | BiometricTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BiometricToken"> | string
    token?: StringWithAggregatesFilter<"BiometricToken"> | string
    userId?: StringWithAggregatesFilter<"BiometricToken"> | string
    deviceId?: StringWithAggregatesFilter<"BiometricToken"> | string
    createdAt?: DateTimeWithAggregatesFilter<"BiometricToken"> | Date | string
    expiresAt?: DateTimeNullableWithAggregatesFilter<"BiometricToken"> | Date | string | null
  }

  export type TenantCreateInput = {
    id?: string
    name: string
    slug: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    logoUrl?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bssid?: string | null
    staticIp?: string | null
    latitude?: number | null
    longitude?: number | null
    menuEnabled?: boolean
    feedbackEnabled?: boolean
    staffEnabled?: boolean
    menuUrl?: string | null
    members?: TenantMemberCreateNestedManyWithoutTenantInput
    messages?: MessageCreateNestedManyWithoutTenantInput
    rooms?: RoomCreateNestedManyWithoutTenantInput
    logs?: SystemLogCreateNestedManyWithoutTenantInput
    devices?: NasDeviceCreateNestedManyWithoutTenantInput
    feedbacks?: FeedbackCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    logoUrl?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bssid?: string | null
    staticIp?: string | null
    latitude?: number | null
    longitude?: number | null
    menuEnabled?: boolean
    feedbackEnabled?: boolean
    staffEnabled?: boolean
    menuUrl?: string | null
    members?: TenantMemberUncheckedCreateNestedManyWithoutTenantInput
    messages?: MessageUncheckedCreateNestedManyWithoutTenantInput
    rooms?: RoomUncheckedCreateNestedManyWithoutTenantInput
    logs?: SystemLogUncheckedCreateNestedManyWithoutTenantInput
    devices?: NasDeviceUncheckedCreateNestedManyWithoutTenantInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bssid?: NullableStringFieldUpdateOperationsInput | string | null
    staticIp?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    menuEnabled?: BoolFieldUpdateOperationsInput | boolean
    feedbackEnabled?: BoolFieldUpdateOperationsInput | boolean
    staffEnabled?: BoolFieldUpdateOperationsInput | boolean
    menuUrl?: NullableStringFieldUpdateOperationsInput | string | null
    members?: TenantMemberUpdateManyWithoutTenantNestedInput
    messages?: MessageUpdateManyWithoutTenantNestedInput
    rooms?: RoomUpdateManyWithoutTenantNestedInput
    logs?: SystemLogUpdateManyWithoutTenantNestedInput
    devices?: NasDeviceUpdateManyWithoutTenantNestedInput
    feedbacks?: FeedbackUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bssid?: NullableStringFieldUpdateOperationsInput | string | null
    staticIp?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    menuEnabled?: BoolFieldUpdateOperationsInput | boolean
    feedbackEnabled?: BoolFieldUpdateOperationsInput | boolean
    staffEnabled?: BoolFieldUpdateOperationsInput | boolean
    menuUrl?: NullableStringFieldUpdateOperationsInput | string | null
    members?: TenantMemberUncheckedUpdateManyWithoutTenantNestedInput
    messages?: MessageUncheckedUpdateManyWithoutTenantNestedInput
    rooms?: RoomUncheckedUpdateManyWithoutTenantNestedInput
    logs?: SystemLogUncheckedUpdateManyWithoutTenantNestedInput
    devices?: NasDeviceUncheckedUpdateManyWithoutTenantNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type TenantCreateManyInput = {
    id?: string
    name: string
    slug: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    logoUrl?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bssid?: string | null
    staticIp?: string | null
    latitude?: number | null
    longitude?: number | null
    menuEnabled?: boolean
    feedbackEnabled?: boolean
    staffEnabled?: boolean
    menuUrl?: string | null
  }

  export type TenantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bssid?: NullableStringFieldUpdateOperationsInput | string | null
    staticIp?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    menuEnabled?: BoolFieldUpdateOperationsInput | boolean
    feedbackEnabled?: BoolFieldUpdateOperationsInput | boolean
    staffEnabled?: BoolFieldUpdateOperationsInput | boolean
    menuUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TenantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bssid?: NullableStringFieldUpdateOperationsInput | string | null
    staticIp?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    menuEnabled?: BoolFieldUpdateOperationsInput | boolean
    feedbackEnabled?: BoolFieldUpdateOperationsInput | boolean
    staffEnabled?: BoolFieldUpdateOperationsInput | boolean
    menuUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type NasDeviceCreateInput = {
    id?: string
    nasId?: string | null
    vpnIp?: string | null
    publicIp?: string | null
    bssid?: string | null
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutDevicesInput
  }

  export type NasDeviceUncheckedCreateInput = {
    id?: string
    nasId?: string | null
    vpnIp?: string | null
    publicIp?: string | null
    bssid?: string | null
    name?: string | null
    tenantId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NasDeviceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nasId?: NullableStringFieldUpdateOperationsInput | string | null
    vpnIp?: NullableStringFieldUpdateOperationsInput | string | null
    publicIp?: NullableStringFieldUpdateOperationsInput | string | null
    bssid?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutDevicesNestedInput
  }

  export type NasDeviceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nasId?: NullableStringFieldUpdateOperationsInput | string | null
    vpnIp?: NullableStringFieldUpdateOperationsInput | string | null
    publicIp?: NullableStringFieldUpdateOperationsInput | string | null
    bssid?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NasDeviceCreateManyInput = {
    id?: string
    nasId?: string | null
    vpnIp?: string | null
    publicIp?: string | null
    bssid?: string | null
    name?: string | null
    tenantId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NasDeviceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nasId?: NullableStringFieldUpdateOperationsInput | string | null
    vpnIp?: NullableStringFieldUpdateOperationsInput | string | null
    publicIp?: NullableStringFieldUpdateOperationsInput | string | null
    bssid?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NasDeviceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nasId?: NullableStringFieldUpdateOperationsInput | string | null
    vpnIp?: NullableStringFieldUpdateOperationsInput | string | null
    publicIp?: NullableStringFieldUpdateOperationsInput | string | null
    bssid?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: boolean | null
    image?: string | null
    phoneNumber?: string | null
    gender?: string | null
    status?: string | null
    isAnonymous?: boolean
    role?: $Enums.GlobalRole
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: TenantMemberCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutUserInput
    passkeys?: PasskeyCreateNestedManyWithoutUserInput
    feedbacks?: FeedbackCreateNestedManyWithoutUserInput
    biometricTokens?: BiometricTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: boolean | null
    image?: string | null
    phoneNumber?: string | null
    gender?: string | null
    status?: string | null
    isAnonymous?: boolean
    role?: $Enums.GlobalRole
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: TenantMemberUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput
    passkeys?: PasskeyUncheckedCreateNestedManyWithoutUserInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutUserInput
    biometricTokens?: BiometricTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumGlobalRoleFieldUpdateOperationsInput | $Enums.GlobalRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: TenantMemberUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutUserNestedInput
    passkeys?: PasskeyUpdateManyWithoutUserNestedInput
    feedbacks?: FeedbackUpdateManyWithoutUserNestedInput
    biometricTokens?: BiometricTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumGlobalRoleFieldUpdateOperationsInput | $Enums.GlobalRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: TenantMemberUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput
    passkeys?: PasskeyUncheckedUpdateManyWithoutUserNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutUserNestedInput
    biometricTokens?: BiometricTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: boolean | null
    image?: string | null
    phoneNumber?: string | null
    gender?: string | null
    status?: string | null
    isAnonymous?: boolean
    role?: $Enums.GlobalRole
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumGlobalRoleFieldUpdateOperationsInput | $Enums.GlobalRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumGlobalRoleFieldUpdateOperationsInput | $Enums.GlobalRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id?: string
    token: string
    expiresAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    userId: string
    token: string
    expiresAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    userId: string
    token: string
    expiresAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateInput = {
    id?: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    idToken?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    userId: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    idToken?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyInput = {
    id?: string
    userId: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    idToken?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCreateInput = {
    id?: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUncheckedCreateInput = {
    id?: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCreateManyInput = {
    id?: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantMemberCreateInput = {
    id?: string
    role?: $Enums.TenantRole
    canModerate?: boolean
    canManageOrders?: boolean
    canViewStats?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMembershipsInput
    tenant: TenantCreateNestedOneWithoutMembersInput
  }

  export type TenantMemberUncheckedCreateInput = {
    id?: string
    userId: string
    tenantId: string
    role?: $Enums.TenantRole
    canModerate?: boolean
    canManageOrders?: boolean
    canViewStats?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TenantMemberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumTenantRoleFieldUpdateOperationsInput | $Enums.TenantRole
    canModerate?: BoolFieldUpdateOperationsInput | boolean
    canManageOrders?: BoolFieldUpdateOperationsInput | boolean
    canViewStats?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMembershipsNestedInput
    tenant?: TenantUpdateOneRequiredWithoutMembersNestedInput
  }

  export type TenantMemberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    role?: EnumTenantRoleFieldUpdateOperationsInput | $Enums.TenantRole
    canModerate?: BoolFieldUpdateOperationsInput | boolean
    canManageOrders?: BoolFieldUpdateOperationsInput | boolean
    canViewStats?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantMemberCreateManyInput = {
    id?: string
    userId: string
    tenantId: string
    role?: $Enums.TenantRole
    canModerate?: boolean
    canManageOrders?: boolean
    canViewStats?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TenantMemberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumTenantRoleFieldUpdateOperationsInput | $Enums.TenantRole
    canModerate?: BoolFieldUpdateOperationsInput | boolean
    canManageOrders?: BoolFieldUpdateOperationsInput | boolean
    canViewStats?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantMemberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    role?: EnumTenantRoleFieldUpdateOperationsInput | $Enums.TenantRole
    canModerate?: BoolFieldUpdateOperationsInput | boolean
    canManageOrders?: BoolFieldUpdateOperationsInput | boolean
    canViewStats?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomCreateInput = {
    id?: string
    name: string
    description?: string | null
    type?: $Enums.RoomType
    createdAt?: Date | string
    tenant: TenantCreateNestedOneWithoutRoomsInput
    messages?: MessageCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    type?: $Enums.RoomType
    tenantId: string
    createdAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutRoomsNestedInput
    messages?: MessageUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type RoomCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    type?: $Enums.RoomType
    tenantId: string
    createdAt?: Date | string
  }

  export type RoomUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateInput = {
    id?: string
    text: string
    imageUrl?: string | null
    createdAt?: Date | string
    senderId: string
    senderAlias: string
    senderGender: string
    recipientId?: string | null
    room?: RoomCreateNestedOneWithoutMessagesInput
    user?: UserCreateNestedOneWithoutMessagesInput
    tenant: TenantCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateInput = {
    id?: string
    text: string
    imageUrl?: string | null
    createdAt?: Date | string
    senderId: string
    senderAlias: string
    senderGender: string
    recipientId?: string | null
    roomId?: string | null
    userId?: string | null
    tenantId: string
  }

  export type MessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    senderId?: StringFieldUpdateOperationsInput | string
    senderAlias?: StringFieldUpdateOperationsInput | string
    senderGender?: StringFieldUpdateOperationsInput | string
    recipientId?: NullableStringFieldUpdateOperationsInput | string | null
    room?: RoomUpdateOneWithoutMessagesNestedInput
    user?: UserUpdateOneWithoutMessagesNestedInput
    tenant?: TenantUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    senderId?: StringFieldUpdateOperationsInput | string
    senderAlias?: StringFieldUpdateOperationsInput | string
    senderGender?: StringFieldUpdateOperationsInput | string
    recipientId?: NullableStringFieldUpdateOperationsInput | string | null
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    tenantId?: StringFieldUpdateOperationsInput | string
  }

  export type MessageCreateManyInput = {
    id?: string
    text: string
    imageUrl?: string | null
    createdAt?: Date | string
    senderId: string
    senderAlias: string
    senderGender: string
    recipientId?: string | null
    roomId?: string | null
    userId?: string | null
    tenantId: string
  }

  export type MessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    senderId?: StringFieldUpdateOperationsInput | string
    senderAlias?: StringFieldUpdateOperationsInput | string
    senderGender?: StringFieldUpdateOperationsInput | string
    recipientId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    senderId?: StringFieldUpdateOperationsInput | string
    senderAlias?: StringFieldUpdateOperationsInput | string
    senderGender?: StringFieldUpdateOperationsInput | string
    recipientId?: NullableStringFieldUpdateOperationsInput | string | null
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    tenantId?: StringFieldUpdateOperationsInput | string
  }

  export type SystemLogCreateInput = {
    id?: string
    event: string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    tenant?: TenantCreateNestedOneWithoutLogsInput
  }

  export type SystemLogUncheckedCreateInput = {
    id?: string
    event: string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    tenantId?: string | null
  }

  export type SystemLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    event?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneWithoutLogsNestedInput
  }

  export type SystemLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    event?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SystemLogCreateManyInput = {
    id?: string
    event: string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    tenantId?: string | null
  }

  export type SystemLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    event?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    event?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PasskeyCreateInput = {
    id: string
    name?: string | null
    publicKey: string
    credentialID: string
    counter: number
    deviceType: string
    backedUp: boolean
    transports?: string | null
    aaguid?: string | null
    createdAt?: Date | string | null
    user: UserCreateNestedOneWithoutPasskeysInput
  }

  export type PasskeyUncheckedCreateInput = {
    id: string
    name?: string | null
    publicKey: string
    userId: string
    credentialID: string
    counter: number
    deviceType: string
    backedUp: boolean
    transports?: string | null
    aaguid?: string | null
    createdAt?: Date | string | null
  }

  export type PasskeyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    publicKey?: StringFieldUpdateOperationsInput | string
    credentialID?: StringFieldUpdateOperationsInput | string
    counter?: IntFieldUpdateOperationsInput | number
    deviceType?: StringFieldUpdateOperationsInput | string
    backedUp?: BoolFieldUpdateOperationsInput | boolean
    transports?: NullableStringFieldUpdateOperationsInput | string | null
    aaguid?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutPasskeysNestedInput
  }

  export type PasskeyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    publicKey?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    credentialID?: StringFieldUpdateOperationsInput | string
    counter?: IntFieldUpdateOperationsInput | number
    deviceType?: StringFieldUpdateOperationsInput | string
    backedUp?: BoolFieldUpdateOperationsInput | boolean
    transports?: NullableStringFieldUpdateOperationsInput | string | null
    aaguid?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PasskeyCreateManyInput = {
    id: string
    name?: string | null
    publicKey: string
    userId: string
    credentialID: string
    counter: number
    deviceType: string
    backedUp: boolean
    transports?: string | null
    aaguid?: string | null
    createdAt?: Date | string | null
  }

  export type PasskeyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    publicKey?: StringFieldUpdateOperationsInput | string
    credentialID?: StringFieldUpdateOperationsInput | string
    counter?: IntFieldUpdateOperationsInput | number
    deviceType?: StringFieldUpdateOperationsInput | string
    backedUp?: BoolFieldUpdateOperationsInput | boolean
    transports?: NullableStringFieldUpdateOperationsInput | string | null
    aaguid?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PasskeyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    publicKey?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    credentialID?: StringFieldUpdateOperationsInput | string
    counter?: IntFieldUpdateOperationsInput | number
    deviceType?: StringFieldUpdateOperationsInput | string
    backedUp?: BoolFieldUpdateOperationsInput | boolean
    transports?: NullableStringFieldUpdateOperationsInput | string | null
    aaguid?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FeedbackCreateInput = {
    id?: string
    score: number
    comment?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFeedbacksInput
    tenant: TenantCreateNestedOneWithoutFeedbacksInput
  }

  export type FeedbackUncheckedCreateInput = {
    id?: string
    score: number
    comment?: string | null
    userId: string
    tenantId: string
    createdAt?: Date | string
  }

  export type FeedbackUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFeedbacksNestedInput
    tenant?: TenantUpdateOneRequiredWithoutFeedbacksNestedInput
  }

  export type FeedbackUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackCreateManyInput = {
    id?: string
    score: number
    comment?: string | null
    userId: string
    tenantId: string
    createdAt?: Date | string
  }

  export type FeedbackUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BiometricTokenCreateInput = {
    id?: string
    token: string
    deviceId: string
    createdAt?: Date | string
    expiresAt?: Date | string | null
    user: UserCreateNestedOneWithoutBiometricTokensInput
  }

  export type BiometricTokenUncheckedCreateInput = {
    id?: string
    token: string
    userId: string
    deviceId: string
    createdAt?: Date | string
    expiresAt?: Date | string | null
  }

  export type BiometricTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutBiometricTokensNestedInput
  }

  export type BiometricTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BiometricTokenCreateManyInput = {
    id?: string
    token: string
    userId: string
    deviceId: string
    createdAt?: Date | string
    expiresAt?: Date | string | null
  }

  export type BiometricTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BiometricTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type TenantMemberListRelationFilter = {
    every?: TenantMemberWhereInput
    some?: TenantMemberWhereInput
    none?: TenantMemberWhereInput
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type RoomListRelationFilter = {
    every?: RoomWhereInput
    some?: RoomWhereInput
    none?: RoomWhereInput
  }

  export type SystemLogListRelationFilter = {
    every?: SystemLogWhereInput
    some?: SystemLogWhereInput
    none?: SystemLogWhereInput
  }

  export type NasDeviceListRelationFilter = {
    every?: NasDeviceWhereInput
    some?: NasDeviceWhereInput
    none?: NasDeviceWhereInput
  }

  export type FeedbackListRelationFilter = {
    every?: FeedbackWhereInput
    some?: FeedbackWhereInput
    none?: FeedbackWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TenantMemberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoomOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SystemLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NasDeviceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FeedbackOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TenantCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    metadata?: SortOrder
    logoUrl?: SortOrder
    address?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    bssid?: SortOrder
    staticIp?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    menuEnabled?: SortOrder
    feedbackEnabled?: SortOrder
    staffEnabled?: SortOrder
    menuUrl?: SortOrder
  }

  export type TenantAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type TenantMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    logoUrl?: SortOrder
    address?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    bssid?: SortOrder
    staticIp?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    menuEnabled?: SortOrder
    feedbackEnabled?: SortOrder
    staffEnabled?: SortOrder
    menuUrl?: SortOrder
  }

  export type TenantMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    logoUrl?: SortOrder
    address?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    bssid?: SortOrder
    staticIp?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    menuEnabled?: SortOrder
    feedbackEnabled?: SortOrder
    staffEnabled?: SortOrder
    menuUrl?: SortOrder
  }

  export type TenantSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type TenantRelationFilter = {
    is?: TenantWhereInput
    isNot?: TenantWhereInput
  }

  export type NasDeviceCountOrderByAggregateInput = {
    id?: SortOrder
    nasId?: SortOrder
    vpnIp?: SortOrder
    publicIp?: SortOrder
    bssid?: SortOrder
    name?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NasDeviceMaxOrderByAggregateInput = {
    id?: SortOrder
    nasId?: SortOrder
    vpnIp?: SortOrder
    publicIp?: SortOrder
    bssid?: SortOrder
    name?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NasDeviceMinOrderByAggregateInput = {
    id?: SortOrder
    nasId?: SortOrder
    vpnIp?: SortOrder
    publicIp?: SortOrder
    bssid?: SortOrder
    name?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type EnumGlobalRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.GlobalRole | EnumGlobalRoleFieldRefInput<$PrismaModel>
    in?: $Enums.GlobalRole[] | ListEnumGlobalRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.GlobalRole[] | ListEnumGlobalRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumGlobalRoleFilter<$PrismaModel> | $Enums.GlobalRole
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type PasskeyListRelationFilter = {
    every?: PasskeyWhereInput
    some?: PasskeyWhereInput
    none?: PasskeyWhereInput
  }

  export type BiometricTokenListRelationFilter = {
    every?: BiometricTokenWhereInput
    some?: BiometricTokenWhereInput
    none?: BiometricTokenWhereInput
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PasskeyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BiometricTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    phoneNumber?: SortOrder
    gender?: SortOrder
    status?: SortOrder
    isAnonymous?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    phoneNumber?: SortOrder
    gender?: SortOrder
    status?: SortOrder
    isAnonymous?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    phoneNumber?: SortOrder
    gender?: SortOrder
    status?: SortOrder
    isAnonymous?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type EnumGlobalRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GlobalRole | EnumGlobalRoleFieldRefInput<$PrismaModel>
    in?: $Enums.GlobalRole[] | ListEnumGlobalRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.GlobalRole[] | ListEnumGlobalRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumGlobalRoleWithAggregatesFilter<$PrismaModel> | $Enums.GlobalRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGlobalRoleFilter<$PrismaModel>
    _max?: NestedEnumGlobalRoleFilter<$PrismaModel>
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    idToken?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    idToken?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    idToken?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type VerificationCountOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMaxOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMinOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumTenantRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.TenantRole | EnumTenantRoleFieldRefInput<$PrismaModel>
    in?: $Enums.TenantRole[] | ListEnumTenantRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.TenantRole[] | ListEnumTenantRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumTenantRoleFilter<$PrismaModel> | $Enums.TenantRole
  }

  export type TenantMemberUserIdTenantIdCompoundUniqueInput = {
    userId: string
    tenantId: string
  }

  export type TenantMemberCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tenantId?: SortOrder
    role?: SortOrder
    canModerate?: SortOrder
    canManageOrders?: SortOrder
    canViewStats?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TenantMemberMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tenantId?: SortOrder
    role?: SortOrder
    canModerate?: SortOrder
    canManageOrders?: SortOrder
    canViewStats?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TenantMemberMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tenantId?: SortOrder
    role?: SortOrder
    canModerate?: SortOrder
    canManageOrders?: SortOrder
    canViewStats?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumTenantRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TenantRole | EnumTenantRoleFieldRefInput<$PrismaModel>
    in?: $Enums.TenantRole[] | ListEnumTenantRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.TenantRole[] | ListEnumTenantRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumTenantRoleWithAggregatesFilter<$PrismaModel> | $Enums.TenantRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTenantRoleFilter<$PrismaModel>
    _max?: NestedEnumTenantRoleFilter<$PrismaModel>
  }

  export type EnumRoomTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomType | EnumRoomTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RoomType[] | ListEnumRoomTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoomType[] | ListEnumRoomTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRoomTypeFilter<$PrismaModel> | $Enums.RoomType
  }

  export type RoomCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    type?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
  }

  export type RoomMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    type?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
  }

  export type RoomMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    type?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumRoomTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomType | EnumRoomTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RoomType[] | ListEnumRoomTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoomType[] | ListEnumRoomTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRoomTypeWithAggregatesFilter<$PrismaModel> | $Enums.RoomType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoomTypeFilter<$PrismaModel>
    _max?: NestedEnumRoomTypeFilter<$PrismaModel>
  }

  export type RoomNullableRelationFilter = {
    is?: RoomWhereInput | null
    isNot?: RoomWhereInput | null
  }

  export type UserNullableRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    senderId?: SortOrder
    senderAlias?: SortOrder
    senderGender?: SortOrder
    recipientId?: SortOrder
    roomId?: SortOrder
    userId?: SortOrder
    tenantId?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    senderId?: SortOrder
    senderAlias?: SortOrder
    senderGender?: SortOrder
    recipientId?: SortOrder
    roomId?: SortOrder
    userId?: SortOrder
    tenantId?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    senderId?: SortOrder
    senderAlias?: SortOrder
    senderGender?: SortOrder
    recipientId?: SortOrder
    roomId?: SortOrder
    userId?: SortOrder
    tenantId?: SortOrder
  }

  export type TenantNullableRelationFilter = {
    is?: TenantWhereInput | null
    isNot?: TenantWhereInput | null
  }

  export type SystemLogCountOrderByAggregateInput = {
    id?: SortOrder
    event?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
    tenantId?: SortOrder
  }

  export type SystemLogMaxOrderByAggregateInput = {
    id?: SortOrder
    event?: SortOrder
    createdAt?: SortOrder
    tenantId?: SortOrder
  }

  export type SystemLogMinOrderByAggregateInput = {
    id?: SortOrder
    event?: SortOrder
    createdAt?: SortOrder
    tenantId?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type PasskeyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    publicKey?: SortOrder
    userId?: SortOrder
    credentialID?: SortOrder
    counter?: SortOrder
    deviceType?: SortOrder
    backedUp?: SortOrder
    transports?: SortOrder
    aaguid?: SortOrder
    createdAt?: SortOrder
  }

  export type PasskeyAvgOrderByAggregateInput = {
    counter?: SortOrder
  }

  export type PasskeyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    publicKey?: SortOrder
    userId?: SortOrder
    credentialID?: SortOrder
    counter?: SortOrder
    deviceType?: SortOrder
    backedUp?: SortOrder
    transports?: SortOrder
    aaguid?: SortOrder
    createdAt?: SortOrder
  }

  export type PasskeyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    publicKey?: SortOrder
    userId?: SortOrder
    credentialID?: SortOrder
    counter?: SortOrder
    deviceType?: SortOrder
    backedUp?: SortOrder
    transports?: SortOrder
    aaguid?: SortOrder
    createdAt?: SortOrder
  }

  export type PasskeySumOrderByAggregateInput = {
    counter?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FeedbackCountOrderByAggregateInput = {
    id?: SortOrder
    score?: SortOrder
    comment?: SortOrder
    userId?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
  }

  export type FeedbackAvgOrderByAggregateInput = {
    score?: SortOrder
  }

  export type FeedbackMaxOrderByAggregateInput = {
    id?: SortOrder
    score?: SortOrder
    comment?: SortOrder
    userId?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
  }

  export type FeedbackMinOrderByAggregateInput = {
    id?: SortOrder
    score?: SortOrder
    comment?: SortOrder
    userId?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
  }

  export type FeedbackSumOrderByAggregateInput = {
    score?: SortOrder
  }

  export type BiometricTokenCountOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    deviceId?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type BiometricTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    deviceId?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type BiometricTokenMinOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    deviceId?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type TenantMemberCreateNestedManyWithoutTenantInput = {
    create?: XOR<TenantMemberCreateWithoutTenantInput, TenantMemberUncheckedCreateWithoutTenantInput> | TenantMemberCreateWithoutTenantInput[] | TenantMemberUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: TenantMemberCreateOrConnectWithoutTenantInput | TenantMemberCreateOrConnectWithoutTenantInput[]
    createMany?: TenantMemberCreateManyTenantInputEnvelope
    connect?: TenantMemberWhereUniqueInput | TenantMemberWhereUniqueInput[]
  }

  export type MessageCreateNestedManyWithoutTenantInput = {
    create?: XOR<MessageCreateWithoutTenantInput, MessageUncheckedCreateWithoutTenantInput> | MessageCreateWithoutTenantInput[] | MessageUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutTenantInput | MessageCreateOrConnectWithoutTenantInput[]
    createMany?: MessageCreateManyTenantInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type RoomCreateNestedManyWithoutTenantInput = {
    create?: XOR<RoomCreateWithoutTenantInput, RoomUncheckedCreateWithoutTenantInput> | RoomCreateWithoutTenantInput[] | RoomUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutTenantInput | RoomCreateOrConnectWithoutTenantInput[]
    createMany?: RoomCreateManyTenantInputEnvelope
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
  }

  export type SystemLogCreateNestedManyWithoutTenantInput = {
    create?: XOR<SystemLogCreateWithoutTenantInput, SystemLogUncheckedCreateWithoutTenantInput> | SystemLogCreateWithoutTenantInput[] | SystemLogUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: SystemLogCreateOrConnectWithoutTenantInput | SystemLogCreateOrConnectWithoutTenantInput[]
    createMany?: SystemLogCreateManyTenantInputEnvelope
    connect?: SystemLogWhereUniqueInput | SystemLogWhereUniqueInput[]
  }

  export type NasDeviceCreateNestedManyWithoutTenantInput = {
    create?: XOR<NasDeviceCreateWithoutTenantInput, NasDeviceUncheckedCreateWithoutTenantInput> | NasDeviceCreateWithoutTenantInput[] | NasDeviceUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: NasDeviceCreateOrConnectWithoutTenantInput | NasDeviceCreateOrConnectWithoutTenantInput[]
    createMany?: NasDeviceCreateManyTenantInputEnvelope
    connect?: NasDeviceWhereUniqueInput | NasDeviceWhereUniqueInput[]
  }

  export type FeedbackCreateNestedManyWithoutTenantInput = {
    create?: XOR<FeedbackCreateWithoutTenantInput, FeedbackUncheckedCreateWithoutTenantInput> | FeedbackCreateWithoutTenantInput[] | FeedbackUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutTenantInput | FeedbackCreateOrConnectWithoutTenantInput[]
    createMany?: FeedbackCreateManyTenantInputEnvelope
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
  }

  export type TenantMemberUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<TenantMemberCreateWithoutTenantInput, TenantMemberUncheckedCreateWithoutTenantInput> | TenantMemberCreateWithoutTenantInput[] | TenantMemberUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: TenantMemberCreateOrConnectWithoutTenantInput | TenantMemberCreateOrConnectWithoutTenantInput[]
    createMany?: TenantMemberCreateManyTenantInputEnvelope
    connect?: TenantMemberWhereUniqueInput | TenantMemberWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<MessageCreateWithoutTenantInput, MessageUncheckedCreateWithoutTenantInput> | MessageCreateWithoutTenantInput[] | MessageUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutTenantInput | MessageCreateOrConnectWithoutTenantInput[]
    createMany?: MessageCreateManyTenantInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type RoomUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<RoomCreateWithoutTenantInput, RoomUncheckedCreateWithoutTenantInput> | RoomCreateWithoutTenantInput[] | RoomUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutTenantInput | RoomCreateOrConnectWithoutTenantInput[]
    createMany?: RoomCreateManyTenantInputEnvelope
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
  }

  export type SystemLogUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<SystemLogCreateWithoutTenantInput, SystemLogUncheckedCreateWithoutTenantInput> | SystemLogCreateWithoutTenantInput[] | SystemLogUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: SystemLogCreateOrConnectWithoutTenantInput | SystemLogCreateOrConnectWithoutTenantInput[]
    createMany?: SystemLogCreateManyTenantInputEnvelope
    connect?: SystemLogWhereUniqueInput | SystemLogWhereUniqueInput[]
  }

  export type NasDeviceUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<NasDeviceCreateWithoutTenantInput, NasDeviceUncheckedCreateWithoutTenantInput> | NasDeviceCreateWithoutTenantInput[] | NasDeviceUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: NasDeviceCreateOrConnectWithoutTenantInput | NasDeviceCreateOrConnectWithoutTenantInput[]
    createMany?: NasDeviceCreateManyTenantInputEnvelope
    connect?: NasDeviceWhereUniqueInput | NasDeviceWhereUniqueInput[]
  }

  export type FeedbackUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<FeedbackCreateWithoutTenantInput, FeedbackUncheckedCreateWithoutTenantInput> | FeedbackCreateWithoutTenantInput[] | FeedbackUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutTenantInput | FeedbackCreateOrConnectWithoutTenantInput[]
    createMany?: FeedbackCreateManyTenantInputEnvelope
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type TenantMemberUpdateManyWithoutTenantNestedInput = {
    create?: XOR<TenantMemberCreateWithoutTenantInput, TenantMemberUncheckedCreateWithoutTenantInput> | TenantMemberCreateWithoutTenantInput[] | TenantMemberUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: TenantMemberCreateOrConnectWithoutTenantInput | TenantMemberCreateOrConnectWithoutTenantInput[]
    upsert?: TenantMemberUpsertWithWhereUniqueWithoutTenantInput | TenantMemberUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: TenantMemberCreateManyTenantInputEnvelope
    set?: TenantMemberWhereUniqueInput | TenantMemberWhereUniqueInput[]
    disconnect?: TenantMemberWhereUniqueInput | TenantMemberWhereUniqueInput[]
    delete?: TenantMemberWhereUniqueInput | TenantMemberWhereUniqueInput[]
    connect?: TenantMemberWhereUniqueInput | TenantMemberWhereUniqueInput[]
    update?: TenantMemberUpdateWithWhereUniqueWithoutTenantInput | TenantMemberUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: TenantMemberUpdateManyWithWhereWithoutTenantInput | TenantMemberUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: TenantMemberScalarWhereInput | TenantMemberScalarWhereInput[]
  }

  export type MessageUpdateManyWithoutTenantNestedInput = {
    create?: XOR<MessageCreateWithoutTenantInput, MessageUncheckedCreateWithoutTenantInput> | MessageCreateWithoutTenantInput[] | MessageUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutTenantInput | MessageCreateOrConnectWithoutTenantInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutTenantInput | MessageUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: MessageCreateManyTenantInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutTenantInput | MessageUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutTenantInput | MessageUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type RoomUpdateManyWithoutTenantNestedInput = {
    create?: XOR<RoomCreateWithoutTenantInput, RoomUncheckedCreateWithoutTenantInput> | RoomCreateWithoutTenantInput[] | RoomUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutTenantInput | RoomCreateOrConnectWithoutTenantInput[]
    upsert?: RoomUpsertWithWhereUniqueWithoutTenantInput | RoomUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: RoomCreateManyTenantInputEnvelope
    set?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    disconnect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    delete?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    update?: RoomUpdateWithWhereUniqueWithoutTenantInput | RoomUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: RoomUpdateManyWithWhereWithoutTenantInput | RoomUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: RoomScalarWhereInput | RoomScalarWhereInput[]
  }

  export type SystemLogUpdateManyWithoutTenantNestedInput = {
    create?: XOR<SystemLogCreateWithoutTenantInput, SystemLogUncheckedCreateWithoutTenantInput> | SystemLogCreateWithoutTenantInput[] | SystemLogUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: SystemLogCreateOrConnectWithoutTenantInput | SystemLogCreateOrConnectWithoutTenantInput[]
    upsert?: SystemLogUpsertWithWhereUniqueWithoutTenantInput | SystemLogUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: SystemLogCreateManyTenantInputEnvelope
    set?: SystemLogWhereUniqueInput | SystemLogWhereUniqueInput[]
    disconnect?: SystemLogWhereUniqueInput | SystemLogWhereUniqueInput[]
    delete?: SystemLogWhereUniqueInput | SystemLogWhereUniqueInput[]
    connect?: SystemLogWhereUniqueInput | SystemLogWhereUniqueInput[]
    update?: SystemLogUpdateWithWhereUniqueWithoutTenantInput | SystemLogUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: SystemLogUpdateManyWithWhereWithoutTenantInput | SystemLogUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: SystemLogScalarWhereInput | SystemLogScalarWhereInput[]
  }

  export type NasDeviceUpdateManyWithoutTenantNestedInput = {
    create?: XOR<NasDeviceCreateWithoutTenantInput, NasDeviceUncheckedCreateWithoutTenantInput> | NasDeviceCreateWithoutTenantInput[] | NasDeviceUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: NasDeviceCreateOrConnectWithoutTenantInput | NasDeviceCreateOrConnectWithoutTenantInput[]
    upsert?: NasDeviceUpsertWithWhereUniqueWithoutTenantInput | NasDeviceUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: NasDeviceCreateManyTenantInputEnvelope
    set?: NasDeviceWhereUniqueInput | NasDeviceWhereUniqueInput[]
    disconnect?: NasDeviceWhereUniqueInput | NasDeviceWhereUniqueInput[]
    delete?: NasDeviceWhereUniqueInput | NasDeviceWhereUniqueInput[]
    connect?: NasDeviceWhereUniqueInput | NasDeviceWhereUniqueInput[]
    update?: NasDeviceUpdateWithWhereUniqueWithoutTenantInput | NasDeviceUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: NasDeviceUpdateManyWithWhereWithoutTenantInput | NasDeviceUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: NasDeviceScalarWhereInput | NasDeviceScalarWhereInput[]
  }

  export type FeedbackUpdateManyWithoutTenantNestedInput = {
    create?: XOR<FeedbackCreateWithoutTenantInput, FeedbackUncheckedCreateWithoutTenantInput> | FeedbackCreateWithoutTenantInput[] | FeedbackUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutTenantInput | FeedbackCreateOrConnectWithoutTenantInput[]
    upsert?: FeedbackUpsertWithWhereUniqueWithoutTenantInput | FeedbackUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: FeedbackCreateManyTenantInputEnvelope
    set?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    disconnect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    delete?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    update?: FeedbackUpdateWithWhereUniqueWithoutTenantInput | FeedbackUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: FeedbackUpdateManyWithWhereWithoutTenantInput | FeedbackUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
  }

  export type TenantMemberUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<TenantMemberCreateWithoutTenantInput, TenantMemberUncheckedCreateWithoutTenantInput> | TenantMemberCreateWithoutTenantInput[] | TenantMemberUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: TenantMemberCreateOrConnectWithoutTenantInput | TenantMemberCreateOrConnectWithoutTenantInput[]
    upsert?: TenantMemberUpsertWithWhereUniqueWithoutTenantInput | TenantMemberUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: TenantMemberCreateManyTenantInputEnvelope
    set?: TenantMemberWhereUniqueInput | TenantMemberWhereUniqueInput[]
    disconnect?: TenantMemberWhereUniqueInput | TenantMemberWhereUniqueInput[]
    delete?: TenantMemberWhereUniqueInput | TenantMemberWhereUniqueInput[]
    connect?: TenantMemberWhereUniqueInput | TenantMemberWhereUniqueInput[]
    update?: TenantMemberUpdateWithWhereUniqueWithoutTenantInput | TenantMemberUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: TenantMemberUpdateManyWithWhereWithoutTenantInput | TenantMemberUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: TenantMemberScalarWhereInput | TenantMemberScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<MessageCreateWithoutTenantInput, MessageUncheckedCreateWithoutTenantInput> | MessageCreateWithoutTenantInput[] | MessageUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutTenantInput | MessageCreateOrConnectWithoutTenantInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutTenantInput | MessageUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: MessageCreateManyTenantInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutTenantInput | MessageUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutTenantInput | MessageUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type RoomUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<RoomCreateWithoutTenantInput, RoomUncheckedCreateWithoutTenantInput> | RoomCreateWithoutTenantInput[] | RoomUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutTenantInput | RoomCreateOrConnectWithoutTenantInput[]
    upsert?: RoomUpsertWithWhereUniqueWithoutTenantInput | RoomUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: RoomCreateManyTenantInputEnvelope
    set?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    disconnect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    delete?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    update?: RoomUpdateWithWhereUniqueWithoutTenantInput | RoomUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: RoomUpdateManyWithWhereWithoutTenantInput | RoomUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: RoomScalarWhereInput | RoomScalarWhereInput[]
  }

  export type SystemLogUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<SystemLogCreateWithoutTenantInput, SystemLogUncheckedCreateWithoutTenantInput> | SystemLogCreateWithoutTenantInput[] | SystemLogUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: SystemLogCreateOrConnectWithoutTenantInput | SystemLogCreateOrConnectWithoutTenantInput[]
    upsert?: SystemLogUpsertWithWhereUniqueWithoutTenantInput | SystemLogUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: SystemLogCreateManyTenantInputEnvelope
    set?: SystemLogWhereUniqueInput | SystemLogWhereUniqueInput[]
    disconnect?: SystemLogWhereUniqueInput | SystemLogWhereUniqueInput[]
    delete?: SystemLogWhereUniqueInput | SystemLogWhereUniqueInput[]
    connect?: SystemLogWhereUniqueInput | SystemLogWhereUniqueInput[]
    update?: SystemLogUpdateWithWhereUniqueWithoutTenantInput | SystemLogUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: SystemLogUpdateManyWithWhereWithoutTenantInput | SystemLogUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: SystemLogScalarWhereInput | SystemLogScalarWhereInput[]
  }

  export type NasDeviceUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<NasDeviceCreateWithoutTenantInput, NasDeviceUncheckedCreateWithoutTenantInput> | NasDeviceCreateWithoutTenantInput[] | NasDeviceUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: NasDeviceCreateOrConnectWithoutTenantInput | NasDeviceCreateOrConnectWithoutTenantInput[]
    upsert?: NasDeviceUpsertWithWhereUniqueWithoutTenantInput | NasDeviceUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: NasDeviceCreateManyTenantInputEnvelope
    set?: NasDeviceWhereUniqueInput | NasDeviceWhereUniqueInput[]
    disconnect?: NasDeviceWhereUniqueInput | NasDeviceWhereUniqueInput[]
    delete?: NasDeviceWhereUniqueInput | NasDeviceWhereUniqueInput[]
    connect?: NasDeviceWhereUniqueInput | NasDeviceWhereUniqueInput[]
    update?: NasDeviceUpdateWithWhereUniqueWithoutTenantInput | NasDeviceUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: NasDeviceUpdateManyWithWhereWithoutTenantInput | NasDeviceUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: NasDeviceScalarWhereInput | NasDeviceScalarWhereInput[]
  }

  export type FeedbackUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<FeedbackCreateWithoutTenantInput, FeedbackUncheckedCreateWithoutTenantInput> | FeedbackCreateWithoutTenantInput[] | FeedbackUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutTenantInput | FeedbackCreateOrConnectWithoutTenantInput[]
    upsert?: FeedbackUpsertWithWhereUniqueWithoutTenantInput | FeedbackUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: FeedbackCreateManyTenantInputEnvelope
    set?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    disconnect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    delete?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    update?: FeedbackUpdateWithWhereUniqueWithoutTenantInput | FeedbackUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: FeedbackUpdateManyWithWhereWithoutTenantInput | FeedbackUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
  }

  export type TenantCreateNestedOneWithoutDevicesInput = {
    create?: XOR<TenantCreateWithoutDevicesInput, TenantUncheckedCreateWithoutDevicesInput>
    connectOrCreate?: TenantCreateOrConnectWithoutDevicesInput
    connect?: TenantWhereUniqueInput
  }

  export type TenantUpdateOneRequiredWithoutDevicesNestedInput = {
    create?: XOR<TenantCreateWithoutDevicesInput, TenantUncheckedCreateWithoutDevicesInput>
    connectOrCreate?: TenantCreateOrConnectWithoutDevicesInput
    upsert?: TenantUpsertWithoutDevicesInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutDevicesInput, TenantUpdateWithoutDevicesInput>, TenantUncheckedUpdateWithoutDevicesInput>
  }

  export type TenantMemberCreateNestedManyWithoutUserInput = {
    create?: XOR<TenantMemberCreateWithoutUserInput, TenantMemberUncheckedCreateWithoutUserInput> | TenantMemberCreateWithoutUserInput[] | TenantMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TenantMemberCreateOrConnectWithoutUserInput | TenantMemberCreateOrConnectWithoutUserInput[]
    createMany?: TenantMemberCreateManyUserInputEnvelope
    connect?: TenantMemberWhereUniqueInput | TenantMemberWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type MessageCreateNestedManyWithoutUserInput = {
    create?: XOR<MessageCreateWithoutUserInput, MessageUncheckedCreateWithoutUserInput> | MessageCreateWithoutUserInput[] | MessageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutUserInput | MessageCreateOrConnectWithoutUserInput[]
    createMany?: MessageCreateManyUserInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type PasskeyCreateNestedManyWithoutUserInput = {
    create?: XOR<PasskeyCreateWithoutUserInput, PasskeyUncheckedCreateWithoutUserInput> | PasskeyCreateWithoutUserInput[] | PasskeyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasskeyCreateOrConnectWithoutUserInput | PasskeyCreateOrConnectWithoutUserInput[]
    createMany?: PasskeyCreateManyUserInputEnvelope
    connect?: PasskeyWhereUniqueInput | PasskeyWhereUniqueInput[]
  }

  export type FeedbackCreateNestedManyWithoutUserInput = {
    create?: XOR<FeedbackCreateWithoutUserInput, FeedbackUncheckedCreateWithoutUserInput> | FeedbackCreateWithoutUserInput[] | FeedbackUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutUserInput | FeedbackCreateOrConnectWithoutUserInput[]
    createMany?: FeedbackCreateManyUserInputEnvelope
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
  }

  export type BiometricTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<BiometricTokenCreateWithoutUserInput, BiometricTokenUncheckedCreateWithoutUserInput> | BiometricTokenCreateWithoutUserInput[] | BiometricTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BiometricTokenCreateOrConnectWithoutUserInput | BiometricTokenCreateOrConnectWithoutUserInput[]
    createMany?: BiometricTokenCreateManyUserInputEnvelope
    connect?: BiometricTokenWhereUniqueInput | BiometricTokenWhereUniqueInput[]
  }

  export type TenantMemberUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TenantMemberCreateWithoutUserInput, TenantMemberUncheckedCreateWithoutUserInput> | TenantMemberCreateWithoutUserInput[] | TenantMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TenantMemberCreateOrConnectWithoutUserInput | TenantMemberCreateOrConnectWithoutUserInput[]
    createMany?: TenantMemberCreateManyUserInputEnvelope
    connect?: TenantMemberWhereUniqueInput | TenantMemberWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MessageCreateWithoutUserInput, MessageUncheckedCreateWithoutUserInput> | MessageCreateWithoutUserInput[] | MessageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutUserInput | MessageCreateOrConnectWithoutUserInput[]
    createMany?: MessageCreateManyUserInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type PasskeyUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PasskeyCreateWithoutUserInput, PasskeyUncheckedCreateWithoutUserInput> | PasskeyCreateWithoutUserInput[] | PasskeyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasskeyCreateOrConnectWithoutUserInput | PasskeyCreateOrConnectWithoutUserInput[]
    createMany?: PasskeyCreateManyUserInputEnvelope
    connect?: PasskeyWhereUniqueInput | PasskeyWhereUniqueInput[]
  }

  export type FeedbackUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FeedbackCreateWithoutUserInput, FeedbackUncheckedCreateWithoutUserInput> | FeedbackCreateWithoutUserInput[] | FeedbackUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutUserInput | FeedbackCreateOrConnectWithoutUserInput[]
    createMany?: FeedbackCreateManyUserInputEnvelope
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
  }

  export type BiometricTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<BiometricTokenCreateWithoutUserInput, BiometricTokenUncheckedCreateWithoutUserInput> | BiometricTokenCreateWithoutUserInput[] | BiometricTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BiometricTokenCreateOrConnectWithoutUserInput | BiometricTokenCreateOrConnectWithoutUserInput[]
    createMany?: BiometricTokenCreateManyUserInputEnvelope
    connect?: BiometricTokenWhereUniqueInput | BiometricTokenWhereUniqueInput[]
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type EnumGlobalRoleFieldUpdateOperationsInput = {
    set?: $Enums.GlobalRole
  }

  export type TenantMemberUpdateManyWithoutUserNestedInput = {
    create?: XOR<TenantMemberCreateWithoutUserInput, TenantMemberUncheckedCreateWithoutUserInput> | TenantMemberCreateWithoutUserInput[] | TenantMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TenantMemberCreateOrConnectWithoutUserInput | TenantMemberCreateOrConnectWithoutUserInput[]
    upsert?: TenantMemberUpsertWithWhereUniqueWithoutUserInput | TenantMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TenantMemberCreateManyUserInputEnvelope
    set?: TenantMemberWhereUniqueInput | TenantMemberWhereUniqueInput[]
    disconnect?: TenantMemberWhereUniqueInput | TenantMemberWhereUniqueInput[]
    delete?: TenantMemberWhereUniqueInput | TenantMemberWhereUniqueInput[]
    connect?: TenantMemberWhereUniqueInput | TenantMemberWhereUniqueInput[]
    update?: TenantMemberUpdateWithWhereUniqueWithoutUserInput | TenantMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TenantMemberUpdateManyWithWhereWithoutUserInput | TenantMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TenantMemberScalarWhereInput | TenantMemberScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type MessageUpdateManyWithoutUserNestedInput = {
    create?: XOR<MessageCreateWithoutUserInput, MessageUncheckedCreateWithoutUserInput> | MessageCreateWithoutUserInput[] | MessageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutUserInput | MessageCreateOrConnectWithoutUserInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutUserInput | MessageUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MessageCreateManyUserInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutUserInput | MessageUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutUserInput | MessageUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type PasskeyUpdateManyWithoutUserNestedInput = {
    create?: XOR<PasskeyCreateWithoutUserInput, PasskeyUncheckedCreateWithoutUserInput> | PasskeyCreateWithoutUserInput[] | PasskeyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasskeyCreateOrConnectWithoutUserInput | PasskeyCreateOrConnectWithoutUserInput[]
    upsert?: PasskeyUpsertWithWhereUniqueWithoutUserInput | PasskeyUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PasskeyCreateManyUserInputEnvelope
    set?: PasskeyWhereUniqueInput | PasskeyWhereUniqueInput[]
    disconnect?: PasskeyWhereUniqueInput | PasskeyWhereUniqueInput[]
    delete?: PasskeyWhereUniqueInput | PasskeyWhereUniqueInput[]
    connect?: PasskeyWhereUniqueInput | PasskeyWhereUniqueInput[]
    update?: PasskeyUpdateWithWhereUniqueWithoutUserInput | PasskeyUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PasskeyUpdateManyWithWhereWithoutUserInput | PasskeyUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PasskeyScalarWhereInput | PasskeyScalarWhereInput[]
  }

  export type FeedbackUpdateManyWithoutUserNestedInput = {
    create?: XOR<FeedbackCreateWithoutUserInput, FeedbackUncheckedCreateWithoutUserInput> | FeedbackCreateWithoutUserInput[] | FeedbackUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutUserInput | FeedbackCreateOrConnectWithoutUserInput[]
    upsert?: FeedbackUpsertWithWhereUniqueWithoutUserInput | FeedbackUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FeedbackCreateManyUserInputEnvelope
    set?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    disconnect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    delete?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    update?: FeedbackUpdateWithWhereUniqueWithoutUserInput | FeedbackUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FeedbackUpdateManyWithWhereWithoutUserInput | FeedbackUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
  }

  export type BiometricTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<BiometricTokenCreateWithoutUserInput, BiometricTokenUncheckedCreateWithoutUserInput> | BiometricTokenCreateWithoutUserInput[] | BiometricTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BiometricTokenCreateOrConnectWithoutUserInput | BiometricTokenCreateOrConnectWithoutUserInput[]
    upsert?: BiometricTokenUpsertWithWhereUniqueWithoutUserInput | BiometricTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BiometricTokenCreateManyUserInputEnvelope
    set?: BiometricTokenWhereUniqueInput | BiometricTokenWhereUniqueInput[]
    disconnect?: BiometricTokenWhereUniqueInput | BiometricTokenWhereUniqueInput[]
    delete?: BiometricTokenWhereUniqueInput | BiometricTokenWhereUniqueInput[]
    connect?: BiometricTokenWhereUniqueInput | BiometricTokenWhereUniqueInput[]
    update?: BiometricTokenUpdateWithWhereUniqueWithoutUserInput | BiometricTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BiometricTokenUpdateManyWithWhereWithoutUserInput | BiometricTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BiometricTokenScalarWhereInput | BiometricTokenScalarWhereInput[]
  }

  export type TenantMemberUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TenantMemberCreateWithoutUserInput, TenantMemberUncheckedCreateWithoutUserInput> | TenantMemberCreateWithoutUserInput[] | TenantMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TenantMemberCreateOrConnectWithoutUserInput | TenantMemberCreateOrConnectWithoutUserInput[]
    upsert?: TenantMemberUpsertWithWhereUniqueWithoutUserInput | TenantMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TenantMemberCreateManyUserInputEnvelope
    set?: TenantMemberWhereUniqueInput | TenantMemberWhereUniqueInput[]
    disconnect?: TenantMemberWhereUniqueInput | TenantMemberWhereUniqueInput[]
    delete?: TenantMemberWhereUniqueInput | TenantMemberWhereUniqueInput[]
    connect?: TenantMemberWhereUniqueInput | TenantMemberWhereUniqueInput[]
    update?: TenantMemberUpdateWithWhereUniqueWithoutUserInput | TenantMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TenantMemberUpdateManyWithWhereWithoutUserInput | TenantMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TenantMemberScalarWhereInput | TenantMemberScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MessageCreateWithoutUserInput, MessageUncheckedCreateWithoutUserInput> | MessageCreateWithoutUserInput[] | MessageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutUserInput | MessageCreateOrConnectWithoutUserInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutUserInput | MessageUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MessageCreateManyUserInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutUserInput | MessageUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutUserInput | MessageUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type PasskeyUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PasskeyCreateWithoutUserInput, PasskeyUncheckedCreateWithoutUserInput> | PasskeyCreateWithoutUserInput[] | PasskeyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasskeyCreateOrConnectWithoutUserInput | PasskeyCreateOrConnectWithoutUserInput[]
    upsert?: PasskeyUpsertWithWhereUniqueWithoutUserInput | PasskeyUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PasskeyCreateManyUserInputEnvelope
    set?: PasskeyWhereUniqueInput | PasskeyWhereUniqueInput[]
    disconnect?: PasskeyWhereUniqueInput | PasskeyWhereUniqueInput[]
    delete?: PasskeyWhereUniqueInput | PasskeyWhereUniqueInput[]
    connect?: PasskeyWhereUniqueInput | PasskeyWhereUniqueInput[]
    update?: PasskeyUpdateWithWhereUniqueWithoutUserInput | PasskeyUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PasskeyUpdateManyWithWhereWithoutUserInput | PasskeyUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PasskeyScalarWhereInput | PasskeyScalarWhereInput[]
  }

  export type FeedbackUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FeedbackCreateWithoutUserInput, FeedbackUncheckedCreateWithoutUserInput> | FeedbackCreateWithoutUserInput[] | FeedbackUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutUserInput | FeedbackCreateOrConnectWithoutUserInput[]
    upsert?: FeedbackUpsertWithWhereUniqueWithoutUserInput | FeedbackUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FeedbackCreateManyUserInputEnvelope
    set?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    disconnect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    delete?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    update?: FeedbackUpdateWithWhereUniqueWithoutUserInput | FeedbackUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FeedbackUpdateManyWithWhereWithoutUserInput | FeedbackUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
  }

  export type BiometricTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<BiometricTokenCreateWithoutUserInput, BiometricTokenUncheckedCreateWithoutUserInput> | BiometricTokenCreateWithoutUserInput[] | BiometricTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BiometricTokenCreateOrConnectWithoutUserInput | BiometricTokenCreateOrConnectWithoutUserInput[]
    upsert?: BiometricTokenUpsertWithWhereUniqueWithoutUserInput | BiometricTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BiometricTokenCreateManyUserInputEnvelope
    set?: BiometricTokenWhereUniqueInput | BiometricTokenWhereUniqueInput[]
    disconnect?: BiometricTokenWhereUniqueInput | BiometricTokenWhereUniqueInput[]
    delete?: BiometricTokenWhereUniqueInput | BiometricTokenWhereUniqueInput[]
    connect?: BiometricTokenWhereUniqueInput | BiometricTokenWhereUniqueInput[]
    update?: BiometricTokenUpdateWithWhereUniqueWithoutUserInput | BiometricTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BiometricTokenUpdateManyWithWhereWithoutUserInput | BiometricTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BiometricTokenScalarWhereInput | BiometricTokenScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutMembershipsInput = {
    create?: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMembershipsInput
    connect?: UserWhereUniqueInput
  }

  export type TenantCreateNestedOneWithoutMembersInput = {
    create?: XOR<TenantCreateWithoutMembersInput, TenantUncheckedCreateWithoutMembersInput>
    connectOrCreate?: TenantCreateOrConnectWithoutMembersInput
    connect?: TenantWhereUniqueInput
  }

  export type EnumTenantRoleFieldUpdateOperationsInput = {
    set?: $Enums.TenantRole
  }

  export type UserUpdateOneRequiredWithoutMembershipsNestedInput = {
    create?: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMembershipsInput
    upsert?: UserUpsertWithoutMembershipsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMembershipsInput, UserUpdateWithoutMembershipsInput>, UserUncheckedUpdateWithoutMembershipsInput>
  }

  export type TenantUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<TenantCreateWithoutMembersInput, TenantUncheckedCreateWithoutMembersInput>
    connectOrCreate?: TenantCreateOrConnectWithoutMembersInput
    upsert?: TenantUpsertWithoutMembersInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutMembersInput, TenantUpdateWithoutMembersInput>, TenantUncheckedUpdateWithoutMembersInput>
  }

  export type TenantCreateNestedOneWithoutRoomsInput = {
    create?: XOR<TenantCreateWithoutRoomsInput, TenantUncheckedCreateWithoutRoomsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutRoomsInput
    connect?: TenantWhereUniqueInput
  }

  export type MessageCreateNestedManyWithoutRoomInput = {
    create?: XOR<MessageCreateWithoutRoomInput, MessageUncheckedCreateWithoutRoomInput> | MessageCreateWithoutRoomInput[] | MessageUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutRoomInput | MessageCreateOrConnectWithoutRoomInput[]
    createMany?: MessageCreateManyRoomInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<MessageCreateWithoutRoomInput, MessageUncheckedCreateWithoutRoomInput> | MessageCreateWithoutRoomInput[] | MessageUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutRoomInput | MessageCreateOrConnectWithoutRoomInput[]
    createMany?: MessageCreateManyRoomInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type EnumRoomTypeFieldUpdateOperationsInput = {
    set?: $Enums.RoomType
  }

  export type TenantUpdateOneRequiredWithoutRoomsNestedInput = {
    create?: XOR<TenantCreateWithoutRoomsInput, TenantUncheckedCreateWithoutRoomsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutRoomsInput
    upsert?: TenantUpsertWithoutRoomsInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutRoomsInput, TenantUpdateWithoutRoomsInput>, TenantUncheckedUpdateWithoutRoomsInput>
  }

  export type MessageUpdateManyWithoutRoomNestedInput = {
    create?: XOR<MessageCreateWithoutRoomInput, MessageUncheckedCreateWithoutRoomInput> | MessageCreateWithoutRoomInput[] | MessageUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutRoomInput | MessageCreateOrConnectWithoutRoomInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutRoomInput | MessageUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: MessageCreateManyRoomInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutRoomInput | MessageUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutRoomInput | MessageUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<MessageCreateWithoutRoomInput, MessageUncheckedCreateWithoutRoomInput> | MessageCreateWithoutRoomInput[] | MessageUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutRoomInput | MessageCreateOrConnectWithoutRoomInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutRoomInput | MessageUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: MessageCreateManyRoomInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutRoomInput | MessageUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutRoomInput | MessageUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type RoomCreateNestedOneWithoutMessagesInput = {
    create?: XOR<RoomCreateWithoutMessagesInput, RoomUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: RoomCreateOrConnectWithoutMessagesInput
    connect?: RoomWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutMessagesInput = {
    create?: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessagesInput
    connect?: UserWhereUniqueInput
  }

  export type TenantCreateNestedOneWithoutMessagesInput = {
    create?: XOR<TenantCreateWithoutMessagesInput, TenantUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: TenantCreateOrConnectWithoutMessagesInput
    connect?: TenantWhereUniqueInput
  }

  export type RoomUpdateOneWithoutMessagesNestedInput = {
    create?: XOR<RoomCreateWithoutMessagesInput, RoomUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: RoomCreateOrConnectWithoutMessagesInput
    upsert?: RoomUpsertWithoutMessagesInput
    disconnect?: RoomWhereInput | boolean
    delete?: RoomWhereInput | boolean
    connect?: RoomWhereUniqueInput
    update?: XOR<XOR<RoomUpdateToOneWithWhereWithoutMessagesInput, RoomUpdateWithoutMessagesInput>, RoomUncheckedUpdateWithoutMessagesInput>
  }

  export type UserUpdateOneWithoutMessagesNestedInput = {
    create?: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessagesInput
    upsert?: UserUpsertWithoutMessagesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMessagesInput, UserUpdateWithoutMessagesInput>, UserUncheckedUpdateWithoutMessagesInput>
  }

  export type TenantUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<TenantCreateWithoutMessagesInput, TenantUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: TenantCreateOrConnectWithoutMessagesInput
    upsert?: TenantUpsertWithoutMessagesInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutMessagesInput, TenantUpdateWithoutMessagesInput>, TenantUncheckedUpdateWithoutMessagesInput>
  }

  export type TenantCreateNestedOneWithoutLogsInput = {
    create?: XOR<TenantCreateWithoutLogsInput, TenantUncheckedCreateWithoutLogsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutLogsInput
    connect?: TenantWhereUniqueInput
  }

  export type TenantUpdateOneWithoutLogsNestedInput = {
    create?: XOR<TenantCreateWithoutLogsInput, TenantUncheckedCreateWithoutLogsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutLogsInput
    upsert?: TenantUpsertWithoutLogsInput
    disconnect?: TenantWhereInput | boolean
    delete?: TenantWhereInput | boolean
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutLogsInput, TenantUpdateWithoutLogsInput>, TenantUncheckedUpdateWithoutLogsInput>
  }

  export type UserCreateNestedOneWithoutPasskeysInput = {
    create?: XOR<UserCreateWithoutPasskeysInput, UserUncheckedCreateWithoutPasskeysInput>
    connectOrCreate?: UserCreateOrConnectWithoutPasskeysInput
    connect?: UserWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutPasskeysNestedInput = {
    create?: XOR<UserCreateWithoutPasskeysInput, UserUncheckedCreateWithoutPasskeysInput>
    connectOrCreate?: UserCreateOrConnectWithoutPasskeysInput
    upsert?: UserUpsertWithoutPasskeysInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPasskeysInput, UserUpdateWithoutPasskeysInput>, UserUncheckedUpdateWithoutPasskeysInput>
  }

  export type UserCreateNestedOneWithoutFeedbacksInput = {
    create?: XOR<UserCreateWithoutFeedbacksInput, UserUncheckedCreateWithoutFeedbacksInput>
    connectOrCreate?: UserCreateOrConnectWithoutFeedbacksInput
    connect?: UserWhereUniqueInput
  }

  export type TenantCreateNestedOneWithoutFeedbacksInput = {
    create?: XOR<TenantCreateWithoutFeedbacksInput, TenantUncheckedCreateWithoutFeedbacksInput>
    connectOrCreate?: TenantCreateOrConnectWithoutFeedbacksInput
    connect?: TenantWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFeedbacksNestedInput = {
    create?: XOR<UserCreateWithoutFeedbacksInput, UserUncheckedCreateWithoutFeedbacksInput>
    connectOrCreate?: UserCreateOrConnectWithoutFeedbacksInput
    upsert?: UserUpsertWithoutFeedbacksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFeedbacksInput, UserUpdateWithoutFeedbacksInput>, UserUncheckedUpdateWithoutFeedbacksInput>
  }

  export type TenantUpdateOneRequiredWithoutFeedbacksNestedInput = {
    create?: XOR<TenantCreateWithoutFeedbacksInput, TenantUncheckedCreateWithoutFeedbacksInput>
    connectOrCreate?: TenantCreateOrConnectWithoutFeedbacksInput
    upsert?: TenantUpsertWithoutFeedbacksInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutFeedbacksInput, TenantUpdateWithoutFeedbacksInput>, TenantUncheckedUpdateWithoutFeedbacksInput>
  }

  export type UserCreateNestedOneWithoutBiometricTokensInput = {
    create?: XOR<UserCreateWithoutBiometricTokensInput, UserUncheckedCreateWithoutBiometricTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutBiometricTokensInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutBiometricTokensNestedInput = {
    create?: XOR<UserCreateWithoutBiometricTokensInput, UserUncheckedCreateWithoutBiometricTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutBiometricTokensInput
    upsert?: UserUpsertWithoutBiometricTokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBiometricTokensInput, UserUpdateWithoutBiometricTokensInput>, UserUncheckedUpdateWithoutBiometricTokensInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedEnumGlobalRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.GlobalRole | EnumGlobalRoleFieldRefInput<$PrismaModel>
    in?: $Enums.GlobalRole[] | ListEnumGlobalRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.GlobalRole[] | ListEnumGlobalRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumGlobalRoleFilter<$PrismaModel> | $Enums.GlobalRole
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedEnumGlobalRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GlobalRole | EnumGlobalRoleFieldRefInput<$PrismaModel>
    in?: $Enums.GlobalRole[] | ListEnumGlobalRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.GlobalRole[] | ListEnumGlobalRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumGlobalRoleWithAggregatesFilter<$PrismaModel> | $Enums.GlobalRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGlobalRoleFilter<$PrismaModel>
    _max?: NestedEnumGlobalRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumTenantRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.TenantRole | EnumTenantRoleFieldRefInput<$PrismaModel>
    in?: $Enums.TenantRole[] | ListEnumTenantRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.TenantRole[] | ListEnumTenantRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumTenantRoleFilter<$PrismaModel> | $Enums.TenantRole
  }

  export type NestedEnumTenantRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TenantRole | EnumTenantRoleFieldRefInput<$PrismaModel>
    in?: $Enums.TenantRole[] | ListEnumTenantRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.TenantRole[] | ListEnumTenantRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumTenantRoleWithAggregatesFilter<$PrismaModel> | $Enums.TenantRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTenantRoleFilter<$PrismaModel>
    _max?: NestedEnumTenantRoleFilter<$PrismaModel>
  }

  export type NestedEnumRoomTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomType | EnumRoomTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RoomType[] | ListEnumRoomTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoomType[] | ListEnumRoomTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRoomTypeFilter<$PrismaModel> | $Enums.RoomType
  }

  export type NestedEnumRoomTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomType | EnumRoomTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RoomType[] | ListEnumRoomTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoomType[] | ListEnumRoomTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRoomTypeWithAggregatesFilter<$PrismaModel> | $Enums.RoomType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoomTypeFilter<$PrismaModel>
    _max?: NestedEnumRoomTypeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type TenantMemberCreateWithoutTenantInput = {
    id?: string
    role?: $Enums.TenantRole
    canModerate?: boolean
    canManageOrders?: boolean
    canViewStats?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMembershipsInput
  }

  export type TenantMemberUncheckedCreateWithoutTenantInput = {
    id?: string
    userId: string
    role?: $Enums.TenantRole
    canModerate?: boolean
    canManageOrders?: boolean
    canViewStats?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TenantMemberCreateOrConnectWithoutTenantInput = {
    where: TenantMemberWhereUniqueInput
    create: XOR<TenantMemberCreateWithoutTenantInput, TenantMemberUncheckedCreateWithoutTenantInput>
  }

  export type TenantMemberCreateManyTenantInputEnvelope = {
    data: TenantMemberCreateManyTenantInput | TenantMemberCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type MessageCreateWithoutTenantInput = {
    id?: string
    text: string
    imageUrl?: string | null
    createdAt?: Date | string
    senderId: string
    senderAlias: string
    senderGender: string
    recipientId?: string | null
    room?: RoomCreateNestedOneWithoutMessagesInput
    user?: UserCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateWithoutTenantInput = {
    id?: string
    text: string
    imageUrl?: string | null
    createdAt?: Date | string
    senderId: string
    senderAlias: string
    senderGender: string
    recipientId?: string | null
    roomId?: string | null
    userId?: string | null
  }

  export type MessageCreateOrConnectWithoutTenantInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutTenantInput, MessageUncheckedCreateWithoutTenantInput>
  }

  export type MessageCreateManyTenantInputEnvelope = {
    data: MessageCreateManyTenantInput | MessageCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type RoomCreateWithoutTenantInput = {
    id?: string
    name: string
    description?: string | null
    type?: $Enums.RoomType
    createdAt?: Date | string
    messages?: MessageCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateWithoutTenantInput = {
    id?: string
    name: string
    description?: string | null
    type?: $Enums.RoomType
    createdAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomCreateOrConnectWithoutTenantInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutTenantInput, RoomUncheckedCreateWithoutTenantInput>
  }

  export type RoomCreateManyTenantInputEnvelope = {
    data: RoomCreateManyTenantInput | RoomCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type SystemLogCreateWithoutTenantInput = {
    id?: string
    event: string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type SystemLogUncheckedCreateWithoutTenantInput = {
    id?: string
    event: string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type SystemLogCreateOrConnectWithoutTenantInput = {
    where: SystemLogWhereUniqueInput
    create: XOR<SystemLogCreateWithoutTenantInput, SystemLogUncheckedCreateWithoutTenantInput>
  }

  export type SystemLogCreateManyTenantInputEnvelope = {
    data: SystemLogCreateManyTenantInput | SystemLogCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type NasDeviceCreateWithoutTenantInput = {
    id?: string
    nasId?: string | null
    vpnIp?: string | null
    publicIp?: string | null
    bssid?: string | null
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NasDeviceUncheckedCreateWithoutTenantInput = {
    id?: string
    nasId?: string | null
    vpnIp?: string | null
    publicIp?: string | null
    bssid?: string | null
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NasDeviceCreateOrConnectWithoutTenantInput = {
    where: NasDeviceWhereUniqueInput
    create: XOR<NasDeviceCreateWithoutTenantInput, NasDeviceUncheckedCreateWithoutTenantInput>
  }

  export type NasDeviceCreateManyTenantInputEnvelope = {
    data: NasDeviceCreateManyTenantInput | NasDeviceCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type FeedbackCreateWithoutTenantInput = {
    id?: string
    score: number
    comment?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFeedbacksInput
  }

  export type FeedbackUncheckedCreateWithoutTenantInput = {
    id?: string
    score: number
    comment?: string | null
    userId: string
    createdAt?: Date | string
  }

  export type FeedbackCreateOrConnectWithoutTenantInput = {
    where: FeedbackWhereUniqueInput
    create: XOR<FeedbackCreateWithoutTenantInput, FeedbackUncheckedCreateWithoutTenantInput>
  }

  export type FeedbackCreateManyTenantInputEnvelope = {
    data: FeedbackCreateManyTenantInput | FeedbackCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type TenantMemberUpsertWithWhereUniqueWithoutTenantInput = {
    where: TenantMemberWhereUniqueInput
    update: XOR<TenantMemberUpdateWithoutTenantInput, TenantMemberUncheckedUpdateWithoutTenantInput>
    create: XOR<TenantMemberCreateWithoutTenantInput, TenantMemberUncheckedCreateWithoutTenantInput>
  }

  export type TenantMemberUpdateWithWhereUniqueWithoutTenantInput = {
    where: TenantMemberWhereUniqueInput
    data: XOR<TenantMemberUpdateWithoutTenantInput, TenantMemberUncheckedUpdateWithoutTenantInput>
  }

  export type TenantMemberUpdateManyWithWhereWithoutTenantInput = {
    where: TenantMemberScalarWhereInput
    data: XOR<TenantMemberUpdateManyMutationInput, TenantMemberUncheckedUpdateManyWithoutTenantInput>
  }

  export type TenantMemberScalarWhereInput = {
    AND?: TenantMemberScalarWhereInput | TenantMemberScalarWhereInput[]
    OR?: TenantMemberScalarWhereInput[]
    NOT?: TenantMemberScalarWhereInput | TenantMemberScalarWhereInput[]
    id?: StringFilter<"TenantMember"> | string
    userId?: StringFilter<"TenantMember"> | string
    tenantId?: StringFilter<"TenantMember"> | string
    role?: EnumTenantRoleFilter<"TenantMember"> | $Enums.TenantRole
    canModerate?: BoolFilter<"TenantMember"> | boolean
    canManageOrders?: BoolFilter<"TenantMember"> | boolean
    canViewStats?: BoolFilter<"TenantMember"> | boolean
    createdAt?: DateTimeFilter<"TenantMember"> | Date | string
    updatedAt?: DateTimeFilter<"TenantMember"> | Date | string
  }

  export type MessageUpsertWithWhereUniqueWithoutTenantInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutTenantInput, MessageUncheckedUpdateWithoutTenantInput>
    create: XOR<MessageCreateWithoutTenantInput, MessageUncheckedCreateWithoutTenantInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutTenantInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutTenantInput, MessageUncheckedUpdateWithoutTenantInput>
  }

  export type MessageUpdateManyWithWhereWithoutTenantInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutTenantInput>
  }

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[]
    OR?: MessageScalarWhereInput[]
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[]
    id?: StringFilter<"Message"> | string
    text?: StringFilter<"Message"> | string
    imageUrl?: StringNullableFilter<"Message"> | string | null
    createdAt?: DateTimeFilter<"Message"> | Date | string
    senderId?: StringFilter<"Message"> | string
    senderAlias?: StringFilter<"Message"> | string
    senderGender?: StringFilter<"Message"> | string
    recipientId?: StringNullableFilter<"Message"> | string | null
    roomId?: StringNullableFilter<"Message"> | string | null
    userId?: StringNullableFilter<"Message"> | string | null
    tenantId?: StringFilter<"Message"> | string
  }

  export type RoomUpsertWithWhereUniqueWithoutTenantInput = {
    where: RoomWhereUniqueInput
    update: XOR<RoomUpdateWithoutTenantInput, RoomUncheckedUpdateWithoutTenantInput>
    create: XOR<RoomCreateWithoutTenantInput, RoomUncheckedCreateWithoutTenantInput>
  }

  export type RoomUpdateWithWhereUniqueWithoutTenantInput = {
    where: RoomWhereUniqueInput
    data: XOR<RoomUpdateWithoutTenantInput, RoomUncheckedUpdateWithoutTenantInput>
  }

  export type RoomUpdateManyWithWhereWithoutTenantInput = {
    where: RoomScalarWhereInput
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyWithoutTenantInput>
  }

  export type RoomScalarWhereInput = {
    AND?: RoomScalarWhereInput | RoomScalarWhereInput[]
    OR?: RoomScalarWhereInput[]
    NOT?: RoomScalarWhereInput | RoomScalarWhereInput[]
    id?: StringFilter<"Room"> | string
    name?: StringFilter<"Room"> | string
    description?: StringNullableFilter<"Room"> | string | null
    type?: EnumRoomTypeFilter<"Room"> | $Enums.RoomType
    tenantId?: StringFilter<"Room"> | string
    createdAt?: DateTimeFilter<"Room"> | Date | string
  }

  export type SystemLogUpsertWithWhereUniqueWithoutTenantInput = {
    where: SystemLogWhereUniqueInput
    update: XOR<SystemLogUpdateWithoutTenantInput, SystemLogUncheckedUpdateWithoutTenantInput>
    create: XOR<SystemLogCreateWithoutTenantInput, SystemLogUncheckedCreateWithoutTenantInput>
  }

  export type SystemLogUpdateWithWhereUniqueWithoutTenantInput = {
    where: SystemLogWhereUniqueInput
    data: XOR<SystemLogUpdateWithoutTenantInput, SystemLogUncheckedUpdateWithoutTenantInput>
  }

  export type SystemLogUpdateManyWithWhereWithoutTenantInput = {
    where: SystemLogScalarWhereInput
    data: XOR<SystemLogUpdateManyMutationInput, SystemLogUncheckedUpdateManyWithoutTenantInput>
  }

  export type SystemLogScalarWhereInput = {
    AND?: SystemLogScalarWhereInput | SystemLogScalarWhereInput[]
    OR?: SystemLogScalarWhereInput[]
    NOT?: SystemLogScalarWhereInput | SystemLogScalarWhereInput[]
    id?: StringFilter<"SystemLog"> | string
    event?: StringFilter<"SystemLog"> | string
    details?: JsonNullableFilter<"SystemLog">
    createdAt?: DateTimeFilter<"SystemLog"> | Date | string
    tenantId?: StringNullableFilter<"SystemLog"> | string | null
  }

  export type NasDeviceUpsertWithWhereUniqueWithoutTenantInput = {
    where: NasDeviceWhereUniqueInput
    update: XOR<NasDeviceUpdateWithoutTenantInput, NasDeviceUncheckedUpdateWithoutTenantInput>
    create: XOR<NasDeviceCreateWithoutTenantInput, NasDeviceUncheckedCreateWithoutTenantInput>
  }

  export type NasDeviceUpdateWithWhereUniqueWithoutTenantInput = {
    where: NasDeviceWhereUniqueInput
    data: XOR<NasDeviceUpdateWithoutTenantInput, NasDeviceUncheckedUpdateWithoutTenantInput>
  }

  export type NasDeviceUpdateManyWithWhereWithoutTenantInput = {
    where: NasDeviceScalarWhereInput
    data: XOR<NasDeviceUpdateManyMutationInput, NasDeviceUncheckedUpdateManyWithoutTenantInput>
  }

  export type NasDeviceScalarWhereInput = {
    AND?: NasDeviceScalarWhereInput | NasDeviceScalarWhereInput[]
    OR?: NasDeviceScalarWhereInput[]
    NOT?: NasDeviceScalarWhereInput | NasDeviceScalarWhereInput[]
    id?: StringFilter<"NasDevice"> | string
    nasId?: StringNullableFilter<"NasDevice"> | string | null
    vpnIp?: StringNullableFilter<"NasDevice"> | string | null
    publicIp?: StringNullableFilter<"NasDevice"> | string | null
    bssid?: StringNullableFilter<"NasDevice"> | string | null
    name?: StringNullableFilter<"NasDevice"> | string | null
    tenantId?: StringFilter<"NasDevice"> | string
    createdAt?: DateTimeFilter<"NasDevice"> | Date | string
    updatedAt?: DateTimeFilter<"NasDevice"> | Date | string
  }

  export type FeedbackUpsertWithWhereUniqueWithoutTenantInput = {
    where: FeedbackWhereUniqueInput
    update: XOR<FeedbackUpdateWithoutTenantInput, FeedbackUncheckedUpdateWithoutTenantInput>
    create: XOR<FeedbackCreateWithoutTenantInput, FeedbackUncheckedCreateWithoutTenantInput>
  }

  export type FeedbackUpdateWithWhereUniqueWithoutTenantInput = {
    where: FeedbackWhereUniqueInput
    data: XOR<FeedbackUpdateWithoutTenantInput, FeedbackUncheckedUpdateWithoutTenantInput>
  }

  export type FeedbackUpdateManyWithWhereWithoutTenantInput = {
    where: FeedbackScalarWhereInput
    data: XOR<FeedbackUpdateManyMutationInput, FeedbackUncheckedUpdateManyWithoutTenantInput>
  }

  export type FeedbackScalarWhereInput = {
    AND?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
    OR?: FeedbackScalarWhereInput[]
    NOT?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
    id?: StringFilter<"Feedback"> | string
    score?: IntFilter<"Feedback"> | number
    comment?: StringNullableFilter<"Feedback"> | string | null
    userId?: StringFilter<"Feedback"> | string
    tenantId?: StringFilter<"Feedback"> | string
    createdAt?: DateTimeFilter<"Feedback"> | Date | string
  }

  export type TenantCreateWithoutDevicesInput = {
    id?: string
    name: string
    slug: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    logoUrl?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bssid?: string | null
    staticIp?: string | null
    latitude?: number | null
    longitude?: number | null
    menuEnabled?: boolean
    feedbackEnabled?: boolean
    staffEnabled?: boolean
    menuUrl?: string | null
    members?: TenantMemberCreateNestedManyWithoutTenantInput
    messages?: MessageCreateNestedManyWithoutTenantInput
    rooms?: RoomCreateNestedManyWithoutTenantInput
    logs?: SystemLogCreateNestedManyWithoutTenantInput
    feedbacks?: FeedbackCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutDevicesInput = {
    id?: string
    name: string
    slug: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    logoUrl?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bssid?: string | null
    staticIp?: string | null
    latitude?: number | null
    longitude?: number | null
    menuEnabled?: boolean
    feedbackEnabled?: boolean
    staffEnabled?: boolean
    menuUrl?: string | null
    members?: TenantMemberUncheckedCreateNestedManyWithoutTenantInput
    messages?: MessageUncheckedCreateNestedManyWithoutTenantInput
    rooms?: RoomUncheckedCreateNestedManyWithoutTenantInput
    logs?: SystemLogUncheckedCreateNestedManyWithoutTenantInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutDevicesInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutDevicesInput, TenantUncheckedCreateWithoutDevicesInput>
  }

  export type TenantUpsertWithoutDevicesInput = {
    update: XOR<TenantUpdateWithoutDevicesInput, TenantUncheckedUpdateWithoutDevicesInput>
    create: XOR<TenantCreateWithoutDevicesInput, TenantUncheckedCreateWithoutDevicesInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutDevicesInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutDevicesInput, TenantUncheckedUpdateWithoutDevicesInput>
  }

  export type TenantUpdateWithoutDevicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bssid?: NullableStringFieldUpdateOperationsInput | string | null
    staticIp?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    menuEnabled?: BoolFieldUpdateOperationsInput | boolean
    feedbackEnabled?: BoolFieldUpdateOperationsInput | boolean
    staffEnabled?: BoolFieldUpdateOperationsInput | boolean
    menuUrl?: NullableStringFieldUpdateOperationsInput | string | null
    members?: TenantMemberUpdateManyWithoutTenantNestedInput
    messages?: MessageUpdateManyWithoutTenantNestedInput
    rooms?: RoomUpdateManyWithoutTenantNestedInput
    logs?: SystemLogUpdateManyWithoutTenantNestedInput
    feedbacks?: FeedbackUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutDevicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bssid?: NullableStringFieldUpdateOperationsInput | string | null
    staticIp?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    menuEnabled?: BoolFieldUpdateOperationsInput | boolean
    feedbackEnabled?: BoolFieldUpdateOperationsInput | boolean
    staffEnabled?: BoolFieldUpdateOperationsInput | boolean
    menuUrl?: NullableStringFieldUpdateOperationsInput | string | null
    members?: TenantMemberUncheckedUpdateManyWithoutTenantNestedInput
    messages?: MessageUncheckedUpdateManyWithoutTenantNestedInput
    rooms?: RoomUncheckedUpdateManyWithoutTenantNestedInput
    logs?: SystemLogUncheckedUpdateManyWithoutTenantNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type TenantMemberCreateWithoutUserInput = {
    id?: string
    role?: $Enums.TenantRole
    canModerate?: boolean
    canManageOrders?: boolean
    canViewStats?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutMembersInput
  }

  export type TenantMemberUncheckedCreateWithoutUserInput = {
    id?: string
    tenantId: string
    role?: $Enums.TenantRole
    canModerate?: boolean
    canManageOrders?: boolean
    canViewStats?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TenantMemberCreateOrConnectWithoutUserInput = {
    where: TenantMemberWhereUniqueInput
    create: XOR<TenantMemberCreateWithoutUserInput, TenantMemberUncheckedCreateWithoutUserInput>
  }

  export type TenantMemberCreateManyUserInputEnvelope = {
    data: TenantMemberCreateManyUserInput | TenantMemberCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    idToken?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    idToken?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type MessageCreateWithoutUserInput = {
    id?: string
    text: string
    imageUrl?: string | null
    createdAt?: Date | string
    senderId: string
    senderAlias: string
    senderGender: string
    recipientId?: string | null
    room?: RoomCreateNestedOneWithoutMessagesInput
    tenant: TenantCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateWithoutUserInput = {
    id?: string
    text: string
    imageUrl?: string | null
    createdAt?: Date | string
    senderId: string
    senderAlias: string
    senderGender: string
    recipientId?: string | null
    roomId?: string | null
    tenantId: string
  }

  export type MessageCreateOrConnectWithoutUserInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutUserInput, MessageUncheckedCreateWithoutUserInput>
  }

  export type MessageCreateManyUserInputEnvelope = {
    data: MessageCreateManyUserInput | MessageCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PasskeyCreateWithoutUserInput = {
    id: string
    name?: string | null
    publicKey: string
    credentialID: string
    counter: number
    deviceType: string
    backedUp: boolean
    transports?: string | null
    aaguid?: string | null
    createdAt?: Date | string | null
  }

  export type PasskeyUncheckedCreateWithoutUserInput = {
    id: string
    name?: string | null
    publicKey: string
    credentialID: string
    counter: number
    deviceType: string
    backedUp: boolean
    transports?: string | null
    aaguid?: string | null
    createdAt?: Date | string | null
  }

  export type PasskeyCreateOrConnectWithoutUserInput = {
    where: PasskeyWhereUniqueInput
    create: XOR<PasskeyCreateWithoutUserInput, PasskeyUncheckedCreateWithoutUserInput>
  }

  export type PasskeyCreateManyUserInputEnvelope = {
    data: PasskeyCreateManyUserInput | PasskeyCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FeedbackCreateWithoutUserInput = {
    id?: string
    score: number
    comment?: string | null
    createdAt?: Date | string
    tenant: TenantCreateNestedOneWithoutFeedbacksInput
  }

  export type FeedbackUncheckedCreateWithoutUserInput = {
    id?: string
    score: number
    comment?: string | null
    tenantId: string
    createdAt?: Date | string
  }

  export type FeedbackCreateOrConnectWithoutUserInput = {
    where: FeedbackWhereUniqueInput
    create: XOR<FeedbackCreateWithoutUserInput, FeedbackUncheckedCreateWithoutUserInput>
  }

  export type FeedbackCreateManyUserInputEnvelope = {
    data: FeedbackCreateManyUserInput | FeedbackCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type BiometricTokenCreateWithoutUserInput = {
    id?: string
    token: string
    deviceId: string
    createdAt?: Date | string
    expiresAt?: Date | string | null
  }

  export type BiometricTokenUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    deviceId: string
    createdAt?: Date | string
    expiresAt?: Date | string | null
  }

  export type BiometricTokenCreateOrConnectWithoutUserInput = {
    where: BiometricTokenWhereUniqueInput
    create: XOR<BiometricTokenCreateWithoutUserInput, BiometricTokenUncheckedCreateWithoutUserInput>
  }

  export type BiometricTokenCreateManyUserInputEnvelope = {
    data: BiometricTokenCreateManyUserInput | BiometricTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TenantMemberUpsertWithWhereUniqueWithoutUserInput = {
    where: TenantMemberWhereUniqueInput
    update: XOR<TenantMemberUpdateWithoutUserInput, TenantMemberUncheckedUpdateWithoutUserInput>
    create: XOR<TenantMemberCreateWithoutUserInput, TenantMemberUncheckedCreateWithoutUserInput>
  }

  export type TenantMemberUpdateWithWhereUniqueWithoutUserInput = {
    where: TenantMemberWhereUniqueInput
    data: XOR<TenantMemberUpdateWithoutUserInput, TenantMemberUncheckedUpdateWithoutUserInput>
  }

  export type TenantMemberUpdateManyWithWhereWithoutUserInput = {
    where: TenantMemberScalarWhereInput
    data: XOR<TenantMemberUpdateManyMutationInput, TenantMemberUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    token?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
  }

  export type MessageUpsertWithWhereUniqueWithoutUserInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutUserInput, MessageUncheckedUpdateWithoutUserInput>
    create: XOR<MessageCreateWithoutUserInput, MessageUncheckedCreateWithoutUserInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutUserInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutUserInput, MessageUncheckedUpdateWithoutUserInput>
  }

  export type MessageUpdateManyWithWhereWithoutUserInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutUserInput>
  }

  export type PasskeyUpsertWithWhereUniqueWithoutUserInput = {
    where: PasskeyWhereUniqueInput
    update: XOR<PasskeyUpdateWithoutUserInput, PasskeyUncheckedUpdateWithoutUserInput>
    create: XOR<PasskeyCreateWithoutUserInput, PasskeyUncheckedCreateWithoutUserInput>
  }

  export type PasskeyUpdateWithWhereUniqueWithoutUserInput = {
    where: PasskeyWhereUniqueInput
    data: XOR<PasskeyUpdateWithoutUserInput, PasskeyUncheckedUpdateWithoutUserInput>
  }

  export type PasskeyUpdateManyWithWhereWithoutUserInput = {
    where: PasskeyScalarWhereInput
    data: XOR<PasskeyUpdateManyMutationInput, PasskeyUncheckedUpdateManyWithoutUserInput>
  }

  export type PasskeyScalarWhereInput = {
    AND?: PasskeyScalarWhereInput | PasskeyScalarWhereInput[]
    OR?: PasskeyScalarWhereInput[]
    NOT?: PasskeyScalarWhereInput | PasskeyScalarWhereInput[]
    id?: StringFilter<"Passkey"> | string
    name?: StringNullableFilter<"Passkey"> | string | null
    publicKey?: StringFilter<"Passkey"> | string
    userId?: StringFilter<"Passkey"> | string
    credentialID?: StringFilter<"Passkey"> | string
    counter?: IntFilter<"Passkey"> | number
    deviceType?: StringFilter<"Passkey"> | string
    backedUp?: BoolFilter<"Passkey"> | boolean
    transports?: StringNullableFilter<"Passkey"> | string | null
    aaguid?: StringNullableFilter<"Passkey"> | string | null
    createdAt?: DateTimeNullableFilter<"Passkey"> | Date | string | null
  }

  export type FeedbackUpsertWithWhereUniqueWithoutUserInput = {
    where: FeedbackWhereUniqueInput
    update: XOR<FeedbackUpdateWithoutUserInput, FeedbackUncheckedUpdateWithoutUserInput>
    create: XOR<FeedbackCreateWithoutUserInput, FeedbackUncheckedCreateWithoutUserInput>
  }

  export type FeedbackUpdateWithWhereUniqueWithoutUserInput = {
    where: FeedbackWhereUniqueInput
    data: XOR<FeedbackUpdateWithoutUserInput, FeedbackUncheckedUpdateWithoutUserInput>
  }

  export type FeedbackUpdateManyWithWhereWithoutUserInput = {
    where: FeedbackScalarWhereInput
    data: XOR<FeedbackUpdateManyMutationInput, FeedbackUncheckedUpdateManyWithoutUserInput>
  }

  export type BiometricTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: BiometricTokenWhereUniqueInput
    update: XOR<BiometricTokenUpdateWithoutUserInput, BiometricTokenUncheckedUpdateWithoutUserInput>
    create: XOR<BiometricTokenCreateWithoutUserInput, BiometricTokenUncheckedCreateWithoutUserInput>
  }

  export type BiometricTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: BiometricTokenWhereUniqueInput
    data: XOR<BiometricTokenUpdateWithoutUserInput, BiometricTokenUncheckedUpdateWithoutUserInput>
  }

  export type BiometricTokenUpdateManyWithWhereWithoutUserInput = {
    where: BiometricTokenScalarWhereInput
    data: XOR<BiometricTokenUpdateManyMutationInput, BiometricTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type BiometricTokenScalarWhereInput = {
    AND?: BiometricTokenScalarWhereInput | BiometricTokenScalarWhereInput[]
    OR?: BiometricTokenScalarWhereInput[]
    NOT?: BiometricTokenScalarWhereInput | BiometricTokenScalarWhereInput[]
    id?: StringFilter<"BiometricToken"> | string
    token?: StringFilter<"BiometricToken"> | string
    userId?: StringFilter<"BiometricToken"> | string
    deviceId?: StringFilter<"BiometricToken"> | string
    createdAt?: DateTimeFilter<"BiometricToken"> | Date | string
    expiresAt?: DateTimeNullableFilter<"BiometricToken"> | Date | string | null
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: boolean | null
    image?: string | null
    phoneNumber?: string | null
    gender?: string | null
    status?: string | null
    isAnonymous?: boolean
    role?: $Enums.GlobalRole
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: TenantMemberCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutUserInput
    passkeys?: PasskeyCreateNestedManyWithoutUserInput
    feedbacks?: FeedbackCreateNestedManyWithoutUserInput
    biometricTokens?: BiometricTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: boolean | null
    image?: string | null
    phoneNumber?: string | null
    gender?: string | null
    status?: string | null
    isAnonymous?: boolean
    role?: $Enums.GlobalRole
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: TenantMemberUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput
    passkeys?: PasskeyUncheckedCreateNestedManyWithoutUserInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutUserInput
    biometricTokens?: BiometricTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumGlobalRoleFieldUpdateOperationsInput | $Enums.GlobalRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: TenantMemberUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutUserNestedInput
    passkeys?: PasskeyUpdateManyWithoutUserNestedInput
    feedbacks?: FeedbackUpdateManyWithoutUserNestedInput
    biometricTokens?: BiometricTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumGlobalRoleFieldUpdateOperationsInput | $Enums.GlobalRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: TenantMemberUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput
    passkeys?: PasskeyUncheckedUpdateManyWithoutUserNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutUserNestedInput
    biometricTokens?: BiometricTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: boolean | null
    image?: string | null
    phoneNumber?: string | null
    gender?: string | null
    status?: string | null
    isAnonymous?: boolean
    role?: $Enums.GlobalRole
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: TenantMemberCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutUserInput
    passkeys?: PasskeyCreateNestedManyWithoutUserInput
    feedbacks?: FeedbackCreateNestedManyWithoutUserInput
    biometricTokens?: BiometricTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: boolean | null
    image?: string | null
    phoneNumber?: string | null
    gender?: string | null
    status?: string | null
    isAnonymous?: boolean
    role?: $Enums.GlobalRole
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: TenantMemberUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput
    passkeys?: PasskeyUncheckedCreateNestedManyWithoutUserInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutUserInput
    biometricTokens?: BiometricTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumGlobalRoleFieldUpdateOperationsInput | $Enums.GlobalRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: TenantMemberUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutUserNestedInput
    passkeys?: PasskeyUpdateManyWithoutUserNestedInput
    feedbacks?: FeedbackUpdateManyWithoutUserNestedInput
    biometricTokens?: BiometricTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumGlobalRoleFieldUpdateOperationsInput | $Enums.GlobalRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: TenantMemberUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput
    passkeys?: PasskeyUncheckedUpdateManyWithoutUserNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutUserNestedInput
    biometricTokens?: BiometricTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutMembershipsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: boolean | null
    image?: string | null
    phoneNumber?: string | null
    gender?: string | null
    status?: string | null
    isAnonymous?: boolean
    role?: $Enums.GlobalRole
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutUserInput
    passkeys?: PasskeyCreateNestedManyWithoutUserInput
    feedbacks?: FeedbackCreateNestedManyWithoutUserInput
    biometricTokens?: BiometricTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMembershipsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: boolean | null
    image?: string | null
    phoneNumber?: string | null
    gender?: string | null
    status?: string | null
    isAnonymous?: boolean
    role?: $Enums.GlobalRole
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput
    passkeys?: PasskeyUncheckedCreateNestedManyWithoutUserInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutUserInput
    biometricTokens?: BiometricTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMembershipsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
  }

  export type TenantCreateWithoutMembersInput = {
    id?: string
    name: string
    slug: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    logoUrl?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bssid?: string | null
    staticIp?: string | null
    latitude?: number | null
    longitude?: number | null
    menuEnabled?: boolean
    feedbackEnabled?: boolean
    staffEnabled?: boolean
    menuUrl?: string | null
    messages?: MessageCreateNestedManyWithoutTenantInput
    rooms?: RoomCreateNestedManyWithoutTenantInput
    logs?: SystemLogCreateNestedManyWithoutTenantInput
    devices?: NasDeviceCreateNestedManyWithoutTenantInput
    feedbacks?: FeedbackCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutMembersInput = {
    id?: string
    name: string
    slug: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    logoUrl?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bssid?: string | null
    staticIp?: string | null
    latitude?: number | null
    longitude?: number | null
    menuEnabled?: boolean
    feedbackEnabled?: boolean
    staffEnabled?: boolean
    menuUrl?: string | null
    messages?: MessageUncheckedCreateNestedManyWithoutTenantInput
    rooms?: RoomUncheckedCreateNestedManyWithoutTenantInput
    logs?: SystemLogUncheckedCreateNestedManyWithoutTenantInput
    devices?: NasDeviceUncheckedCreateNestedManyWithoutTenantInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutMembersInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutMembersInput, TenantUncheckedCreateWithoutMembersInput>
  }

  export type UserUpsertWithoutMembershipsInput = {
    update: XOR<UserUpdateWithoutMembershipsInput, UserUncheckedUpdateWithoutMembershipsInput>
    create: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMembershipsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMembershipsInput, UserUncheckedUpdateWithoutMembershipsInput>
  }

  export type UserUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumGlobalRoleFieldUpdateOperationsInput | $Enums.GlobalRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutUserNestedInput
    passkeys?: PasskeyUpdateManyWithoutUserNestedInput
    feedbacks?: FeedbackUpdateManyWithoutUserNestedInput
    biometricTokens?: BiometricTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumGlobalRoleFieldUpdateOperationsInput | $Enums.GlobalRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput
    passkeys?: PasskeyUncheckedUpdateManyWithoutUserNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutUserNestedInput
    biometricTokens?: BiometricTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TenantUpsertWithoutMembersInput = {
    update: XOR<TenantUpdateWithoutMembersInput, TenantUncheckedUpdateWithoutMembersInput>
    create: XOR<TenantCreateWithoutMembersInput, TenantUncheckedCreateWithoutMembersInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutMembersInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutMembersInput, TenantUncheckedUpdateWithoutMembersInput>
  }

  export type TenantUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bssid?: NullableStringFieldUpdateOperationsInput | string | null
    staticIp?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    menuEnabled?: BoolFieldUpdateOperationsInput | boolean
    feedbackEnabled?: BoolFieldUpdateOperationsInput | boolean
    staffEnabled?: BoolFieldUpdateOperationsInput | boolean
    menuUrl?: NullableStringFieldUpdateOperationsInput | string | null
    messages?: MessageUpdateManyWithoutTenantNestedInput
    rooms?: RoomUpdateManyWithoutTenantNestedInput
    logs?: SystemLogUpdateManyWithoutTenantNestedInput
    devices?: NasDeviceUpdateManyWithoutTenantNestedInput
    feedbacks?: FeedbackUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bssid?: NullableStringFieldUpdateOperationsInput | string | null
    staticIp?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    menuEnabled?: BoolFieldUpdateOperationsInput | boolean
    feedbackEnabled?: BoolFieldUpdateOperationsInput | boolean
    staffEnabled?: BoolFieldUpdateOperationsInput | boolean
    menuUrl?: NullableStringFieldUpdateOperationsInput | string | null
    messages?: MessageUncheckedUpdateManyWithoutTenantNestedInput
    rooms?: RoomUncheckedUpdateManyWithoutTenantNestedInput
    logs?: SystemLogUncheckedUpdateManyWithoutTenantNestedInput
    devices?: NasDeviceUncheckedUpdateManyWithoutTenantNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type TenantCreateWithoutRoomsInput = {
    id?: string
    name: string
    slug: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    logoUrl?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bssid?: string | null
    staticIp?: string | null
    latitude?: number | null
    longitude?: number | null
    menuEnabled?: boolean
    feedbackEnabled?: boolean
    staffEnabled?: boolean
    menuUrl?: string | null
    members?: TenantMemberCreateNestedManyWithoutTenantInput
    messages?: MessageCreateNestedManyWithoutTenantInput
    logs?: SystemLogCreateNestedManyWithoutTenantInput
    devices?: NasDeviceCreateNestedManyWithoutTenantInput
    feedbacks?: FeedbackCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutRoomsInput = {
    id?: string
    name: string
    slug: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    logoUrl?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bssid?: string | null
    staticIp?: string | null
    latitude?: number | null
    longitude?: number | null
    menuEnabled?: boolean
    feedbackEnabled?: boolean
    staffEnabled?: boolean
    menuUrl?: string | null
    members?: TenantMemberUncheckedCreateNestedManyWithoutTenantInput
    messages?: MessageUncheckedCreateNestedManyWithoutTenantInput
    logs?: SystemLogUncheckedCreateNestedManyWithoutTenantInput
    devices?: NasDeviceUncheckedCreateNestedManyWithoutTenantInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutRoomsInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutRoomsInput, TenantUncheckedCreateWithoutRoomsInput>
  }

  export type MessageCreateWithoutRoomInput = {
    id?: string
    text: string
    imageUrl?: string | null
    createdAt?: Date | string
    senderId: string
    senderAlias: string
    senderGender: string
    recipientId?: string | null
    user?: UserCreateNestedOneWithoutMessagesInput
    tenant: TenantCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateWithoutRoomInput = {
    id?: string
    text: string
    imageUrl?: string | null
    createdAt?: Date | string
    senderId: string
    senderAlias: string
    senderGender: string
    recipientId?: string | null
    userId?: string | null
    tenantId: string
  }

  export type MessageCreateOrConnectWithoutRoomInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutRoomInput, MessageUncheckedCreateWithoutRoomInput>
  }

  export type MessageCreateManyRoomInputEnvelope = {
    data: MessageCreateManyRoomInput | MessageCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type TenantUpsertWithoutRoomsInput = {
    update: XOR<TenantUpdateWithoutRoomsInput, TenantUncheckedUpdateWithoutRoomsInput>
    create: XOR<TenantCreateWithoutRoomsInput, TenantUncheckedCreateWithoutRoomsInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutRoomsInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutRoomsInput, TenantUncheckedUpdateWithoutRoomsInput>
  }

  export type TenantUpdateWithoutRoomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bssid?: NullableStringFieldUpdateOperationsInput | string | null
    staticIp?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    menuEnabled?: BoolFieldUpdateOperationsInput | boolean
    feedbackEnabled?: BoolFieldUpdateOperationsInput | boolean
    staffEnabled?: BoolFieldUpdateOperationsInput | boolean
    menuUrl?: NullableStringFieldUpdateOperationsInput | string | null
    members?: TenantMemberUpdateManyWithoutTenantNestedInput
    messages?: MessageUpdateManyWithoutTenantNestedInput
    logs?: SystemLogUpdateManyWithoutTenantNestedInput
    devices?: NasDeviceUpdateManyWithoutTenantNestedInput
    feedbacks?: FeedbackUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutRoomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bssid?: NullableStringFieldUpdateOperationsInput | string | null
    staticIp?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    menuEnabled?: BoolFieldUpdateOperationsInput | boolean
    feedbackEnabled?: BoolFieldUpdateOperationsInput | boolean
    staffEnabled?: BoolFieldUpdateOperationsInput | boolean
    menuUrl?: NullableStringFieldUpdateOperationsInput | string | null
    members?: TenantMemberUncheckedUpdateManyWithoutTenantNestedInput
    messages?: MessageUncheckedUpdateManyWithoutTenantNestedInput
    logs?: SystemLogUncheckedUpdateManyWithoutTenantNestedInput
    devices?: NasDeviceUncheckedUpdateManyWithoutTenantNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type MessageUpsertWithWhereUniqueWithoutRoomInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutRoomInput, MessageUncheckedUpdateWithoutRoomInput>
    create: XOR<MessageCreateWithoutRoomInput, MessageUncheckedCreateWithoutRoomInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutRoomInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutRoomInput, MessageUncheckedUpdateWithoutRoomInput>
  }

  export type MessageUpdateManyWithWhereWithoutRoomInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutRoomInput>
  }

  export type RoomCreateWithoutMessagesInput = {
    id?: string
    name: string
    description?: string | null
    type?: $Enums.RoomType
    createdAt?: Date | string
    tenant: TenantCreateNestedOneWithoutRoomsInput
  }

  export type RoomUncheckedCreateWithoutMessagesInput = {
    id?: string
    name: string
    description?: string | null
    type?: $Enums.RoomType
    tenantId: string
    createdAt?: Date | string
  }

  export type RoomCreateOrConnectWithoutMessagesInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutMessagesInput, RoomUncheckedCreateWithoutMessagesInput>
  }

  export type UserCreateWithoutMessagesInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: boolean | null
    image?: string | null
    phoneNumber?: string | null
    gender?: string | null
    status?: string | null
    isAnonymous?: boolean
    role?: $Enums.GlobalRole
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: TenantMemberCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    passkeys?: PasskeyCreateNestedManyWithoutUserInput
    feedbacks?: FeedbackCreateNestedManyWithoutUserInput
    biometricTokens?: BiometricTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMessagesInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: boolean | null
    image?: string | null
    phoneNumber?: string | null
    gender?: string | null
    status?: string | null
    isAnonymous?: boolean
    role?: $Enums.GlobalRole
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: TenantMemberUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    passkeys?: PasskeyUncheckedCreateNestedManyWithoutUserInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutUserInput
    biometricTokens?: BiometricTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMessagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
  }

  export type TenantCreateWithoutMessagesInput = {
    id?: string
    name: string
    slug: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    logoUrl?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bssid?: string | null
    staticIp?: string | null
    latitude?: number | null
    longitude?: number | null
    menuEnabled?: boolean
    feedbackEnabled?: boolean
    staffEnabled?: boolean
    menuUrl?: string | null
    members?: TenantMemberCreateNestedManyWithoutTenantInput
    rooms?: RoomCreateNestedManyWithoutTenantInput
    logs?: SystemLogCreateNestedManyWithoutTenantInput
    devices?: NasDeviceCreateNestedManyWithoutTenantInput
    feedbacks?: FeedbackCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutMessagesInput = {
    id?: string
    name: string
    slug: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    logoUrl?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bssid?: string | null
    staticIp?: string | null
    latitude?: number | null
    longitude?: number | null
    menuEnabled?: boolean
    feedbackEnabled?: boolean
    staffEnabled?: boolean
    menuUrl?: string | null
    members?: TenantMemberUncheckedCreateNestedManyWithoutTenantInput
    rooms?: RoomUncheckedCreateNestedManyWithoutTenantInput
    logs?: SystemLogUncheckedCreateNestedManyWithoutTenantInput
    devices?: NasDeviceUncheckedCreateNestedManyWithoutTenantInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutMessagesInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutMessagesInput, TenantUncheckedCreateWithoutMessagesInput>
  }

  export type RoomUpsertWithoutMessagesInput = {
    update: XOR<RoomUpdateWithoutMessagesInput, RoomUncheckedUpdateWithoutMessagesInput>
    create: XOR<RoomCreateWithoutMessagesInput, RoomUncheckedCreateWithoutMessagesInput>
    where?: RoomWhereInput
  }

  export type RoomUpdateToOneWithWhereWithoutMessagesInput = {
    where?: RoomWhereInput
    data: XOR<RoomUpdateWithoutMessagesInput, RoomUncheckedUpdateWithoutMessagesInput>
  }

  export type RoomUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutRoomsNestedInput
  }

  export type RoomUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutMessagesInput = {
    update: XOR<UserUpdateWithoutMessagesInput, UserUncheckedUpdateWithoutMessagesInput>
    create: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMessagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMessagesInput, UserUncheckedUpdateWithoutMessagesInput>
  }

  export type UserUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumGlobalRoleFieldUpdateOperationsInput | $Enums.GlobalRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: TenantMemberUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    passkeys?: PasskeyUpdateManyWithoutUserNestedInput
    feedbacks?: FeedbackUpdateManyWithoutUserNestedInput
    biometricTokens?: BiometricTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumGlobalRoleFieldUpdateOperationsInput | $Enums.GlobalRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: TenantMemberUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    passkeys?: PasskeyUncheckedUpdateManyWithoutUserNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutUserNestedInput
    biometricTokens?: BiometricTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TenantUpsertWithoutMessagesInput = {
    update: XOR<TenantUpdateWithoutMessagesInput, TenantUncheckedUpdateWithoutMessagesInput>
    create: XOR<TenantCreateWithoutMessagesInput, TenantUncheckedCreateWithoutMessagesInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutMessagesInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutMessagesInput, TenantUncheckedUpdateWithoutMessagesInput>
  }

  export type TenantUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bssid?: NullableStringFieldUpdateOperationsInput | string | null
    staticIp?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    menuEnabled?: BoolFieldUpdateOperationsInput | boolean
    feedbackEnabled?: BoolFieldUpdateOperationsInput | boolean
    staffEnabled?: BoolFieldUpdateOperationsInput | boolean
    menuUrl?: NullableStringFieldUpdateOperationsInput | string | null
    members?: TenantMemberUpdateManyWithoutTenantNestedInput
    rooms?: RoomUpdateManyWithoutTenantNestedInput
    logs?: SystemLogUpdateManyWithoutTenantNestedInput
    devices?: NasDeviceUpdateManyWithoutTenantNestedInput
    feedbacks?: FeedbackUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bssid?: NullableStringFieldUpdateOperationsInput | string | null
    staticIp?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    menuEnabled?: BoolFieldUpdateOperationsInput | boolean
    feedbackEnabled?: BoolFieldUpdateOperationsInput | boolean
    staffEnabled?: BoolFieldUpdateOperationsInput | boolean
    menuUrl?: NullableStringFieldUpdateOperationsInput | string | null
    members?: TenantMemberUncheckedUpdateManyWithoutTenantNestedInput
    rooms?: RoomUncheckedUpdateManyWithoutTenantNestedInput
    logs?: SystemLogUncheckedUpdateManyWithoutTenantNestedInput
    devices?: NasDeviceUncheckedUpdateManyWithoutTenantNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type TenantCreateWithoutLogsInput = {
    id?: string
    name: string
    slug: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    logoUrl?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bssid?: string | null
    staticIp?: string | null
    latitude?: number | null
    longitude?: number | null
    menuEnabled?: boolean
    feedbackEnabled?: boolean
    staffEnabled?: boolean
    menuUrl?: string | null
    members?: TenantMemberCreateNestedManyWithoutTenantInput
    messages?: MessageCreateNestedManyWithoutTenantInput
    rooms?: RoomCreateNestedManyWithoutTenantInput
    devices?: NasDeviceCreateNestedManyWithoutTenantInput
    feedbacks?: FeedbackCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutLogsInput = {
    id?: string
    name: string
    slug: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    logoUrl?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bssid?: string | null
    staticIp?: string | null
    latitude?: number | null
    longitude?: number | null
    menuEnabled?: boolean
    feedbackEnabled?: boolean
    staffEnabled?: boolean
    menuUrl?: string | null
    members?: TenantMemberUncheckedCreateNestedManyWithoutTenantInput
    messages?: MessageUncheckedCreateNestedManyWithoutTenantInput
    rooms?: RoomUncheckedCreateNestedManyWithoutTenantInput
    devices?: NasDeviceUncheckedCreateNestedManyWithoutTenantInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutLogsInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutLogsInput, TenantUncheckedCreateWithoutLogsInput>
  }

  export type TenantUpsertWithoutLogsInput = {
    update: XOR<TenantUpdateWithoutLogsInput, TenantUncheckedUpdateWithoutLogsInput>
    create: XOR<TenantCreateWithoutLogsInput, TenantUncheckedCreateWithoutLogsInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutLogsInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutLogsInput, TenantUncheckedUpdateWithoutLogsInput>
  }

  export type TenantUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bssid?: NullableStringFieldUpdateOperationsInput | string | null
    staticIp?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    menuEnabled?: BoolFieldUpdateOperationsInput | boolean
    feedbackEnabled?: BoolFieldUpdateOperationsInput | boolean
    staffEnabled?: BoolFieldUpdateOperationsInput | boolean
    menuUrl?: NullableStringFieldUpdateOperationsInput | string | null
    members?: TenantMemberUpdateManyWithoutTenantNestedInput
    messages?: MessageUpdateManyWithoutTenantNestedInput
    rooms?: RoomUpdateManyWithoutTenantNestedInput
    devices?: NasDeviceUpdateManyWithoutTenantNestedInput
    feedbacks?: FeedbackUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bssid?: NullableStringFieldUpdateOperationsInput | string | null
    staticIp?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    menuEnabled?: BoolFieldUpdateOperationsInput | boolean
    feedbackEnabled?: BoolFieldUpdateOperationsInput | boolean
    staffEnabled?: BoolFieldUpdateOperationsInput | boolean
    menuUrl?: NullableStringFieldUpdateOperationsInput | string | null
    members?: TenantMemberUncheckedUpdateManyWithoutTenantNestedInput
    messages?: MessageUncheckedUpdateManyWithoutTenantNestedInput
    rooms?: RoomUncheckedUpdateManyWithoutTenantNestedInput
    devices?: NasDeviceUncheckedUpdateManyWithoutTenantNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type UserCreateWithoutPasskeysInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: boolean | null
    image?: string | null
    phoneNumber?: string | null
    gender?: string | null
    status?: string | null
    isAnonymous?: boolean
    role?: $Enums.GlobalRole
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: TenantMemberCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutUserInput
    feedbacks?: FeedbackCreateNestedManyWithoutUserInput
    biometricTokens?: BiometricTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPasskeysInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: boolean | null
    image?: string | null
    phoneNumber?: string | null
    gender?: string | null
    status?: string | null
    isAnonymous?: boolean
    role?: $Enums.GlobalRole
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: TenantMemberUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutUserInput
    biometricTokens?: BiometricTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPasskeysInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPasskeysInput, UserUncheckedCreateWithoutPasskeysInput>
  }

  export type UserUpsertWithoutPasskeysInput = {
    update: XOR<UserUpdateWithoutPasskeysInput, UserUncheckedUpdateWithoutPasskeysInput>
    create: XOR<UserCreateWithoutPasskeysInput, UserUncheckedCreateWithoutPasskeysInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPasskeysInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPasskeysInput, UserUncheckedUpdateWithoutPasskeysInput>
  }

  export type UserUpdateWithoutPasskeysInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumGlobalRoleFieldUpdateOperationsInput | $Enums.GlobalRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: TenantMemberUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutUserNestedInput
    feedbacks?: FeedbackUpdateManyWithoutUserNestedInput
    biometricTokens?: BiometricTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPasskeysInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumGlobalRoleFieldUpdateOperationsInput | $Enums.GlobalRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: TenantMemberUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutUserNestedInput
    biometricTokens?: BiometricTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutFeedbacksInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: boolean | null
    image?: string | null
    phoneNumber?: string | null
    gender?: string | null
    status?: string | null
    isAnonymous?: boolean
    role?: $Enums.GlobalRole
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: TenantMemberCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutUserInput
    passkeys?: PasskeyCreateNestedManyWithoutUserInput
    biometricTokens?: BiometricTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFeedbacksInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: boolean | null
    image?: string | null
    phoneNumber?: string | null
    gender?: string | null
    status?: string | null
    isAnonymous?: boolean
    role?: $Enums.GlobalRole
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: TenantMemberUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput
    passkeys?: PasskeyUncheckedCreateNestedManyWithoutUserInput
    biometricTokens?: BiometricTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFeedbacksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFeedbacksInput, UserUncheckedCreateWithoutFeedbacksInput>
  }

  export type TenantCreateWithoutFeedbacksInput = {
    id?: string
    name: string
    slug: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    logoUrl?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bssid?: string | null
    staticIp?: string | null
    latitude?: number | null
    longitude?: number | null
    menuEnabled?: boolean
    feedbackEnabled?: boolean
    staffEnabled?: boolean
    menuUrl?: string | null
    members?: TenantMemberCreateNestedManyWithoutTenantInput
    messages?: MessageCreateNestedManyWithoutTenantInput
    rooms?: RoomCreateNestedManyWithoutTenantInput
    logs?: SystemLogCreateNestedManyWithoutTenantInput
    devices?: NasDeviceCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutFeedbacksInput = {
    id?: string
    name: string
    slug: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    logoUrl?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bssid?: string | null
    staticIp?: string | null
    latitude?: number | null
    longitude?: number | null
    menuEnabled?: boolean
    feedbackEnabled?: boolean
    staffEnabled?: boolean
    menuUrl?: string | null
    members?: TenantMemberUncheckedCreateNestedManyWithoutTenantInput
    messages?: MessageUncheckedCreateNestedManyWithoutTenantInput
    rooms?: RoomUncheckedCreateNestedManyWithoutTenantInput
    logs?: SystemLogUncheckedCreateNestedManyWithoutTenantInput
    devices?: NasDeviceUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutFeedbacksInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutFeedbacksInput, TenantUncheckedCreateWithoutFeedbacksInput>
  }

  export type UserUpsertWithoutFeedbacksInput = {
    update: XOR<UserUpdateWithoutFeedbacksInput, UserUncheckedUpdateWithoutFeedbacksInput>
    create: XOR<UserCreateWithoutFeedbacksInput, UserUncheckedCreateWithoutFeedbacksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFeedbacksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFeedbacksInput, UserUncheckedUpdateWithoutFeedbacksInput>
  }

  export type UserUpdateWithoutFeedbacksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumGlobalRoleFieldUpdateOperationsInput | $Enums.GlobalRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: TenantMemberUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutUserNestedInput
    passkeys?: PasskeyUpdateManyWithoutUserNestedInput
    biometricTokens?: BiometricTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFeedbacksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumGlobalRoleFieldUpdateOperationsInput | $Enums.GlobalRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: TenantMemberUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput
    passkeys?: PasskeyUncheckedUpdateManyWithoutUserNestedInput
    biometricTokens?: BiometricTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TenantUpsertWithoutFeedbacksInput = {
    update: XOR<TenantUpdateWithoutFeedbacksInput, TenantUncheckedUpdateWithoutFeedbacksInput>
    create: XOR<TenantCreateWithoutFeedbacksInput, TenantUncheckedCreateWithoutFeedbacksInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutFeedbacksInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutFeedbacksInput, TenantUncheckedUpdateWithoutFeedbacksInput>
  }

  export type TenantUpdateWithoutFeedbacksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bssid?: NullableStringFieldUpdateOperationsInput | string | null
    staticIp?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    menuEnabled?: BoolFieldUpdateOperationsInput | boolean
    feedbackEnabled?: BoolFieldUpdateOperationsInput | boolean
    staffEnabled?: BoolFieldUpdateOperationsInput | boolean
    menuUrl?: NullableStringFieldUpdateOperationsInput | string | null
    members?: TenantMemberUpdateManyWithoutTenantNestedInput
    messages?: MessageUpdateManyWithoutTenantNestedInput
    rooms?: RoomUpdateManyWithoutTenantNestedInput
    logs?: SystemLogUpdateManyWithoutTenantNestedInput
    devices?: NasDeviceUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutFeedbacksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bssid?: NullableStringFieldUpdateOperationsInput | string | null
    staticIp?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    menuEnabled?: BoolFieldUpdateOperationsInput | boolean
    feedbackEnabled?: BoolFieldUpdateOperationsInput | boolean
    staffEnabled?: BoolFieldUpdateOperationsInput | boolean
    menuUrl?: NullableStringFieldUpdateOperationsInput | string | null
    members?: TenantMemberUncheckedUpdateManyWithoutTenantNestedInput
    messages?: MessageUncheckedUpdateManyWithoutTenantNestedInput
    rooms?: RoomUncheckedUpdateManyWithoutTenantNestedInput
    logs?: SystemLogUncheckedUpdateManyWithoutTenantNestedInput
    devices?: NasDeviceUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type UserCreateWithoutBiometricTokensInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: boolean | null
    image?: string | null
    phoneNumber?: string | null
    gender?: string | null
    status?: string | null
    isAnonymous?: boolean
    role?: $Enums.GlobalRole
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: TenantMemberCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutUserInput
    passkeys?: PasskeyCreateNestedManyWithoutUserInput
    feedbacks?: FeedbackCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBiometricTokensInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: boolean | null
    image?: string | null
    phoneNumber?: string | null
    gender?: string | null
    status?: string | null
    isAnonymous?: boolean
    role?: $Enums.GlobalRole
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: TenantMemberUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutUserInput
    passkeys?: PasskeyUncheckedCreateNestedManyWithoutUserInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBiometricTokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBiometricTokensInput, UserUncheckedCreateWithoutBiometricTokensInput>
  }

  export type UserUpsertWithoutBiometricTokensInput = {
    update: XOR<UserUpdateWithoutBiometricTokensInput, UserUncheckedUpdateWithoutBiometricTokensInput>
    create: XOR<UserCreateWithoutBiometricTokensInput, UserUncheckedCreateWithoutBiometricTokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBiometricTokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBiometricTokensInput, UserUncheckedUpdateWithoutBiometricTokensInput>
  }

  export type UserUpdateWithoutBiometricTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumGlobalRoleFieldUpdateOperationsInput | $Enums.GlobalRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: TenantMemberUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutUserNestedInput
    passkeys?: PasskeyUpdateManyWithoutUserNestedInput
    feedbacks?: FeedbackUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBiometricTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumGlobalRoleFieldUpdateOperationsInput | $Enums.GlobalRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: TenantMemberUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutUserNestedInput
    passkeys?: PasskeyUncheckedUpdateManyWithoutUserNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TenantMemberCreateManyTenantInput = {
    id?: string
    userId: string
    role?: $Enums.TenantRole
    canModerate?: boolean
    canManageOrders?: boolean
    canViewStats?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageCreateManyTenantInput = {
    id?: string
    text: string
    imageUrl?: string | null
    createdAt?: Date | string
    senderId: string
    senderAlias: string
    senderGender: string
    recipientId?: string | null
    roomId?: string | null
    userId?: string | null
  }

  export type RoomCreateManyTenantInput = {
    id?: string
    name: string
    description?: string | null
    type?: $Enums.RoomType
    createdAt?: Date | string
  }

  export type SystemLogCreateManyTenantInput = {
    id?: string
    event: string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type NasDeviceCreateManyTenantInput = {
    id?: string
    nasId?: string | null
    vpnIp?: string | null
    publicIp?: string | null
    bssid?: string | null
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeedbackCreateManyTenantInput = {
    id?: string
    score: number
    comment?: string | null
    userId: string
    createdAt?: Date | string
  }

  export type TenantMemberUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumTenantRoleFieldUpdateOperationsInput | $Enums.TenantRole
    canModerate?: BoolFieldUpdateOperationsInput | boolean
    canManageOrders?: BoolFieldUpdateOperationsInput | boolean
    canViewStats?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMembershipsNestedInput
  }

  export type TenantMemberUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumTenantRoleFieldUpdateOperationsInput | $Enums.TenantRole
    canModerate?: BoolFieldUpdateOperationsInput | boolean
    canManageOrders?: BoolFieldUpdateOperationsInput | boolean
    canViewStats?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantMemberUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumTenantRoleFieldUpdateOperationsInput | $Enums.TenantRole
    canModerate?: BoolFieldUpdateOperationsInput | boolean
    canManageOrders?: BoolFieldUpdateOperationsInput | boolean
    canViewStats?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    senderId?: StringFieldUpdateOperationsInput | string
    senderAlias?: StringFieldUpdateOperationsInput | string
    senderGender?: StringFieldUpdateOperationsInput | string
    recipientId?: NullableStringFieldUpdateOperationsInput | string | null
    room?: RoomUpdateOneWithoutMessagesNestedInput
    user?: UserUpdateOneWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    senderId?: StringFieldUpdateOperationsInput | string
    senderAlias?: StringFieldUpdateOperationsInput | string
    senderGender?: StringFieldUpdateOperationsInput | string
    recipientId?: NullableStringFieldUpdateOperationsInput | string | null
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MessageUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    senderId?: StringFieldUpdateOperationsInput | string
    senderAlias?: StringFieldUpdateOperationsInput | string
    senderGender?: StringFieldUpdateOperationsInput | string
    recipientId?: NullableStringFieldUpdateOperationsInput | string | null
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RoomUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumRoomTypeFieldUpdateOperationsInput | $Enums.RoomType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemLogUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    event?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemLogUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    event?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemLogUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    event?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NasDeviceUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    nasId?: NullableStringFieldUpdateOperationsInput | string | null
    vpnIp?: NullableStringFieldUpdateOperationsInput | string | null
    publicIp?: NullableStringFieldUpdateOperationsInput | string | null
    bssid?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NasDeviceUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    nasId?: NullableStringFieldUpdateOperationsInput | string | null
    vpnIp?: NullableStringFieldUpdateOperationsInput | string | null
    publicIp?: NullableStringFieldUpdateOperationsInput | string | null
    bssid?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NasDeviceUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    nasId?: NullableStringFieldUpdateOperationsInput | string | null
    vpnIp?: NullableStringFieldUpdateOperationsInput | string | null
    publicIp?: NullableStringFieldUpdateOperationsInput | string | null
    bssid?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFeedbacksNestedInput
  }

  export type FeedbackUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantMemberCreateManyUserInput = {
    id?: string
    tenantId: string
    role?: $Enums.TenantRole
    canModerate?: boolean
    canManageOrders?: boolean
    canViewStats?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionCreateManyUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountCreateManyUserInput = {
    id?: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    idToken?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageCreateManyUserInput = {
    id?: string
    text: string
    imageUrl?: string | null
    createdAt?: Date | string
    senderId: string
    senderAlias: string
    senderGender: string
    recipientId?: string | null
    roomId?: string | null
    tenantId: string
  }

  export type PasskeyCreateManyUserInput = {
    id: string
    name?: string | null
    publicKey: string
    credentialID: string
    counter: number
    deviceType: string
    backedUp: boolean
    transports?: string | null
    aaguid?: string | null
    createdAt?: Date | string | null
  }

  export type FeedbackCreateManyUserInput = {
    id?: string
    score: number
    comment?: string | null
    tenantId: string
    createdAt?: Date | string
  }

  export type BiometricTokenCreateManyUserInput = {
    id?: string
    token: string
    deviceId: string
    createdAt?: Date | string
    expiresAt?: Date | string | null
  }

  export type TenantMemberUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumTenantRoleFieldUpdateOperationsInput | $Enums.TenantRole
    canModerate?: BoolFieldUpdateOperationsInput | boolean
    canManageOrders?: BoolFieldUpdateOperationsInput | boolean
    canViewStats?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutMembersNestedInput
  }

  export type TenantMemberUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    role?: EnumTenantRoleFieldUpdateOperationsInput | $Enums.TenantRole
    canModerate?: BoolFieldUpdateOperationsInput | boolean
    canManageOrders?: BoolFieldUpdateOperationsInput | boolean
    canViewStats?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantMemberUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    role?: EnumTenantRoleFieldUpdateOperationsInput | $Enums.TenantRole
    canModerate?: BoolFieldUpdateOperationsInput | boolean
    canManageOrders?: BoolFieldUpdateOperationsInput | boolean
    canViewStats?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    senderId?: StringFieldUpdateOperationsInput | string
    senderAlias?: StringFieldUpdateOperationsInput | string
    senderGender?: StringFieldUpdateOperationsInput | string
    recipientId?: NullableStringFieldUpdateOperationsInput | string | null
    room?: RoomUpdateOneWithoutMessagesNestedInput
    tenant?: TenantUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    senderId?: StringFieldUpdateOperationsInput | string
    senderAlias?: StringFieldUpdateOperationsInput | string
    senderGender?: StringFieldUpdateOperationsInput | string
    recipientId?: NullableStringFieldUpdateOperationsInput | string | null
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    tenantId?: StringFieldUpdateOperationsInput | string
  }

  export type MessageUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    senderId?: StringFieldUpdateOperationsInput | string
    senderAlias?: StringFieldUpdateOperationsInput | string
    senderGender?: StringFieldUpdateOperationsInput | string
    recipientId?: NullableStringFieldUpdateOperationsInput | string | null
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    tenantId?: StringFieldUpdateOperationsInput | string
  }

  export type PasskeyUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    publicKey?: StringFieldUpdateOperationsInput | string
    credentialID?: StringFieldUpdateOperationsInput | string
    counter?: IntFieldUpdateOperationsInput | number
    deviceType?: StringFieldUpdateOperationsInput | string
    backedUp?: BoolFieldUpdateOperationsInput | boolean
    transports?: NullableStringFieldUpdateOperationsInput | string | null
    aaguid?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PasskeyUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    publicKey?: StringFieldUpdateOperationsInput | string
    credentialID?: StringFieldUpdateOperationsInput | string
    counter?: IntFieldUpdateOperationsInput | number
    deviceType?: StringFieldUpdateOperationsInput | string
    backedUp?: BoolFieldUpdateOperationsInput | boolean
    transports?: NullableStringFieldUpdateOperationsInput | string | null
    aaguid?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PasskeyUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    publicKey?: StringFieldUpdateOperationsInput | string
    credentialID?: StringFieldUpdateOperationsInput | string
    counter?: IntFieldUpdateOperationsInput | number
    deviceType?: StringFieldUpdateOperationsInput | string
    backedUp?: BoolFieldUpdateOperationsInput | boolean
    transports?: NullableStringFieldUpdateOperationsInput | string | null
    aaguid?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FeedbackUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutFeedbacksNestedInput
  }

  export type FeedbackUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BiometricTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BiometricTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BiometricTokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MessageCreateManyRoomInput = {
    id?: string
    text: string
    imageUrl?: string | null
    createdAt?: Date | string
    senderId: string
    senderAlias: string
    senderGender: string
    recipientId?: string | null
    userId?: string | null
    tenantId: string
  }

  export type MessageUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    senderId?: StringFieldUpdateOperationsInput | string
    senderAlias?: StringFieldUpdateOperationsInput | string
    senderGender?: StringFieldUpdateOperationsInput | string
    recipientId?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneWithoutMessagesNestedInput
    tenant?: TenantUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    senderId?: StringFieldUpdateOperationsInput | string
    senderAlias?: StringFieldUpdateOperationsInput | string
    senderGender?: StringFieldUpdateOperationsInput | string
    recipientId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    tenantId?: StringFieldUpdateOperationsInput | string
  }

  export type MessageUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    senderId?: StringFieldUpdateOperationsInput | string
    senderAlias?: StringFieldUpdateOperationsInput | string
    senderGender?: StringFieldUpdateOperationsInput | string
    recipientId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    tenantId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use TenantCountOutputTypeDefaultArgs instead
     */
    export type TenantCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TenantCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RoomCountOutputTypeDefaultArgs instead
     */
    export type RoomCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RoomCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TenantDefaultArgs instead
     */
    export type TenantArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TenantDefaultArgs<ExtArgs>
    /**
     * @deprecated Use NasDeviceDefaultArgs instead
     */
    export type NasDeviceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = NasDeviceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SessionDefaultArgs instead
     */
    export type SessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SessionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AccountDefaultArgs instead
     */
    export type AccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AccountDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VerificationDefaultArgs instead
     */
    export type VerificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VerificationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TenantMemberDefaultArgs instead
     */
    export type TenantMemberArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TenantMemberDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RoomDefaultArgs instead
     */
    export type RoomArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RoomDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MessageDefaultArgs instead
     */
    export type MessageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MessageDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SystemLogDefaultArgs instead
     */
    export type SystemLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SystemLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PasskeyDefaultArgs instead
     */
    export type PasskeyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PasskeyDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FeedbackDefaultArgs instead
     */
    export type FeedbackArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FeedbackDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BiometricTokenDefaultArgs instead
     */
    export type BiometricTokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BiometricTokenDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
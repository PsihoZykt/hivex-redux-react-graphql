import {CurrencyKeys, MentorKeys, ProjectKeys, ProxyKeys} from "types/EntityTypes/EntityTypes";
type WithCurrencyChange<T> = { [P in T & string as `currency{${P}}`]: P };
type GraphQLCurrencyKeys = WithCurrencyChange<CurrencyKeys>
type CurrencyDottedFieldType = keyof GraphQLCurrencyKeys

export type GraphQLProxyFieldType = ProxyKeys | CurrencyDottedFieldType

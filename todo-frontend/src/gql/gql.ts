/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "mutation createTask($task: TaskInput!) {\n  createTask(task: $task) {\n    id\n    task\n    isComplete\n    cretedAt\n    updatedAt\n  }\n}": types.CreateTaskDocument,
    "mutation Delete($deleteTaskId: Float!) {\n  deleteTask(id: $deleteTaskId)\n}": types.DeleteDocument,
    "query getAllTask {\n  tasks {\n    id\n    task\n    isComplete\n    cretedAt\n    updatedAt\n  }\n}": types.GetAllTaskDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation createTask($task: TaskInput!) {\n  createTask(task: $task) {\n    id\n    task\n    isComplete\n    cretedAt\n    updatedAt\n  }\n}"): (typeof documents)["mutation createTask($task: TaskInput!) {\n  createTask(task: $task) {\n    id\n    task\n    isComplete\n    cretedAt\n    updatedAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Delete($deleteTaskId: Float!) {\n  deleteTask(id: $deleteTaskId)\n}"): (typeof documents)["mutation Delete($deleteTaskId: Float!) {\n  deleteTask(id: $deleteTaskId)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getAllTask {\n  tasks {\n    id\n    task\n    isComplete\n    cretedAt\n    updatedAt\n  }\n}"): (typeof documents)["query getAllTask {\n  tasks {\n    id\n    task\n    isComplete\n    cretedAt\n    updatedAt\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerJournal = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Journal, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly summary: string;
  readonly location?: string | null;
  readonly date: string;
  readonly message?: string | null;
  readonly tags?: (string | null)[] | null;
  readonly pictures?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyJournal = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Journal, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly summary: string;
  readonly location?: string | null;
  readonly date: string;
  readonly message?: string | null;
  readonly tags?: (string | null)[] | null;
  readonly pictures?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Journal = LazyLoading extends LazyLoadingDisabled ? EagerJournal : LazyJournal

export declare const Journal: (new (init: ModelInit<Journal>) => Journal) & {
  copyOf(source: Journal, mutator: (draft: MutableModel<Journal>) => MutableModel<Journal> | void): Journal;
}
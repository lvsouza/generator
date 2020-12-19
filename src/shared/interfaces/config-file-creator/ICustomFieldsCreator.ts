import { IObservable } from 'react-observing';

export interface IColumnPatternsCreator {
  /**
   * Chave utilizada nos patterns interable
   */
  key: IObservable<string>;
  props: {
    required: IObservable<boolean | undefined>;
    displayName: IObservable<string | undefined>;
    description: IObservable<string | undefined>;
    suggestions: IObservable<string[] | undefined>;
    type: IObservable<'text' | 'select' | 'checkbox' | 'number' | 'date' | undefined>;
  };
}

export interface IInterableColumnPatternsCreator {
  /**
   * Chave utilizada nos arquivos para alterar e mover
   */
  key: IObservable<string>;
  content: IObservable<string[]>;
  contentString: IObservable<string | undefined>;
  props: {
    displayName: IObservable<string | undefined>;
    description: IObservable<string | undefined>;
  };
}

export interface ICustomFieldsCreator {
  /**
   * Campos custumizados que podem ser usados
   * somente dentro do `interableColumnPatterns`
   */
  columnPatterns: IObservable<IColumnPatternsCreator[]>;
  /**
   * Nos arquivos para mover e para alterar.
   * Esse pattern contém a listagem de campos que forem criados
   */
  interableColumnPatterns: IObservable<IInterableColumnPatternsCreator[]>;
}

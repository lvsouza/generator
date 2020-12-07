export interface IColumnPatterns {
    /**
     * Chave utilizada nos patterns interable
     */
    key: string;
    props: {
        required?: boolean;
        displayName?: string;
        description?: string;
        suggestions?: string[];
        type?: 'text' | 'select' | 'checkbox' | 'number' | 'date';
    };
}

export interface IInterableColumnPatterns {
    /**
     * Chave utilizada nos arquivos para alterar e mover
     */
    key: string;
    content: string[];
    contentString?: string;
    props: {
        displayName?: string;
        description?: string;
    };
}

export interface ICustomFields {
    /**
     * Campos custumizados que podem ser usados
     * somente dentro do `interableColumnPatterns`
     */
    columnPatterns: IColumnPatterns[];
    /**
     * Nos arquivos para mover e para alterar.
     * Esse pattern contém a listagem de campos que forem criados
     */
    interableColumnPatterns: IInterableColumnPatterns[];
}

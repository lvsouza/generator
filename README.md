# Generator
Esta ferramenta vai ajudar no desenvolvimento de códigos repetitivos.


## Maneria de uso
1. No projeto em que deseja usar a ferramenta, crie uma pasta com nome de `templates`
1. Dentro da pasta você deve criar uma pasta para cada template que deseja ter
1. Dentro da pasta do template crie um arquivo chamado `config.json`
1. Na pasta adicione todos os arquivos que deseja que seja gerados, o arquivo pode estar com qualquer nome. É remomendado usar um nome que represente de forma genérica o que o arquivo faz

## Arquivo de configuração

### **Etapa 1** - Base do arquivo

No arquivo de configuração você deve adicionar algumas seções
 
1. Adicione a seção `patterns` que será um array de chaves que poderão ser substituídas no meio dos arquivos de templates e outros 
1. Adicione a seçao de `filesToMove` um array de arquivos que serão movidos para os caminhos informados
1. Adicione a seçao de `filesToChange` um array que informará quais arquivos já existentes serão alterados

No final o seu arquivo deve estar assim:
``` jsonc 
{
  "patterns": [],
  "propertiesList": {
	  "dataTypes": [],
	  "patterns": []
  },
  "filesToMove": [],
  "filesToChange": []
}
```

### **Etapa 2** - Patterns

A seção deve ser composta por estas propriedades:

``` jsonc
{
  "patterns": [
    {
			"key": "Entidade", // Valor que será buscado e alterado no meio do seu template
			"props": { // Configura a maneira como a input será mostrada na ferramenta
				"type": "text", // tipo de campo mostrado ao usuário. Pode ser "text", "number" ou "select"
				"suggestions": [], // Usado para adicionar sugestões dentro das inputs ou para gerar as opções das inputs do tipo select
				"displayName": "Nome da entidade", // Label exibido na input ao usuário na ferramenta
				"description": "Digite o nome da entidade" // Valor será mostrado como ajuda ao usuário da ferramenta
			}
		}
  ]
}
```

### **Etapa 3** - filesToMove

A seção deve ser composta por estas propriedades:

``` jsonc
{
  "filesToMove": [ // Contém cada arquivo que será criado ou alterado
    {
			"originalName": "template01.ts", // Nome usado no arquivo contido dentro da pasta do template
			"newName": "$PascalCase({{Entidade}}).ts", // Vai formar o novo nome do arquivo
			"targetPath": [ // Caminho para onde o arquivo deve ser salvo, se o caminho não existir será criado
				"{{ProjectPath}}",
				"src",
				"shared",
				"models"
			]
		}
  ]
}
```

### **Etapa 4** - filesToChange

A seção deve ser composta por estas propriedades:

``` jsonc
{
  "filesToChange": [ // Contém cada arquivo que será alterado
		{
			"name": "index.ts", // Nome do arquivo que será alterado
			"description": "Adiciona exportações", // Descrição das alterações no arquivo
			"path": [ // Caminho para o arquivo que será alterado
				"{{ProjectPath}}",
				"src",
				"shared",
				"models",
				"index.ts"
			],
			"actions": [ // Lista de ações que serão feitas no arquivo
				{
					"position": "before", // Posição da nova linha. Pode ser antes ou depois do alvo
					"target": "/* Line up */", // texto que será usado para encontrar a linha onde deve ser adicionado o novo conteúdo
					"description": "Exporta arquivo $PascalCase({{Entidade}}).ts", // Descreve o que está ação fará no arquivo
					"content": [ // Conteúdo que será adicionado no arquivo. Cada item do array representa uma novo linha
						"export * from './$PascalCase({{Entidade}})';"
					]
				}
      ]
		}
  ]
}
```

### **Etapa 5** - propertiesPatterns

A seção deve ser composta por estas propriedades:

``` jsonc
{
    "propertiesList": {
        "dataTypes": [ // Usado para definir tipagem dos campos
            "number",
            "string",
            "boolean",
            "Date"
        ],
        "patterns": [ // A "Key" pode ser usada como pattern para informar o local onde a lista de campos deve ser gerada
            {
                "key": "ClasseProps", // Valor que será buscado e alterado no meio do seu template
                "props": {// Propriedades da propriedade
                    "displayName": "Interface", // Nome que será mostrado ao usuário. Não obrigatório
                    "description": "Inclui está propriedade na interface" // Descrição mais detalhada da propriedade. Não obrigatório.
                },
                "content": [
                    "  $CamelCase<({{PropName}})>$If<({{PropAllowNull}}|true|?|)>: {{PropType}}$If<({{PropDefaultValue}}||| = {{PropDefaultValue}})>;" // Conteúdo que será transformado e adicionado no local onde a key estiver
                ]
            }
        ]
    }
}
```

## Deixando o template dinâmico

No seu template basta subistituir as palavras chaves pelas "keys" que você cadastrou anteriormente na seção de patterns

Ex: 

Antes
``` TS
interface IMinhaInterface {
	id: number;
	name: string;
} 
```

Depois
``` TS
interface I$PascalCase<({{Entidade}})> {
{{ClasseProps}}
} 
```

## Utilizando a ferramenta

1. Ao abrir a ferramenta selecione a pasta do seu projeto e avance
1. Selecione a pasta onde está os template que você configurou e avance
1. Selecione o template que desejar e avance
1. Preencha os campos e avance
1. Caso tenha informado alguma `propertiesPatterns` estará disponível uma tabela para que você possa informar campos que podem ser gerados em loop na geração do código. É importante informar os `dataTypes` para que os campos possam preenchidos corretamente
1. Nas telas a seguir confira as alterações que serão feitas
1. Na ultima tela clique em "Write changes" para aplicar o template

## Funções e palavras reservadas
* Palavras

```
{{ProjectPath}}
```

* Funções
```
$PascalCase<(text)>
$CamelCase<(text)>
$SnakeCase<(text)>
$KebabCase<(text)>

$UpperCase<(text)>
$LowerCase<(text)>

$FirstUpper<(text)>
$FirstLower<(text)>

$If<(text|text1|Text se true|Text se falso)>
```

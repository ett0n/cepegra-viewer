# Variables

format: camelCase
lang: en

## useState/Get/Set

getter: getVar
setter: setVar
_ex: const [getUser, setUser] = useState();_

# Comments

lang: fr
spread: /\* --- Le commentaire qui sépare les trucs --- \*/
normal: //le super commentaire qui décrit un code

# Functions

format: PascalCase
type: arrowed () => {}
comment: mandatory (obligatoire)

# Components

format: PascalCase

# Typescript

Resource:
https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/hooks

## If >2 props:

Interface Props {
props: string;
props2: number;
}

Props: const leComposant = ({props, props2}:Props) => {
return ()
}

/_ --- SPREAD --- _/

## Else

Props: const leComposant = ({props}:{props:string}) => {
return ()
}

## Interfaces TS

If used in more than 1 components => ./types/files.ts

# Formater

prettier
tab space: 2

# API

use async/await & try/catch instead of then/catch
cc Pierre

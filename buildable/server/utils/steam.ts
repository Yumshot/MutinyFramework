export const RETURN_STEAM_ID = (source: string | number) => {
       let steamIdentifier: string = null;

       for (let i = 0; i < GetNumPlayerIdentifiers(source as string); i++) {
         const identifier = GetPlayerIdentifier(source as string, i);

         if (identifier.includes("steam:")) {
           steamIdentifier = identifier;
         }
       }

       const query = { steam: steamIdentifier };

       return query;
}
import { readable, writable } from 'svelte/store';

export const sentence = writable(`Costa Rica, oficialmente República de Costa Rica, es *una* nación soberana, organizada como *una* república presidencialista unitaria compuesta por 7 provincias. Ubicada en América Central, posee *un* territorio con *un* área total de 51 100 km². Limita con Nicaragua a*l* norte, *el* mar Caribe a*l* este, Panamá a*l* sureste y *el* océano Pacífico a*l* oeste. En cuanto a *los* bordes marítimos, colinda con Panamá, Nicaragua, Colombia y Ecuador. Cuenta con 5 057 000  habitantes según su última proyección demográfica. Su capital, centro político y económico es San José, y su idioma oficial es *el* español.
`);

export const currentResponse = writable("");

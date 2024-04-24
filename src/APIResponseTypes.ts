
export interface Pokemon {
  name: string;
  url: string;
  speciesurl:string;
  types: string[];
  pokidata: Pokidata
}



export interface Pokemons{
    count: number;
    next:string;
    previous:string;
    results: []
}


export interface Pokidata{
  name: string;
  height: string;
  weight: string;
  species: {  name: string ;
    url: string;}
  sprites: {

   other:{
     dream_world:{
       front_default:string;
     }
     home:{
      front_default:string;
    }
    showdown:{
      "back_default": string,
      
      "front_default": string,
    
    }
   }
  }
  stats:[
    {
      base_stat:number;
      effort:number;
      stat:{
        name:string;
        url:string;
      }
    }
  ]
  types: [{
    slot:number;
    type:{
      name:string ;
      url:string;
    }
  }];
  }
 

export interface PokemonSpecies{
  habitat:{
    name:string;
  }
  growth_rate:{
    name:string;
  }
  color : {
    name:string;
    url:string;
  }

  base_happiness: string ;
  capture_rate:  string;

  shape:{
    name:string;
  }


}

export interface SearchParams {
  pokiname: string;
}


export interface PokemonTypeList {
  results: [
    {
      name:string;
    }
  ]
}
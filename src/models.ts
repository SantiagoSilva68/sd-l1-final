import * as jsonfile from "jsonfile";
// sumo este import solo para que tsc lo tome y lo copie
// en la app no usamos esto para acceder al archivo porque es dinámico
import "c:/Users/yoelr/Desktop/N1/sd-l1-final/pelis.json";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    const pelis = await jsonfile.readFile("c:/Users/yoelr/Desktop/N1/sd-l1-final/pelis.json");
    return pelis;
}
async getById(id:number):Promise<Peli>{
    const listaPelis = await jsonfile.readFile("c:/Users/yoelr/Desktop/N1/sd-l1-final/pelis.json");
    const filtrarPorId = listaPelis.find((d) => d.id === id);
    return filtrarPorId;
};
async add(peli: Peli): Promise<boolean> {
    const peliExistente = await jsonfile.readFile("c:/Users/yoelr/Desktop/N1/sd-l1-final/pelis.json");
    const peliculaExistente = peliExistente.find((p) => p.id === peli.id);
    if (peliculaExistente) {
      return false;
    } 
    peliExistente.push(peli);
    await jsonfile.writeFile("c:/Users/yoelr/Desktop/N1/sd-l1-final/pelis.json", peliExistente);
    return true;
}
async search(options) {
  const lista = await this.getAll();
  const listaFiltrada = lista.filter(function (p) {
    let esteVa = true; 
    if (options.tags && !p.tags.includes(options.tags)) {
      esteVa = false; 
    }
    if (options.title && !p.title.toLowerCase().includes(options.title.toLowerCase())) {
      esteVa = false; 
    }
    return esteVa;
  });
  return listaFiltrada;
}
}
export { PelisCollection, Peli };
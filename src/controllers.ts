import { PelisCollection, Peli } from "./models";
type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  peliss:PelisCollection
  constructor() {
    this.peliss = new PelisCollection;
  }

  async get(options?: Options): Promise<any> {
    if (options) {
      if (options.id) {
        return await this.peliss.getById(options.id);
      } else if (options.search && options.search.title) {
        return await this.peliss.search(options.search);
      }
    }
    return await this.peliss.getAll();
  }
  
  
async add(peli:Peli){
  return await this.peliss.add(peli)
}

}
export { PelisController };
import axios from "axios";
import { LOCAL_SERVER_URL, MOCK_SERVER_URL } from "../constants/api-constants";

const instance = axios.create({
  headers: { "Content-Type": "Application/json" },
});

function kebabCaseToCamel(str) {
  return str.replace(/(\-\w)/g, (matches) => matches[1].toUpperCase());
}
let config = {
  headers: { "Content-Type": "Application/json" },
};
class API {
  constructor({ url }) {
    this.url = url;
    this.endpoints = {};
  }
  /**
   * Create and store a single entity's endpoints
   * @param {A entity Object} entity
   */
  createEntity(entity) {
    /**
     * If there is a - in the entity.name, then change it
     * to camelCase. E.g
     * ```
     * myApi.createEntity({ name : 'foo-bar'})
     * myApi.endpoints.fooBar.getAll(...)
     */

    const name = kebabCaseToCamel(entity.name);
    this.endpoints[name] = this.createBasicCRUDEndpoints(entity);
  }

  createEntities(arrayOfEntity) {
    arrayOfEntity.forEach(this.createEntity.bind(this));
  }
  /**
   * Create the basic endpoints handlers for CRUD operations
   * @param {A entity Object} entity
   */
  createBasicCRUDEndpoints({ name }) {
    var endpoints = {};

    const resourceURL = `${this.url}/${name}`;

    endpoints.getAll = (config = {}) => {
      // //console.log("url :", resourceURL);
      return axios.get(resourceURL, config);
    };

    endpoints.getOne = ( id ) =>
      axios.get(`${resourceURL}/${id}`, config);

    endpoints.create = (toCreate, config = {}) =>
      instance.post(resourceURL, toCreate);

    endpoints.update = (toUpdate, config = {}) =>
      instance.put(`${resourceURL}/${toUpdate.id}`, toUpdate);

    endpoints.patch = ({ id }, toPatch, config = {}) =>
      instance.patch(`${resourceURL}/${id}`, toPatch);

    endpoints.delete = ({ id }, config = {}) =>
      instance.delete(`${resourceURL}/${id}`);

    return endpoints;
  }
}

export default API;

export const APP_API = new API({ url: MOCK_SERVER_URL });

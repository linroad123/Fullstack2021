import axios from 'axios'


const Url = 'http://127.0.0.1:3001/persons'

const get = async () => {
    const res = await axios.get(Url);
    return res.data;
}
const create = async newObject => {
    const res = await axios.post(Url, newObject);
    return res.data;
}
const update = async (id, newObject) => {
    const res = await axios.put(`${Url}/${id}`, newObject);
    return res.data;
 }
const del = async (id) => {
    const res = await axios.delete(`${Url}/${id}`);
    return res.data;
}

export default { get, create, update, del }
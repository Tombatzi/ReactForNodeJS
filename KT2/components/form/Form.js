import React, { useContext,useState } from 'react'
import {SearchContext} from '../../RestApp'

const Form = () => {

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [id, setId] = useState("");

    const formContext = useContext(SearchContext);
    const types = formContext.types.map((type,i) =><option value ={type.AVAIN} key = {i}>{type.LYHENNE}, {type.SELITE}</option>);

    const handleSearch = () =>{
        let str ="";
        if(name != ""){
            str += "nimi=" + name +"%" +"&";
        }
        if(address != ""){
            str += "osoite=" + address +"%" +"&";
        }
        if(id != ""){
            str += "asty_avain=" + id;
        }
        formContext.updateQuery(str);
    }
    return(
        <div>
            <form>
                <label>Nimi: </label>
                <input type = "text" value = {name} onChange={(e) => setName(e.target.value)} />
                <label>Osoite: </label>
                <input type = "text" value = {address} onChange={(e) => setAddress(e.target.value)} />
                <select onChange={(e) => setId(e.target.value)}>
                    <option value="">valitse</option>
                    {types}
                </select>
            </form>
            <button onClick = { () => handleSearch()}>Hae</button>
        </div>
    )
}
export default Form;
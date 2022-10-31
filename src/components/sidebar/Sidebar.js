import React, { useState } from 'react';
import './sidebar.css';
import axios from 'axios'

function Sidebar({ showSidebar, setShowSidebar }) {
  const [segmentName, setSegmentName] = useState("")
  const [selectedSchema, SetSelectedSchema] = useState({});
  const [addSegmentValue, setAddSegmentValue] = useState("");
  const [schema, setSchema] = useState([])
  const [options, setOptions] = useState(
    [
      {label:"First Name", value:"first_name"},
      {label: "Last Name", value:"last_name"},
      {label: "Gender", value:"gender"},
      {label: "Age", value:"age"},
      {label: "Account Name", value:"account_name"},
      {label: "City", value:"city"},
      {label: "State", value:"state"}
    ]
  )

  const handleAddNewSchema = () => {
    if (!addSegmentValue) return alert("Set a value in add segment");

    let newOptionsArr = [...options];              
    let newSchema;                 
    
    options.forEach((obj, i) => { if (obj.value === addSegmentValue) return newSchema = newOptionsArr.splice(i, 1) });

    setOptions(newOptionsArr);
    setSchema([...schema, ...newSchema]);
    setAddSegmentValue("");
  }

  const handleChangeSchema = (changedSchemaValue) => {
    let newOptionsArr = [...options];
    let newSchemaArr = [...schema];
    let newOption, newSchema;

    newSchemaArr.forEach((obj, i) => {
      if (selectedSchema.value === obj.value) return newOption = { label: obj.label, value: obj.value };
    })

    newOptionsArr.forEach((obj, i) => {
      if (changedSchemaValue === obj.value) return newSchema = newOptionsArr.splice(i, 1, newOption);
    })

    newSchemaArr.forEach((obj, i) => {
      if (selectedSchema.value === obj.value) return newSchemaArr.splice(i,1,newSchema[0])
    })
    
    setOptions([...newOptionsArr])
    setSchema([...newSchemaArr]);         
  }
  
  const handleSave = async () => {
    
    let body = {
      segment_name: segmentName,
      schema: schema.map((obj) => {
        let newObj = {};
        newObj[obj['value']] = obj['label'];
        return newObj
      })
    }
    
    // console.log(JSON.stringify(body))
    try {
      axios.post('https://webhook.site/93e900e0-6924-4060-aae5-aca3b838916e', JSON.stringify(body));
    } catch (error) {
      console.log(error);
    }

  }
  
  return (
    <div className={`sidebar ${showSidebar?'d-block':'d-none'}`} >
      <div className='side-header'>
        <button className='btn text-light p-0' onClick={() => setShowSidebar(false)}>
          <span className='px-2 ps-3 fw-bold'>&#60;</span>
        </button>
        Saving Segment
      </div>

      <div className='px-4 py-2 side-body'>
        <div>
          <label>Enter the Name of the Segment</label>
          <input type='text' className='my-1 mb-2 w-100 px-2' placeholder='Name of the segment' value={segmentName} onChange={(e)=> setSegmentName(e.target.value)} ></input>
        </div>
        <p>To save your segment, you need to add the schemas to build the query</p>
        <div className='d-flex justify-content-end'>
          <p className='mx-3 fs-7'>
            <span className='circle-sm bg-success'></span>
            - User Traits
          </p>
          <p className='fs-7'>
            <span className='circle-sm bg-danger'></span>
            - Group Traits
          </p>
        </div>

        <div id='schema'>
          {
            schema.map((sch) => {
              return (
                <li className='fs-7 d-flex align-items-center my-2' key={sch.value}>
                  <span className='circle-sm bg-success me-3'></span>
                  <select label={sch.label} name={`${sch.value}`} id={`${sch.value}`} className='p-1 flex-grow-1' onChange={(e)=>handleChangeSchema(e.target.value)} onClick={()=>SetSelectedSchema(sch)}>
                    <option value={sch.value}> {sch.label} </option>
                    {
                      options.map((obj) => {
                        return (
                          <option value={obj.value} key={obj.value}> {obj.label} </option>
                        )
                      })
                    }
                  </select>
                  <span className='square-sm'>&#x2212;</span>
                </li>
              )
            })
          }
        </div>

        <div className='fs-7 d-flex align-items-center mt-3'>
          <span className='circle-sm bg-grey me-3'></span>
          <select name="add-segment" id='add-segment' className='p-1 flex-grow-1' value={addSegmentValue} onChange={(e)=> setAddSegmentValue(e.target.value)}>
            <option value="">Add schema to the segment</option>
            {
              options.map((obj) => {
                return (
                  <option value={obj.value} key={obj.value} > {obj.label} </option>
                )
              })
            }
          </select>
          <span className='square-sm'>&#x2212;</span>
        </div>

        <button className='btn p-0 my-3 text-success' onClick={handleAddNewSchema}>
          + <span className='text-decoration-underline fs-7'>Add new schema</span>
        </button>

      </div>

      <div className='side-footer'>
        <button className='btn btn-sm btn-success m-1 mx-3' onClick={handleSave}>Save the Segment</button>
        <button className='btn btn-sm btn-light text-danger' onClick={()=> setShowSidebar(false)}>Cancel</button>
      </div>
    </div>
  )
}

export default Sidebar
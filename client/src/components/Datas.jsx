import React from 'react'
import datas from './datas.json'

function Datas() {
  return (
    <div>
      {
        datas.map(data=>{
            return(
                <div>
                    <p><b>Username: </b>{data.username}</p>
                    <p><b>Title: </b>{data.title}</p>
                    <p><b>Description: </b>{data.description}</p>
                    <p><b>Category: </b>{data.category}</p>
                    <p><b>Difficulty: </b>{data.difficulty}</p>
                    <hr />
                </div>
            )
        })
      }
    </div>
  )
}

export default Datas;

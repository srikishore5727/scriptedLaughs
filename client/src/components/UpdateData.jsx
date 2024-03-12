  import React, { useEffect, useState } from 'react';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import Button from 'react-bootstrap/Button';
  import Form from 'react-bootstrap/Form';
  import { useNavigate, useParams, useLocation } from 'react-router-dom';
  import axios from 'axios'

  const UpdateData = () => {
    const {id} = useParams()
    // const [username,setUserName] = useState('');
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [category,setCategory] = useState('');
    const navigate = useNavigate();
    const [isButtonDisabled,setIsButtonDisabled] = useState(true);
    const location = useLocation()


const data = location.state 
// console.log(data)
    useEffect(()=>{
        // setUserName(data.username)
        setTitle(data.title)
        setDescription(data.description)
        setCategory(data.category)
    },[])

    useEffect(()=>{
      if(title.trim()===''|| description.trim()===''|| category.trim()===''){
        setIsButtonDisabled(true);
      }
      else{
        setIsButtonDisabled(false);
      }
    },[title,description,category])

    const update=(e)=>{
      e.preventDefault();
      axios.put(`https://api-27il.onrender.com/prankscripts/updateData/${id}`, {title,description,category})
      .then(res =>{
        console.log(res)
        navigate("/home")
      })
      .catch(err => console.log(err))
    }

    

    return (
      <div>
        <div style={{backgroundColor:"#F8F3EC"}} className='d-flex justify-content-center vh-100'>
        <div className='col-md-5'>
          <Form className='mt-3 p-4 rounded-3' onSubmit={update}>
            <h1 className='text-primary'>Update Script</h1>
            {/* <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
              <Form.Label className='mt-3'>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e)=>setUserName(e.target.value)} />
            </Form.Group> */}

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" value={title} onChange={(e)=>setTitle(e.target.value)} />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter content" value={description} onChange={(e)=>setDescription(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" placeholder="Enter Category" value={category} onChange={(e)=>setCategory(e.target.value)}/>
            </Form.Group>
            
            <Button variant="primary" type="submit" disabled={isButtonDisabled}>
              Update
            </Button>
          </Form>
          </div>
        </div>
      </div>
    );
  };

  export default UpdateData;

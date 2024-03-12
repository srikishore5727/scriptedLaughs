import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostFormData = ({email,username}) => {

  
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [category,setCategory] = useState('');
  const [isButtonDisabled,setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();
  console.log(email)
  console.log(username)
  const Submit=(e)=>{
    e.preventDefault();
    axios.post("https://api-27il.onrender.com/prankscripts/create/", {username,title,description,category,email})
    .then(result=> {
      console.log(result)
      navigate("/home")
    })
    .catch(err=>console.log(err))
  }

  useEffect(()=>{
    if(username.trim()===''|| title.trim()===''|| description.trim()===''|| category.trim()===''){
      setIsButtonDisabled(true);
    }
    else{
      setIsButtonDisabled(false);
    }
  },[username,title,description,category])

  return (
    <div>
      <div style={{backgroundColor:"#F8F3EC"}} className='d-flex justify-content-center vh-100'>
      <div className='col-md-5'>
        <Form className='mt-3 p-4 rounded-3' onSubmit={Submit}>
          <h1 className='text-primary'>Add Script</h1>
          
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" onChange={(e)=>setTitle(e.target.value)} />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Content</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter content" onChange={(e)=>setDescription(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Category</Form.Label>
            <Form.Control type="text" placeholder="Enter Category" onChange={(e)=>setCategory(e.target.value)}/>
          </Form.Group>
          
          <Button variant="primary" type="submit" disabled={isButtonDisabled}>
            Submit
          </Button>
        </Form>
        </div>
      </div>
    </div>
  );
};

export default PostFormData;

"use client";
import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';


const AddUserForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [validated, setValidated] = useState(false);

  // Todo fields
  const [todoText, setTodoText] = useState('');
  const [completed, setCompleted] = useState(false);
  const [userId, setUserId] = useState('');

  const handleAddUser = async () => {
    try {
      const response = await axios.post('/api/users/addUser', {
        firstName,
        lastName,
        validated,
      });

      const data = response.data;

      if (response.status === 200) {
        console.log('User added successfully:', data);
        // You can handle success, e.g., show a success message or reset the form.
      } else {
        console.error('Error adding user:', data.error);
        // You can handle errors, e.g., show an error message.
      }
    } catch (error) {
      console.error('Failed to communicate with the server:', error);
    }
  };

  const handleAddTodo = async () => {
    try {
      const response = await axios.post('/api/todos/addTodo', {
        todoText,
        completed,
        userId: parseInt(userId, 10), // Convert userId to an integer
      });
  
      const data = response.data;
  
      if (response.status === 200) {
        console.log('Todo added successfully:', data);
        // You can handle success, e.g., show a success message or reset the todo fields.
      } 
      else {
        console.error('Error adding todo:', data.error);
        // You can handle other errors, e.g., show an error message.
      }
    } catch (error) {

      if(error.response.status === 400){
        toast.error("User Already Assigned")
      }
      else if(error.response.status === 404){
        toast.error("User Not Found")
      }
      console.log("Client Side Error :: Add Todo:: ", error);
    }
  };
  

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Add User and Todo</h2>
      <form>
        {/* User fields */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">First Name:</label>
          <input
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-indigo-500 text-black"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Last Name:</label>
          <input
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-indigo-500 text-black"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Validated:</label>
          <input
            type="checkbox"
            checked={validated}
            onChange={(e) => setValidated(e.target.checked)}
          />
        </div>
        <button
          className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none"
          type="button"
          onClick={() => {
            handleAddUser();
   
          }}
        >
          Add User 
        </button>

        {/* Todo fields */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Todo Text:</label>
          <input
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-indigo-500 text-black"
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Completed:</label>
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">User ID:</label>
          <input
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-indigo-500 text-black"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>

        <button
          className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none"
          type="button"
          onClick={() => {
         
            handleAddTodo();
          }}
        >
          Add Todo
        </button>
      </form>
      <Toaster/>
    </div>
  );
};

export default AddUserForm;

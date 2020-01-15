import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Time from './components/Time';
import Main from './components/Main';
import styled from 'styled-components';

const Div = styled .div `
background-color: rgba(0, 0, 0, 0.11);
min-height: 100vh;
color: black;
padding-top:100px;
`;


function App() {
    return (
    	<Div>
			<Time/>	
    	</Div>
  	);
}
export default App;

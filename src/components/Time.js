
import React, { useState, useEffect, useRef} from 'react';
import {Col, Row, Button as bButton } from 'react-bootstrap';
import styled from 'styled-components';
import Main from './Main';

const Div = styled.div`
	border: 0.5px solid;
    border-radius: 15px;
    text-align: center;
	background: rgba(158, 170, 255, 0.37);
	`;
const Button = styled(bButton)`
	width:100%;
	`;


function useInterval(callback, delay) {
	const savedCallback = useRef();
  
	useEffect(() => {
	  savedCallback.current = callback;
	});
  
	useEffect(() => {
	  function tick() {
		savedCallback.current();
	  }
  
	  if(delay){
		let id = setInterval(tick, delay);
		return () => clearInterval(id);
	  }
	}, [delay]);
  }

const Timer = () => {
	const [seconds, setSeconds] = useState(0);
  	const [isActive, setIsActive] = useState(false);
	const [minutes, setMinutes] = useState(0);
	const [msteps, setMySteps] = useState(0);
	const childRef = useRef();

	useInterval(() => {
		if(seconds === 59) {
			setMinutes(minutes => minutes + 1);
			setSeconds(0);
		}else{
			setSeconds(seconds => seconds + 1);
		}
	}, isActive ? 1000 : null);

  	function toggle() {	
		setIsActive(!isActive);
  	}

  	function reset(){
    	setSeconds(0);
    	setMinutes(0);
		setIsActive(false);
		setMySteps(0);
		childRef.current.resetMatrix();
	  }
	const addStepsHandler =  () => {
		setMySteps(msteps => msteps + 1);

	}

  return (
    		<div className="row" style={{margin:0,}}>
				<Col lg={{size:4, offset:2,}}>
					<Row>
						<Col lg={2}>
							<Div>
								<h6>Moves</h6>
								{ msteps }
							</Div>
						</Col>
      					<Col lg={2}>
							<Div>
							<h6>Time</h6>
							{minutes}:{seconds}
							</Div>	
      					</Col>
						<Col>
							<h1>
								15 puzzle<br/>
								game
							</h1>
						</Col>
					</Row>
					<Row>
						<Col lg={2}>
							<Button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
          						{isActive ? 'Pause' : 'Start'}
        					</Button>
						</Col>
						<Col lg={2}>
							<Button variant="success" onClick={reset}>
          						Reset
        					</Button>
						</Col>
      				</Row>
					<Row style={{marginTop:"30px"}}>
						<Col lg={{size:5, offset:1}}>
							<Main  addSteps = {addStepsHandler} Toggle={toggle} ref={childRef} />
						</Col>
					</Row>
				</Col>		
    		</div>
  		);
	};
export default Timer;


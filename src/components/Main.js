import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle } from 'react';
import { Row, Col as bCol } from 'react-bootstrap';
import styled from 'styled-components';
import { breakStatement } from '@babel/types';

const Col = styled(bCol)`
text-align:center;
background-color: rgba(255, 255, 165, 1);;
padding: 12px 0 12px 0;
margin: 5px;
border-radius:5px;
font-size:20px;
`;


let currentI = 0;
let currentJ = 0;

const randomMatrix = () => {
    const items = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,null];
    var randomArray = [];
    
    let m = [];
    while(items.length) {
        let index = Math.floor(Math.random()*items.length);
        let temp = items[index];
        items.splice(index,1);
        randomArray.push(temp);
    }
    
    for(let i = 0; i< 4; i++) {
        if(m[i] === undefined){
            m[i] = [];
        }
        for(let j=0;j<4;j++){
            m[i][j] = randomArray.shift();
            if(m[i][j] === null ) {
                currentI = i;
                currentJ = j;
            }
            
        }
        
    }
    return m;
}

const Main = forwardRef(({addSteps,Toggle},ref) => {
    let [matrix,setMatrix] = useState([]);
    
    const resetMatrix = () => {
        const mtr = [...randomMatrix()];
        console.log("random matrix = ",mtr);
        
        //set matrix to state
        // setMatrix(matrix => {
        //     console.log("setMatrix = ",mtr)
        //     console.log("OLD MATRIX = ",matrix); 
        //     return mtr;
        // });
        matrix = mtr;
        setMatrix(matrix);
        console.log("AFTER SETTING = ", matrix);
    }

    useEffect(() => {
        // generate random matrix
        const matrix = randomMatrix();
        //set matrix to state
        setMatrix(matrix)
        // setMatrix(matrix => matr);
        console.log("new matrix = ",matrix);
        
        document.addEventListener('keydown',(e)=>{
            switch(e.keyCode){
                case 37:
                    // "left"
                    moveTo(currentI,currentJ+1);
                    break;
                    
                case 39:
                    // "right"
                    moveTo(currentI,currentJ-1);
                    break;
                case 38:
                    // "up"
                    moveTo(currentI+1,currentJ);
                    break;
                case 40:
                    // "down"
                    moveTo(currentI-1,currentJ);
                    break;
                default:
            }
        });
        const moveTo = (nextI,nextJ) => {
            if((nextI <= -1 || nextI >= 4) || (nextJ <= -1 || nextJ >= 4)) {
                return;
            }
            // console.log(currentJ);
            const copyMatrix = Object.assign([],matrix);
            // console.log(matrix)
            console.log(copyMatrix)
            copyMatrix[currentI][currentJ] = copyMatrix[nextI][nextJ];
            copyMatrix[nextI][nextJ] = null;
            currentI = nextI;
            currentJ = nextJ;
            Toggle();
            addSteps();
            setMatrix(copyMatrix);
        };  
      }, []);

      useEffect(() => {
          console.log("1111111 = ", matrix);
        //   return matrix;
      },[matrix]);

      useImperativeHandle(ref, () => ({
        resetMatrix
    }));
    

    return <div>
        {matrix.map((value, index)=>{
            return <Row key={`row_${index}`}>
                {value.map((item, key)=>{
                    return <Col lg={1} key={`col_${key}`}>{item} &nbsp;</Col> 
                })}
            </Row> 
        })}
    </div>
});

export default Main;
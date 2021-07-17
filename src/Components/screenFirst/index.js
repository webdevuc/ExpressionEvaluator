import React,{ useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button, InputLabel, Select, MenuItem} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    root: {
        flex: 1,
        flexDirection: 'row',
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    heading: {
        fontSize: '44px',
        fontWeight:' 300',
        color: '#70dcb2',
    },
    btn:{
        backgroundColor: '#70dcb2',
        padding: '14.5px 14px',
    },
    numbers:{
        display: 'inline-block',
        padding: '15px',
        margin: '15px',
        background: '#dbfff1',
    }
}));


function ScreenFirst() {
    const classes = useStyles();
    const [num, setNum] = useState('');
    const [numArr, setnumArr] = useState([]);
    const [moveToOperation, setMoveToOperation] = useState(false);
    const [operand, setOperand] = useState('+');
    const [selectedOperand, setSelectedOperand] = useState('+');
    const [calculation, setcalculation] = useState(0);

    useEffect(()=>{
        setcalculation(doCalculations)  
    },[operand])

    const onchangeAddNumber = (e) => {
        console.log(e.target.value);
        if(e.target.value != null)
        {
            setNum(e.target.value);
        }
    }

    const addNumber = () => {
        var arr = numArr;
        if(arr.length < 2)
        {
            if(num != '')
            {
                arr.push(num);
            }
            
        }

        if(arr.length == 2)
        setMoveToOperation(true)
        setnumArr(arr);
        setNum('');

        setcalculation(doCalculations)
        console.log(arr);
    }

    const doCalculations = () => {
        switch(operand) {
            case '+':
              return Number(numArr[0])+Number(numArr[1]);
            case '-':
              return Number(numArr[0])-Number(numArr[1]);
            case '*':
              return Number(numArr[0])*Number(numArr[1]);
            case '/':
              return Number(numArr[0])/Number(numArr[1]);
            default:
              return 0;
          }
    }

    const handleChange = (e) => {
        setSelectedOperand(e.target.value);
    }

    const addoperator = () =>{
        setOperand(selectedOperand);
    }

    return (
        <div className={classes.container}>
            <h1 className={classes.heading}>Expression Evaluator</h1>
            {
                moveToOperation == false?
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="filled-basic" value={num} label={`Please enter a number `+(numArr.length+1)} variant="outlined" onChange={(e)=>onchangeAddNumber(e)} />
                    <Button className={classes.btn} variant="contained" color="primary" onClick={()=>{addNumber()}}>
                        Add Number
                    </Button>
                </form>
                :
                <>
                    <div>
                        {
                            numArr.map((element, i) => {     
                                console.log("Entered");                 
                                // Return the element. Also pass key     
                                return (<span key={i} className={classes.numbers}>{element}</span>) 
                            })
                        }
                        <span className={classes.numbers}>{operand}</span>
                    </div>
                    <div>
                        <span className={classes.numbers}>{calculation}</span>
                    </div>

                    <form className={classes.root} noValidate autoComplete="off">
                        <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={selectedOperand}
                        onChange={handleChange}
                        label="Operand"
                        >
                            <MenuItem value="+">+</MenuItem>
                            <MenuItem value="-">-</MenuItem>
                            <MenuItem value="*">*</MenuItem>
                            <MenuItem value="/">/</MenuItem>
                        </Select>

                        <Button className={classes.btn} variant="contained" color="primary" onClick={()=>addoperator()}>
                            Add operator
                        </Button>
                    </form>
                </>
            }
            
        </div>
        
    );
}

export default ScreenFirst;

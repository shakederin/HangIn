import React,{ useRef, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, TextField } from '@mui/material';

import socket from '../../utils/socket';
import SignUp from './SignUp';

export default function Login() {
    const inputElement = useRef<HTMLInputElement>(null)
    const setUserName = () =>{
        socket.emit("setUserName", (inputElement.current?.value))
    }

    return (
        <div>
            <input ref={inputElement} type="text"/>
            <button onClick={setUserName}>login</button>
            <SignUp/>
        </div>
    )
    const [values, setValues] = useState({
        password: '',
        showPassword: false,
      });
      
    const handleChange = (prop: string) => (event: { target: { value: any; }; }) => {
    setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
    setValues({
        ...values,
        showPassword: !values.showPassword,
    });
    };

    const handleMouseDownPassword = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    };

    return (
        <div className='formBox'>
            <Box
                component="form"
                sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                autoComplete="off"
            >
                <h1>SignUp</h1>
                <TextField
                    id="outlined-required"
                    label="Username"
                    ref={inputElement}
                />
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                <Button onClick={setUserName} variant="contained">Login</Button>
            </Box>
        </div>
    )
}

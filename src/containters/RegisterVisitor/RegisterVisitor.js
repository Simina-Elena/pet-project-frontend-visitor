import {useState} from "react";
import {useHistory} from "react-router-dom";
import {
    Box,
    Button,
    FormControl, FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField, Typography
} from "@mui/material";
import {AuthService} from "pet-project-frontend-sharedcomponents";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import * as React from "react";
import * as yup from 'yup'
import {useFormik} from "formik";
import {useToasts} from "react-toast-notifications";

const validationSchema = yup.object({
    username: yup
        .string('Enter your username')
        .max(25, 'Username must not be longer that 25 chars')
        .required('Username is required'),
    password: yup
        .string('Enter your password')
        .min(6, 'Password should be of minimum 6 characters length')
        .required('Password is required'),
    confirmPassword: yup
        .string("Enter your password")
        .required("Confirm your password")
        .oneOf([yup.ref("password")], "Password does not match"),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    phoneNumber: yup
        .string('Enter your phone number')
        .matches(/^(\(\d{3}\)|\d{3})-?\d{3}-?\d{4}$/, 'Please enter valid phone number')
        .required('Phone number is required')

});

function RegisterVisitor() {
    const {addToast} = useToasts()
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        showPassword: false,
        showConfirmPassword: false,
    });
    let history = useHistory()

    const formik = useFormik({
        initialValues: {
            username: values.username,
            password: values.password,
            email: values.email,
            phoneNumber: values.phoneNumber,
            confirmPassword: values.confirmPassword
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            let username = values.username;
            let password = values.confirmPassword;
            let email = values.email;
            let phoneNumber = values.phoneNumber
            let user = {username, password, email, phoneNumber};
            const {error} = await AuthService.registerVisitor(user)
            if (error) {
                addToast(error.message, {appearance: 'error', autoDismiss: true});
            } else {
                addToast('Account created', {appearance: 'success', autoDismiss: true})
            }
            history.push("/login")
        },
    });


    // const handleChange = (prop) => (event) => {
    //     setValues({...values, [prop]: event.target.value});
    //     console.log(values)
    // };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,

        });
        console.log(values)
    };


    const handleClickShowConfirmPassword = () => {
        setValues({
            ...values,
            showConfirmPassword: !values.showConfirmPassword

        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className="flex items-center p-20">
            <div className=" flex-1 h-full max-w-4xl mx-auto  rounded-lg shadow-xl">
                <div className="my-auto flex flex-col md:flex-row ">
                    <div className="invisible md:visible h-32 md:h-auto md:w-1/2">
                        <img
                            className="object-cover w-full h-full"
                            src="https://d3mvlb3hz2g78.cloudfront.net/wp-content/uploads/2020/07/thumb_720_450_dreamstime_m_156181857.jpg"
                            alt="img"
                        />
                    </div>
                    <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                        <div className="w-full">

                            <h1 className="mb-4 text-2xl font-content font-semibold text-center text-gray-700">
                                Register
                            </h1>
                            <form onSubmit={formik.handleSubmit}>
                                <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                                    <TextField
                                        label="Username"
                                        id="username"
                                        sx={{m: 1, width: '50ch'}}
                                        size="small"
                                        value={formik.values.username}
                                        onChange={formik.handleChange}
                                        error={formik.touched.username && Boolean(formik.errors.username)}
                                        helperText={formik.touched.username && formik.errors.username}
                                    />
                                    <TextField
                                        label="Email"
                                        id="email"
                                        sx={{m: 1, width: '50ch'}}
                                        size="small"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                    />
                                    <FormControl size="small" sx={{m: 1, width: '50ch'}} variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={values.showPassword ? 'text' : 'password'}
                                            value={formik.values.password}
                                            onChange={formik.handleChange('password')}
                                            error={formik.touched.password && Boolean(formik.errors.password)}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                        />
                                        <FormHelperText sx={{color: '#d32f2f'}}>{formik.touched.password && formik.errors.password}</FormHelperText>
                                    </FormControl>
                                    <FormControl size="small" sx={{m: 1, width: '50ch'}} variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">Confirm password</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-confirmPassword"
                                            type={values.showConfirmPassword ? 'text' : 'password'}
                                            value={formik.values.confirmPassword}
                                            onChange={formik.handleChange('confirmPassword')}
                                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowConfirmPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {values.showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Confirm password"
                                        />
                                        <FormHelperText sx={{color: '#d32f2f'}}>{formik.touched.confirmPassword && formik.errors.confirmPassword}</FormHelperText>
                                    </FormControl>
                                    <TextField
                                        label="Phone number"
                                        id="phoneNumber"
                                        sx={{m: 1, width: '50ch'}}
                                        size="small"
                                        value={formik.values.phoneNumber}
                                        onChange={formik.handleChange}
                                        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                    />
                                    <button
                                        type="submit"
                                        className="font-content font-semibold mx-24 mt-8 mb-4 py-2 px-14 rounded-full bg-gradient-to-r from-baseForGradient to-textColor text-white hover:from-pink-500 hover:to-orange-500 tracking-widest focus:bg-black transition duration-200">
                                        Submit
                                    </button>
                                </Box>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default RegisterVisitor;
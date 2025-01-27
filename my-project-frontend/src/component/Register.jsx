import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Option, Select, Sheet, Typography } from '@mui/joy';

const Register = () => {
    const navigate = useNavigate();
    // Initialize state for form data
    const [formData, setFormData] = useState({
        name: '',
        mobileNum: '',
        username: '',
        password: '',
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Registration attempted with:', formData);
        
        // Add registration logic here
        // After successful registration:
        navigate('/');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                p: 2,
                backgroundImage: 'url(https://as2.ftcdn.net/v2/jpg/02/71/10/27/1000_F_271102743_5cXu0CqlWnWLvajaCpjMeG7Wwbr2ebxa.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <Sheet
                variant="outlined"
                sx={{
                    width: '100%',
                    maxWidth: 500,
                    p: 4,
                    borderRadius: 'md',
                    opacity: 0.8
                }}
            >
                <form onSubmit={handleSubmit}>
                    <Typography level="h2" component="h2" sx={{ mb: 3, textAlign: 'center', fontFamily: 'Rock Salt, cursive'}}>
                        Create Account
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <FormControl sx={{ flex: 1 }}>
                            <FormLabel>Name</FormLabel>
                            <Input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Enter your name"
                            />
                        </FormControl>
                    </Box>

                    <FormControl sx={{ mb: 2 }}>
                        <FormLabel>Mobile Number</FormLabel>
                        <Input
                            type="mobileNum"
                            name="mobileNum"
                            value={formData.mobileNum}
                            onChange={handleChange}
                            required
                            placeholder="Enter your mobile number"
                        />
                    </FormControl>

                    <FormControl sx={{ mb: 2 }}>
                        <FormLabel>Username</FormLabel>
                        <Input
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            placeholder="Choose a username"
                        />
                    </FormControl>

                    <FormControl sx={{ mb: 2 }}>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Choose a password"
                        />
                    </FormControl>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <Button type="submit" size="lg">
                            Register
                        </Button>
                    </Box>
                </form>
            </Sheet>
        </Box>
    );
};

export default Register;
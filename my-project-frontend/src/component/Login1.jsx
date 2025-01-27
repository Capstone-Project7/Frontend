import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/joy/Avatar';
import { Button, Input, RadioGroup, Box, Typography, Radio, radioClasses, Sheet, FormLabel } from '@mui/joy';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

const Login1 = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        userType: 'ADMIN'
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        setError(''); // Clear any previous errors
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestBody = {
                username: formData.username,
                password: formData.password
            };

            const response = await fetch("http://localhost:8060/api/auth/validate/user", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await response.json();
            const { username, roleName, token } = data;

            // Store auth data
            sessionStorage.setItem("authToken", token);
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("userRole", roleName);

            // Handle navigation based on role
            if (roleName === "ADMIN") {
                navigate('/admin-dashboard');
            } else if (roleName === "TAILOR") {
                navigate('/tailor-dashboard'); // Assuming you have a tailor dashboard route
            }

        } catch (error) {
            setError(error.message);
            console.error('Login error:', error);
        }
    };

    const handleClear = () => {
        setFormData({
            username: '',
            password: '',
            userType: 'ADMIN'
        });
        setError('');
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundImage: 'url(https://as2.ftcdn.net/v2/jpg/02/71/10/27/1000_F_271102743_5cXu0CqlWnWLvajaCpjMeG7Wwbr2ebxa.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <Box
                sx={{
                    width: 400,
                    p: 4,
                    borderRadius: 'lg',
                    boxShadow: 2,
                    backgroundColor: 'white',
                    opacity: 0.8
                }}
            >
                <Typography level="h2" align="center" sx={{ mb: 2, fontFamily: 'Rock Salt, cursive' }}>
                    Tailor Management Portal
                </Typography>

                <form onSubmit={handleSubmit}>
                    <RadioGroup
                        name="userType"
                        value={formData.userType}
                        onChange={handleChange}
                        defaultValue="Admin"
                        overlay
                        sx={{
                            flexDirection: 'row',
                            justifyContent: 'center',//to align content
                            gap: 2,
                            [`& .${radioClasses.checked}`]: {
                                [`& .${radioClasses.action}`]: {
                                    inset: -1,
                                    border: '3px solid',
                                    borderColor: 'primary.500',
                                },
                            },
                            [`& .${radioClasses.radio}`]: {
                                display: 'contents',
                                '& > svg': {
                                    zIndex: 2,
                                    position: 'absolute',
                                    top: '-8px',
                                    right: '-8px',
                                    bgcolor: 'background.surface',
                                    borderRadius: '50%',
                                },
                            },
                        }}
                    >
                        {['Admin', 'Tailor'].map((value) => (
                            <Sheet
                                key={value}
                                variant="outlined"
                                sx={{
                                    borderRadius: 'md',
                                    boxShadow: 'sm',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 2,
                                    p: 2,
                                    minWidth: 100,
                                }}
                            >
                                <Radio id={value} value={value} checkedIcon={<CheckCircleRoundedIcon />} />
                                <Avatar variant="soft" size="sm" />
                                <FormLabel htmlFor={value}>{value}</FormLabel>
                            </Sheet>
                        ))}
                    </RadioGroup>

                    {error && (
                        <Typography color="danger" sx={{ mt: 2, textAlign: 'center' }}>
                            {error}
                        </Typography>
                    )}

                    <Box sx={{ mb: 2, mt: 2 }}>
                        <Input
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            required
                            fullWidth
                        />
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                            fullWidth
                        />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            type="submit"
                            variant="solid"
                            color="primary"
                            sx={{ flexGrow: 1 }}
                        >
                            Login
                        </Button>
                        <Button
                            type="button"
                            variant="outlined"
                            color="neutral"
                            onClick={handleClear}
                            sx={{ flexGrow: 1, ml: 2 }}
                        >
                            Clear
                        </Button>
                    </Box>
                    <p></p>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            type="button"
                            variant="outlined"
                            color="primary"
                            onClick={handleRegister}
                            sx={{ flexGrow: 2 }}
                        >
                            Register as Tailor
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default Login1;

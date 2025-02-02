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
        userType: 'TAILOR'  // Default userType is Tailor
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

            // Check if selected userType matches the role from backend response
            if ((formData.userType === 'ADMIN' && roleName !== 'ADMIN') || (formData.userType === 'TAILOR' && roleName !== 'TAILOR')) {
                throw new Error('You selected the wrong role');
            }

            // Store auth data
            sessionStorage.setItem("authToken", token);
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("userRole", roleName);

            // Handle navigation based on role
            if (roleName === "ADMIN") {
                navigate('/admin-dashboard');
            } else if (roleName === "TAILOR") {
                navigate('/tailor-dashboard');
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
            userType: 'TAILOR'  // Reset default to Tailor
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
                // backgroundImage: 'url(https://as2.ftcdn.net/v2/jpg/02/71/10/27/1000_F_271102743_5cXu0CqlWnWLvajaCpjMeG7Wwbr2ebxa.jpg)',
                // backgroundSize: 'cover',
                // backgroundPosition: 'center'
            }}
        >
            <Box
                sx={{
                    width: 600, // Increased from 400
                    p: 6, // Increased padding from 4
                    borderRadius: 'lg',
                    boxShadow: 3, // Increased shadow
                    backgroundColor: 'white',
                    opacity: 0.9 // Slightly increased opacity
                }}
            >
                <Typography 
                    level="h2" 
                    align="center" 
                    sx={{ 
                        mb: 3, // Increased margin
                        fontFamily: 'Rock Salt, cursive',
                        fontSize: '2.5rem' // Increased font size
                    }}
                >
                    Tailor Management Portal
                </Typography>

                <form onSubmit={handleSubmit}>
                    <RadioGroup
                        name="userType"
                        value={formData.userType}
                        onChange={handleChange}
                        defaultValue="TAILOR"
                        overlay
                        sx={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            gap: 4, // Increased gap
                            mb: 3, // Added margin bottom
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
                        {['ADMIN', 'TAILOR'].map((value) => (
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
                                    p: 3, // Increased padding
                                    minWidth: 150, // Increased width
                                }}
                            >
                                <Radio id={value} value={value} checkedIcon={<CheckCircleRoundedIcon sx={{ fontSize: '1.5rem' }} />} />
                                <Avatar variant="soft" size="lg" /> {/* Increased avatar size */}
                                <FormLabel htmlFor={value} sx={{ fontSize: '1.2rem' }}>{value}</FormLabel>
                            </Sheet>
                        ))}
                    </RadioGroup>

                    {error && (
                        <Typography color="danger" sx={{ mt: 2, textAlign: 'center', fontSize: '1.1rem' }}>
                            {error}
                        </Typography>
                    )}

                    <Box sx={{ mb: 3, mt: 3 }}>
                        <Input
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            required
                            fullWidth
                            size="lg"
                        />
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                            fullWidth
                            size="lg"
                        />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                        <Button
                            type="submit"
                            variant="solid"
                            color="primary"
                            size="lg"
                            sx={{ flexGrow: 1, fontSize: '1.1rem', py: 1.5 }}
                        >
                            Login
                        </Button>
                        <Button
                            type="button"
                            variant="outlined"
                            color="neutral"
                            onClick={handleClear}
                            size="lg"
                            sx={{ flexGrow: 1, ml: 3, fontSize: '1.1rem', py: 1.5 }}
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
                            size="lg"
                            sx={{ flexGrow: 2, fontSize: '1.1rem', py: 1.5 }}
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

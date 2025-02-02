import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Sheet, Typography } from '@mui/joy';

const Register = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);  // Track the button state

    const [formData, setFormData] = useState({
        tailorName: '',
        tailorMobileNumber: '',
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setIsButtonDisabled(true);  // Disable the button while submitting

        // Mobile number validation
        if (formData.tailorMobileNumber.length !== 10) {
            alert('Please enter a valid 10-digit mobile number');
            setIsSubmitting(false);
            setIsButtonDisabled(false);  // Re-enable button on invalid mobile number
            return;
        }

        try {
            // First API call (registration)
            const authResponse = await fetch("http://localhost:8060/api/auth/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                    roleId: 2
                })
            });

            if (!authResponse.ok) {
                alert("Registration Failed");
                throw new Error("Registration Failed");
            }
            await authResponse.json();

            // Second API call (tailor details)
            const tailorResponse = await fetch("http://localhost:8060/api/tailors", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tailorName: formData.tailorName,
                    tailorMobileNumber: formData.tailorMobileNumber,
                    workload: 0,
                    username: formData.username
                })
            });

            if (!tailorResponse.ok) {
                alert("Failed to add tailor details");
                throw new Error("Failed to add tailor details");
            }
            await tailorResponse.json();

            // If both calls are successful
            alert("Registration Successful. Please Login");
            navigate('/');

        } catch (error) {
            alert(error.message);
        } finally {
            setIsSubmitting(false);
            setIsButtonDisabled(false);  // Re-enable button after both attempts (either success or failure)
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                p: 4,
                // backgroundImage: 'url(https://as2.ftcdn.net/v2/jpg/02/71/10/27/1000_F_271102743_5cXu0CqlWnWLvajaCpjMeG7Wwbr2ebxa.jpg)',
                // backgroundSize: 'cover',
                // backgroundPosition: 'center'
            }}
        >
            <Sheet
                variant="outlined"
                sx={{
                    width: '100%',
                    maxWidth: 800, // Increased from 500
                    p: 6, // Increased padding
                    borderRadius: 'lg',
                    opacity: 0.9,
                    boxShadow: 3
                }}
            >
                <form onSubmit={handleSubmit}>
                    <Typography 
                        level="h2" 
                        component="h2" 
                        sx={{ 
                            mb: 4, // Increased margin
                            textAlign: 'center', 
                            fontFamily: 'Rock Salt, cursive',
                            fontSize: '3rem' // Increased font size
                        }}
                    >
                        Create Account
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 3, mb: 3 }}> {/* Increased gaps */}
                        <FormControl sx={{ flex: 1 }}>
                            <FormLabel sx={{ fontSize: '1.1rem' }}>Name</FormLabel>
                            <Input
                                name="tailorName"
                                value={formData.tailorName}
                                onChange={handleChange}
                                required
                                placeholder="Enter your name"
                                size="lg"
                            />
                        </FormControl>
                    </Box>

                    <FormControl sx={{ mb: 3 }}>
                        <FormLabel sx={{ fontSize: '1.1rem' }}>Mobile Number</FormLabel>
                        <Input
                            type="tel"
                            name="tailorMobileNumber"
                            value={formData.tailorMobileNumber}
                            onChange={handleChange}
                            required
                            placeholder="Enter your mobile number"
                            pattern="\d{10}$"
                            size="lg"
                        />
                    </FormControl>

                    <FormControl sx={{ mb: 3 }}>
                        <FormLabel sx={{ fontSize: '1.1rem' }}>Username</FormLabel>
                        <Input
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            placeholder="Choose a username"
                            size="lg"
                        />
                    </FormControl>

                    <FormControl sx={{ mb: 3 }}>
                        <FormLabel sx={{ fontSize: '1.1rem' }}>Password</FormLabel>
                        <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Choose a password"
                            size="lg"
                        />
                    </FormControl>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Button 
                            type="submit" 
                            size="lg"
                            disabled={isSubmitting || isButtonDisabled}
                            sx={{
                                fontSize: '1.2rem',
                                padding: '12px 36px'
                            }}
                        >
                            {isSubmitting ? 'Registering...' : 'Register'}
                        </Button>
                    </Box>
                </form>
            </Sheet>
        </Box>
    );
};

export default Register;

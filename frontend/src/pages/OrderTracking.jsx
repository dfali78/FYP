import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  TextField, 
  Button, 
  Typography, 
  LinearProgress, 
  Paper, 
  Alert,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  textAlign: 'center',
  maxWidth: '600px',
  margin: '40px auto',
}));

const StatusEmoji = styled(Typography)({
  fontSize: '3rem',
  marginBottom: '1rem',
});

const OrderTracking = () => {
  const location = useLocation();
  const [trackingNumber, setTrackingNumber] = useState(location.state?.trackingNumber || '');
  const [orderStatus, setOrderStatus] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (trackingNumber) {
      handleTrackOrder();
    }
  }, []);

  const handleTrackOrder = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setLoading(true);

    // Validate tracking number
    if (!trackingNumber || trackingNumber.trim() === '') {
      setError('Please enter your order tracking number');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${trackingNumber.trim()}/track`);
      
      if (response.data && response.status === 200) {
        setOrderStatus(response.data);
      } else {
        setError('Unable to fetch order status. Please try again later.');
      }
    } catch (err) {
      console.error('Order tracking error:', err);
      
      if (err.response) {
        // The server responded with a status code that falls out of the range of 2xx
        if (err.response.status === 404) {
          setError('Order not found. Please check your tracking number and try again.');
        } else if (err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError('Unable to fetch order status. Please try again later.');
        }
      } else if (err.request) {
        // The request was made but no response was received
        setError('Failed to connect to the server. Please check your internet connection and try again.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('An error occurred while tracking your order. Please try again later.');
      }
      setOrderStatus(null);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString();
    } catch (err) {
      return 'Invalid Date';
    }
  };

  return (
    <Container>
      <StyledPaper elevation={3}>
        <Typography variant="h4" gutterBottom>
          Track Your Order
        </Typography>
        
        <Box component="form" onSubmit={handleTrackOrder} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Order Tracking Number"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            margin="normal"
            required
            error={!!error}
            placeholder="Enter your order tracking number (e.g., JAM202500001)"
            disabled={loading}
            helperText={!error ? "Enter the tracking number provided in your order confirmation" : error}
          />
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, mb: 2 }}
            disabled={loading || !trackingNumber.trim()}
          >
            {loading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={20} color="inherit" />
                <span>Tracking...</span>
              </Box>
            ) : (
              'TRACK ORDER'
            )}
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
            {error}
          </Alert>
        )}

        {orderStatus && (
          <Box sx={{ mt: 4 }}>
            <StatusEmoji>{orderStatus.emoji || '📦'}</StatusEmoji>
            
            <Typography variant="h6" gutterBottom>
              {orderStatus.message || 'Status not available'}
            </Typography>

            <Box sx={{ mt: 2, mb: 4 }}>
              <LinearProgress 
                variant="determinate" 
                value={orderStatus.progress || 0} 
                sx={{ 
                  height: 10, 
                  borderRadius: 5,
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#4CAF50'
                  }
                }}
              />
              <Typography variant="body2" sx={{ mt: 1 }}>
                {orderStatus.progress || 0}% Complete
              </Typography>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Order Status: {orderStatus.status || 'Unknown'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Order Created: {formatDate(orderStatus.createdAt)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Last Updated: {formatDate(orderStatus.updatedAt)}
              </Typography>
            </Box>
          </Box>
        )}
      </StyledPaper>
    </Container>
  );
};

export default OrderTracking;
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Divider,
  Grid,
} from '@mui/material';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  if (!order) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" color="error">Order information not found</Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/shop')}
            sx={{ mt: 2 }}
          >
            Continue Shopping
          </Button>
        </Paper>
      </Container>
    );
  }

  const handleTrackOrder = () => {
    navigate('/track-order', { state: { trackingNumber: order.orderNumber } });
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" color="success.main" gutterBottom>
            Thank You for Your Order!
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Your order has been successfully placed
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Order Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Order Number
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {order.orderNumber}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Total Amount
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                ${order.totalAmount?.toFixed(2)}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">
                Shipping Address
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {order.shippingAddress?.address}, {order.shippingAddress?.city}
                <br />
                {order.shippingAddress?.postalCode}, {order.shippingAddress?.country}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body1" gutterBottom>
            Keep your order number handy to track your order:
          </Typography>
          <Typography variant="h5" color="primary" sx={{ my: 2, fontWeight: 'bold' }}>
            {order.orderNumber}
          </Typography>
          
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleTrackOrder}
              size="large"
            >
              Track Order
            </Button>
            <Button 
              variant="outlined"
              onClick={() => navigate('/shop')}
              size="large"
            >
              Continue Shopping
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default OrderConfirmation;
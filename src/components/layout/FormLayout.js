import React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Container, Paper, Typography } from '@mui/material';
import { useHistory } from 'react-router';
function FormLayout({
  title,
  handleSubmit,
  loading,
  subtitle,
  state,
  cancel,
  children,
  view,
}) {
  const history = useHistory();
  return (
    <Container
      style={{ marginTop: '6px' }}
      // maxWidth="md"
      maxWidth="xl"
    >
      <Paper
        elevation={2}
        style={{
          paddingTop: '20px',
        }}
      >
        <Typography variant="h5" style={{ textAlign: 'center' }}>
          {title}
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ marginTop: '-17px', paddingTop: 0 }}
        >
          <DialogContent>
            <Typography
              variant="body1"
              color="textSecondary"
              style={{ textAlign: 'center' }}
              gutterBottom
            >
              {subtitle}
            </Typography>
            {children}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => history.goBack()} color="primary">
              Cancel
            </Button>
            {!view && (
              <Button
                type="submit"
                // style={{ marginRight: "20px" }}
                variant="contained"
                color="primary"
                disabled={loading}
              >
                Submit
              </Button>
            )}
          </DialogActions>
        </form>
      </Paper>
    </Container>
  );
}

export default FormLayout;

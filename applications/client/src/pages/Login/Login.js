import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showError, setShowError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    const emailRe = /\S+@sfsu.edu/;
    e.preventDefault();

    try {
      if (emailRe.test(email) && password && email) {
        const response = await axios.post("http://localhost:4000/api/login", {
          email: email,
          password: password,
        });
        console.log(response);
        setShowError(false);
        if (response.data.status === "success") {
          sessionStorage.setItem("token", response.data.user);
          sessionStorage.setItem("user_id", response.data.user_id);
          sessionStorage.setItem("fullname", response.data.fullname);
          sessionStorage.setItem("profile_url", response.data.profile_url);
          props.setUser(response.data.user_id);
          navigate("/");
        } else if (response.data.status === "error") {
          setShowError(true);
          setEmail("");
          setPassword("");
        }
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://media.istockphoto.com/id/1220443914/vector/set-of-colorful-shopping-bags-isolated-on-the-purple-background.jpg?s=612x612&w=0&k=20&c=m6mvEUgScewU3YmaiFZGEtGzi6OebDkpTNswCL8jJtg=)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "black" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              value={password}
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "black" }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/SignUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
          {showError && (
            <p style={{ color: "red" }} sx={{ mt: 3, mb: 2 }}>
              Incorrect email or password. Please try again.
            </p>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

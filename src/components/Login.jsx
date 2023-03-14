import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";
import { useNavigate } from "react-router-dom";
// const Auth = () => {
//   const [register, setRegister] = useState(false);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const body = {
//       username,
//       password,
//     };

//   axios
//     .post(register ? "/api/register" : "/api/login", body)
//     .then((res) => {
//       console.log(res.data);
//       const { token, exp, userId } = res.data;
//       login(token, exp, userId);
//       navigate("/profile");
//     })
//     .catch((err) => {
//       alert(err.response.data);
//     });
// };

//   return (
//     <div>
//       {register ? (
//         <>
//           <form onSubmit={(e) => handleSubmit(e)}>
//             <input
//               placeholder="New Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             ></input>
//             <input
//               placeholder="New Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             ></input>
//             <button>Register</button>
//           </form>
//           <button onClick={() => setRegister(false)}>
//             Already have an account?
//           </button>
//         </>
//       ) : (
//         <>
//           <form onSubmit={(e) => handleSubmit(e)}>
//             <input
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             ></input>
//             <input
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             ></input>
//             <button>Login</button>
//           </form>
//           <button onClick={() => setRegister(true)}>
//             Don't have an account?
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default Auth;
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Github: "}
      <Link color="inherit" href="https://github.com/Noahhunt10">
        https://github.com/Noahhunt10
      </Link>
      {"  "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const username = data.get("username");
    const password = data.get("password");
    const body = { username, password };
    console.log(body);
    axios
      .post("/api/login", body)
      .then((res) => {
        console.log(res.data);
        const { token, exp, userId } = res.data;
        login(token, exp, userId);
        navigate("/profile");
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ mt: 15, mb: 5, bgcolor: "rgb(4, 31, 30)" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              variant="filled"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              variant="filled"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="/signup" variant="body2" sx={{ mr: 12 }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

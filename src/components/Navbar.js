import * as React from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

function Navbar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoutClick = (event) => {
    event.preventDefault();
    localStorage.removeItem("userConnected");
    navigate("/authUser");
  };

  const handleGestionComptesClick = (event) => {
    event.preventDefault();
    navigate("/gestionComptes");
  };

  const handleGestionMissionsClick = (event) => {
    event.preventDefault();
    navigate("/gestionMissions");
  };

  const handleGestionAlertesClick = (event) => {
    event.preventDefault();
    navigate("/gestionAlerte");
  };

  return (
    <AppBar position="static" className="navbar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavLink to="/">
            <img
              className="navbarLogo"
              alt="Logo de Cerza"
              src="/asset/img/cerza-logov2.png"
            />
          </NavLink>

          <MenuItem>
            <NavLink className="lien" to="/">
              ENCYCLOPEDIE
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink className="lien" to="/listMissionUser">
              MISSIONS
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink className="lien" to="/listAlerte">
              ALERTES
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink className="lien" to="/questionnaireSante">
              QUESTIONNAIRE SANTE
            </NavLink>
          </MenuItem>
          

          <Box className="BoxBtnProfilCnx" sx={{ flexGrow: 0 }}>
            {localStorage.getItem("userConnected") !== null ? (
              <div>
                <Tooltip title="Open settings">
                  <IconButton
                    className="profil-navbar"
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0 }}
                  >
                    {JSON.parse(
                      localStorage.getItem("userConnected")
                    ).idCnx[0].toUpperCase()}
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {JSON.parse(localStorage.getItem("userConnected"))
                    .droitCnx === "Administrateur" ? (
                    <MenuItem onClick={handleGestionComptesClick}>
                      <Typography textAlign="center">
                        Gestion des comptes
                      </Typography>
                    </MenuItem>
                  ) : null}

                  {JSON.parse(localStorage.getItem("userConnected"))
                    .droitCnx === "Administrateur" ? (
                    <MenuItem onClick={handleGestionMissionsClick}>
                      <Typography textAlign="center">
                        Gestion des missions
                      </Typography>
                    </MenuItem>
                  ) : null}

                  {JSON.parse(localStorage.getItem("userConnected"))
                    .droitCnx === "Administrateur" ? (
                    <MenuItem onClick={handleGestionAlertesClick}>
                      <Typography textAlign="center">
                        Gestion des alertes
                      </Typography>
                    </MenuItem>
                  ) : null}

                  <MenuItem onClick={handleLogoutClick}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <div>
                <Box sx={{ flexGrow: 0 }}>
                  <Button
                    className="btnCnx"
                    sx={{ zIndex: "tooltip" }}
                    variant="outlined"
                    onClick={() => navigate("/AuthUser")}
                  >
                    Connexion
                  </Button>
                </Box>
              </div>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;

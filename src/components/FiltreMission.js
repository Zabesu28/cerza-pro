import React, { useState, useEffect } from "react";
import "../styles/FiltreMission.css";
import axios from "axios";
import Box from "@mui/material/Box";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import "dayjs/locale/fr";
import dayjs from "dayjs";
import Button from "@mui/material/Button";

const FiltreMission = (props) => {
  const [lesUtilisateurs, setLesUtilisateurs] = useState([]);
  const [lesEnclos, setLesEnclos] = useState([]);
  const [lesEtatsMission, setLesEtatsMission] = useState([]);

  const [dateAttribue, setDateAttribue] = useState(null);
  const [dateValide, setDateValide] = useState(null);
  const [employe, setEmploye] = useState("Default");
  const [enclos, setEnclos] = useState("Default");
  const [etat, setEtat] = useState("Default");

  useEffect(() => {
    axios
      .get("http://localhost:4000/utilisateurs")
      .then((res) => setLesUtilisateurs(res.data));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/enclos")
      .then((res) => setLesEnclos(res.data));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/etatsMission")
      .then((res) => setLesEtatsMission(res.data));
  }, []);

  const inputDateAttr = (event) => {
    let day = "";
    let month = "";
    let year = "";

    if (event.$D.toString().length === 1) {
      day = "0" + event.$D.toString();
    } else {
      day = event.$D.toString();
    }

    if ((event.$M + 1).toString().length === 1) {
      month = "0" + (event.$M + 1).toString();
    } else {
      month = (event.$M + 1).toString();
    }
    year = event.$y;

    const date = year + "-" + month + "-" + day;
    setDateAttribue(dayjs(date));
  };

  const inputDateValid = (event) => {
    let day = "";
    let month = "";
    let year = "";

    if (event.$D.toString().length === 1) {
      day = "0" + event.$D.toString();
    } else {
      day = event.$D.toString();
    }

    if ((event.$M + 1).toString().length === 1) {
      month = "0" + (event.$M + 1).toString();
    } else {
      month = (event.$M + 1).toString();
    }
    year = event.$y;

    const date = year + "-" + month + "-" + day;
    setDateValide(dayjs(date));
  };

  const inputEmploye = (event) => {
    event.preventDefault();

    setEmploye(event.target.value);
  };

  const inputEnclos = (event) => {
    event.preventDefault();

    setEnclos(event.target.value);
  };

  const inputEtat = (event) => {
    event.preventDefault();

    setEtat(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const filtre = {
      dateAttrFiltre: dateAttribue,
      dateValidFiltre: dateValide,
      employeFiltre: employe,
      enclosFiltre: enclos,
      etatFiltre: etat,
    };

    props.trierMissions(filtre);
  };

  const handleAnnulerFiltre = (event) => {
    event.preventDefault();
    props.annulerFiltre();
    setDateAttribue(null);
    setDateValide(null);
    setEmploye("Default");
    setEnclos("Default");
    setEtat("Default");
  };

  return (
    <div>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className="filtre-grid-mission">
          <div className="filtre-grid-mission-element-large">
            <h1 className="FiltreMission-titre">Filtre :</h1>
          </div>

          <div className="filtre-grid-mission-element-large">
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Date d'attribution"
                  value={dateAttribue}
                  className="filtreMission-input"
                  onChange={inputDateAttr}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>

          <div className="filtre-grid-mission-element-large">
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Date de validation"
                  value={dateValide}
                  className="filtreMission-input"
                  onChange={inputDateValid}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>

          <div className="filtre-grid-mission-element-large">
            <TextField
              id="outlined-basic-select"
              select
              variant="outlined"
              onChange={inputEmploye}
              className="filtreMission-select"
              value={employe}
            >
              <MenuItem value="Default">Coisir un employé</MenuItem>
              {lesUtilisateurs.map((unEmploye) => (
                <MenuItem key={unEmploye.idEmploye} value={unEmploye.idEmploye}>
                  {unEmploye.nomEmploye + " " + unEmploye.prenomEmploye}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div className="filtre-grid-mission-element-large">
            <TextField
              id="outlined-basic-select"
              select
              variant="outlined"
              onChange={inputEnclos}
              className="filtreMission-select"
              value={enclos}
            >
              <MenuItem value="Default">Coisir un enclos</MenuItem>
              {lesEnclos.map((unEnclos) => (
                <MenuItem key={unEnclos.code} value={unEnclos.code}>
                  {unEnclos.code}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div className="filtre-grid-mission-element-large">
            <TextField
              id="outlined-basic-select"
              select
              variant="outlined"
              onChange={inputEtat}
              className="filtreMission-select"
              value={etat}
            >
              <MenuItem value="Default">Coisir un état</MenuItem>
              <MenuItem value="nonAttribuee">Non attribuée</MenuItem>
              {lesEtatsMission.map((unEtat) => (
                <MenuItem key={unEtat.idEtat} value={unEtat.idEtat}>
                  {unEtat.libelleEtat}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div className="filtre-grid-mission-element">
            <Button
              className="btn-filtreMission-Rech"
              variant="contained"
              size="medium"
              type="submit"
            >
              Rechercher
            </Button>
          </div>

          <div className="filtre-grid-mission-element">
            <Button
              className="btn-filtreMission-Annul"
              variant="contained"
              size="medium"
              onClick={handleAnnulerFiltre}
            >
              Annuler
            </Button>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default FiltreMission;

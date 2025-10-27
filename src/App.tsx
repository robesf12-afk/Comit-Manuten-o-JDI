// src/App.tsx
import React, { useEffect, useState } from "react";
import {
  IconDDM,
  IconOKR,
  IconInfo,
  IconOnePager,
  IconPapeis,
  IconTreinamentos,
  IconChecklist,
  IconRegistroPCM,
  IconReconhecimentos,
} from "./icons";

/* ---------------- URLs curtas (quebradas em partes) ---------------- */
const U = {
  registro: "https://forms.office.com/r/" + "mt0JTBJiK6" + "?origin=lprLink",
  checklist: "https://forms.office.com/r/" + "XM1hQ5YCrp" + "?origin=lprLink",
  ddms:
    "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/" +
    "roberta_dossantos_kof_com_mx/Documents/DDM%C2%B4S" +
    "?csf=1&web=1&e=kXfLLD",
  programacao:
    "https://cocacolafemsa.sharepoint.com/:f:/r/sites/" +
    "PROGRAMAOPREPCMJUNDIAIOSASCO/Documentos%20Compartilhados/" +
    "PAINEL%20DISTRIBUI%C3%87%C3%83O%20DE%20HORAS" +
    "?csf=1&web=1&e=Ye4Wad",
  distribuicao:
    "https://cocacolafemsa.sharepoint.com/:f:/r/sites/" +
    "PROGRAMAOPREPCMJUNDIAIOSASCO/Documentos%20Compartilhados/" +
    "PROGRAMA%C3%87%C3%83O%20PRE%20PCM" +
    "?csf=1&web=1&e=LYYchz",
  okr:
    "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/" +
    "roberta_dossantos_kof_com_mx/Documents/FECHAMENTOS" +
    "?csf=1&web=1&e=e0QIRb",
  informativos:
    "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/" +
    "roberta_dossantos_kof_com_mx/Documents/INFORMATIVOS" +
    "?csf=1&web=1&e=dy3e4Y",
  papeis:
    "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/" +
    "roberta_dossantos_kof_com_mx/Documents/" +
    "PAP%C3%89IS%20E%20RESPONSABILIDADES" +
    "?c


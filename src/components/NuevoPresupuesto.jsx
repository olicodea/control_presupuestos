import { useState } from "react";
import Mensaje from "./Mensaje";

const NuevoPresupuesto = ({
  presupuesto,
  setPresupuesto,
  setEsPresupuestoValido,
}) => {
  const [mensaje, setMensaje] = useState("");

  const handleChangePresupuesto = (e) => {
    setPresupuesto(Number(e.target.value));
  };

  const handleAgregarPresupuesto = (e) => {
    e.preventDefault();
    if (!Number(presupuesto) || Number(presupuesto) < 0) {
      setMensaje("No es un presupuesto válido");
      return;
    }
    setMensaje("");
    setEsPresupuestoValido(true);
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form onSubmit={handleAgregarPresupuesto} className="formulario">
        <div className="campo">
          <label htmlFor="">Definir presupuesto</label>
          <input
            type="number"
            className="nuevo-presupuesto"
            placeholder="Agrega tu presupuesto"
            value={presupuesto}
            onChange={handleChangePresupuesto}
          />
          <input type="submit" value="Agregar"/>
          {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        </div>
      </form>
    </div>
  );
};

export default NuevoPresupuesto;

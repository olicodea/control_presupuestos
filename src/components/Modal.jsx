import { useState, useEffect } from "react";
import Mensaje from "./Mensaje";
import CerrarBtn from "../img/cerrar.svg";

const Modal = ({
  setModal,
  animarModal,
  setAnimarModal,
  guardarGasto,
  gastoEditar,
  setGastoEditar
}) => {
  const [mensaje, setMensaje] = useState("");
  const [nombreGasto, setNombreGasto] = useState("");
  const [cantidadGasto, setCantidadGasto] = useState(0);
  const [categoriaGasto, setCategoriaGasto] = useState("");
  const [fecha, setFecha] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    console.log(gastoEditar);
    if (Object.keys(gastoEditar).length > 0) {
      setNombreGasto(gastoEditar.nombreGasto);
      setCantidadGasto(gastoEditar.cantidadGasto);
      setCategoriaGasto(gastoEditar.categoriaGasto);
      setFecha(gastoEditar.fecha);
      setId(gastoEditar.id);
    }
  }, []);

  const ocultarModal = () => {
    setAnimarModal(false);
    setGastoEditar({})
    setTimeout(() => {
      setModal(false);
    }, 350);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([nombreGasto, cantidadGasto, categoriaGasto].includes("")) {
      setMensaje("Todos los campos son obligatorios");
      setTimeout(() => {
        setMensaje("");
      }, 2000);
      return;
    }

    guardarGasto({ nombreGasto, cantidadGasto, categoriaGasto, fecha, id });
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CerrarBtn} alt="cerrar modal" onClick={ocultarModal} />
      </div>
      <form
        action=""
        onSubmit={handleSubmit}
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
      >
        <legend>
          {gastoEditar.nombreGasto ? "Editar Gasto" : "Nuevo Gasto"}
        </legend>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        <div className="campo">
          <label htmlFor="nombreGasto">Nombre gasto</label>
          <input
            id="nombreGasto"
            type="text"
            placeholder="Agrega el nombre del gasto"
            value={nombreGasto}
            onChange={(e) => setNombreGasto(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            id="cantidad"
            type="number"
            placeholder="Agrega la cantidad del gasto"
            value={cantidadGasto}
            onChange={(e) => {
              setCantidadGasto(Number(e.target.value));
            }}
          />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Categoria</label>
          <select
            name="categoria"
            id="categoria"
            value={categoriaGasto}
            onChange={(e) => setCategoriaGasto(e.target.value)}
          >
            <option value="">-- Seleccione --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="gastos">Gastos</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
        <div className="campo">
          <input
            type="submit"
            value={gastoEditar.nombreGasto ? "Editar Gasto" : "Nuevo Gasto"}
          />
        </div>
      </form>
    </div>
  );
};

export default Modal;

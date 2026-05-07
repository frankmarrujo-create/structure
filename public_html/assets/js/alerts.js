    const azulClaro = getComputedStyle(document.documentElement).getPropertyValue('--color-azul-claro').trim();
    const grisSidebar = getComputedStyle(document.documentElement).getPropertyValue('--color-sidebar').trim();
    const Alertas = {

        confirmar({
            titulo = "¿Estás seguro?",
            texto = "Esta acción no se puede revertir",
            textoConfirmar = "Sí, continuar",
            textoCancelar = "Cancelar",
            onConfirm = null
        } = {}) {

            return Swal.fire({
                title: titulo,
                text: texto,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: azulClaro,
                cancelButtonColor: grisSidebar,
                confirmButtonText: textoConfirmar,
                cancelButtonText: textoCancelar
            }).then((result) => {
                if (result.isConfirmed && typeof onConfirm === "function") {
                    return onConfirm();
                }
                return false;
            });
        },

        exito(mensaje = "Operación realizada correctamente") {
            return Swal.fire({
                icon: "success",
                title: "Éxito",
                text: mensaje,
                timer: 1800,
                showConfirmButton: false
            });
        },

        error(mensaje = "Ocurrió un error") {
            return Swal.fire({
                icon: "error",
                title: "Error",
                text: mensaje,
                confirmButtonColor: azulClaro
            });
        },

        info(mensaje = "Información") {
            return Swal.fire({
                icon: "info",
                title: "Info",
                text: mensaje,
                confirmButtonColor: azulClaro
            });
        },

        loading(mensaje = "Procesando...") {
            Swal.fire({
                title: mensaje,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
        },

        cerrar() {
            Swal.close();
        }
    };
    
    /*
     //implementacion de las diferentes alertas
        Alertas.confirmar({
            texto: `Se eliminará el registrooooo ${IDTABLA}`,
            textoConfirmar: "Sí, putitooo",
            onConfirm: async () => {

                Alertas.loading("Eliminando...");

                // Simulación AJAX
                await new Promise(r => setTimeout(r, 1000));

                Alertas.cerrar();
                Alertas.exito("Registro eliminado");
            }
        });
        //en el submit
        $(document).on("submit", "#altaUsuario", function(e){
            e.preventDefault();

            Alertas.confirmar({
                texto: "¿Deseas guardar este registro?",
                textoConfirmar: "Guardar",
                onConfirm: async () => {

                    Alertas.loading("Guardando...");

                    // aquí tu AJAX real
                    await new Promise(r => setTimeout(r, 1000));

                    Alertas.cerrar();
                    Alertas.exito("Guardado correctamente");
                }
            });
        });
     
     
        Alertas.exito("No se pudo guardar el registro");
    
        Alertas.error("No se pudo guardar el registro");
    
        Alertas.info("No se pudo guardar el registro");
        
        Alertas.loading("No se pudo guardar el registro");
        Alertas.cerrar();//con esto se cierra una vez que termina el proceso
        
     */
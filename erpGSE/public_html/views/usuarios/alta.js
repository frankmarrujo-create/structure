function init_usuarios_alta(){    
    const contenedor = document.querySelector('.view-body');
    let html = '';
    
    const IDFORM = 'altaUsuario';
    html += creaFormulario(IDFORM, 'POST');
    html += creaInputText('nombre', 'Nombre', 6);
    
    //ejemplo de arreglo para crear la tabla
    const datos = [
        { id: 101, producto: "Laptop", stock: 15, precio: 1200 },
        { id: 102, producto: "Mouse", stock: 50, precio: 25 },
        { id: 103, producto: "Monitor", stock: 8, precio: 300 }
    ];
    const acciones = [ 
        { title: 'Eliminar', funcion:'eliminarFilaTabla', icono: "bi bi-trash"},
        { title: 'Actualizar', funcion:'actualizarRegistro', icono: "bi bi-pencil"}
    ];
    
    const IDTABLA = 'tablaUsuarios'; const PAGINACION = 1;
    html += creaTabla(datos, IDTABLA, 1, acciones);
    //html += creaInputTelefono('name','label',6->tamano);
    html += creaInputTelefono('tele','Telefono',6);
    html += creaInputBuscar('find', 'Buscar aquiii', 6);
    html += creaInputMail('mail', 'Maill', 6, 'required');
    html += creaInputTextArea('textArea', 'Text area', 6, 'required');
    html += creaInputSwitch('switch', 'Switchhhh', 12, 'checked', 'required');
    html += creaInputFile('file', 'Fileee', 6, 'required');
    html += creaInputNumero('numero','Numerooo',6, 'required');
    html += creaInputFecha('fecha','Fechaa',6, 'required');
    
    const genero = [
        { id: "gen_m", nombre: "Masculino", valor: "M" },
        { id: "gen_f", nombre: "Femenino", valor: "F" },
        { id: "gen_o", nombre: "Otro", valor: "O" }
    ];    
    html += creaRadioButtons('genero', 'Genero', genero, 6);
    
    const permisos = [
        { id: "perm_crear", nombre: "Crear" },
        { id: "perm_editar", nombre: "Editar" },
        { id: "perm_eliminar", nombre: "Eliminar" },
        { id: "perm_ver", nombre: "Ver" }
    ];    
    html += creaCheckboxes("permisos", "Permisos", permisos, 6);
    
    const estados = [
        { id: 1, nombre: "Activo" },
        { id: 0, nombre: "Inactivo" }
    ];    
    html += creaSelect("estado", "Estado", estados, 6);
    
    html += creaInputSoloLectura('textSL','Solo lectura',6);
    html += creaInputPass('pass', 'pasword',6,'required');
    html += creaInputText('text','Textoo',6, 'required');
        
    html += creaAgrupaBotones();
    html += creaBotonIcono('submit', 'primary', 'Guardar', 'bi bi-floppy');
    html += creaBotonIcono('button', 'success', 'Cerrar', 'bi bi-x-lg');
    html += creaCierraAgrupaBotones();
            
    html += cierraFormulario();
 
    Alertas.exito("No se pudo guardar el registro");
    
    //inyecta codigo generado en el DOM
    contenedor.innerHTML = html;
    
    if(PAGINACION == 1){
        activaPaginacion(IDTABLA, 2);
    }
    
    //ver si se puede meter todo esto en una funcion
    $(document).off("submit", `#${IDFORM}`).on("submit", `#${IDFORM}`, function(e) {
        const form = this;
        
        validarFormulario(form, e);
        
        e.preventDefault(); // evita recarga

        const formData = new FormData(this);

        console.log("Formulario enviado");
        console.log([...formData.entries()]);

        // Aquí puedes hacer AJAX después
    });
    
}
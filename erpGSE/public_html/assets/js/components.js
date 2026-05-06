    function creaAlertConfirmar(){
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminarlo",
            cancelButtonText: "Cancelar"
          }).then((result) => {
            if (result.isConfirmed) {
              // Aquí ejecutas tu código para eliminar (AJAX o redirección)
              Swal.fire("¡Eliminado!", "El registro ha sido borrado.", "success");
            }
          });
    }
    
    function creaAlertExito(){
        const azulClaro = getComputedStyle(document.documentElement).getPropertyValue('--color-azul-claro').trim();
        Swal.fire({
            title: "¡Guardado!",
            text: "Los datos se han registrado correctamente",
            icon: "success",
            confirmButtonText: "Entendido",
            confirmButtonColor: azulClaro
        });
    }
    
    function creaBotonIcono(tipo, estilo, texto, icono, id=''){
        return `<button ${id} type="${tipo}" class="btn btn-${estilo}">
                    <i class="${icono} me-2"></i> ${texto}
                </button>`;
    }
    
    function creaCierraAgrupaBotones(){
        return `</div>`;
    }
    
    function creaAgrupaBotones(){
        return `<div class="d-flex justify-content-end gap-2">`;
    }
    
    function creaTabla(datos, id, paginacion=0, acciones=0){
        if (datos.length === 0) return "<p>No hay datos disponibles</p>";
        
        //obtener los encabezados (keys) del primer objeto del array
        const encabezados = Object.keys(datos[0]);
        
        //construir la tabla
        let html = '<div class="table-responsive">';
        html += `<table id="${id}" class="table table-striped tabla-pro">`;
        html += '<thead class="table-encabezado"><tr>';
        
        //construye los encabezados
        encabezados.forEach(nombre => {
           let nombreCapital = nombre.charAt(0).toUpperCase() + nombre.slice(1);
           html += `<th>${nombreCapital}</th>`;
        });
        if(acciones.length !== 0){
            html += '<th class="text-center">Acciones</th>';
        }
        html += '</tr></thead>';
        
        //construye el cuerpo de la tabla
        html += '<tbody>';
        datos.forEach(fila => {
           html += '<tr>';
           encabezados.forEach(columna => {
              html +=  `<td>${fila[columna] !== null ? fila[columna] : ''}</td>`;
           });
           
           //se inyectan los botones de accion
           if(acciones.length !== 0){
                html += `<td class="text-center">
                        <div class="btn-group" role="group">`
                            acciones.forEach(accion => {
                                html += `<a href="javascript:void(0)" class="d-flex justify-content-between align-items-center"  onclick="${accion.funcion}(${fila.id})" data-bs-toggle="tooltip" data-bs-placement="right" title="${accion.title}">
                                    <i class="${accion.icono}"></i>
                                </a>`;
                            });
                html += `</div>
                    </td>`;
           }
           
           html += '</tr>';
        });
        html += '</tbody></table></div>';
        return html;
    }
    
    function creaInputHidden(name, value){
        return `<input type="hidden" name="${name}" value="${value}">`;
    }
    
    function creaInputTelefono(name, label, tamano=12){
        return `<div class="col-md-${tamano} mb-3">
                    <label class="form-label">${label}</label>
                    <input type="tel" class="form-control" name="${name}" placeholder="${label}">
                </div>`;
    }
    
    function creaInputBuscar(name, label, tamano=12){
        return `<div class="col-md-${tamano} mb-3">
                    <label class="form-label">${label}</label>
                    <input type="search" class="form-control" name="${name}" placeholder="${label}">
                </div>`;
    }
    
    function creaInputMail(name, label, tamano=12, required=''){
        return `<div class="mb-3 col-md-${tamano}">
                    <label for="${name}" class="form-label">${label}</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-envelope"></i></span>
                        <input type="email" class="form-control" id="${name}" name="${name}" placeholder="ejemplo@correo.com" ${required}>
                    </div>
                </div>`;
    }
    
    function creaInputTextArea(name, label, tamano=12, required=''){
        return `<div class="mb-3 col-md-${tamano}">
                    <label for="${name}" class="form-label">${label}</label>
                    <textarea class="form-control" id="${name}" name="${name}" rows="3" placeholder="${label}" ${required}></textarea>
                </div>`;
    }
    
    function creaInputSwitch(name, label, tamano=12, checked='', required=''){
        return `<div class="col-md-${tamano} d-flex align-items-center">
                    <div class="form-check form-switch mt-4">
                        <input class="form-check-input" type="checkbox" name="${name}" id="${name}" ${checked} ${required}>
                        <label class="form-check-label" for="${name}">${label}</label>
                    </div>
                </div>`;
    }
    
    function creaInputFile(name, label, tamano=12, required=''){
        return `<div class="col-md-${tamano}">
                    <label class="form-label">${label}</label>
                    <input class="form-control" type="file" id="${name}" name="${name}"  ${required}>
                </div>`;
    }
    
    function creaInputNumero(name, label, tamano=12, required=''){
        return `<div class="col-md-${tamano}">
                    <label class="form-label">${label}</label>
                    <input type="number" class="form-control" name="${name}"  ${required}>
                </div>`;
    }
    
    function creaInputFecha(name, label, tamano=12, required=''){
        return `<div class="col-md-${tamano}">
                    <label class="form-label">${label}</label>
                    <input type="date" class="form-control" name="${name}"  ${required}>
                </div>`;
    }
    
    function creaRadioButtons(name, label, datos, tamano=12){//en el objeto datos considerar el campo valor
        var html = '';
        html += `<div class="col-md-${tamano}">
                    <label class="form-label d-block">${label}</label>`;
        $.each(datos, function(i, dato) {
            html += `<div class="form-check">
                        <input class="form-check-input" type="radio" name="${name}" id="${dato.id}" value="${dato.valor}">
                        <label class="form-check-label" for="${dato.id}">${dato.nombre}</label>
                    </div>`;
        });
        html += '</div>';
        return html;
    }
    
    function creaCheckboxes(name, label, datos, tamano=12){
        var html = '';
        html += `<div class="col-md-${tamano}">
                    <label class="form-label d-block">${label}</label>`;
        $.each(datos, function(i, dato) {
            html += `<div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" name="${name}[]" id="${dato.id}" value="${dato.nombre}">
                        <label class="form-check-label" for="${dato.id}">${dato.nombre}</label>
                    </div>`;
        });
        html += '</div>';
        return html;
    }
    
    function creaSelect(name, label, datos, tamano=12){
        var html = '';
        html += `<div class="col-md-${tamano}">
                    <label class="form-label">${label}</label>
                    <select class="form-select" name="${name}">
                    <option selected>Seleccionar...</option>`;
        
        $.each(datos, function(i, dato) {
            html += `<option value="${dato.id}">${dato.nombre}</option>`;
        });
        
        html += `</select>
                </div>`;
        return html;        
    }
    
    function creaInputSoloLectura(name, label, tamano=12){
        return `<div class="col-md-${tamano}">
                    <label class="form-label">${label}</label>
                    <input type="text" name="${name}" class="form-control" value="REF-999" readonly>
                </div>`;
    }
    
    function creaInputPass(name, label, tamano=12, required=''){
        return `<div class="col-md-${tamano}">
                    <label class="form-label">${label}</label>
                    <input type="password" class="form-control" name="${name}"  ${required}>
                </div>`;
    }
    
    function creaInputText(name, label, tamano=12, required=''){
        return `<div class="mb-3 col-md-${tamano}">
                    <label class="form-label">${label}</label>
                    <input type="text" class="form-control" name="${name}" placeholder="${label}"  ${required}>
                </div>`;
    }
        
    function creaFormulario(id, method, action=''){
        return '<form id="' + id + '" action="' + action + '" method="' + method + '" enctype="multipart/form-data" class="row g-3 needs-validation" novalidate><div class="row">';
    }

    function cierraFormulario(){
        return '</div></form>';
    }
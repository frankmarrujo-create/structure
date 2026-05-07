    const validators = {

        reglas: {
            required: (value) => value.trim() !== "",
            email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            minLength: (value, n) => value.length >= n,
            maxLength: (value, n) => value.length <= n,
            numeric: (value) => /^[0-9]+$/.test(value),
            password: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value),
            radioRequired: (name, form) => {
                return form.querySelectorAll(`input[name="${name}"]:checked`).length > 0;
            },
            checkboxRequired(name, form) {
                const checked = form.querySelectorAll(`[name="${name}[]"]:checked`);
                return checked.length > 0;
            },
            selectRequired: (name, form) => {
                const select = form.querySelector(`[name="${name}"]`);
                return select && select.value !== "";
            }
        },

        mensajes: {
            required: "Este campo es obligatorio",
            email: "Correo inválido",
            minLength: (n) => `Mínimo ${n} caracteres`,
            maxLength: (n) => `Máximo ${n} caracteres`,
            numeric: "Solo números permitidos",
            password: "La contraseña debe tener al menos 1 letra mayuscula, 1 letra minuscula, 1 numero y debe tener un tamaño minimo de 8 caracteres",
            radioRequired: "Selecciona una opción",
            checkboxRequired: "Selecciona al menos una opción",
            selectRequired: "Selecciona al menos una opción"
        },
        
        required: (value, input) => {
            if(input.hasAttribute("required")){
                return value.trim() !== "";
            }
            return true;
        },

        validarCampo(input, reglasCampo){
            let valido = true;
                let mensaje = "";

            reglasCampo.forEach(regla => {

                let resultado = true;
                let nombreRegla = "";
                let valorRegla = null;

                if(typeof regla === "string"){
                    resultado = this.reglas[regla](input.value);
                    nombreRegla = regla;
                }

                if(typeof regla === "object"){
                    resultado = this.reglas[regla.tipo](input.value, regla.valor);
                    nombreRegla = regla.tipo;
                    valorRegla = regla.valor;
                }

                if(!resultado){
                    valido = false;

                    const msg = this.mensajes[nombreRegla];

                    // 🔥 AQUÍ LA MAGIA
                    mensaje = typeof msg === "function" ? msg(valorRegla) : msg;
                }

            });

            this.pintarError(input, valido, mensaje);

            return valido;
        },
        
        selectRequired(name, form) {
            const select = form.querySelector(`[name="${name}"]`);
            return select && select.value !== "" && select.selectedIndex !== 0;
        },

        pintarError(input, valido, mensaje) {

            let container = input.closest('.form-group-custom');

            let feedback = container.querySelector('.invalid-feedback');

            if (!valido) {

                input.classList.add("is-invalid");

                if (!feedback) {
                    feedback = document.createElement("div");
                    feedback.className = "invalid-feedback";
                    container.appendChild(feedback);
                }

                feedback.innerText = mensaje;

            } else {

                input.classList.remove("is-invalid");

                if (feedback) {
                    feedback.remove();
                }
            }
        },
        
        pintarErrorGrupo(inputs, valido, mensaje){
            const contenedor = inputs[0].closest(".form-group-custom");

            let feedback = contenedor.querySelector(".invalid-feedback");

            if(!feedback){
                feedback = document.createElement("div");
                feedback.className = "invalid-feedback d-block";
                contenedor.appendChild(feedback);
            }

            if(!valido){
                feedback.innerText = mensaje;
            } else {
                feedback.innerText = "";
            }
        },
        
        validarFormulario(form, esquema){
            let valido = true;

            Object.keys(esquema).forEach(name => {
                const reglasCampo = esquema[name];
                const inputs = form.querySelectorAll(`[name="${name}"], [name="${name}[]"]`);
                
                if(inputs.length > 1){
                    reglasCampo.forEach(regla => {

                        if(regla === "radioRequired"){
                            const ok = this.reglas.radioRequired(name, form);
                            this.pintarErrorGrupo(inputs, ok, this.mensajes.radioRequired);
                            if(!ok) valido = false;
                        }

                        if(regla === "checkboxRequired"){
                            const ok = this.reglas.checkboxRequired(name, form);
                            this.pintarErrorGrupo(inputs, ok, this.mensajes.checkboxRequired);
                            if(!ok) valido = false;
                        }

                    });

                } else {
                    const input = inputs[0];

                    reglasCampo.forEach(regla => {

                        //VALIDACIÓN SELECT
                        if(regla === "selectRequired"){
                            const ok = this.reglas.selectRequired(name, form);
                            this.pintarError(input, ok, this.mensajes.selectRequired);
                            if(!ok) valido = false;
                        }

                        // VALIDACIÓN NORMAL (input)
                        else {
                            const esValido = this.validarCampo(input, [regla]);
                            if(!esValido) valido = false;
                        }

                    });
                }

            });

            return valido;
        }
    };
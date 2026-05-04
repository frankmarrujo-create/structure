    $(document).ready(function() {
        checkWidth();

        // Ejecutar cada vez que se cambie el tamaño de la ventana
        $(window).resize(function() {
            checkWidth();
        });
        
        // Toggle sidebar
        $("#toggleSidebar").click(function () {
            const body = $("body");
            const sidebar = $("#sidebar");
            sidebar.toggleClass("collapsed");
            
            $(".submenu").removeClass("show").removeAttr("style");
            
            if (!body.hasClass("sidebar-collapsed")) {
                //Paso 1: ocultar logo primero
                body.addClass("hide-logo");
                setTimeout(() => {
                    body.addClass("sidebar-collapsed");
                }, 150);

            } else {
                //Expandir primero
                body.removeClass("sidebar-collapsed");
                setTimeout(() => {
                    body.removeClass("hide-logo");
                }, 150);
            }
        });
        
        $(document).click(function (e) {
            if (!$(e.target).closest('#sidebar').length) {
                $(".submenu").removeClass("show").removeAttr("style");
            }
        });
        
        //Activar los tooltips
        document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
            new bootstrap.Tooltip(el);
        });
        
    });
    
    

    // Submenús
    function toggleSubmenu(element) {
        //event.stopPropagation();
        const sidebar = $("#sidebar");
        const submenu = $(element).next(".submenu");
        
        const tooltip = bootstrap.Tooltip.getInstance(element);
        if (tooltip) {
            tooltip.hide();
        }
        
        if (sidebar.hasClass("collapsed")) {

            //modo flotante
            $(".submenu").not(submenu).removeClass("show").removeAttr("style");
            submenu.fadeToggle(100);
        } else {
            $(".submenu").not(submenu).removeClass("show");
            submenu.toggleClass("show");
            submenu.removeAttr("style");
        }
    }
    
    //Funcion para manejar el colapso automatico de acuerdo al tamaño de la pantalla
    function checkWidth() {
        const windowSize = $(window).width();
        const body = $("body");
        const sidebar = $("#sidebar");

        if (windowSize <= 992) { // Punto de quiebre (puedes usar 768 para tablets)
            if (!sidebar.hasClass("collapsed")) {
                sidebar.addClass("collapsed");
                body.addClass("hide-logo sidebar-collapsed");
                $(".submenu").removeClass("show").removeAttr("style");
            }
        } else {
            // Opcional: Expandirlo automáticamente si la pantalla vuelve a ser grande
            sidebar.removeClass("collapsed");
            body.removeClass("hide-logo sidebar-collapsed");
        }
    }

    // Cargar vistas dinámicas
    function cargarVista(modulo, vista) {

        $("#app-content").html("<p>Cargando...</p>");

        $("#app-content").load(`views/${modulo}/${vista}.html`, function () {

            // Cargar JS del módulo
            $.getScript(`views/${modulo}/${modulo}.js`)
                .fail(() => console.warn("Sin JS para este módulo"));

            // Cargar CSS del módulo si no existe
            if (!document.getElementById(`${modulo}-css`)) {
                $('head').append(`
                    <link id="${modulo}-css" rel="stylesheet" href="views/${modulo}/${modulo}.css">
                `);
            }

        });
    }
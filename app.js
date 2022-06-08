const mostrarTotal = document.getElementById('total')
const mostrarPagoIndividual = document.getElementById('division')

class Persona {
    constructor(nombre,monto) {
        this.nombre = nombre;
        this.monto = monto;
    }
}

const montos = [];
let suma;
class Cuentas {

    addmonto(nombre,monto) {
        montos.push([nombre,monto]);
        };
    
    sumatoria(montos) {
        suma = 0;
        for (let i = 0;i < montos.length;i++) {
            suma += parseFloat(montos[i][1]);
        };
    };

    mostrarCalculos = () => {
        let totalFinal = parseFloat(suma);
        let totalInfividial = totalFinal/(montos.length);
        mostrarTotal.innerHTML = totalFinal.toFixed(2);
        if (typeof(totalInfividial) == 'number' && !isNaN(totalInfividial)) {
            mostrarPagoIndividual.innerHTML = totalInfividial.toFixed(2);
        } else{
            mostrarPagoIndividual.innerHTML = '0.00';
        }
    }

}

class UI {
    
    agregarpersona(persona){
        const listapersonas = document.getElementById('lista-personas-monto');
        const elemento = document.createElement('div');
        elemento.innerHTML = `
        <div class = "card text-center mb-4">
            <div class = "card-body" id = "${persona.nombre}">
                <strong>Nombre:</strong> ${persona.nombre}
                <strong>Monto:</strong> ${persona.monto}
                <a href="#" class="btn btn-danger" name = "delete">Borrar</a>
            </div>
        </div>
        `;
        listapersonas.appendChild(elemento);
        this.resetearFomulario();
    }

    resetearFomulario() {
        document.getElementById('formulario').reset();
    }

    borrarpersona(elemento){
        
        for(let i = 0; i < montos.length; i++) {           
            if(elemento.parentElement.id === montos[i][0]) {
                
                montos.splice(i,1);
            }
        }
        if(elemento.name === 'delete') {
            elemento.parentElement.parentElement.parentElement.remove();
        }
    }
    mostrarmensaje(message,cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
        //Mostrar en DOM
        const conteiner = document.querySelector('.conteiner');
        const app = document.querySelector('#App')
        conteiner.insertBefore(div,app);
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    }
    
//Enventos DOM

document.getElementById('formulario').addEventListener('submit', function(e){
    const nombre = document.getElementById('nombre').value;
    const monto = document.getElementById('monto').value;

    const persona = new Persona(nombre,monto);

    const ui = new UI();

    if(nombre ==='' || monto === '' || monto <= 0) {
        return ui.mostrarmensaje('Por favor revise lo que esta ingresando','danger');
    }

    const cuentas = new Cuentas()

    cuentas.addmonto(nombre,monto);
    cuentas.sumatoria(montos)
    cuentas.mostrarCalculos()
    ui.agregarpersona(persona);
    
    e.preventDefault();
});

document.getElementById('lista-personas-monto').addEventListener('click',function(e){
    const ui = new UI();
    ui.borrarpersona(e.target);
    const cuentas = new Cuentas()
    cuentas.sumatoria(montos);
    cuentas.mostrarCalculos();

});

const btnEnviar = document.querySelector('#enviar');
const btnReset =document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail')
//Variables para campos
const email = document.querySelector('#email')
const asunto = document.querySelector('#asunto')
const mensaje = document.querySelector('#mensaje')
eventListener();
function eventListener(){
    document.addEventListener('DOMContentLoaded',iniciarApp);

    email.addEventListener('blur',validarFormulario);
    asunto.addEventListener('blur',validarFormulario);
    mensaje.addEventListener('blur',validarFormulario);

    btnReset.addEventListener('click',resetearFormulario)
    //enviar email
    formulario.addEventListener('submit', enviarEmail);
}

//Funciones
function iniciarApp(){
     btnEnviar.disabled = true;
}

function validarFormulario(e){
    const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const error =document.querySelector('p.error');
    validacionEmail(e, error,er);
    if(e.target.value.length>0){
        // Elimina los recuadros
        if(error!=null){
            error.remove();
        }
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    }else{
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }
   

    if(er.test(email.value) && asunto.value!=='' && mensaje.value!==''){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed');
        btnEnviar.classList.remove('opacity-50');
        if(error!=null){
            error.remove();
        }
    }else{
        mostrarError('Aun faltan campos por llenar')
    }
}
function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent=mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-color-100','text-red-500', 'p-3','mt-5','text-center', 'error')

    const errores = document.querySelectorAll('.error');
    if(errores.length === 0){
/*         formulario.insertBefore(mensajeError,document.querySelector('.mb-10')) */
        formulario.appendChild(mensajeError)
    }
    


}
function validacionEmail(e,error,er){
    if(e.target.type==='email'){
        
        if(error!=null){
            error.remove();
        }
  
     if(er.test(e.target.value)){
        e.target.classList.add('border', 'border-red-500');
        e.target.classList.remove('border', 'border-red-500');
     }else{
        e.target.classList.add('border', 'border-red-500');
        e.target.classList.remove('border', 'border-green-500');
        mostrarError('Email no valido')  
     }
    }

}
function enviarEmail(e){
    e.preventDefault();
    const spinner = document.querySelector('#spinner');
    spinner.style.display='flex';

    setTimeout(()=>{
        spinner.style.display='none';

        //Mensaje correctamente 
        const parrafo = document.createElement('p');
        parrafo.textContent='El mensaje se envio correctamente';
        parrafo.classList.add('text-center','my-10','p-5','bg-green-500', 'text-white','font-bold','upper-case')
        formulario.insertBefore(parrafo,spinner);
        setTimeout(()=>{
            parrafo.remove();
            resetearFormulario();
        },5000)
    },3000)

   
}

//Funcion resetear form
function resetearFormulario(){
    formulario.reset();
    iniciarApp();
}
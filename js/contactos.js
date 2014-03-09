function listar(){

    function onSuccess(contacts) {
        for(i=0;i<=contacts.lenght;i++){
            $('#contactos .plastic').html('<li><a href="tel:' +contacts[i].phoneNumbers[0]+'">'+contacts[i].name.formatted+'</a></li>');
        }
    }
    
    function onError(contactError) {
        alert('onError!');
    }
    
    // find all contacts with 'Bob' in any name field
    var options      = new ContactFindOptions();
    options.filter   = "c";
    options.multiple = true;
    var fields       = ["*"];
    navigator.contacts.find(fields, onSuccess, onError, options);
        
}

function crear(nombre,telefono,mail){
    document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
    function onDeviceReady() {
        var myContact = navigator.contacts.create();
        myContact.displayName = nom;
        myContact.nickname = nom;
        
        var contacto = new ContactName();
        contacto.givenName = nom;
        contacto.familyName = "Prueba";
        myContact.name = contacto;
        var telefonos = [];
        telefonos[0] = new ContactField("home",tel,true);
        telefonos[1] = new ContactField("mobile","234-32423-324",false);
        myContact.phoneNumbers = telefonos;
        
        var correos = [];
        correos[0] = new ContactField("home",mail,true);
        myContact.email = correos;
        //si guarda los datos llama la funcion, si no guarda los datos manda a llamar otra funcion
        myContact.save(function(){
            navigator.notification.alert("El contacto ha sido creado",null,"Contacto","Aceptar");
        },function(){
            alert('No se pudo Guardar el contacto');
        });
        
    }
    
}

$(function(){
    $('#acSend').tap(function(){
        var nom = $('#nc .rounded input').eq(0).val();
        var tel = $('#nc .rounded input').eq(1).val();
        var mail = $('#nc .rounded input').eq(2).val();
        
        crear(nom,tel,mail);
    });
      $('#contactos .individual li').eq(0).tap(function(){
          listar();
      });
   
});
      
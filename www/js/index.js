var actualPage='list-calculators';
var actualTab='0'; //tabCalculadoras
var _constante1=454;
var _constante_gramos = [];
var _constante_factor = [];
var _tipoCamaronSelected = 'entero';



var app = {

    // Application Constructor
    initialize: function() {
        this.bindEvents();
        /*
          Document ready Browser
        */
        $('#formLogin').submit(loginAction);
        fixHeightLogin();
        init();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    receivedEvent: function(id) {


        var logged = localStorage.getItem("logged");
        if(logged=="1"){
          $('.login').css('display','none');
          $('.content-wrapper').css('display','block');
          $('.top-nav-wrapper').css('display','block');
          $('.bottom-nav-wrapper').css('display','block');          
          $('body').css('background-image','none');
          $('body').css('background-image','#E6E6E6');
        }
        else{
          $('.login').css('display','block');
          $('.content-wrapper').css('display','none');
          $('.top-nav-wrapper').css('display','none');
          $('.bottom-nav-wrapper').css('display','none');
        }
		//localStorage.setItem("pref1", "val1");

		//var pref1 = localStorage.getItem("pref1");


    	//alert(pref1);
    //  inimaps();
        /*
          Document ready phonegap
        */
        //init();


    }
};


function fixHeightLogin(){
	$('.login').css('height',$(window).height());

}

function loginAction(){
    $('.loginButton').css('display','none');
    $('.login-error').css('display','none');
    $('.login-loading').css('display','block');
    var data = {
            'user': $('#txt_user').val(),
            'pass': $('#txt_pass').val()
        };
        $.post("http://ciancorp.com/alimentsa/services/validateUser.php", data)
            .done(function(submitResponse) {
                if (submitResponse.status != '0') {
                  //save in localStorage
                  localStorage.setItem("logged", "1");
                  //carga exitosa
                  $('.login-loading').css('display','none');
                  $('.login-error').css('display','none');
                  $('.loginButton').css('display','block');
                  //carga las pantallas y esconde el loading
                  $('.login').css('display','none');
                  $('.content-wrapper').css('display','block');
                  $('.top-nav-wrapper').css('display','block');
                  $('.bottom-nav-wrapper').css('display','block');

                  fixHeightLogin();
                  $('body').css('background-image','none');
                  $('body').css('background-image','#E6E6E6');
                }
                else{
                  //error  
                  $('.login-loading').css('display','none');
                  $('.login-error').css('display','block');
                  $('.loginButton').css('display','block');
                  fixHeightLogin();
                }
            }, 'json')
            .fail( function(xhr, textStatus, errorThrown) {
                //error
                  $('.login-loading').css('display','none');
                  $('.login-error').css('display','block');
                  $('.loginButton').css('display','block');
                  fixHeightLogin();
             });

            return false;  // <- cancel event

	

}

function init(){
  initBottomNavigation();
  initForms();
  hideAllAndShow('list-calculators');
  //hideAllAndShow('list-products-categories');
  fillConstants();
  //initMap();
  //initMapDuran();
  // Catch all events related to changes
  /*
  $('input[type="number"]').on('change keyup', function () {
    // Remove invalid characters
    var sanitized = $(this).val().replace(/[^0-9.]/g, '');
    sanitized = sanitized.replace(/\.(?=.*\.)/, '');
    // Update value
    $(this).val(sanitized);
  });
  $('#sample').on('change keyup', function () {
    // Remove invalid characters
    var sanitized = $(this).val().replace(/[^0-9.]/g, '');
    sanitized = sanitized.replace(/\.(?=.*\.)/, '');
    // Update value
    $(this).val(sanitized);
  });
  */
  //$('input[type="number"]').on('keypress',function(event){
    //return isNumber(event);
  //});
  $('input[type="number"]').on('keyup', function () {
    // Remove invalid characters
    //var sanitized = $(this).val().replace(/[^0-9.]/g, '');
    //sanitized = sanitized.replace(/\.(?=.*\.)/, '');
    var sanitized = $(this).val().replace(/,/g, '.')
    // Update value
    //alert(sanitized);
    $(this).val(sanitized);
  });
  /*
  $('input[type="number"]').on('keypress', function (evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    var tmp =String.fromCharCode(charCode);
    if (tmp == ',') {
        return false;
    }
    return true;
  });*/

  $('.part-right').width($(window).width()-($('.part-left').width()+5));
}


function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    //alert(evt.which);
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode == 44) { //","
    	//alert(0);
        return false;
    }
    return true;
}

function hideAllAndShow(div_to_show){
  $('.ContentView').hide();
  /*
  $('#calculadora-biomasa').hide();
  $('#respuesta-calculadora-biomasa').hide();
  $('#list-products-categories').hide();
  $('#list-calculators').hide();
  */
  $('#'+div_to_show).show();
  actualPage=div_to_show;

  if(div_to_show=='list-calculators' || div_to_show=='list-products-categories' || div_to_show=='list-contactos'){
    $('#btnBack').css('visibility','hidden');
    $('body').css('background-color:#E6E6E6');
  }
  else if(div_to_show=='contactos-duran'){
    $('.MapView').attr('src','');
    $('#iframeDuran').attr('src','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3986.8761727269007!2d-79.8157956853443!3d-2.2004929983960775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMsKwMTInMDEuOCJTIDc5wrA0OCc0OS4wIlc!5e0!3m2!1sen!2sec!4v1477001323035');
    $('#btnBack').css('visibility','visible');
  }
  else if(div_to_show=='contactos-eloro'){
    $('.MapView').attr('src','');
    $('#iframeMachala').attr('src','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.314744905412!2d-80.00567568534173!3d-3.271870997618001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwMTYnMTguNyJTIDgwwrAwMCcxMi42Ilc!5e0!3m2!1sen!2sec!4v1477001587994');
    $('#btnBack').css('visibility','visible');
  }
  else if(div_to_show=='contactos-hualtaco'){
    $('.MapView').attr('src','');
    $('#iframeHualtaco').attr('src','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.5857855868885!2d-80.23000968534129!3d-3.450419997488607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwMjcnMDEuNSJTIDgwwrAxMyc0MC4yIlc!5e0!3m2!1sen!2sec!4v1477001704641');
    $('#btnBack').css('visibility','visible');
  }
  else if(div_to_show=='contactos-pedernales'){
    $('.MapView').attr('src','');
    $('#iframePedernales').attr('src','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.8144697667176!2d-80.04250368534635!3d0.07960199994192547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMDQnNDYuNiJOIDgwwrAwMicyNS4xIlc!5e0!3m2!1sen!2sec!4v1477001942717');
    $('#btnBack').css('visibility','visible');
  }
  else if(div_to_show=='contactos-bahia'){
    $('.MapView').attr('src','');
    $('#iframeBahia').attr('src','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.5774643814234!2d-80.42724968534617!3d-0.6295669995406962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMzcnNDYuNCJTIDgwwrAyNSczMC4yIlc!5e0!3m2!1sen!2sec!4v1477002120426');
    $('#btnBack').css('visibility','visible');
  }
  else{
    $('#btnBack').css('visibility','visible');

  }

  if(div_to_show=='list-contactos'){
  //  $('body').css('background-color:#FFFFFF');
  $('body').css('background-color','#FFFFFF');
  }
  else if(div_to_show=='list-calculators' || div_to_show=='list-products-categories'){
    //$('body').css('background-color:#E6E6E6');
    $('body').css('background-color','#E6E6E6');
  }

  $(document).scrollTop(0);
}

function backAction(){

  switch (actualTab) {
    case '0': //calculadora
        switch (actualPage) {
          case 'talla-camaron': //calculadora-biomasa
            hideAllAndShow('list-calculators');
          break;
          case 'respuesta-calculadora-talla-camaron': //calculadora-sobrevivencia
            hideAllAndShow('talla-camaron');
          break;
          case 'calculadora-biomasa': //calculadora-biomasa
            hideAllAndShow('list-calculators');
          break;
          case 'respuesta-calculadora-biomasa': //calculadora-biomasa
            hideAllAndShow('calculadora-biomasa');
          break;
          case 'calculadora-sobrevivencia': //calculadora-sobrevivencia
            hideAllAndShow('list-calculators');
          break;
          case 'respuesta-calculadora-sobrevivencia': //calculadora-sobrevivencia
            hideAllAndShow('calculadora-sobrevivencia');
          break;
          case 'calculadora-peso': //calculadora-peso
            hideAllAndShow('list-calculators');
          break;
          case 'respuesta-calculadora-peso': //calculadora-peso
            hideAllAndShow('calculadora-peso');
          break;
          case 'calculadora-densidad': //calculadora-densidad
            hideAllAndShow('list-calculators');
          break;
          case 'respuesta-calculadora-densidad': //calculadora-densidad
            hideAllAndShow('calculadora-densidad');
          break;
          case 'calculadora-consumo-balanceado': //calculadora-consumo-balanceado
            hideAllAndShow('list-calculators');
          break;
          case 'respuesta-calculadora-consumo-balanceado': //calculadora-consumo-balanceado
            hideAllAndShow('calculadora-consumo-balanceado');
          break;
          case 'calculadora-extraprime': //calculadora-extraprime
            hideAllAndShow('list-calculators');
          break;
          case 'respuesta-calculadora-extraprime': //calculadora-extraprime
            hideAllAndShow('calculadora-extraprime');
          break;
          case 'calculadora-elmolino': //calculadora-elmolino
            hideAllAndShow('list-calculators');
          break;
          case 'respuesta-calculadora-elmolino': //calculadora-elmolino
            hideAllAndShow('calculadora-elmolino');
          break;
          case 'parametros-agua': //parametros-agua
            hideAllAndShow('list-calculators');
          break;
          case 'parametros-suelo': //parametros-suelo
            hideAllAndShow('list-calculators');
          break;
          case 'calculadora-raceways': //calculadora-elmolino
            hideAllAndShow('list-calculators');
          break;
          case 'respuesta-calculadora-raceways': //calculadora-elmolino
            hideAllAndShow('calculadora-raceways');
          break;
          case 'calculadora-hectarea-dia': //calculadora-elmolino
            hideAllAndShow('list-calculators');
          break;
          case 'respuesta-calculadora-hectarea-dia': //calculadora-elmolino
            hideAllAndShow('calculadora-hectarea-dia');
          break;
          default:
        }







    break;
    case '1': //productos
        switch (actualPage) {
          case 'product-frutomar': //parametros-suelo
            hideAllAndShow('list-products-categories');
          break;
          case 'product-rwo': //parametros-suelo
            hideAllAndShow('list-products-categories');
          break;
          case 'product-xp': //parametros-suelo
            hideAllAndShow('list-products-categories');
          break;
          case 'product-xp-pro': //parametros-suelo
            hideAllAndShow('list-products-categories');
          break;
          case 'product-xp2': //parametros-suelo
            hideAllAndShow('list-products-categories');
          break;
          case 'product-elmolino': //parametros-suelo
            hideAllAndShow('list-products-categories');
          break;
          case 'product-extraprime': //parametros-suelo
            hideAllAndShow('list-products-categories');
          break;
          case 'product-molino-plus': //parametros-suelo
            hideAllAndShow('list-products-categories');
          break;
          case 'product-mysis': //parametros-suelo
            hideAllAndShow('list-products-categories');
          break;
          default:
        }
      //hideAllAndShow('list-products-categories');
    break;
    case '2': //contactenos
        switch (actualPage) {
          case 'contactos-duran': //calculadora-biomasa
            $('.MapView').attr('src','');
            hideAllAndShow('list-contactos');
          break;
          case 'contactos-eloro': //calculadora-biomasa
            $('.MapView').attr('src','');
            hideAllAndShow('list-contactos');
          break;
          case 'contactos-hualtaco': //calculadora-biomasa
            $('.MapView').attr('src','');
            hideAllAndShow('list-contactos');
          break;
          case 'contactos-pedernales': //calculadora-biomasa
            $('.MapView').attr('src','');
            hideAllAndShow('list-contactos');
          break;
          case 'contactos-bahia': //calculadora-biomasa
            $('.MapView').attr('src','');
            hideAllAndShow('list-contactos');
          break;
          default:
        }
    break;
    default:

  }
}

function initForms(){


  //calculladora de talla del camaron
  $('#button-calculadora-talla-camaron').click(function(){
    var gramosCamaron=$('#talla_camaron_gramos').val();
    var res=0;
    //_tipoCamaronSelected=tipo; //entro,cola
    switch (_tipoCamaronSelected) {
      case 'entero':
        if(gramosCamaron>=20 && gramosCamaron<=24){
          res = '40/50';
        }
        else if(gramosCamaron>=17 && gramosCamaron<20){
          res = '50/60';
        }
        else if(gramosCamaron>=15 && gramosCamaron<27){
          res = '60/70';
        }
        else if(gramosCamaron>=13 && gramosCamaron<15){
          res = '70/80';
        }
        else if(gramosCamaron>=10 && gramosCamaron<13){
          res = '80/100';
        }
        else if(gramosCamaron>=8 && gramosCamaron<10){
          res = '100/120';
        }
        else if(gramosCamaron<8){
          res = '120/140';
        }
        break;
      case 'cola':
        if(gramosCamaron>=17 && gramosCamaron<=18){
          res = '36/40';
        }
        else if(gramosCamaron>=14 && gramosCamaron<17){
          res = '41/50';
        }
        else if(gramosCamaron>=12 && gramosCamaron<14){
          res = '51/60';
        }
        else if(gramosCamaron>=10 && gramosCamaron<12){
          res = '61/70';
        }
        else if(gramosCamaron>=8 && gramosCamaron<10){
          res = '71/90';
        }
        else if(gramosCamaron>=7 && gramosCamaron<8){
          res = '91/110';
        }
        else if(gramosCamaron>=6 && gramosCamaron<7){
          res = '110/130';
        }
        else if(gramosCamaron>=5 && gramosCamaron<6){
          res = '130/150';
        }
        else if(gramosCamaron<5){
          res = '150 UP';
        }
        break;
      default:

    }
    hideAllAndShow('respuesta-calculadora-talla-camaron');
    var container = $("#result_calculadora_talla_camaron");
    container.shuffleLetters({
      "text": res
    });
  });

  //calculladora de biomasa
  $('#button-calculadora-biomasa').click(function(){
    //for biomasa
    var gramos_peso=$('#biomasa_peso').val()*1.0;
    var res=0;
    res=($('#biomasa_densidad').val()*$('#biomasa_hectareas').val()*gramos_peso*($('#biomasa_sobrevivencia').val()/100))/_constante1;
    var res_numeric=res.toFixed(4);
    res=res_numeric+"";

    //for alimento por hectarea diaria
    /*
    var factr=9; //por default 9

    for(var i=0;i<_constante_gramos.length;i++){
      //console.log(_constante_gramos[i]+'=>'+_constante_factor[i]);
      if(gramos_peso.toFixed(1)==_constante_gramos[i]){
        //alert(_constante_factor[i]);
        factr=_constante_factor[i];
      }
    }

    var alimento_hectarea_diaria=(((factr/100)*res_numeric)/2.2).toFixed(4);

*/
    hideAllAndShow('respuesta-calculadora-biomasa');
    var container = $("#result_calculadora_biomasa");
    container.shuffleLetters({
      "text": res
    });
/*
    var container2 = $("#result_alimento_hectarea_diaria");
    container2.shuffleLetters({
      "text": alimento_hectarea_diaria
    });
    */

    //
  });

  //calculladora de sobrevivencia
  $('#button-calculadora-sobrevivencia').click(function(){
    var res=0;
    res=($('#sobrevivencia_libras_hectarea').val()*_constante1)/($('#sobrevivencia_densidad').val()*$('#sobrevivencia_hectareas').val()*$('#sobrevivencia_peso').val());
    res=(res.toFixed(2)*100)+" %";
    hideAllAndShow('respuesta-calculadora-sobrevivencia');
    var container = $("#result_calculadora_sobrevivencia");
    container.shuffleLetters({
      "text": res
    });
  });

  //calculladora de peso
  $('#button-calculadora-peso').click(function(){
    var res=0;
    res=($('#peso_libras_hectarea').val()*_constante1)/($('#peso_densidad').val()*$('#peso_hectareas').val()*($('#peso_sobrevivencia').val()/100));
    res=res.toFixed(2);
    hideAllAndShow('respuesta-calculadora-peso');
    var container = $("#result_calculadora_peso");
    container.shuffleLetters({
      "text": res
    });
  });

  //calculladora de densidad
  $('#button-calculadora-densidad').click(function(){
    var res=0;
    res=($('#densidad_libras_hectarea').val()*_constante1)/($('#densidad_peso').val()*$('#densidad_hectareas').val()*($('#densidad_sobrevivencia').val()/100));
    res=res.toFixed(2);
    hideAllAndShow('respuesta-calculadora-densidad');
    var container = $("#result_calculadora_densidad");
    container.shuffleLetters({
      "text": res
    });
  });

  //calculladora de peso
  $('#button-calculadora-consumo-balanceado').click(function(){
    var res_libras=0;
    var res_kilos=0;
    //var f_c_a = 1.6;
    var f_c_a = $('#consumo_balanceado_fca').val();

    var  lbs_ha=($('#consumo_balanceado_peso').val()*($('#consumo_balanceado_sobrevivencia').val()/100)*$('#consumo_balanceado_densidad').val())/_constante1;

    res_libras = lbs_ha*$('#consumo_balanceado_hectareas').val();
    res_kilos = (res_libras*f_c_a)/2.205; //cambio de 55 a 2.205

    res_kilos=res_kilos.toFixed(2);
    hideAllAndShow('respuesta-calculadora-consumo-balanceado');
    var container = $("#result_calculadora_consumo_balanceado");
    container.shuffleLetters({
      "text": res_kilos
    });
  });


  //calculladora extraprime
  $('#button-calculadora-extraprime').click(function(){

    var gramos=_constante_gramos[$('#cmbExtraprimeGramos').val()];
    var factor=_constante_factor[$('#cmbExtraprimeFactor').val()];
    var biomasa_libras=1*5500/factor;
    var animales_saco_25_kg=(biomasa_libras*_constante1)/gramos;
    var animales_kilo=animales_saco_25_kg/25;
    var alimento_kg_aplicado=$('#extraprime_alimento_kg_aplicado').val();
    var animales_totales=animales_kilo*alimento_kg_aplicado;
    var libras_totales=(animales_totales*gramos)/_constante1;
    var cuanto_sembro=$('#extraprime_cuanto_sembro').val();;
    var sobrevivencia=animales_totales/cuanto_sembro;

    libras_totales=libras_totales.toFixed(2);
    sobrevivencia=(sobrevivencia*100).toFixed(2);
    animales_totales =animales_totales.toFixed(2);


    hideAllAndShow('respuesta-calculadora-extraprime');
    var container = $("#result_calculadora_extraprime_animales_totales");
    container.shuffleLetters({
      "text": animales_totales
    });

    var container2 = $("#result_calculadora_extraprime_libras_totales");
    container2.shuffleLetters({
      "text": libras_totales
    });
    var container3 = $("#result_calculadora_extraprime_sobrevivencia");
    container3.shuffleLetters({
      "text": sobrevivencia+" %"
    });
  });



  //calculadora raceways
  $('#button-calculadora-raceways').click(function(){
/*
    var gramos=_constante_gramos[$('#cmbElMolinoGramos').val()];
    var factor=_constante_factor[$('#cmbElMolinoFactor').val()];
    var biomasa_libras=(1*8800/factor*0.9);
    var animales_saco_40_kg=(biomasa_libras*_constante1)/gramos;
    var animales_kilo=animales_saco_40_kg/40;
    var alimento_kg_aplicado=$('#elmolino_alimento_kg_aplicado').val();
    var animales_totales=animales_kilo*alimento_kg_aplicado;
    var libras_totales=(animales_totales*gramos)/_constante1;
    var cuanto_sembro=$('#elmolino_cuanto_sembro').val();;
    var sobrevivencia=animales_totales/cuanto_sembro;

    libras_totales=libras_totales.toFixed(2);
    sobrevivencia=(sobrevivencia*100).toFixed(2);
    animales_totales =animales_totales.toFixed(2);


    hideAllAndShow('respuesta-calculadora-elmolino');
    var container = $("#result_calculadora_elmolino_animales_totales");
    container.shuffleLetters({
      "text": animales_totales
    });

    var container2 = $("#result_calculadora_elmolino_libras_totales");
    container2.shuffleLetters({
      "text": libras_totales
    });
    var container3 = $("#result_calculadora_elmolino_sobrevivencia");
    container3.shuffleLetters({
      "text": sobrevivencia+" %"
    });*/

    hideAllAndShow('respuesta-calculadora-raceways');
    var tmp = 58 + 41+63;
    $('.tabla-raceways').height(($(window).height()-tmp)+'px');
  });




  //calculadora elmolino
  $('#button-calculadora-elmolino').click(function(){

    var gramos=_constante_gramos[$('#cmbElMolinoGramos').val()];
    var factor=_constante_factor[$('#cmbElMolinoFactor').val()];
    var biomasa_libras=(1*8800/factor*0.9);
    var animales_saco_40_kg=(biomasa_libras*_constante1)/gramos;
    var animales_kilo=animales_saco_40_kg/40;
    var alimento_kg_aplicado=$('#elmolino_alimento_kg_aplicado').val();
    var animales_totales=animales_kilo*alimento_kg_aplicado;
    var libras_totales=(animales_totales*gramos)/_constante1;
    var cuanto_sembro=$('#elmolino_cuanto_sembro').val();;
    var sobrevivencia=animales_totales/cuanto_sembro;

    libras_totales=libras_totales.toFixed(2);
    sobrevivencia=(sobrevivencia*100).toFixed(2);
    animales_totales =animales_totales.toFixed(2);


    hideAllAndShow('respuesta-calculadora-elmolino');
    var container = $("#result_calculadora_elmolino_animales_totales");
    container.shuffleLetters({
      "text": animales_totales
    });

    var container2 = $("#result_calculadora_elmolino_libras_totales");
    container2.shuffleLetters({
      "text": libras_totales
    });
    var container3 = $("#result_calculadora_elmolino_sobrevivencia");
    container3.shuffleLetters({
      "text": sobrevivencia+" %"
    });
  });



  //calculadora utilidad hectarea dia
  $('#button-calculadora-hectarea-dia').click(function(){

    //result
    var suma_costos_ha_da = 0;
    var utilidad_ha_da = 0;

    //inputs
    var costos_fijos_ha_da = $('#utilidad_costos_fijos_hectarea_dia').val();
    var libras_ha_cosecha = $('#utilidad_libras_ha_cosecha').val();
    var us_lb = $('#utilidad_us_lb').val();
    var dias_ciclo = $('#utilidad_dias_ciclo').val();
    var costo_kg_alimento = $('#utilidad_costo_kg_alimento').val();
    var fc = $('#utilidad_fc').val();
    var densidad_siembra = $('#utilidad_densidad_siembra').val();
    var costo_insumos_ha_ciclo = $('#utilidad_costo_insumos_ha_ciclo').val();
    var costo_millar_larva = $('#utilidad_costo_millar_larva').val();

    var costo_alimento_ha_da=0;
    var total_costo_alimento_ha=0;
    var libras_ha=0;
    var venta_camaron_ha_da = 0;
    var venta_camaron_us = 0;
    var costo_larva=0;
    var costo_insumos=0;
    //--------- calculos ---



    libras_ha = libras_ha_cosecha*1;
    total_costo_alimento_ha = (libras_ha*fc/2.2)*costo_kg_alimento;
    costo_alimento_ha_da = total_costo_alimento_ha/dias_ciclo;
    costo_larva=costo_millar_larva/dias_ciclo*densidad_siembra/1000;
    costo_insumos=costo_insumos_ha_ciclo/dias_ciclo;
    suma_costos_ha_da = 1*costos_fijos_ha_da+1*costo_alimento_ha_da+1*costo_larva+1*costo_insumos;


    venta_camaron_us = libras_ha_cosecha*us_lb;
    venta_camaron_ha_da = venta_camaron_us / dias_ciclo;
    utilidad_ha_da = (venta_camaron_ha_da*1)-(suma_costos_ha_da*1) ;


    //----------------------
    hideAllAndShow('respuesta-calculadora-hectarea-dia');

    var container1 = $("#result_calculadora_hectarea_dia_1");
    container1.shuffleLetters({
      "text": suma_costos_ha_da.toFixed(2)+""
    });

    var container2 = $("#result_calculadora_hectarea_dia_2");
    container2.shuffleLetters({
      "text": utilidad_ha_da.toFixed(2)+""
    });

  });

}



function initBottomNavigation(){
  $('.bottom-nav-item').click(function(){
    $('.bottom-nav-item').removeClass('active');
    $(this).addClass('active');
    actualTab = $(this).attr('rel');
    //alert(actualTab);
    switch (actualTab) {
      case '0':
        $('.content-panel').removeClass('white-background');
        hideAllAndShow('list-calculators');
        break;
      case '1':
        $('.content-panel').removeClass('white-background');
        hideAllAndShow('list-products-categories');
        break;
      case '2':
        $('.content-panel').addClass('white-background');
        hideAllAndShow('list-contactos');
        break;
      default:
    }
  });
}



function fillConstants(){
  //var _constante_gramos = [];
  //var _constante_factor = [];
  var index=0;
  var index2=0;

  /*
    CONSTANTE GRAMOS
  */
  var tmp1 = 2;
  while(tmp1<=23.1){
    _constante_gramos[index] = tmp1.toFixed(1);
    if(tmp1<5){
      tmp1 += 0.5;
    }
    else{
      tmp1 += 0.1;
    }
    index++;
  }

  /*
    CONSTANTE FACTOR
  */
  var tmp2 = 9;
  while(tmp2>2.2){
    _constante_factor[index2] = tmp2.toFixed(2);
    if(tmp2>6){
      tmp2 -= 0.5;
    }
    else if(tmp2>4.10 && tmp2<=6){
      tmp2 -= 0.1;
    }
    else if(tmp2>3.42 && tmp2<=4.10){
      tmp2 -= 0.02;
    }
    else{
      tmp2 -= 0.01;
    }
    index2++;
  }
  //agrego a la constante Factor 10 veces el valor 2.20
  for(var j=0;j<10;j++){
    _constante_factor[index2+j]=(2.20).toFixed(2);
  }

  /*
    Itero las constantes generadas y lleno los combobox
  */
  for(var i=0;i<_constante_gramos.length;i++){
    //console.log(i+": "+_constante_factor[i]);
    //lleno el combo de Calculadora de extraprime
    $('#cmbExtraprimeGramos').append('<option value="'+i+'">'+_constante_gramos[i]+'</option>');
    $('#cmbExtraprimeFactor').append('<option value="'+i+'">'+_constante_factor[i]+'</option>');
    $('#cmbElMolinoGramos').append('<option value="'+i+'">'+_constante_gramos[i]+'</option>');
    $('#cmbElMolinoFactor').append('<option value="'+i+'">'+_constante_factor[i]+'</option>');
  }

  $('#cmbExtraprimeGramos').on('change', function() {
    $('#cmbExtraprimeFactor').val($(this).val());
  });
  $('#cmbExtraprimeFactor').on('change', function() {
    $('#cmbExtraprimeGramos').val($(this).val());
  });
  $('#cmbElMolinoGramos').on('change', function() {
    $('#cmbElMolinoFactor').val($(this).val());
  });
  $('#cmbElMolinoFactor').on('change', function() {
    $('#cmbElMolinoGramos').val($(this).val());
  });
}

function selectCamaron(tipo,element){
  $('.camaron-selector').removeClass('active');
  $(element).addClass('active');
  _tipoCamaronSelected=tipo; //entro,cola
}



/*
  maps
*/

function inimaps(){
  var mapDiv = document.getElementById("map_canvas");

  const GOOGLE = new plugin.google.maps.LatLng(37.422476,-122.08425);
  var map = plugin.google.maps.Map.getMap(mapDiv, {
    'camera': {
      'latLng': GOOGLE,
      'zoom': 17
    }
  });

  map.addEventListener(plugin.google.maps.event.MAP_READY, function() {

    map.addMarker({
      'position': GOOGLE,
      'title': "Hello GoogleMap for Cordova!"
    }, function(marker) {

      marker.showInfoWindow();

    });

  });
}

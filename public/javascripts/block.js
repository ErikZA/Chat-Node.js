/**  
 noback v0.0.1 
 library for prevent backbutton 
 Author: Kiko Mesquita: http://twitter.com/kikomesquita 
 Based on stackoverflow 
 * Copyright (c) 2015 @ kikomesquita 
*/ 

(function(window) { 
    'use strict'; 
   
  var noback = { 
       
      //globals 
      version: '0.0.1', 
      history_api : typeof history.pushState !== 'undefined', 
       
      init:function(){ 
          window.location.hash = '#no-back'; 
          noback.configure(); 
      }, 
       
      hasChanged:function(){ 
          if (window.location.hash == '#no-back' ){ 
              window.location.hash = '#BLOQUEIO';
              //mostra mensagem que não pode usar o btn volta do browser
              if($( "#msgAviso" ).css('display') =='none'){
                  $( "#msgAviso" ).slideToggle("slow");
              }
          } 
      }, 
       
      checkCompat: function(){ 
          if(window.addEventListener) { 
              window.addEventListener("hashchange", noback.hasChanged, false); 
          }else if (window.attachEvent) { 
              window.attachEvent("onhashchange", noback.hasChanged); 
          }else{ 
              window.onhashchange = noback.hasChanged; 
          } 
      }, 
       
      configure: function(){ 
          if ( window.location.hash == '#no-back' ) { 
              if ( this.history_api ){ 
                  history.pushState(null, '', '#BLOQUEIO'); 
              }else{  
                  window.location.hash = '#BLOQUEIO';
                  //mostra mensagem que não pode usar o btn volta do browser
                  if($( "#msgAviso" ).css('display') =='none'){
                      $( "#msgAviso" ).slideToggle("slow");
                  }
              } 
          } 
          noback.checkCompat(); 
          noback.hasChanged(); 
      } 
       
      }; 
       
      // AMD support 
      if (typeof define === 'function' && define.amd) { 
          define( function() { return noback; } ); 
      }  
      // For CommonJS and CommonJS-like 
      else if (typeof module === 'object' && module.exports) { 
          module.exports = noback; 
      }  
      else { 
          window.noback = noback; 
      } 
      noback.init();
  }(window)); 
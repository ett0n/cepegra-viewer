//alert("Salut Grosse peute");
//alert("Hello! I am an alert box!!");

const AR = document.querySelector("model-viewer");
console.log(AR.canActivateAR);
const polak = JSON.stringify(AR.ar-status);
console.log(polak);

if (AR.canActivateAR === false){
  alert("NIKE TOI TON DEVICE EST PAS COMPATIBLE");
}else{
  alert("L'AR est compatible avec ton device");
}

// AR.addEventListener('ar-status', (event) => {console.log(event)});
//     if(event.detail.status === 'failed'){
//       const error = document.querySelector("#error");
//       error.classList.remove('hide');
//       error.addEventListener('transitionend',(event) => {
//         error.classList.add('hide');
//       });
//     }
//   });

  
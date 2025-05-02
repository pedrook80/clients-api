export function validatorCpf(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); 
    console.log(cpf)
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) {
      return false;
    }
  
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let digitoVerificador1 = resto >= 10 ? 0 : resto;
  
    if (parseInt(cpf.charAt(9)) !== digitoVerificador1) {
      return false;
    }
  
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    let digitoVerificador2 = resto >= 10 ? 0 : resto;
  
    if (parseInt(cpf.charAt(10)) !== digitoVerificador2) {
      return false;
    }
  
    return true;
  }

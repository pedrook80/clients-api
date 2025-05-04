import request from 'supertest';
import { expect } from 'chai';
import app from '../../../index.js';

let token = '';

before(async () => {
  const user = {
    email: 'usuario@teste.com',
    password: '123456'
  };

  const response = await request(app)
    .post('/user/login')
    .send(user);

  expect(response.status).to.equal(200);
  expect(response.body).to.have.property('token');

  token = response.body.token;
});

describe('Clients API (com autenticação)', () => {
  it('deve listar todos os clientes', async () => {
    const res = await request(app)
      .get('/clients')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('deve criar um novo cliente', async () => {
    const newClient = {
      name: 'Cliente Teste',
      cpf: `${gerarCPF()}`,
      emails: [`cliente${Date.now()}@teste.com`],
      phones: [`1199999999`]
    };
    
    const res = await request(app)
      .post('/clients')
      .set('Authorization', `Bearer ${token}`)
      .send(newClient);
      
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('id');
  });
});


function gerarCPF() {
  const gerarDigito = (nums) => {
    let soma = nums
      .map((num, index) => num * ((nums.length + 1) - index))
      .reduce((a, b) => a + b, 0);
    let resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const nums = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));

  nums.push(gerarDigito(nums));
  nums.push(gerarDigito(nums));

  return nums.join('').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

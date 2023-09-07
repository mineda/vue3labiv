<template>
  <div class="about">
    <p>This is an about page, {{ nome }}</p>
    <p>Nome: <input type="text" v-model="nome"/></p>
    <p v-if="nome.length > 5">Texto muito longo!</p>
    <p v-else>Texto com tamanho normal!</p>
    <p>Nome: <input type="password" v-model="senha"/></p>
    <button @click="salvarUsuario">Inserir</button>
    <button @click="buscarUsuarios">Atualizar</button>
    <p v-if="erro">{{ erro }}</p>
    <table>
      <thead>
        <td>Id</td>
        <td>Nome</td>
      </thead>
      <tbody>
        <tr v-for="usuario in usuarios">
          <td>{{ usuario.id }}</td>
          <td>{{ usuario.nome }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import axios from 'axios';

  const nome = ref("Teste");
  const senha = ref("123");
  const erro = ref();
  const usuarios = ref();

  async function buscarUsuarios() {
    erro.value = "";
    try {
      usuarios.value = (await axios.get("usuario")).data;
    }
    catch(error) {
      erro.value = (error as Error).message;
    }
  }

  async function salvarUsuario() {
    erro.value = "";
    try {
      usuarios.value.push((await axios.post("usuario", 
          {
            nome: nome.value,
            senha: senha.value
          }
        )).data);
    }
    catch(error) {
      erro.value = (error as Error).message;
    }
  }

  onMounted(() => {
    buscarUsuarios();
  });
</script>
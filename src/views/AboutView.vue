<template>
  <div class="about">
    <p><label for='titulo'>Título: </label><input id='titulo' type='text' v-model="jogo.titulo"/></p>
    <p><label for='estudio'>Estúdio: </label><input id='estudio' type='text' v-model="jogo.estudio"/></p>
    <p><label for='dhlancamento'>Data/hora lançamento: </label><input id='dhlancamento' type='datetime-local' v-model="jogo.dataHoraLancamento"/></p>
    <p><label for='classificacao'>Classificação: </label><input id='classificacao' type='text' v-model="jogo.classificacao"/></p>
    <p><label for='duracao'>Duração média: </label><input id='duracao' type='number' step='0.1' v-model="jogo.duracaoMedia"/></p>
    <button @click="salvarJogo">Inserir</button>
    <button @click="buscarJogos">Buscar</button>
    <p v-if="erro">{{ erro }}</p>
    <table>
      <thead>
        <td>Id</td>
        <td>Título</td>
        <td>Estúdio</td>
        <td>Data/hora lançamento</td>
      </thead>
      <tbody>
        <tr v-for="jogo in jogos">
          <td>{{ jogo.id }}</td>
          <td>{{ jogo.titulo }}</td>
          <td>{{ jogo.estudio }}</td>
          <td>{{ jogo.dataHoraLancamento }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import axios from 'axios';

const jogo = ref(
  {
    titulo: '',
    estudio: '',
    dataHoraLancamento: null,
    classificacao: '',
    duracaoMedia: null
  });

const erro = ref();
const jogos = ref();

async function buscarJogos() {
  erro.value = '';
  try {
    if(jogo.value.estudio && jogo.value.titulo) {
      jogos.value = (await axios.get('jogo/' + jogo.value.estudio + '/' + jogo.value.titulo)).data;
    }
    else {
      jogos.value = (await axios.get('jogo')).data;
    }
  }
  catch (error) {
    erro.value = (error as Error).message;
  }
}

async function salvarJogo() {
  erro.value = '';
  try {
    await axios.post('jogo', jogo.value);
    buscarJogos();
  }
  catch (error) {
    erro.value = (error as Error).message;
  }
}

onMounted(() => {
  buscarJogos();
});
</script>
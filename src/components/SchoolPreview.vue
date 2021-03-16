<template>
  <q-dialog v-model="active">
    <q-card>
      <q-card-section>
        <div class="text-h6">{{school.name}}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
      {{school}}
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Fermer" color="primary" @click = "$emit('close')"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>


<script lang="ts">
import {PropType} from 'vue'

interface Coords {
  lat: number;
  lng: number;
}

interface Logo {
  url: string;
  width: number;
  height: number;
}

interface School {
  name: string;
  coords: Coords;
  logo: Logo;
  visible: boolean;
}

export default {
  name: "SchoolPreview",
  props: {
    school: {
      type: Object as PropType<School>
    }
  },
  setup() {
    let active = true;
    return {active};
  }
}
</script>

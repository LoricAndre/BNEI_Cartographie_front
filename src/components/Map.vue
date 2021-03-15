<template>
    <GoogleMap
      api-key = "AIzaSyCPO0I-grtAAxi4OH2BnnW9m5Oc8yYQze4"
      :center = "search_input.coords ? search_input.coords : center"
      :zoom = "15"
      :style = "style"
    >
      <Marker
        v-for = "school in schools"
        :key = "school.name"
        :options="{position: school.coords, icon: {url: school.logo.url, scaledSize: {width : school.logo.width, height : school.logo.height}}, visible: school.visible}"
      />
      <CustomControl position = "TOP_RIGHT">
        <q-select
          outlined
          bg-color = "white"
          v-model = "search_input"
          use-input
          input-debounce = "0"
          label = "Rechercher"
          @filter = "filter"
          :options = "filtered"
          option-label = "name"
          option-value = "coords"
          clearable
        />
      </CustomControl>
    </GoogleMap>
</template>

<script lang="ts">
import {GoogleMap, Marker, CustomControl} from 'vue3-google-map'
import {ref, reactive} from 'vue'

interface Coords {
  lat: number
  lng: number
};

interface Logo {
  url: string,
  width: number,
  height: number
}

interface School {
  name: string
  coords: Coords,
  logo: Logo,
  visible: boolean
};

export default {
  name: 'LayoutDefault',


  components: {
    GoogleMap,
    Marker,
    CustomControl,
  },
  props: {
    style: String,
  },
  methods: {
    input(val: string) {
      console.log(val)
    },
  },
  setup () {
    let center = reactive({lat: 48.8566, lng: 2.3522}) as Coords;
    let search_input =  ref('');
    let schools: School[] = [
      {
        name: 'ENSTA Paris',
        coords: {lat: 48.7107, lng: 2.2181},
        logo: {
          url: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Logo_ENSTA_Paris.jpg',
          width: 0,
          height: 0
        },
        visible: true
      },
      {
        name: 'Polytechnique',
        coords: {lat: 48.7143, lng: 2.2113},
        logo: {
          url: 'https://www.mondedesgrandesecoles.fr/wp-content/uploads/capture-438.jpg',
          width: 0,
          height: 0
        },
        visible : true
      }
    ];
    for (let school of schools) {
      var image = new Image();
      image.onload = function() {
        let that = this as HTMLImageElement;
        school.logo.width = 30;
        school.logo.height = that.naturalWidth === 0 ? 30 : 30 * that.naturalHeight / that.naturalWidth;
      };
      image.src = school.logo.url;
    }
    let filtered = ref([{}]);
    let filter = function(input: string, update: Function): void {
      const lower = input.toLowerCase();

      update(() => {
        filtered.value = schools
              .filter((v: School) => 
                v.name.toLowerCase().indexOf(lower) > -1)
      })
    };
    return {
      center,
      search_input,
      schools,
      filtered,
      filter
    };
  }
}
</script>


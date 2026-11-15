<script setup>
import { ref } from 'vue'

defineProps({ photos: { type: Array, required: true } })

const dialog = ref(null)
const selected = ref(null)
const image = (file) => import.meta.env.BASE_URL + 'images/' + file

function open(photo) {
  selected.value = photo
  dialog.value.showModal()
}
</script>

<template>
  <section class="gallery" id="galerija" aria-labelledby="gallery-title">
    <h2 id="gallery-title">Galerija</h2>
    <div class="photo-grid">
      <figure v-for="photo in photos" :key="photo.caption">
        <button v-if="photo.file" type="button" class="photo-tile" :aria-label="'Povečaj fotografijo — ' + photo.caption" @click="open(photo)">
          <img :src="image(photo.file)" :alt="photo.alt" :style="{ objectPosition: photo.position }" loading="lazy">
          <span aria-hidden="true">↗</span>
        </button>
        <div v-else class="photo-tile placeholder">
          <span aria-hidden="true">＋</span>
          <small>Prostor za fotografijo</small>
        </div>
        <figcaption>{{ photo.caption }}</figcaption>
      </figure>
    </div>
    <dialog ref="dialog" aria-label="Povečana fotografija" @click.self="dialog.close()">
      <form method="dialog">
        <button type="submit">Zapri <span aria-hidden="true">×</span></button>
      </form>
      <figure v-if="selected">
        <img :src="image(selected.file)" :alt="selected.alt">
        <figcaption>{{ selected.caption }}</figcaption>
      </figure>
    </dialog>
  </section>
</template>

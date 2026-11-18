<script setup>
import { computed, ref } from 'vue'
import variants from './image-variants.json'

defineOptions({ inheritAttrs: false })
const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  sizes: { type: String, default: '(max-width: 736px) 100vw, 50vw' },
  zoom: Boolean,
})
const image = computed(() => variants[props.src])
const dialog = ref(null)
const opened = ref(false)
function open() {
  if (props.zoom) {
    opened.value = true
    dialog.value.showModal()
  }
}
</script>

<template>
  <img
    v-bind="$attrs"
    :src="image?.small.src ?? src"
    :srcset="
      image && image.small.width !== image.full.width
        ? `${image.small.src} ${image.small.width}w, ${image.full.src} ${image.full.width}w`
        : undefined
    "
    :sizes="sizes"
    :width="image?.small.width"
    :height="image?.small.height"
    :alt="alt"
    decoding="async"
    class="responsive-photo"
    :class="{ 'zoom-photo': zoom }"
    :role="zoom ? 'button' : undefined"
    :tabindex="zoom ? 0 : undefined"
    :aria-label="zoom ? `Povečaj: ${alt}` : undefined"
    @click="open"
    @keydown.enter.prevent="open"
    @keydown.space.prevent="open"
  />
  <Teleport v-if="zoom" to="body">
    <dialog ref="dialog" class="photo-dialog" @close="opened = false" @click="dialog.close()">
      <button
        type="button"
        class="photo-close"
        aria-label="Zapri fotografijo"
        autofocus
        @click="dialog.close()"
      >
        ×
      </button>
      <img v-if="opened" :src="image?.full.src ?? src" :alt="alt" @click.stop />
      <p>{{ alt }}</p>
    </dialog>
  </Teleport>
</template>

<style scoped>
.responsive-photo {
  height: auto;
}
.zoom-photo {
  cursor: zoom-in;
}
.zoom-photo:focus-visible {
  outline: 3px solid #d98236;
  outline-offset: -3px;
}
.photo-dialog {
  box-sizing: border-box;
  width: 100vw;
  max-width: 100vw;
  height: 100dvh;
  max-height: 100dvh;
  border: 0;
  padding: 2.5rem 1rem 1rem;
  background: #111;
  color: white;
}
.photo-dialog::backdrop {
  background: #111e;
}
.photo-dialog img {
  display: block;
  width: 100%;
  height: calc(100% - 2.5rem);
  object-fit: contain;
}
.photo-dialog p {
  text-align: center;
  margin: 0.6rem 0 0;
  font:
    0.85rem/1.5 system-ui,
    sans-serif;
}
.photo-close {
  position: absolute;
  right: 0.5rem;
  top: 0;
  width: 2.75rem;
  height: 2.75rem;
  border: 0;
  background: transparent;
  color: white;
  font: 2rem/1 system-ui;
  cursor: pointer;
}
</style>

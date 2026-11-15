<script setup>
import athlete from './athlete'
import PhotoGallery from './PhotoGallery.vue'

const trail = athlete.trail
const panorama = import.meta.env.BASE_URL + 'images/anze-gorska-panorama.webp'
</script>

<template>
  <header class="site-header" id="vrh">
    <a class="brand" href="#vrh">AM<span>.</span></a>
    <nav aria-label="Vsebina"><a href="#rezultati">Rezultati</a><a href="#galerija">Galerija</a></nav>
  </header>
  <main class="wrap">
    <section class="hero">
      <img :src="panorama" alt="" fetchpriority="high">
      <div class="hero-inner">
        <p class="label">{{ athlete.tag }}</p>
        <h1>{{ athlete.first }}<br><em>{{ athlete.last }}</em></h1>
        <p class="intro">{{ trail.intro }}</p>
        <a class="cta" href="#rezultati">Izbrani rezultati <span aria-hidden="true">↓</span></a>
      </div>
    </section>
    <section class="results" id="rezultati" aria-labelledby="results-title">
      <div class="section-head">
        <h2 id="results-title">Izbrani rezultati</h2>
        <a :href="trail.source">Profil UTMB <span aria-hidden="true">↗</span></a>
      </div>
      <ul>
        <li v-for="[place, race, detail] in trail.stats" :key="race + detail">
          <strong>{{ place }}</strong>
          <div><span>{{ race }}</span><small>{{ detail }}</small></div>
        </li>
      </ul>
    </section>
    <PhotoGallery :photos="trail.gallery" />
  </main>
  <footer class="wrap"><span>Anže Mošnik</span><a href="#vrh">Na vrh ↑</a></footer>
</template>

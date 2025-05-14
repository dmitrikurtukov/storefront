<script setup lang="ts">
const city = "Tallinn";

const { data, error, loading } = useWeather(city);
</script>

<template>
  <h1>Weather in {{ city }}</h1>
  <div v-if="loading">Loading...</div>
  <div v-if="error">Error: {{ error }}}</div>
  <div v-if="data">
    <img
      :src="`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`"
      alt="Weather Icon"
      class="weather-icon"
    />
    <p>{{ Math.round(data.main.temp) }}°C</p>
    <p>{{ data.weather[0].description }}</p>
    <p>{{ new Date().toLocaleDateString() }}</p>
  </div>
</template>

<style scoped>
.weather-icon {
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
}
</style>

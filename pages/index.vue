<script setup lang="ts">
const city = "Tallinn";

const { data, error, loading } = useWeather(city);
</script>

<template>
  <div
    class="container d-flex justify-content-center align-items-center min-vh-100"
  >
    <div class="weather-card">
      <h1 class="mb-4">Weather in {{ city }}</h1>

      <div v-if="loading" class="alert alert-info">Loading...</div>
      <div v-if="error" class="alert alert-danger">Error: {{ error }}}</div>

      <div v-if="data">
        <img
          :src="`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`"
          alt="Weather Icon"
          class="weather-icon mb-3"
        />
        <h2 class="display-4">{{ Math.round(data.main.temp) }}°C</h2>
        <p class="lead text-capitalize">{{ data.weather[0].description }}</p>
        <p class="text-muted">{{ new Date().toLocaleDateString() }}</p>

        <hr />
        <div class="fs-6">
          <p>
            <v-icon name="fa-thermometer-half" class="me-1" />
            <strong>Feels Like:</strong>
            {{ Math.round(data.main.feels_like) }}°C
          </p>
          <p>
            <v-icon name="fa-wind" class="me-1" />
            <strong>Wind Speed:</strong>
            {{ data.wind.speed }} m/s
          </p>
          <p>
            <v-icon name="fa-tint" class="me-1" />
            <strong>Humidity:</strong>
            {{ data.main.humidity }}%
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather-card {
  width: 300px;
  padding: 20px;
  transition: all 0.3s ease-in-out;
  transform: translateY(0);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  text-align: center;
}

.weather-card:hover {
  transform: scale(1.02) translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.weather-icon {
  width: 120px;
  margin-bottom: 15px;
}
</style>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import { weatherColors } from "@/utils/weatherColors";

const vantaContainer = ref<HTMLElement | null>(null);
let vantaEffect: any = null;

const city = "Sydney, AU";
const { data, error, loading } = useWeather(city);

const weatherClass = computed(() => {
  if (!data.value) return "bg-default";

  const description = data.value.weather[0].description.toLowerCase();

  if (description.includes("clear")) return "bg-sunny";
  if (description.includes("cloud")) return "bg-cloudy";
  if (description.includes("rain") || description.includes("drizzle"))
    return "bg-rainy";
  if (description.includes("snow")) return "bg-snowy";
  if (description.includes("thunderstorm")) return "bg-thunderstorm";
  if (
    description.includes("mist") ||
    description.includes("fog") ||
    description.includes("haze") ||
    description.includes("smoke") ||
    description.includes("sand") ||
    description.includes("dust") ||
    description.includes("ash")
  )
    return "bg-misty";
  return "bg-default";
});

onMounted(() => {
  if (typeof VANTA !== "undefined") {
    const weatherType = weatherClass.value.replace("bg-", "");
    vantaEffect = VANTA.CLOUDS({
      el: vantaContainer.value,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      speed: 0.5,
      ...weatherColors[weatherType],
    });
  }
});

watch(weatherClass, (newClass) => {
  const weatherType = newClass.replace("bg-", "");
  if (vantaEffect) {
    vantaEffect.setOptions(weatherColors[weatherType]);
  }
});

onBeforeUnmount(() => {
  if (vantaEffect) vantaEffect.destroy();
});
</script>

<template>
  <div ref="vantaContainer" class="vanta-background">
    <div
      class="container d-flex justify-content-center align-items-center min-vh-100"
    >
      <div :class="['weather-card', weatherClass]">
        <h1 class="mb-4">Weather in {{ city }}</h1>

        <div v-if="loading" class="alert alert-info">Loading...</div>
        <div v-if="error" class="alert alert-danger">Error: {{ error }}}</div>

        <div v-if="data">
          <div class="icon-container">
            <img
              :src="`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`"
              alt="Weather Icon"
              class="weather-icon"
            />
          </div>

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

.icon-container {
  width: 140px;
  height: 140px;
  background: #fff;
  border-radius: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

.weather-icon {
  width: 120px;
}

.bg-sunny {
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
}

.bg-cloudy {
  background: linear-gradient(135deg, #dfe9f3 0%, #ffffff 100%);
  color: #333;
}

.bg-rainy {
  background: linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%);
  color: #333;
}

.bg-snowy {
  background: linear-gradient(135deg, #eef2f3 0%, #8e9eab 100%);
  color: #333;
}

.bg-thunderstorm {
  background: linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%);
}

.bg-misty {
  background: linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%);
  color: #333;
}

.bg-default {
  background: linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%);
}

.vanta-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}
</style>

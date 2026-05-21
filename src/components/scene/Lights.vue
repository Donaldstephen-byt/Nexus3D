<template>
  <TresAmbientLight :intensity="0.4" />
  <TresDirectionalLight :position="[5, 10, 5]" :intensity="1.5" cast-shadow />
  <TresPointLight :position="[-5, 5, -5]" :intensity="1.5" color="#7b2fff" />
  <TresPointLight :position="[5, -5, 5]" :intensity="1.5" color="#00cfff" />
</template>

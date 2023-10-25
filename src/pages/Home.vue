<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {
    }
  },
  methods: {

  }
}
</script>

<template>
  <div class="presentation">
    <div>
      <h1 class="text-3xl md:text-4xl lg:text-5xl mb-4">Bienvenidos a EduCode</h1>
      <p>En EduCode, nuestro compromiso es impulsar tu éxito en el mundo de la programación. Como tu aliado en el aprendizaje de tecnologías clave como HTML5, CSS3, JavaScript y Angular, te ofrecemos cursos de alta calidad diseñados para llevarte desde los fundamentos hasta el dominio de estas habilidades esenciales.
      </p>
    </div>
    <img src="images/presentation.jpg" alt="Atención personalizada" />
  </div>
  <div class="details">
    <div class="w-[360px] rounded overflow-hidden shadow-lg">
      <img src="images/home-courses.webp" alt="Cursos" />
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">Conoce los cursos</div>
        <p class="text-gray-700 text-base">
          Descubre una amplia gama de cursos de alta calidad en EduCode que están diseñados para llevar tus habilidades de programación al siguiente nivel. Nuestros cursos incluyen certificados profesionales que puedes destacar en tu perfil de LinkedIn, y lo mejor de todo, ofrecemos precios asequibles para que el aprendizaje sea accesible para todos. Prepárate para mejorar tus capacidades y tu carrera con EduCode.
        </p>
      </div>
      <div class="tags px-6 pt-4 pb-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Cursos</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Programación</span>
      </div>
    </div>
    <div class="w-[360px] rounded overflow-hidden shadow-lg">
      <img src="images/customer-support.jpg" alt="Atención personalizada" />
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">Atención personalizada</div>
        <p class="text-gray-700 text-base">
          En EduCode, valoramos la comunicación con nuestros estudiantes. Para ponerte en contacto con nuestro administrador las 24 horas del día, simplemente <router-link to="/registrarse">regístrate</router-link> en nuestra plataforma y disfruta del acceso a un equipo de soporte dedicado que estará encantado de ayudarte en cualquier momento. Tu éxito es nuestra prioridad, y estamos aquí para respaldarte en cada paso de tu viaje de aprendizaje.
        </p>
      </div>
      <div class="tags px-6 pt-4 pb-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Atención al cliente</span>
      </div>
    </div>
  </div>
</template>
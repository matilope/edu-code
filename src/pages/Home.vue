<template>
  <div class="text-gray-800">
    <div
      class="bg-[url('images/home.jpg')] bg-cover md:h-[50vh] rounded container mx-auto p-2 sm:p-4 md:p-8 flex justify-center md:justify-start items-center md:items-end space-x-10"
    >
      <div class="md:w-[80%] lg:w-[50%] w-[100%] text-center md:text-start banner">
        <h1 class="text-4xl font-semibold text-white mb-4">
          Bienvenidos a EduCode
        </h1>
        <p class="text-white">
          En EduCode, nuestro compromiso es impulsar tu éxito en el mundo de la
          programación. Como tu aliado en el aprendizaje de tecnologías clave
          como HTML5, CSS3, JavaScript y Angular, te ofrecemos cursos de alta
          calidad diseñados para llevarte desde los fundamentos hasta el dominio
          de estas habilidades esenciales.
        </p>
      </div>
    </div>
    <div
      class="details py-8 flex justify-center items-start md:space-x-10 space-y-10 md:space-y-0"
    >
      <div class="w-[100%] rounded overflow-hidden shadow-lg">
        <img class="w-[100%]" src="images/home-courses.webp" alt="Cursos" />
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">Conoce los cursos</div>
          <p class="text-gray-700 text-base">
            Descubre una amplia gama de cursos de alta calidad en EduCode que
            están diseñados para llevar tus habilidades de programación al
            siguiente nivel. Nuestros cursos incluyen certificados profesionales
            que puedes destacar en tu perfil de LinkedIn, y lo mejor de todo,
            ofrecemos precios asequibles para que el aprendizaje sea accesible
            para todos. Prepárate para mejorar tus capacidades y tu carrera con
            EduCode.
          </p>
        </div>
        <div class="tags px-6 pt-4 pb-2">
          <span
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >Cursos</span
          >
          <span
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >Programación</span
          >
        </div>
      </div>
      <div class="w-[100%] rounded overflow-hidden shadow-lg">
        <img
          class="w-[100%] object-cover"
          src="images/customer-support.jpg"
          alt="Atención personalizada"
        />
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">Atención personalizada</div>
          <p class="text-gray-700 text-base">
            En EduCode, valoramos la comunicación con nuestros estudiantes. Para
            ponerte en contacto con nuestro administrador las 24 horas del día,
            simplemente
            <router-link to="/registrarse">regístrate</router-link> en nuestra
            plataforma y disfruta del acceso a un equipo de soporte dedicado que
            estará encantado de ayudarte en cualquier momento. Tu éxito es
            nuestra prioridad, y estamos aquí para respaldarte en cada paso de
            tu viaje de aprendizaje.
          </p>
        </div>
        <div class="tags px-6 pt-4 pb-2">
          <span
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >Atención al cliente</span
          >
        </div>
      </div>
      <div class="w-[100%] rounded overflow-hidden shadow-lg">
        <img
          class="w-[100%] object-cover"
          src="images/certified.jpg"
          alt="Certificado"
        />
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">Ofrecemos certificados</div>
          <p class="text-gray-700 text-base">
            Descubre una experiencia de aprendizaje excepcional con una amplia
            variedad de cursos temáticos de programación. Nuestros instructores expertos,
            certificaciones de renombre y muchos mas recursos adicionales te brindarán las
            herramientas que necesitas para alcanzar tus metas con facilidad y rapidez. Nos enorgullece
            mantener nuestros cursos actualizados y flexibles para adaptarnos a
            tu ritmo.
          </p>
        </div>
        <div class="tags px-6 pt-4 pb-2">
          <span
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >Certificados</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<template>
  <div role="status" class="profile-loader flex flex-wrap mb-6 xl:flex-nowrap flex-col sm:flex-row m-4 animate-pulse">
    <div class="mb-5 mr-5">
      <div class="relative inline-block rounded-2xl w-full">
        <div
          class="profile-loader-image inline-block rounded-2xl max-w-full w-[300px] md:w-[200px] h-[200px] bg-gray-500"
        ></div>
      </div>
    </div>
    <div class="grow">
      <div class="flex flex-wrap items-start justify-between mb-2">
        <div class="flex flex-col">
          <div class="flex items-center mb-2">
            <div
              class="transition-colors duration-200 ease-in-out mr-1 h-8 w-[220px] profile-loader-div bg-gray-400 rounded-md"
            ></div>
          </div>
          <div
            class="flex flex-wrap pr-2 mb-2 font-medium h-7 w-[160px] bg-gray-300 rounded-md profile-loader-div"
          ></div>
        </div>
      </div>
      <div class="flex flex-wrap justify-between mb-4">
        <div class="flex flex-wrap items-center">
          <div
            class="h-6 w-[90px] inline-flex bg-blue-300 profile-loader-div items-center justify-center rounded-full transition-all duration-200 ease-in-out px-3 py-1"
          ></div>
        </div>
      </div>
      <hr class="w-full h-px border-neutral-200 my-5" />
      <div class="h-6 w-[120px] bg-blue-400 profile-loader-div rounded-md"></div>
    </div>
  </div>
</template>

<template>
  <NuxtLayout>
    <NuxtPage></NuxtPage>
      <Toast />
  </NuxtLayout>
</template>
<style>
html {
  direction: ltr;
  font-family: numregular;
}
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #1e1e2f;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #6366f1; /* آبی-ایندیگو */
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #7c3aed; /* بنفش نئونی */
}


@font-face {
  font-family: numregular;
  src: url(././public/font/static/Roboto-Medium.ttf);
}
body {
  font-family: numregular;
  color: #050B20;
}
</style>



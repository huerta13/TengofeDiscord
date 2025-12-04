const axios = require("axios");

async function obtenerServiciosSeguidoresLikes() {
  const form = new URLSearchParams();
  form.append("key", "56fa718074b97b08591a838f221917bd");
  form.append("action", "services");

  const res = await axios.post("https://marketfollowers.com/api/v2", form);
  const servicios = res.data;

  const plataformas = ["instagram", "facebook", "tiktok"];
  const tipos = ["follower", "followers", "like", "likes"];

  // Filtrado principal
  let filtrados = servicios.filter(serv => {
    const categoria = serv.category.toLowerCase();
    const nombre = serv.name.toLowerCase();

    const esPlataforma = plataformas.some(p => categoria.includes(p));
    const esTipo = tipos.some(t => nombre.includes(t));

    return esPlataforma && esTipo;
  });

  // Ordenar por precio (rate) más barato
  filtrados = filtrados.sort((a, b) => parseFloat(a.rate) - parseFloat(b.rate));

  return filtrados;
}

obtenerServiciosSeguidoresLikes().then(lista => {
  console.log("Servicios encontrados:", lista.length);
  console.log("Los 5 más baratos:");
  console.log(lista.slice(0, 10));
});

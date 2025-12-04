const axios = require("axios");

async function obtenerMasBaratos() {
  const form = new URLSearchParams();
  form.append("key", "56fa718074b97b08591a838f221917bd");
  form.append("action", "services");

  const res = await axios.post("https://marketfollowers.com/api/v2", form);
  const servicios = res.data;

  const plataformas = ["instagram", "facebook", "tiktok"];
  const tipos = {
    followers: ["follower", "followers"],
    likes: ["like", "likes"]
  };

  const resultado = {};

  for (const plataforma of plataformas) {
    const serviciosPlataforma = servicios.filter(s =>
      s.category.toLowerCase().includes(plataforma)
    );

    // Followers filtrados
    const followers = serviciosPlataforma.filter(s =>
      tipos.followers.some(t => s.name.toLowerCase().includes(t))
    );

    // Likes filtrados
    const likes = serviciosPlataforma.filter(s =>
      tipos.likes.some(t => s.name.toLowerCase().includes(t))
    );

    // Ordenar por precio (barato primero)
    followers.sort((a, b) => parseFloat(a.rate) - parseFloat(b.rate));
    likes.sort((a, b) => parseFloat(a.rate) - parseFloat(b.rate));

    resultado[plataforma] = {
      followers: followers[0] || null,
      likes: likes[0] || null
    };
  }

  return resultado;
}

// EJEMPLO DE USO
obtenerMasBaratos().then(r => console.log(JSON.stringify(r, null, 2)));

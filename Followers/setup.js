// ======================
// CONFIGURACIÓN
// ======================
import fetch from "node-fetch";
require('dotenv').config();


const MF_API_KEY = process.env.MF_API_KEY;
const SHOPIFY_DOMAIN = "1kspts-jp.myshopify.com";
const SHOPIFY_TOKEN = process.env.SHOPIFY_TOKEN;


// ======================
// 1. Obtener servicios de MarketFollowers
// ======================
async function obtenerServiciosMarketFollowers() {
  const res = await fetch(`https://marketfollowers.com/api/v2?key=${MF_API_KEY}&action=services`);
  const data = await res.json();
  return data;
}

// ======================
// 2. Filtrar los servicios por plataforma + tipo (followers/likes)
// ======================
function filtrarBaratos(servicios, plataforma) {
  const followers = servicios
    .filter(s =>
      s.name.toLowerCase().includes(plataforma) &&
      s.name.toLowerCase().includes("follow")
    )
    .sort((a, b) => parseFloat(a.rate) - parseFloat(b.rate))[0];

  const likes = servicios
    .filter(s =>
      s.name.toLowerCase().includes(plataforma) &&
      s.name.toLowerCase().includes("like")
    )
    .sort((a, b) => parseFloat(a.rate) - parseFloat(b.rate))[0];

  return { followers, likes };
}

// ======================
// 3. Crear productos en Shopify
// ======================
async function crearProducto(nombre, descripcion, precio, imagenUrl, serviceId) {
  const body = {
    product: {
      title: nombre,
      body_html: descripcion,
      vendor: "MarketFollowers",
      product_type: "Servicio Digital",
      tags: ["followers", "likes", "social-media"],
      images: [{ src: imagenUrl }],
      variants: [
        {
          price: precio,
          sku: `mf-${serviceId}`, // Guardamos el ID del servicio
        }
      ]
    }
  };

  const res = await fetch(
    `https://${SHOPIFY_DOMAIN}/admin/api/2024-01/products.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": SHOPIFY_TOKEN
      },
      body: JSON.stringify(body)
    }
  );

  const data = await res.json();
  if (data.product) {
    console.log(`✔ Producto creado en Shopify: ${nombre}`);
  } else {
    console.log("❌ Error creando el producto:", data);
  }
}

// ======================
// 4. Script principal
// ======================
async function main() {
  console.log("📥 Obteniendo servicios de MarketFollowers…");

  const servicios = await obtenerServiciosMarketFollowers();

  console.log("🔍 Filtrando los más baratos…");

  const plataformas = {
    instagram: filtrarBaratos(servicios, "instagram"),
    facebook: filtrarBaratos(servicios, "facebook"),
    tiktok: filtrarBaratos(servicios, "tiktok")
  };

  console.log("📦 Productos seleccionados:", JSON.stringify(plataformas, null, 2));

  // ======================
  // 5. Crear los 6 productos en Shopify
  // ======================
  console.log("\n🚀 Creando productos en Shopify…");

  const imagenInstagram = "https://i.imgur.com/uBlrRsd.png";
  const imagenFacebook = "https://i.imgur.com/Vmm0qXW.png";
  const imagenTikTok = "https://i.imgur.com/Nz0KU6V.png";

  const precioFollowers = "99.00";
  const precioLikes = "49.00";

  // Instagram
  await crearProducto("Instagram Followers Económicos", "Seguidores reales de alta calidad.", precioFollowers, imagenInstagram, plataformas.instagram.followers.service);
  await crearProducto("Instagram Likes Económicos", "Likes globales garantizados.", precioLikes, imagenInstagram, plataformas.instagram.likes.service);

  // Facebook
  await crearProducto("Facebook Followers Económicos", "Followers de páginas de excelente calidad.", precioFollowers, imagenFacebook, plataformas.facebook.followers.service);
  await crearProducto("Facebook Likes Económicos", "Likes reales para posts de Facebook.", precioLikes, imagenFacebook, plataformas.facebook.likes.service);

  // TikTok
  await crearProducto("TikTok Followers Económicos", "Seguidores reales para cuentas TikTok.", precioFollowers, imagenTikTok, plataformas.tiktok.followers.service);
  await crearProducto("TikTok Likes Económicos", "Likes globales para tus videos.", precioLikes, imagenTikTok, plataformas.tiktok.likes.service);

  console.log("\n🎉 ¡LISTO! Los 6 productos ya fueron creados correctamente en tu Shopify.");
}

// Ejecutar script
main();

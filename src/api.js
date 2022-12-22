export async function fetchImages(id) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${id}`
  );
  const data = await response.json();
  return data.sprites.other['official-artwork'].front_default;
}
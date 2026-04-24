export async function findPhoto(query) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=5&orientation=landscape`;
  const res = await fetch(url, {
    headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` },
  });
  if (!res.ok) throw new Error(`Unsplash error: ${res.status}`);

  const data = await res.json();
  if (!data.results?.length) return findPhoto('travel destination landscape');

  const photo = data.results[0];

  // Trigger download ping (required by Unsplash T&Cs)
  fetch(photo.links.download_location, {
    headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` },
  }).catch(() => {});

  return {
    url: photo.urls.regular,
    credit: `${photo.user.name} on Unsplash`,
  };
}

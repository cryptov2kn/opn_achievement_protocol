export async function getCredentialDetail(id: string) {
  const response = await fetch(`/api/credential/detail?id=${id}`, {
    cache: "no-store",
  });

  return response.json();
}
